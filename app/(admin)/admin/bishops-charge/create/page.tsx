"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import dynamic from "next/dynamic";
import { DocumentTemplates } from "@/components/editor/components/DocumentTemplates";
import { ArrowLeft, Save, Eye, FileText } from "lucide-react";
import Link from "next/link";

const  GoogleDocsEditor = dynamic(() => import("@/components/editor/GoogleDocsEditor"), { ssr: false });

const bishopChargeSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
});

type BishopChargeFormData = z.infer<typeof bishopChargeSchema>;

export default function CreateBishopChargePage() {
  const router = useRouter();
  const { toast } = useToast();
  const [content, setContent] = useState("");
  const [isPreview, setIsPreview] = useState(false);

  const form = useForm<BishopChargeFormData>({
    resolver: zodResolver(bishopChargeSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: BishopChargeFormData) => {
      return apiRequest("POST", "/api/admin/bishops-charge", data);
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Bishop's charge created successfully",
      });
      queryClient.invalidateQueries({ queryKey: ["bishops-charges"] });
      router.push("/admin/bishops-charge");
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to create bishop's charge",
        variant: "destructive",
      });
    },
  });

  const handleSave = async (editorContent: string) => {
    const title = form.getValues("title");
    if (!title) {
      toast({
        title: "Error",
        description: "Please enter a title before saving",
        variant: "destructive",
      });
      return;
    }

    form.setValue("content", editorContent);
    setContent(editorContent);
    
    // Auto-save functionality - you could implement this to save drafts
    console.log("Auto-saving content...", { title, content: editorContent });
  };

  const onSubmit = (data: BishopChargeFormData) => {
    const finalData = {
      ...data,
      content: content || data.content,
    };
    createMutation.mutate(finalData);
  };

  const handleContentChange = (newContent: string) => {
    setContent(newContent);
    form.setValue("content", newContent);
  };

  const handleTemplateSelect = (templateContent: string) => {
    setContent(templateContent);
    form.setValue("content", templateContent);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link href="/admin/bishops-charge">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Bishop's Charges
                </Button>
              </Link>
              <div className="h-6 w-px bg-gray-300" />
              <h1 className="text-xl font-semibold text-gray-900">
                Create New Bishop's Charge
              </h1>
            </div>
            
            <div className="flex items-center space-x-2">
              <DocumentTemplates onSelectTemplate={handleTemplateSelect}>
                <Button variant="outline" size="sm">
                  <FileText className="h-4 w-4 mr-2" />
                  Templates
                </Button>
              </DocumentTemplates>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsPreview(!isPreview)}
              >
                <Eye className="h-4 w-4 mr-2" />
                {isPreview ? "Edit" : "Preview"}
              </Button>
              <Button
                onClick={form.handleSubmit(onSubmit)}
                disabled={createMutation.isPending}
                className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800"
              >
                <Save className="h-4 w-4 mr-2" />
                {createMutation.isPending ? "Publishing..." : "Publish"}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!isPreview ? (
          <div className="space-y-6">
            {/* Title Input */}
            <Card>
              <CardHeader>
                <CardTitle>Document Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      {...form.register("title")}
                      placeholder="Enter the title of the Bishop's Charge"
                      className="text-lg font-medium"
                    />
                    {form.formState.errors.title && (
                      <p className="text-sm text-red-600 mt-1">
                        {form.formState.errors.title.message}
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Editor */}
            <div className="bg-white rounded-lg shadow-sm border">
              <GoogleDocsEditor
                initialContent=""
                onSave={handleSave}
                onContentChange={handleContentChange}
                placeholder="Begin writing the Bishop's Charge..."
                autoSave={true}
                className="min-h-screen"
              />
            </div>
          </div>
        ) : (
          /* Preview Mode */
          <div className="max-w-4xl mx-auto">
            <Card>
              <CardHeader className="text-center border-b">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold text-gray-900">
                    {form.getValues("title") || "Untitled Bishop's Charge"}
                  </h1>
                  <p className="text-gray-600">
                    Anglican Diocese of Idoani
                  </p>
                  <p className="text-sm text-gray-500">
                    {new Date().toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </CardHeader>
              <CardContent className="p-8">
                <div 
                  className="prose prose-lg max-w-none"
                  dangerouslySetInnerHTML={{ __html: content || "<p>No content yet. Switch to edit mode to start writing.</p>" }}
                />
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* Error handling */}
      {form.formState.errors.content && (
        <div className="fixed bottom-4 right-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md shadow-lg">
          {form.formState.errors.content.message}
        </div>
      )}
    </div>
  );
}
