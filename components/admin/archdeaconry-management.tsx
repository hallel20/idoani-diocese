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
import {
  type Archdeaconry,
  type Archdeaconry as InsertArchdeaconry,
  type Parish,
} from "@prisma/client";
import { insertArchdeaconrySchema } from "@/lib/validation";
import { Plus, Edit, Trash2, MapPin, Church } from "lucide-react";

export default function ArchdeaconryManagement() {
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

  const form = useForm<InsertArchdeaconry>({
    resolver: zodResolver(insertArchdeaconrySchema),
    defaultValues: {
      name: "",
      description: "",
      image1Url: "",
      image2Url: "",
      image3Url: "",
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: InsertArchdeaconry) => {
      const res = await apiRequest("POST", "/api/admin/archdeaconries", data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/archdeaconries"] });
      toast({
        title: "Success",
        description: "Archdeaconry created successfully.",
      });
      handleCloseDialog();
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: Partial<InsertArchdeaconry>;
    }) => {
      const res = await apiRequest(
        "PUT",
        `/api/admin/archdeaconries/${id}`,
        data
      );
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/archdeaconries"] });
      toast({
        title: "Success",
        description: "Archdeaconry updated successfully.",
      });
      handleCloseDialog();
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
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
        title: "Success",
        description: "Archdeaconry deleted successfully.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleEdit = (archdeaconry: Archdeaconry) => {
    setEditingArchdeaconry(archdeaconry);
    form.reset({
      name: archdeaconry.name,
      description: archdeaconry.description || "",
      image1Url: archdeaconry.image1Url || "",
      image2Url: archdeaconry.image2Url || "",
      image3Url: archdeaconry.image3Url || "",
    });
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingArchdeaconry(null);
    form.reset({
      name: "",
      description: "",
      image1Url: "",
      image2Url: "",
      image3Url: "",
    });
  };

  const onSubmit = (data: InsertArchdeaconry) => {
    if (editingArchdeaconry) {
      updateMutation.mutate({ id: editingArchdeaconry.id, data });
    } else {
      createMutation.mutate(data);
    }
  };

  const getParishCount = (archdeaconryId: string) => {
    return parishes.filter((p) => p.archdeaconryId === archdeaconryId).length;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-2xl font-bold text-gray-900">
            Archdeaconry Management
          </h3>
          <p className="text-gray-600">
            Manage archdeaconries and their regions
          </p>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              className="bg-anglican-purple-500 hover:bg-anglican-purple-600"
              data-testid="button-add-archdeaconry"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Archdeaconry
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl bg-white">
            <DialogHeader>
              <DialogTitle>
                {editingArchdeaconry
                  ? "Edit Archdeaconry"
                  : "Add New Archdeaconry"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <Label htmlFor="name">Archdeaconry Name</Label>
                <Input
                  id="name"
                  {...form.register("name")}
                  data-testid="input-archdeaconry-name"
                />
                {form.formState.errors.name && (
                  <p className="text-sm text-red-600 mt-1">
                    {form.formState.errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  rows={4}
                  {...form.register("description")}
                  placeholder="Brief description of the archdeaconry..."
                  data-testid="textarea-archdeaconry-description"
                />
              </div>

              <div className="space-y-3">
                <Label>Images (up to 3)</Label>
                <div>
                  <Label htmlFor="image1Url" className="text-sm">
                    Image 1 URL
                  </Label>
                  <Input
                    id="image1Url"
                    {...form.register("image1Url")}
                    placeholder="https://example.com/image1.jpg"
                    data-testid="input-archdeaconry-image1"
                  />
                </div>
                <div>
                  <Label htmlFor="image2Url" className="text-sm">
                    Image 2 URL
                  </Label>
                  <Input
                    id="image2Url"
                    {...form.register("image2Url")}
                    placeholder="https://example.com/image2.jpg"
                    data-testid="input-archdeaconry-image2"
                  />
                </div>
                <div>
                  <Label htmlFor="image3Url" className="text-sm">
                    Image 3 URL
                  </Label>
                  <Input
                    id="image3Url"
                    {...form.register("image3Url")}
                    placeholder="https://example.com/image3.jpg"
                    data-testid="input-archdeaconry-image3"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCloseDialog}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={
                    createMutation.isPending || updateMutation.isPending
                  }
                  data-testid="button-save-archdeaconry"
                >
                  {editingArchdeaconry ? "Update" : "Create"} Archdeaconry
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader>
                <div className="h-6 bg-gray-300 rounded" />
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-300 rounded" />
                  <div className="h-4 bg-gray-300 rounded w-3/4" />
                  <div className="h-8 bg-gray-300 rounded w-1/2 mt-4" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : archdeaconries.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No archdeaconries yet
            </h3>
            <p className="text-gray-600">
              Get started by adding your first archdeaconry.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {archdeaconries.map((archdeaconry) => (
            <Card
              key={archdeaconry.id}
              className="hover:shadow-lg transition-shadow"
              data-testid={`card-archdeaconry-${archdeaconry.id}`}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="font-serif text-xl text-anglican-purple-700">
                    {archdeaconry.name}
                  </CardTitle>
                  <Badge
                    variant="secondary"
                    className="bg-anglican-purple-100 text-anglican-purple-700"
                  >
                    <Church className="w-3 h-3 mr-1" />
                    {getParishCount(archdeaconry.id)} Parishes
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                {archdeaconry.description && (
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {archdeaconry.description}
                  </p>
                )}

                {/* Image Gallery */}
                {(archdeaconry.image1Url ||
                  archdeaconry.image2Url ||
                  archdeaconry.image3Url) && (
                  <div className="flex gap-2 mb-4">
                    {archdeaconry.image1Url && (
                      <img
                        src={archdeaconry.image1Url}
                        alt={`${archdeaconry.name} 1`}
                        className="w-16 h-16 object-cover rounded"
                      />
                    )}
                    {archdeaconry.image2Url && (
                      <img
                        src={archdeaconry.image2Url}
                        alt={`${archdeaconry.name} 2`}
                        className="w-16 h-16 object-cover rounded"
                      />
                    )}
                    {archdeaconry.image3Url && (
                      <img
                        src={archdeaconry.image3Url}
                        alt={`${archdeaconry.name} 3`}
                        className="w-16 h-16 object-cover rounded"
                      />
                    )}
                  </div>
                )}

                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(archdeaconry)}
                    data-testid={`button-edit-archdeaconry-${archdeaconry.id}`}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => deleteMutation.mutate(archdeaconry.id)}
                    disabled={deleteMutation.isPending}
                    data-testid={`button-delete-archdeaconry-${archdeaconry.id}`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
