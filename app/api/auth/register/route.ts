// app/api/auth/register/route.ts
import { NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { storage } from "@/shared/storage" // Adjust path as needed
import { z } from "zod"

const registerSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Valid email is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { username, email, password } = registerSchema.parse(body)

    // Check if user already exists
    const existingUserByUsername = await storage.getUserByUsername(username)
    if (existingUserByUsername) {
      return NextResponse.json(
        { error: "Username is already taken" },
        { status: 400 }
      )
    }

    const existingUserByEmail = await storage.getUserByEmail(email)
    if (existingUserByEmail) {
      return NextResponse.json(
        { error: "Email is already registered" },
        { status: 400 }
      )
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12)

    // Create user
    const user = await storage.createUser({
      username,
      email,
      password: hashedPassword,
    })

    return NextResponse.json(
      { 
        message: "User created successfully", 
        user: { 
          id: user.id, 
          username: user.username, 
          email: user.email 
        } 
      },
      { status: 201 }
    )
  } catch (error: any) {
    console.error("Registration error:", error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}