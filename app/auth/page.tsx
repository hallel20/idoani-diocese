// app/admin/login/page.tsx
"use client"

import { useState, useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Image from "next/image";

const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

const registerSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Valid email is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;
type RegisterFormData = z.infer<typeof registerSchema>;

export default function AuthPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loginError, setLoginError] = useState("");
  const [registerError, setRegisterError] = useState("");
  const [registerSuccess, setRegisterSuccess] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    if (status === "authenticated") {
      router.push("/admin");
    }
  }, [status, router]);

  const loginForm = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const registerForm = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onLogin = async (data: LoginFormData) => {
    setLoginError("");
    
    try {
      const result = await signIn("credentials", {
        username: data.username,
        password: data.password,
        redirect: false,
      });

      if (result?.error) {
        setLoginError("Invalid username or password");
      } else {
        router.push("/admin");
        router.refresh();
      }
    } catch (error) {
      setLoginError("An error occurred during login");
    }
  };

  const onRegister = async (data: RegisterFormData) => {
    setRegisterError("");
    setRegisterSuccess(false);
    
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Registration failed");
      }

      setRegisterSuccess(true);
      registerForm.reset();
      
      // Auto sign in after successful registration
      setTimeout(async () => {
        const signInResult = await signIn("credentials", {
          username: data.username,
          password: data.password,
          redirect: false,
        });

        if (!signInResult?.error) {
          router.push("/admin");
          router.refresh();
        }
      }, 1000);

    } catch (error: any) {
      setRegisterError(error.message);
    }
  };

  // Show loading state while checking authentication
  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-anglican-purple-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Don't render if already authenticated (will redirect)
  if (session) {
    return null;
  }

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left side - Auth Forms */}
      <div className="flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <Image src="/idoani-logo.png" alt="Idoani Diocese Logo" width={50} height={50} />
              <span className="font-serif font-bold text-2xl text-anglican-purple-700">Idoani Diocese</span>
            </div>
            <h1 className="text-2xl font-semibold mb-2">Admin Access</h1>
            <p className="text-gray-600">Sign in to manage diocesan content</p>
          </div>

          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <Card>
                <CardHeader>
                  <CardTitle>Login</CardTitle>
                  <CardDescription>Enter your credentials to access the admin dashboard</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={loginForm.handleSubmit(onLogin)} className="space-y-4">
                    <div>
                      <Label htmlFor="loginUsername">Username</Label>
                      <Input
                        id="loginUsername"
                        {...loginForm.register("username")}
                        data-testid="input-login-username"
                      />
                      {loginForm.formState.errors.username && (
                        <p className="text-sm text-red-600 mt-1">{loginForm.formState.errors.username.message}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="loginPassword">Password</Label>
                      <Input
                        id="loginPassword"
                        type="password"
                        {...loginForm.register("password")}
                        data-testid="input-login-password"
                      />
                      {loginForm.formState.errors.password && (
                        <p className="text-sm text-red-600 mt-1">{loginForm.formState.errors.password.message}</p>
                      )}
                    </div>
                    
                    {loginError && (
                      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
                        {loginError}
                      </div>
                    )}
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-anglican-purple-500 hover:bg-anglican-purple-600"
                      disabled={loginForm.formState.isSubmitting}
                      data-testid="button-login"
                    >
                      {loginForm.formState.isSubmitting ? "Signing in..." : "Sign In"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="register">
              <Card>
                <CardHeader>
                  <CardTitle>Register</CardTitle>
                  <CardDescription>Create a new admin account</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={registerForm.handleSubmit(onRegister)} className="space-y-4">
                    <div>
                      <Label htmlFor="registerUsername">Username</Label>
                      <Input
                        id="registerUsername"
                        {...registerForm.register("username")}
                        data-testid="input-register-username"
                      />
                      {registerForm.formState.errors.username && (
                        <p className="text-sm text-red-600 mt-1">{registerForm.formState.errors.username.message}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="registerEmail">Email</Label>
                      <Input
                        id="registerEmail"
                        type="email"
                        {...registerForm.register("email")}
                        data-testid="input-register-email"
                      />
                      {registerForm.formState.errors.email && (
                        <p className="text-sm text-red-600 mt-1">{registerForm.formState.errors.email.message}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="registerPassword">Password</Label>
                      <Input
                        id="registerPassword"
                        type="password"
                        {...registerForm.register("password")}
                        data-testid="input-register-password"
                      />
                      {registerForm.formState.errors.password && (
                        <p className="text-sm text-red-600 mt-1">{registerForm.formState.errors.password.message}</p>
                      )}
                    </div>
                    
                    {registerError && (
                      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
                        {registerError}
                      </div>
                    )}
                    
                    {registerSuccess && (
                      <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md">
                        Account created successfully! Signing you in...
                      </div>
                    )}
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-anglican-purple-500 hover:bg-anglican-purple-600"
                      disabled={registerForm.formState.isSubmitting}
                      data-testid="button-register"
                    >
                      {registerForm.formState.isSubmitting ? "Creating account..." : "Create Account"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Right side - Hero */}
      <div className="relative bg-gradient-to-br from-anglican-purple-600 to-anglican-purple-800 text-white flex items-center justify-center">
        <div className="absolute inset-0 bg-black bg-opacity-40" />
        <div className="relative text-center p-8">
          <h2 className="font-serif text-4xl font-bold mb-6">
            Welcome to <span className="text-anglican-gold">Idoani Anglican Diocese</span>
          </h2>
          <p className="text-xl mb-8 text-gray-100 leading-relaxed max-w-2xl">
            A comprehensive platform for managing our diocesan community, connecting parishes, and serving our faithful.
          </p>
          <div className="grid md:grid-cols-2 gap-8 text-left">
            <div>
              <h3 className="font-semibold mb-3">Content Management</h3>
              <ul className="space-y-2 text-sm text-gray-200">
                <li>• Manage priests and parishes</li>
                <li>• Organize archdeaconries</li>
                <li>• Schedule events</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Community Connection</h3>
              <ul className="space-y-2 text-sm text-gray-200">
                <li>• Directory services</li>
                <li>• Contact management</li>
                <li>• Public engagement</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}