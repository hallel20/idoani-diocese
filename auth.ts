import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import { storage } from "./shared/storage"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          return null
        }

        try {
          // Get admin user from your storage
          const user = await storage.getUserByUsername(credentials.username as string)
          
          if (!user) {
            return null
          }

          // Verify password
          const isValidPassword = await bcrypt.compare(
            credentials.password as string,
            user.password
          )

          if (!isValidPassword) {
            return null
          }

          // Return user object for session
          return {
            id: user.id,
            name: user.username,
            email: user.email || "",
          }
        } catch (error) {
          console.error("Authentication error:", error)
          return null
        }
      }
    }),
  ],

  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24 hours
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },

    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string
      }
      return session
    },
  },

  pages: {
    signIn: "/admin/login",
  },

  debug: process.env.NODE_ENV === "development",
})

// Helper function to create the initial admin user (run this once)
export async function createAdminUser(username: string, password: string, email?: string) {
  try {
    // Check if admin already exists
    const existingUser = await storage.getUserByUsername(username)
    if (existingUser) {
      throw new Error("Admin user already exists")
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12)

    // Create admin user
    const user = await storage.createUser({
      username,
      password: hashedPassword,
      email: email || `${username}@admin.local`,
      // Add other required fields based on your User model
    })

    return user
  } catch (error) {
    console.error("Admin creation error:", error)
    throw error
  }
}

// Helper function to get current admin user
export async function getCurrentUser() {
  const session = await auth()
  return session?.user
}

// Helper to protect admin routes
export async function requireAuth() {
  const user = await getCurrentUser()
  if (!user) {
    throw new Error("Unauthorized - Admin access required")
  }
  return user
}