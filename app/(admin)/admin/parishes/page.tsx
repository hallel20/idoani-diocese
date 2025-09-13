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
import { type Parish, type Archdeaconry } from "@prisma/client";
import { insertParishSchema } from "@/lib/validation";
import { ImageUpload } from "@/components/image-uploader";
import {
  Plus,
  Edit,
  Trash2,
  Building2,
  Phone,
  Mail,
  Clock,
  MapPin,
} from "lucide-react";

export default function ParishesPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingParish, setEditingParish] = useState<Parish | null>(null);
  const { toast } = useToast();

  const { data: parishes = [], isLoading } = useQuery<Parish[]>({
    queryKey: ["/api/parishes"],
  });

  const { data: archdeaconries = [] } = useQuery<Archdeaconry[]>({
    queryKey: ["/api/archdeaconries"],
  });

  const form = useForm<Parish>({
    resolver: zodResolver(insertParishSchema),
    defaultValues: {
      name: "",
      address: "",
      phone: "",
      email: "",
      serviceTimes: "",
      mapUrl: "",
      latitude: "",
      longitude: "",
      archdeaconryId: "",
      imageUrl: "",
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: Parish) => {
      const res = await apiRequest("POST", "/api/admin/parishes", data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/parishes"] });
      toast({
        title: "Parish created successfully!",
        description: "The parish has been added to the directory.",
      });
      form.reset();
      setIsDialogOpen(false);
    },
    onError: (error: Error) => {
      toast({
        title: "Failed to create parish",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (data: Parish) => {
      const res = await apiRequest(
        "PUT",
        `/api/admin/parishes/${editingParish?.id}`,
        data
      );
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/parishes"] });
      toast({
        title: "Parish updated successfully!",
        description: "The parish information has been updated.",
      });
      form.reset();
      setEditingParish(null);
      setIsDialogOpen(false);
    },
    onError: (error: Error) => {
      toast({
        title: "Failed to update parish",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiRequest("DELETE", `/api/admin/parishes/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/parishes"] });
      toast({
        title: "Parish deleted successfully!",
        description: "The parish has been removed from the directory.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Failed to delete parish",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (data: Parish) => {
    if (editingParish) {
      updateMutation.mutate(data);
    } else {
      createMutation.mutate(data);
    }
  };

  const handleEdit = (parish: Parish) => {
    setEditingParish(parish);
    form.reset(parish);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this parish?")) {
      deleteMutation.mutate(id);
    }
  };

  const openCreateDialog = () => {
    setEditingParish(null);
    form.reset({
      name: "",
      address: "",
      phone: "",
      email: "",
      serviceTimes: "",
      mapUrl: "",
      latitude: "",
      longitude: "",
      archdeaconryId: "",
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
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Parish Management
          </h1>
          <p className="text-slate-600 mt-2">
            Manage parishes in the Diocese of Idoani
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={openCreateDialog}
              className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white shadow-lg"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Parish
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-xl font-semibold text-slate-700">
                {editingParish ? "Edit Parish" : "Add New Parish"}
              </DialogTitle>
            </DialogHeader>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Parish Name</Label>
                  <Input
                    id="name"
                    {...form.register("name")}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="archdeaconryId">Archdeaconry</Label>
                  <Select
                    onValueChange={(value) =>
                      form.setValue("archdeaconryId", value)
                    }
                    value={form.watch("archdeaconryId") || undefined}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select archdeaconry" />
                    </SelectTrigger>
                    <SelectContent>
                      {archdeaconries.map((archdeaconry) => (
                        <SelectItem
                          key={archdeaconry.id}
                          value={archdeaconry.id}
                        >
                          {archdeaconry.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="address">Address</Label>
                <Textarea
                  id="address"
                  {...form.register("address")}
                  className="mt-1"
                />
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
                <Label htmlFor="serviceTimes">Service Times</Label>
                <Textarea
                  id="serviceTimes"
                  {...form.register("serviceTimes")}
                  placeholder="e.g., Sunday: 8:00 AM, 10:00 AM"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="imageUrl">Parish Image</Label>
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
                  className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600"
                >
                  {createMutation.isPending || updateMutation.isPending
                    ? "Saving..."
                    : editingParish
                    ? "Update"
                    : "Create"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {parishes.map((parish) => (
          <Card
            key={parish.id}
            className="border-0 shadow-lg bg-white/70 backdrop-blur-sm hover:shadow-xl transition-all duration-300"
          >
            <CardContent className="space-y-3">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <CardTitle className="text-lg font-semibold text-slate-700 mb-1">
                    {parish.name}
                  </CardTitle>
                  <Badge
                    variant="secondary"
                    className="bg-blue-50 text-blue-700"
                  >
                    <Building2 className="w-3 h-3 mr-1" />
                    Parish
                  </Badge>
                </div>
                <div className="flex space-x-1">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleEdit(parish)}
                    className="h-8 w-8 p-0 hover:bg-blue-50"
                  >
                    <Edit className="w-4 h-4 text-blue-600" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleDelete(parish.id)}
                    className="h-8 w-8 p-0 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </Button>
                </div>
              </div>
              {parish.imageUrl && (
                <div className="w-full h-32 rounded-lg overflow-hidden">
                  <img
                    src={parish.imageUrl}
                    alt={parish.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <div className="space-y-2 text-sm">
                {parish.address && (
                  <div className="flex items-start space-x-2">
                    <MapPin className="w-4 h-4 text-slate-500 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-600">{parish.address}</span>
                  </div>
                )}

                {parish.phone && (
                  <div className="flex items-center space-x-2">
                    <Phone className="w-4 h-4 text-slate-500" />
                    <span className="text-slate-600">{parish.phone}</span>
                  </div>
                )}

                {parish.email && (
                  <div className="flex items-center space-x-2">
                    <Mail className="w-4 h-4 text-slate-500" />
                    <span className="text-slate-600">{parish.email}</span>
                  </div>
                )}

                {parish.serviceTimes && (
                  <div className="flex items-start space-x-2">
                    <Clock className="w-4 h-4 text-slate-500 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-600">
                      {parish.serviceTimes}
                    </span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {parishes.length === 0 && (
        <div className="text-center py-12">
          <Building2 className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-slate-600 mb-2">
            No parishes found
          </h3>
          <p className="text-slate-500 mb-4">
            Get started by adding your first parish.
          </p>
          <Button
            onClick={openCreateDialog}
            className="bg-gradient-to-r from-blue-500 to-indigo-500"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Parish
          </Button>
        </div>
      )}
    </div>
  );
}
