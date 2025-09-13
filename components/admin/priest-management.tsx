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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { type Priest, type Parish } from "@prisma/client";
import { insertPriestSchema } from "@/lib/validation";
import { ImageUpload } from "@/components/image-uploader";
import { Plus, Edit, Trash2, User, Phone, Mail, MapPin } from "lucide-react";

export default function PriestManagement() {
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
      title: "Reverend",
      phone: "",
      email: "",
      bio: "",
      imageUrl: "",
      parishId: "",
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
        title: "Success",
        description: "Priest created successfully.",
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
    mutationFn: async ({ id, data }: { id: string; data: Partial<Priest> }) => {
      const res = await apiRequest("PUT", `/api/admin/priests/${id}`, data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/priests"] });
      toast({
        title: "Success",
        description: "Priest updated successfully.",
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
      await apiRequest("DELETE", `/api/admin/priests/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/priests"] });
      toast({
        title: "Success",
        description: "Priest deleted successfully.",
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

  const handleEdit = (priest: Priest) => {
    setEditingPriest(priest);
    form.reset({
      name: priest.name,
      title: priest.title || "Reverend",
      phone: priest.phone || "",
      email: priest.email || "",
      bio: priest.bio || "",
      imageUrl: priest.imageUrl || "",
      parishId: priest.parishId || "",
    });
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingPriest(null);
    form.reset({
      name: "",
      title: "Reverend",
      phone: "",
      email: "",
      bio: "",
      imageUrl: "",
      parishId: "",
    });
  };

  const onSubmit = (data: Priest) => {
    if (editingPriest) {
      updateMutation.mutate({ id: editingPriest.id, data });
    } else {
      createMutation.mutate(data);
    }
  };

  const getParishName = (parishId?: string | null) => {
    if (!parishId) return "No parish assigned";
    const parish = parishes.find(p => p.id === parishId);
    return parish?.name || "Unknown parish";
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-2xl font-bold text-gray-900">Priest Management</h3>
          <p className="text-gray-600">Manage priest profiles and assignments</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button 
              className="bg-anglican-purple-500 hover:bg-anglican-purple-600"
              data-testid="button-add-priest"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Priest
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl bg-white">
            <DialogHeader>
              <DialogTitle>
                {editingPriest ? "Edit Priest" : "Add New Priest"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    {...form.register("name")}
                    data-testid="input-priest-name"
                  />
                  {form.formState.errors.name && (
                    <p className="text-sm text-red-600 mt-1">
                      {form.formState.errors.name.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Select 
                    onValueChange={(value) => form.setValue("title", value)}
                    value={form.watch("title")}
                  >
                    <SelectTrigger data-testid="select-priest-title">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Reverend">Reverend</SelectItem>
                      <SelectItem value="Father">Father</SelectItem>
                      <SelectItem value="Canon">Canon</SelectItem>
                      <SelectItem value="Archdeacon">Archdeacon</SelectItem>
                      <SelectItem value="Dean">Dean</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    type="tel"
                    {...form.register("phone")}
                    data-testid="input-priest-phone"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    {...form.register("email")}
                    data-testid="input-priest-email"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="parishId">Parish Assignment</Label>
                <Select 
                  onValueChange={(value) => form.setValue("parishId", value === "none" ? "" : value)}
                  value={form.watch("parishId") || "none"}
                >
                  <SelectTrigger data-testid="select-priest-parish">
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
                <Label htmlFor="imageUrl">Image</Label>
                <ImageUpload imageUrl={form.watch("imageUrl")} setImageUrl={(url: string | null) => form.setValue("imageUrl", url)} />
                <Input
                  id="imageUrl"
                  {...form.register("imageUrl")}
                  placeholder="https://example.com/image.jpg"
                  data-testid="input-priest-image"
                />
              </div>

              <div>
                <Label htmlFor="bio">Biography</Label>
                <Textarea
                  id="bio"
                  rows={4}
                  {...form.register("bio")}
                  placeholder="Brief biography of the priest..."
                  data-testid="textarea-priest-bio"
                />
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button type="button" variant="outline" onClick={handleCloseDialog}>
                  Cancel
                </Button>
                <Button 
                  type="submit"
                  disabled={createMutation.isPending || updateMutation.isPending}
                  data-testid="button-save-priest"
                >
                  {editingPriest ? "Update" : "Create"} Priest
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
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gray-300 rounded-full mr-4" />
                  <div className="flex-1">
                    <div className="h-4 bg-gray-300 rounded mb-2" />
                    <div className="h-3 bg-gray-300 rounded w-2/3" />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-3 bg-gray-300 rounded" />
                  <div className="h-3 bg-gray-300 rounded w-3/4" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : priests.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <User className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No priests yet</h3>
            <p className="text-gray-600">Get started by adding your first priest.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {priests.map((priest) => (
            <Card 
              key={priest.id} 
              className="hover:shadow-lg transition-shadow"
              data-testid={`card-priest-${priest.id}`}
            >
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {priest.imageUrl ? (
                    <img
                      src={priest.imageUrl}
                      alt={priest.name}
                      className="w-12 h-12 rounded-full object-cover mr-4"
                    />
                  ) : (
                    <div className="w-12 h-12 bg-anglican-purple-100 rounded-full flex items-center justify-center mr-4">
                      <User className="w-6 h-6 text-anglican-purple-600" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-serif text-lg font-semibold text-anglican-purple-700 truncate">
                      {priest.title} {priest.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {getParishName(priest.parishId)}
                    </p>
                  </div>
                </div>

                {priest.bio && (
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {priest.bio}
                  </p>
                )}

                <div className="space-y-2 mb-4">
                  {priest.phone && (
                    <div className="flex items-center text-sm text-gray-600">
                      <Phone className="w-4 h-4 mr-2 text-anglican-purple-500" />
                      <span>{priest.phone}</span>
                    </div>
                  )}
                  {priest.email && (
                    <div className="flex items-center text-sm text-gray-600">
                      <Mail className="w-4 h-4 mr-2 text-anglican-purple-500" />
                      <span className="truncate">{priest.email}</span>
                    </div>
                  )}
                </div>

                <div className="flex justify-between items-center">
                  <Badge 
                    variant={priest.parishId ? "default" : "secondary"}
                    className={priest.parishId ? "bg-anglican-purple-100 text-anglican-purple-700" : ""}
                  >
                    {priest.parishId ? "Assigned" : "Unassigned"}
                  </Badge>
                  
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(priest)}
                      data-testid={`button-edit-priest-${priest.id}`}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => deleteMutation.mutate(priest.id)}
                      disabled={deleteMutation.isPending}
                      data-testid={`button-delete-priest-${priest.id}`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
