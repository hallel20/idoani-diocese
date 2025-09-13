"use client";

import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
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
import { type BishopCharge } from "@prisma/client";
import { Plus, Edit, Trash2, FileText, Eye } from "lucide-react";
import Link from "next/link";

export default function BishopChargePage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCharge, setEditingCharge] = useState<BishopCharge | null>(null);
  const { toast } = useToast();

  const { data: charges = [], isLoading } = useQuery<BishopCharge[]>({
    queryKey: ["/api/admin/bishops-charge"],
  });

  const form = useForm<BishopCharge>({
    defaultValues: {
      title: "",
      content: "",
      isActive: true,
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: BishopCharge) => {
      const res = await apiRequest("POST", "/api/admin/bishops-charge", data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/bishops-charge"] });
      toast({
        title: "Bishop's Charge created successfully!",
        description: "The new charge has been published.",
      });
      form.reset();
      setIsDialogOpen(false);
    },
    onError: (error: Error) => {
      toast({
        title: "Failed to create charge",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (data: BishopCharge) => {
      const res = await apiRequest(
        "PUT",
        `/api/admin/bishops-charge/${editingCharge?.id}`,
        data
      );
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/bishops-charge"] });
      toast({
        title: "Bishop's Charge updated successfully!",
        description: "The charge has been updated.",
      });
      form.reset();
      setEditingCharge(null);
      setIsDialogOpen(false);
    },
    onError: (error: Error) => {
      toast({
        title: "Failed to update charge",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiRequest("DELETE", `/api/admin/bishops-charge/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/bishops-charge"] });
      toast({
        title: "Bishop's Charge deleted successfully!",
        description: "The charge has been removed.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Failed to delete charge",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (data: BishopCharge) => {
    if (editingCharge) {
      updateMutation.mutate(data);
    } else {
      createMutation.mutate(data);
    }
  };

  const handleEdit = (charge: BishopCharge) => {
    setEditingCharge(charge);
    form.reset(charge);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this Bishop's Charge?")) {
      deleteMutation.mutate(id);
    }
  };

  const openCreateDialog = () => {
    setEditingCharge(null);
    form.reset({
      title: "",
      content: "",
      isActive: true,
    });
    setIsDialogOpen(true);
  };

  const formatDate = (date: Date | string) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-slate-200 rounded w-1/4"></div>
          <div className="grid grid-cols-1 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-32 bg-slate-200 rounded-lg"></div>
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
          <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Bishop's Charge Management
          </h1>
          <p className="text-slate-600 mt-2">
            Manage the Bishop's pastoral messages and charges
          </p>
        </div>
        <div className="flex space-x-3">
          <Link href="/bishops-charge">
            <Button variant="outline" className="flex items-center space-x-2">
              <Eye className="w-4 h-4" />
              <span>View Public Page</span>
            </Button>
          </Link>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button
                onClick={openCreateDialog}
                className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white shadow-lg"
              >
                <Plus className="w-4 h-4 mr-2" />
                New Charge
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-xl font-semibold text-slate-700">
                  {editingCharge ? "Edit Bishop's Charge" : "Create New Bishop's Charge"}
                </DialogTitle>
              </DialogHeader>
              <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="space-y-6"
              >
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    {...form.register("title")}
                    placeholder="e.g., Pastoral Letter on Unity"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="content">Content (Markdown supported)</Label>
                  <Textarea
                    id="content"
                    {...form.register("content")}
                    className="mt-1 min-h-[400px] font-mono"
                    placeholder="Write your message in Markdown format..."
                  />
                  <p className="text-sm text-slate-500 mt-1">
                    You can use Markdown formatting: **bold**, *italic*, # headings, etc.
                  </p>
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
                    className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600"
                  >
                    {createMutation.isPending || updateMutation.isPending
                      ? "Saving..."
                      : editingCharge
                      ? "Update"
                      : "Publish"}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="space-y-4">
        {charges.map((charge) => (
          <Card
            key={charge.id}
            className={`border-0 shadow-lg bg-white/70 backdrop-blur-sm hover:shadow-xl transition-all duration-300 ${
              charge.isActive ? "ring-2 ring-indigo-200" : ""
            }`}
          >
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <CardTitle className="text-xl font-semibold text-slate-700">
                      {charge.title}
                    </CardTitle>
                    {charge.isActive && (
                      <Badge className="bg-green-100 text-green-800">
                        Active
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-slate-500 mb-3">
                    <span>Created: {formatDate(charge.createdAt)}</span>
                    <span>Updated: {formatDate(charge.updatedAt)}</span>
                  </div>
                  <div className="text-slate-600 line-clamp-3">
                    {charge.content.substring(0, 200)}...
                  </div>
                </div>
                <div className="flex space-x-1 ml-4">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleEdit(charge)}
                    className="h-8 w-8 p-0 hover:bg-indigo-50"
                  >
                    <Edit className="w-4 h-4 text-indigo-600" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleDelete(charge.id)}
                    className="h-8 w-8 p-0 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {charges.length === 0 && (
        <div className="text-center py-12">
          <FileText className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-slate-600 mb-2">
            No Bishop's Charges found
          </h3>
          <p className="text-slate-500 mb-4">
            Create your first pastoral message or charge.
          </p>
          <Button
            onClick={openCreateDialog}
            className="bg-gradient-to-r from-indigo-500 to-purple-500"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create First Charge
          </Button>
        </div>
      )}
    </div>
  );
}
