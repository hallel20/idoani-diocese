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
import { insertParishSchema, type Parish, type InsertParish, type Archdeaconry } from "@shared/schema";
import { Plus, Edit, Trash2, Church, Phone, Mail, MapPin, Clock } from "lucide-react";

export default function ParishManagement() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingParish, setEditingParish] = useState<Parish | null>(null);
  const { toast } = useToast();

  const { data: parishes = [], isLoading } = useQuery<Parish[]>({
    queryKey: ["/api/parishes"],
  });

  const { data: archdeaconries = [] } = useQuery<Archdeaconry[]>({
    queryKey: ["/api/archdeaconries"],
  });

  const form = useForm<InsertParish>({
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
    mutationFn: async (data: InsertParish) => {
      const res = await apiRequest("POST", "/api/admin/parishes", data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/parishes"] });
      toast({
        title: "Success",
        description: "Parish created successfully.",
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
    mutationFn: async ({ id, data }: { id: string; data: Partial<InsertParish> }) => {
      const res = await apiRequest("PUT", `/api/admin/parishes/${id}`, data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/parishes"] });
      toast({
        title: "Success",
        description: "Parish updated successfully.",
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
      await apiRequest("DELETE", `/api/admin/parishes/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/parishes"] });
      toast({
        title: "Success",
        description: "Parish deleted successfully.",
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

  const handleEdit = (parish: Parish) => {
    setEditingParish(parish);
    form.reset({
      name: parish.name,
      address: parish.address,
      phone: parish.phone || "",
      email: parish.email || "",
      serviceTimes: parish.serviceTimes || "",
      mapUrl: parish.mapUrl || "",
      latitude: parish.latitude || "",
      longitude: parish.longitude || "",
      archdeaconryId: parish.archdeaconryId || "",
      imageUrl: parish.imageUrl || "",
    });
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
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
  };

  const onSubmit = (data: InsertParish) => {
    if (editingParish) {
      updateMutation.mutate({ id: editingParish.id, data });
    } else {
      createMutation.mutate(data);
    }
  };

  const getArchdeaconryName = (archdeaconryId?: string | null) => {
    if (!archdeaconryId) return "No archdeaconry assigned";
    const archdeaconry = archdeaconries.find(a => a.id === archdeaconryId);
    return archdeaconry?.name || "Unknown archdeaconry";
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-2xl font-bold text-gray-900">Parish Management</h3>
          <p className="text-gray-600">Manage parish information and locations</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button 
              className="bg-anglican-purple-500 hover:bg-anglican-purple-600"
              data-testid="button-add-parish"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Parish
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingParish ? "Edit Parish" : "Add New Parish"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Parish Name</Label>
                  <Input
                    id="name"
                    {...form.register("name")}
                    data-testid="input-parish-name"
                  />
                  {form.formState.errors.name && (
                    <p className="text-sm text-red-600 mt-1">
                      {form.formState.errors.name.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="archdeaconryId">Archdeaconry</Label>
                  <Select 
                    onValueChange={(value) => form.setValue("archdeaconryId", value === "none" ? "" : value)}
                    value={form.watch("archdeaconryId") || "none"}
                  >
                    <SelectTrigger data-testid="select-parish-archdeaconry">
                      <SelectValue placeholder="Select archdeaconry" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">No archdeaconry assigned</SelectItem>
                      {archdeaconries.map((archdeaconry) => (
                        <SelectItem key={archdeaconry.id} value={archdeaconry.id}>
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
                  rows={2}
                  {...form.register("address")}
                  data-testid="textarea-parish-address"
                />
                {form.formState.errors.address && (
                  <p className="text-sm text-red-600 mt-1">
                    {form.formState.errors.address.message}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    type="tel"
                    {...form.register("phone")}
                    data-testid="input-parish-phone"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    {...form.register("email")}
                    data-testid="input-parish-email"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="serviceTimes">Service Times</Label>
                <Input
                  id="serviceTimes"
                  {...form.register("serviceTimes")}
                  placeholder="e.g., Sunday: 8:00 AM, 10:30 AM"
                  data-testid="input-parish-service-times"
                />
              </div>

              <div>
                <Label htmlFor="mapUrl">Google Maps URL</Label>
                <Input
                  id="mapUrl"
                  {...form.register("mapUrl")}
                  placeholder="https://maps.google.com/..."
                  data-testid="input-parish-map-url"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="latitude">Latitude</Label>
                  <Input
                    id="latitude"
                    {...form.register("latitude")}
                    placeholder="e.g., 40.7128"
                    data-testid="input-parish-latitude"
                  />
                </div>
                <div>
                  <Label htmlFor="longitude">Longitude</Label>
                  <Input
                    id="longitude"
                    {...form.register("longitude")}
                    placeholder="e.g., -74.0060"
                    data-testid="input-parish-longitude"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="imageUrl">Image URL</Label>
                <Input
                  id="imageUrl"
                  {...form.register("imageUrl")}
                  placeholder="https://example.com/image.jpg"
                  data-testid="input-parish-image"
                />
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button type="button" variant="outline" onClick={handleCloseDialog}>
                  Cancel
                </Button>
                <Button 
                  type="submit"
                  disabled={createMutation.isPending || updateMutation.isPending}
                  data-testid="button-save-parish"
                >
                  {editingParish ? "Update" : "Create"} Parish
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
              <div className="h-48 bg-gray-300 rounded-t-lg" />
              <CardContent className="p-6">
                <div className="h-6 bg-gray-300 rounded mb-2" />
                <div className="h-4 bg-gray-300 rounded mb-4" />
                <div className="space-y-2">
                  <div className="h-4 bg-gray-300 rounded" />
                  <div className="h-4 bg-gray-300 rounded" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : parishes.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <Church className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No parishes yet</h3>
            <p className="text-gray-600">Get started by adding your first parish.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {parishes.map((parish) => (
            <Card 
              key={parish.id} 
              className="overflow-hidden hover:shadow-xl transition-shadow"
              data-testid={`card-parish-admin-${parish.id}`}
            >
              <div className="h-48 bg-gradient-to-r from-anglican-purple-100 to-anglican-purple-200 flex items-center justify-center">
                {parish.imageUrl ? (
                  <img 
                    src={parish.imageUrl}
                    alt={parish.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Church className="w-16 h-16 text-anglican-purple-500" />
                )}
              </div>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-serif text-xl font-semibold text-anglican-purple-700">
                    {parish.name}
                  </h3>
                  <Badge 
                    variant={parish.archdeaconryId ? "default" : "secondary"}
                    className={parish.archdeaconryId ? "bg-anglican-purple-100 text-anglican-purple-700" : ""}
                  >
                    {getArchdeaconryName(parish.archdeaconryId)}
                  </Badge>
                </div>
                
                <p className="text-gray-600 mb-3">{parish.address}</p>
                
                <div className="space-y-2 mb-4">
                  {parish.serviceTimes && (
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="w-4 h-4 mr-2 text-anglican-purple-500" />
                      <span>{parish.serviceTimes}</span>
                    </div>
                  )}
                  {parish.phone && (
                    <div className="flex items-center text-sm text-gray-600">
                      <Phone className="w-4 h-4 mr-2 text-anglican-purple-500" />
                      <span>{parish.phone}</span>
                    </div>
                  )}
                  {parish.email && (
                    <div className="flex items-center text-sm text-gray-600">
                      <Mail className="w-4 h-4 mr-2 text-anglican-purple-500" />
                      <span className="truncate">{parish.email}</span>
                    </div>
                  )}
                </div>
                
                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(parish)}
                    data-testid={`button-edit-parish-${parish.id}`}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => deleteMutation.mutate(parish.id)}
                    disabled={deleteMutation.isPending}
                    data-testid={`button-delete-parish-${parish.id}`}
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
