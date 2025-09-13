import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";

const prisma = new PrismaClient();

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { title, content, isActive } = body;

    if (!title || !content) {
      return NextResponse.json(
        { error: "Title and content are required" },
        { status: 400 }
      );
    }

    // If setting this charge as active, deactivate all others
    if (isActive) {
      await prisma.bishopCharge.updateMany({
        where: { 
          isActive: true,
          id: { not: params.id }
        },
        data: { isActive: false },
      });
    }

    const charge = await prisma.bishopCharge.update({
      where: { id: params.id },
      data: {
        title,
        content,
        isActive: isActive ?? true,
      },
    });

    return NextResponse.json(charge);
  } catch (error) {
    console.error("Error updating bishop's charge:", error);
    return NextResponse.json(
      { error: "Failed to update bishop's charge" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await prisma.bishopCharge.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting bishop's charge:", error);
    return NextResponse.json(
      { error: "Failed to delete bishop's charge" },
      { status: 500 }
    );
  }
}
