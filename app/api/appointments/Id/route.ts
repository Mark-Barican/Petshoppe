import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET ONE
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const appointment = await prisma.appointment.findUnique({
      where: { id: Number(params.id) },
    });

    if (!appointment) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json(appointment);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch appointment" }, { status: 500 });
  }
}

// UPDATE
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { service, groomer, date, notes, status } = await req.json();

    const updated = await prisma.appointment.update({
      where: { id: Number(params.id) },
      data: {
        service,
        groomer,
        date: date ? new Date(date) : undefined,
        notes,
        status,
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to update appointment" }, { status: 500 });
  }
}

// DELETE
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.appointment.delete({
      where: { id: Number(params.id) },
    });

    return NextResponse.json({ message: "Deleted successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to delete appointment" }, { status: 500 });
  }
}
