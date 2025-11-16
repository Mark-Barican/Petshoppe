import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const appointments = await prisma.appointment.findMany({
      orderBy: { date: "asc" },
    });
    return NextResponse.json(appointments);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to load appointments" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { service, groomer, date, notes } = await req.json();

    if (!service || !groomer || !date) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const appointment = await prisma.appointment.create({
      data: {
        service,
        groomer,
        date: new Date(date),
        notes: notes ?? "",
      },
    });

    return NextResponse.json(appointment);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to create appointment" }, { status: 500 });
  }
}
