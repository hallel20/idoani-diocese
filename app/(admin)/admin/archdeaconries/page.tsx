"use client";

import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { type Archdeaconry, type Parish } from "@prisma/client";
import { insertArchdeaconrySchema } from "@/lib/validation";
import { Plus, Edit, Trash2, MapPin, Building2, Eye } from "lucide-react";
import Link from "next/link";

export default function ArchdeaconriesPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingArchdeaconry, setEditingArchdeaconry] =
    useState<Archdeaconry | null>(null);
  const { toast } = useToast();

  const { data: archdeaconries = [], isLoading } = useQuery<Archdeaconry[]>({
    queryKey: ["/api/archdeaconries"],
  });

  const { data: parishes = [] } = useQuery<Parish[]>({
    queryKey: ["/api/parishes"],
  });

  const form = useForm<Archdeaconry>({
    resolver: zodResolver(insertArchdeaconrySchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (data: Archdeaconry) => {
      const res = await apiRequest(
        "PUT",
        `/api/admin/archdeaconries/${editingArchdeaconry?.id}`,
        data
      );
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/archdeaconries"] });
      toast({
        title: "Archdeaconry updated successfully!",
        description: "The archdeaconry information has been updated.",
      });
      form.reset();
      setEditingArchdeaconry(null);
      setIsDialogOpen(false);
    },
    onError: (error: Error) => {
      toast({
        title: "Failed to update archdeaconry",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiRequest("DELETE", `/api/admin/archdeaconries/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/archdeaconries"] });
      toast({
        title: "Archdeaconry deleted successfully!",
        description: "The archdeaconry has been removed.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Failed to delete archdeaconry",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (data: Archdeaconry) => {
    if (editingArchdeaconry) {
      updateMutation.mutate(data);
    }
  };

  const handleEdit = (archdeaconry: Archdeaconry) => {
    setEditingArchdeaconry(archdeaconry);
    form.reset(archdeaconry);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    const parishesInArchdeaconry = parishes.filter(
      (p) => p.archdeaconryId === id
    );
    if (parishesInArchdeaconry.length > 0) {
      toast({
        title: "Cannot delete archdeaconry",
        description:
          "This archdeaconry has parishes assigned to it. Please reassign or remove the parishes first.",
        variant: "destructive",
      });
      return;
    }

    if (confirm("Are you sure you want to delete this archdeaconry?")) {
      deleteMutation.mutate(id);
    }
  };

  const getParishCount = (archdeaconryId: string) => {
    return parishes.filter((p) => p.archdeaconryId === archdeaconryId).length;
  };

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-slate-200 rounded w-1/4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-64 bg-slate-200 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
            Archdeaconry Management
          </h1>
          <p className="text-slate-600 mt-2">
            Manage archdeaconries in the Diocese of Idoani
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {archdeaconries.map((archdeaconry) => {
          const parishCount = getParishCount(archdeaconry.id);

          return (
            <Card
              key={archdeaconry.id}
              className="border-0 shadow-lg bg-white/70 backdrop-blur-sm hover:shadow-xl transition-all duration-300"
            >
              <CardContent className="space-y-3">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="text-lg font-semibold text-slate-700 mb-1">
                      {archdeaconry.name}
                    </CardTitle>
                    <Badge
                      variant="secondary"
                      className="bg-orange-50 text-orange-700"
                    >
                      <MapPin className="w-3 h-3 mr-1" />
                      Archdeaconry
                    </Badge>
                  </div>
                  <div className="flex space-x-1">
                    <Link href={`/admin/archdeaconries/${archdeaconry.id}`}>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-8 w-8 p-0 hover:bg-orange-50"
                      >
                        <Eye className="w-4 h-4 text-orange-600" />
                      </Button>
                    </Link>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleEdit(archdeaconry)}
                      className="h-8 w-8 p-0 hover:bg-orange-50"
                    >
                      <Edit className="w-4 h-4 text-orange-600" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleDelete(archdeaconry.id)}
                      className="h-8 w-8 p-0 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </Button>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Building2 className="w-4 h-4 text-slate-500" />
                      <span className="text-slate-600">Parishes</span>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {parishCount}
                    </Badge>
                  </div>

                  {archdeaconry.description && (
                    <p className="text-slate-600 text-sm mt-2 line-clamp-3">
                      {archdeaconry.description}
                    </p>
                  )}
                </div>

                <Link href={`/admin/archdeaconries/${archdeaconry.id}`}>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full mt-3 border-orange-200 text-orange-700 hover:bg-orange-50"
                  >
                    View Details
                  </Button>
                </Link>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {archdeaconries.length === 0 && (
        <div className="text-center py-12">
          <MapPin className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-slate-600 mb-2">
            No archdeaconries found
          </h3>
          <p className="text-slate-500 mb-4">
            Archdeaconries are managed through the database.
          </p>
        </div>
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-slate-700">
              Edit Archdeaconry
            </DialogTitle>
          </DialogHeader>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            <div>
              <Label htmlFor="name">Archdeaconry Name</Label>
              <Input id="name" {...form.register("name")} className="mt-1" />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                {...form.register("description")}
                className="mt-1"
                rows={4}
              />
            </div>

            <div className="flex justify-end space-x-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={updateMutation.isPending}
                className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600"
              >
                {updateMutation.isPending ? "Updating..." : "Update"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
