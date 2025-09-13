import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const charge = await prisma.bishopCharge.findFirst({
      where: { isActive: true },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(charge);
  } catch (error) {
    console.error("Error fetching bishop's charge:", error);
    return NextResponse.json(
      { error: "Failed to fetch bishop's charge" },
      { status: 500 }
    );
  }
}
