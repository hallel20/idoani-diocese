"use client";

import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { type Priest, type Parish } from "@prisma/client";
import { insertPriestSchema } from "@/lib/validation";
import { ImageUpload } from "@/components/image-uploader";
import { Plus, Edit, Trash2, User, Phone, Mail, MapPin } from "lucide-react";

export default function PriestsPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPriest, setEditingPriest] = useState<Priest | null>(null);
  const { toast } = useToast();

  const { data: priests = [], isLoading } = useQuery<Priest[]>({
    queryKey: ["/api/priests"],
  });

  const { data: parishes = [] } = useQuery<Parish[]>({
    queryKey: ["/api/parishes"],
  });

  const form = useForm<Priest>({
    resolver: zodResolver(insertPriestSchema),
    defaultValues: {
      name: "",
      title: "",
      phone: "",
      email: "",
      parishId: "",
      imageUrl: "",
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: Priest) => {
      const res = await apiRequest("POST", "/api/admin/priests", data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/priests"] });
      toast({
        title: "Priest added successfully!",
        description: "The priest has been added to the directory.",
      });
      form.reset();
      setIsDialogOpen(false);
    },
    onError: (error: Error) => {
      toast({
        title: "Failed to add priest",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (data: Priest) => {
      const res = await apiRequest(
        "PUT",
        `/api/admin/priests/${editingPriest?.id}`,
        data
      );
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/priests"] });
      toast({
        title: "Priest updated successfully!",
        description: "The priest information has been updated.",
      });
      form.reset();
      setEditingPriest(null);
      setIsDialogOpen(false);
    },
    onError: (error: Error) => {
      toast({
        title: "Failed to update priest",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiRequest("DELETE", `/api/admin/priests/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/priests"] });
      toast({
        title: "Priest removed successfully!",
        description: "The priest has been removed from the directory.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Failed to remove priest",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (data: Priest) => {
    if (editingPriest) {
      updateMutation.mutate(data);
    } else {
      createMutation.mutate(data);
    }
  };

  const handleEdit = (priest: Priest) => {
    setEditingPriest(priest);
    form.reset(priest);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to remove this priest?")) {
      deleteMutation.mutate(id);
    }
  };

  const openCreateDialog = () => {
    setEditingPriest(null);
    form.reset({
      name: "",
      title: "",
      phone: "",
      email: "",
      parishId: "",
      imageUrl: "",
    });
    setIsDialogOpen(true);
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
          <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
            Priest Management
          </h1>
          <p className="text-slate-600 mt-2">
            Manage clergy in the Diocese of Idoani
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={openCreateDialog}
              className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white shadow-lg"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Priest
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-xl font-semibold text-slate-700">
                {editingPriest ? "Edit Priest" : "Add New Priest"}
              </DialogTitle>
            </DialogHeader>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    {...form.register("name")}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    {...form.register("title")}
                    placeholder="e.g., Rev., Rev. Canon, Ven."
                    className="mt-1"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    {...form.register("phone")}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    {...form.register("email")}
                    className="mt-1"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="parishId">Parish Assignment</Label>
                <Select
                  onValueChange={(value) =>
                    form.setValue("parishId", value === "none" ? "" : value)
                  }
                  value={form.watch("parishId") || "none"}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select a parish" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">No parish assigned</SelectItem>
                    {parishes.map((parish) => (
                      <SelectItem key={parish.id} value={parish.id}>
                        {parish.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="imageUrl">Priest Photo</Label>
                <ImageUpload
                  imageUrl={form.watch("imageUrl")}
                  setImageUrl={(url: string | null) =>
                    form.setValue("imageUrl", url)
                  }
                />
                <Input
                  id="imageUrl"
                  {...form.register("imageUrl")}
                  placeholder="Or paste image URL"
                  className="mt-2"
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
                  disabled={
                    createMutation.isPending || updateMutation.isPending
                  }
                  className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                >
                  {createMutation.isPending || updateMutation.isPending
                    ? "Saving..."
                    : editingPriest
                    ? "Update"
                    : "Add"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {priests.map((priest) => {
          const assignedParish = parishes.find((p) => p.id === priest.parishId);

          return (
            <Card
              key={priest.id}
              className="border-0 shadow-lg bg-white/70 backdrop-blur-sm hover:shadow-xl transition-all duration-300"
            >
              <CardContent className="space-y-3">
              <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="text-lg font-semibold text-slate-700 mb-1">
                      {priest.title} {priest.name}
                    </CardTitle>
                    <Badge
                      variant="secondary"
                      className="bg-green-50 text-green-700"
                    >
                      <User className="w-3 h-3 mr-1" />
                      Clergy
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center justify-end space-x-1">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleEdit(priest)}
                    className="h-8 w-8 p-0 hover:bg-green-50"
                  >
                    <Edit className="w-4 h-4 text-green-600" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleDelete(priest.id)}
                    className="h-8 w-8 p-0 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </Button>
                </div>
                {priest.imageUrl && (
                  <div className="w-full h-32 rounded-lg overflow-hidden">
                    <img
                      src={priest.imageUrl}
                      alt={priest.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                <div className="space-y-2 text-sm">
                  {assignedParish && (
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-slate-500" />
                      <span className="text-slate-600">
                        {assignedParish.name}
                      </span>
                    </div>
                  )}

                  {priest.phone && (
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4 text-slate-500" />
                      <span className="text-slate-600">{priest.phone}</span>
                    </div>
                  )}

                  {priest.email && (
                    <div className="flex items-center space-x-2">
                      <Mail className="w-4 h-4 text-slate-500" />
                      <span className="text-slate-600">{priest.email}</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {priests.length === 0 && (
        <div className="text-center py-12">
          <User className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-slate-600 mb-2">
            No priests found
          </h3>
          <p className="text-slate-500 mb-4">
            Get started by adding your first priest.
          </p>
          <Button
            onClick={openCreateDialog}
            className="bg-gradient-to-r from-green-500 to-emerald-500"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Priest
          </Button>
        </div>
      )}
    </div>
  );
}
