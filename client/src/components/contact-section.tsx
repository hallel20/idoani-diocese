import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { insertContactSchema, type InsertContact } from "@shared/schema";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function ContactSection() {
  const { toast } = useToast();
  const form = useForm<InsertContact>({
    resolver: zodResolver(insertContactSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
  });

  const contactMutation = useMutation({
    mutationFn: async (data: InsertContact) => {
      const res = await apiRequest("POST", "/api/contacts", data);
      return res.json();
    },
    onSuccess: () => {
      toast({
        title: "Message sent successfully!",
        description: "We'll get back to you as soon as possible.",
      });
      form.reset();
    },
    onError: (error: Error) => {
      toast({
        title: "Failed to send message",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertContact) => {
    contactMutation.mutate(data);
  };

  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl lg:text-4xl font-bold text-anglican-purple-700 mb-4">
            Contact Us
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h3 className="font-serif text-2xl font-semibold text-anglican-purple-700 mb-6">
              Send us a Message
            </h3>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    {...form.register("firstName")}
                    data-testid="input-first-name"
                  />
                  {form.formState.errors.firstName && (
                    <p className="text-sm text-red-600 mt-1">
                      {form.formState.errors.firstName.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    {...form.register("lastName")}
                    data-testid="input-last-name"
                  />
                  {form.formState.errors.lastName && (
                    <p className="text-sm text-red-600 mt-1">
                      {form.formState.errors.lastName.message}
                    </p>
                  )}
                </div>
              </div>
              
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  {...form.register("email")}
                  data-testid="input-email"
                />
                {form.formState.errors.email && (
                  <p className="text-sm text-red-600 mt-1">
                    {form.formState.errors.email.message}
                  </p>
                )}
              </div>
              
              <div>
                <Label htmlFor="phone">Phone Number (Optional)</Label>
                <Input
                  id="phone"
                  type="tel"
                  {...form.register("phone")}
                  data-testid="input-phone"
                />
                {form.formState.errors.phone && (
                  <p className="text-sm text-red-600 mt-1">
                    {form.formState.errors.phone.message}
                  </p>
                )}
              </div>
              
              <div>
                <Label htmlFor="subject">Subject</Label>
                <Select 
                  onValueChange={(value) => form.setValue("subject", value)}
                  value={form.watch("subject")}
                >
                  <SelectTrigger data-testid="select-subject">
                    <SelectValue placeholder="Please select a subject" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">General Inquiry</SelectItem>
                    <SelectItem value="parish">Parish Information</SelectItem>
                    <SelectItem value="events">Events & Programs</SelectItem>
                    <SelectItem value="pastoral">Pastoral Care</SelectItem>
                    <SelectItem value="volunteer">Volunteer Opportunities</SelectItem>
                  </SelectContent>
                </Select>
                {form.formState.errors.subject && (
                  <p className="text-sm text-red-600 mt-1">
                    {form.formState.errors.subject.message}
                  </p>
                )}
              </div>
              
              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  rows={4}
                  {...form.register("message")}
                  className="resize-none"
                  data-testid="textarea-message"
                />
                {form.formState.errors.message && (
                  <p className="text-sm text-red-600 mt-1">
                    {form.formState.errors.message.message}
                  </p>
                )}
              </div>
              
              <Button
                type="submit"
                className="w-full bg-anglican-purple-500 hover:bg-anglican-purple-600"
                disabled={contactMutation.isPending}
                data-testid="button-submit-contact"
              >
                {contactMutation.isPending ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <Card className="shadow-xl">
              <CardHeader>
                <CardTitle className="font-serif text-2xl text-anglican-purple-700">
                  Diocese Office
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start">
                  <MapPin className="text-anglican-purple-500 mt-1 mr-4 w-5 h-5" />
                  <div>
                    <p className="text-gray-700 font-medium">Address</p>
                    <p className="text-gray-600">
                      123 Cathedral Square<br />
                      City Center, State 12345
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Phone className="text-anglican-purple-500 mt-1 mr-4 w-5 h-5" />
                  <div>
                    <p className="text-gray-700 font-medium">Phone</p>
                    <p className="text-gray-600">(555) 000-1234</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Mail className="text-anglican-purple-500 mt-1 mr-4 w-5 h-5" />
                  <div>
                    <p className="text-gray-700 font-medium">Email</p>
                    <p className="text-gray-600">info@anglicandioceseexample.org</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Clock className="text-anglican-purple-500 mt-1 mr-4 w-5 h-5" />
                  <div>
                    <p className="text-gray-700 font-medium">Office Hours</p>
                    <p className="text-gray-600">
                      Monday - Friday: 9:00 AM - 5:00 PM<br />
                      Saturday: 10:00 AM - 2:00 PM
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Emergency Contact */}
            <div className="bg-anglican-purple-50 border-l-4 border-anglican-purple-500 rounded-r-2xl p-6">
              <h4 className="font-semibold text-anglican-purple-700 mb-2">
                Emergency Pastoral Care
              </h4>
              <p className="text-anglican-purple-600 mb-3">
                For urgent pastoral needs outside office hours:
              </p>
              <p className="text-anglican-purple-700 font-semibold">
                (555) 000-HELP (4357)
              </p>
            </div>

            {/* Social Media Links */}
            <Card className="shadow-xl">
              <CardHeader>
                <CardTitle className="font-serif text-xl text-anglican-purple-700">
                  Connect With Us
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <a
                    href="#"
                    className="flex items-center justify-center p-3 border border-gray-200 rounded-lg hover:bg-anglican-purple-50 hover:border-anglican-purple-200 transition-colors"
                    data-testid="link-contact-facebook"
                  >
                    <svg className="w-5 h-5 text-anglican-purple-500 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                    <span className="text-gray-700">Facebook</span>
                  </a>
                  <a
                    href="#"
                    className="flex items-center justify-center p-3 border border-gray-200 rounded-lg hover:bg-anglican-purple-50 hover:border-anglican-purple-200 transition-colors"
                    data-testid="link-contact-instagram"
                  >
                    <svg className="w-5 h-5 text-anglican-purple-500 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987c6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.348-1.051-2.348-2.348c0-1.297 1.051-2.348 2.348-2.348c1.297 0 2.348 1.051 2.348 2.348c0 1.297-1.051 2.348-2.348 2.348zm7.718 0c-1.297 0-2.348-1.051-2.348-2.348c0-1.297 1.051-2.348 2.348-2.348c1.297 0 2.348 1.051 2.348 2.348c0 1.297-1.051 2.348-2.348 2.348z"/>
                    </svg>
                    <span className="text-gray-700">Instagram</span>
                  </a>
                  <a
                    href="#"
                    className="flex items-center justify-center p-3 border border-gray-200 rounded-lg hover:bg-anglican-purple-50 hover:border-anglican-purple-200 transition-colors"
                    data-testid="link-contact-youtube"
                  >
                    <svg className="w-5 h-5 text-anglican-purple-500 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                    <span className="text-gray-700">YouTube</span>
                  </a>
                  <a
                    href="#"
                    className="flex items-center justify-center p-3 border border-gray-200 rounded-lg hover:bg-anglican-purple-50 hover:border-anglican-purple-200 transition-colors"
                    data-testid="link-contact-newsletter"
                  >
                    <svg className="w-5 h-5 text-anglican-purple-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-gray-700">Newsletter</span>
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
