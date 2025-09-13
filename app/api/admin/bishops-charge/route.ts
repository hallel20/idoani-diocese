import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const charges = await prisma.bishopCharge.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(charges);
  } catch (error) {
    console.error("Error fetching bishop's charges:", error);
    return NextResponse.json(
      { error: "Failed to fetch bishop's charges" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { title, content } = body;

    if (!title || !content) {
      return NextResponse.json(
        { error: "Title and content are required" },
        { status: 400 }
      );
    }

    // Deactivate all existing charges
    await prisma.bishopCharge.updateMany({
      where: { isActive: true },
      data: { isActive: false },
    });

    // Create new active charge
    const charge = await prisma.bishopCharge.create({
      data: {
        title,
        content,
        isActive: true,
      },
    });

    return NextResponse.json(charge, { status: 201 });
  } catch (error) {
    console.error("Error creating bishop's charge:", error);
    return NextResponse.json(
      { error: "Failed to create bishop's charge" },
      { status: 500 }
    );
  }
}
