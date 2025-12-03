export const dynamic = "force-dynamic";
export const revalidate = 0;
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt, { TokenExpiredError, JsonWebTokenError } from "jsonwebtoken";
import prisma from "@/lib/prisma";
<<<<<<< HEAD
<<<<<<< HEAD

const JWT_SECRET = process.env.JWT_SECRET!;
if (!JWT_SECRET) {
  throw new Error("Missing JWT_SECRET in environment variables");
}
=======
=======
>>>>>>> d7e1328f736a776113c8a92ee9221726aeb22ee3
import { getJwtSecret } from "@/lib/env";

type AppointmentUpdateData = {
  status?: "SCHEDULED" | "COMPLETED" | "CANCELLED" | "NO_SHOW";
  service?: string;
  groomer?: string;
  date?: Date;
  notes?: string | null;
};
<<<<<<< HEAD
>>>>>>> f4c0b518f790dd226d4a428698a44b109e98390f
=======
>>>>>>> d7e1328f736a776113c8a92ee9221726aeb22ee3

// GET route to fetch a single appointment
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const token = cookies().get("token")?.value;
    if (!token) {
      return NextResponse.json({ message: "No token found" }, { status: 401 });
    }

<<<<<<< HEAD
<<<<<<< HEAD
    const decoded = jwt.verify(token, JWT_SECRET) as {
=======
=======
>>>>>>> d7e1328f736a776113c8a92ee9221726aeb22ee3
    const jwtSecret = getJwtSecret();
    if (!jwtSecret) {
      return NextResponse.json(
        { message: "Server configuration error" },
        { status: 500 }
      );
    }

    const decoded = jwt.verify(token, jwtSecret) as {
<<<<<<< HEAD
>>>>>>> f4c0b518f790dd226d4a428698a44b109e98390f
=======
>>>>>>> d7e1328f736a776113c8a92ee9221726aeb22ee3
      id: number;
      email?: string;
      role?: string;
    };

    const appointmentId = parseInt(params.id);
    if (isNaN(appointmentId)) {
      return NextResponse.json(
        { message: "Invalid appointment ID" },
        { status: 400 }
      );
    }

    // Admins can see all appointments, regular users can only see their own appointments through pets
    const appointment = await prisma.appointment.findUnique({
      where: { id: appointmentId },
      include: {
        pet: {
          select: {
            id: true,
            name: true,
            species: true,
            breed: true,
<<<<<<< HEAD
<<<<<<< HEAD
=======
=======
>>>>>>> d7e1328f736a776113c8a92ee9221726aeb22ee3
            owner: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
        user: {
          select: {
            id: true,
            name: true,
            email: true,
<<<<<<< HEAD
>>>>>>> f4c0b518f790dd226d4a428698a44b109e98390f
=======
>>>>>>> d7e1328f736a776113c8a92ee9221726aeb22ee3
          },
        },
      },
    });

    if (!appointment) {
      return NextResponse.json(
        { message: "Appointment not found" },
        { status: 404 }
      );
    }

<<<<<<< HEAD
<<<<<<< HEAD
    // If user is not admin, check if they can access this appointment
    if (decoded.role !== "ADMIN") {
      // Regular users can only access appointments for their pets
      if (appointment.petId) {
        const pet = await prisma.pet.findUnique({
          where: { id: appointment.petId },
        });

        if (!pet || pet.ownerId !== decoded.id) {
          return NextResponse.json(
            { message: "Unauthorized: Access denied" },
            { status: 403 }
          );
        }
      } else {
        // If appointment has no pet, it might be a general appointment
        // For now, we'll restrict access to admin only for appointments without pets
        return NextResponse.json(
          { message: "Unauthorized: Access denied" },
          { status: 403 }
        );
      }
=======
=======
>>>>>>> d7e1328f736a776113c8a92ee9221726aeb22ee3
    // If user is not admin, ensure they own the appointment directly or via pet ownership
    if (
      decoded.role !== "ADMIN" &&
      appointment.userId !== decoded.id &&
      (!appointment.pet || appointment.pet.owner?.id !== decoded.id)
    ) {
      return NextResponse.json(
        { message: "Unauthorized: Access denied" },
        { status: 403 }
      );
<<<<<<< HEAD
>>>>>>> f4c0b518f790dd226d4a428698a44b109e98390f
=======
>>>>>>> d7e1328f736a776113c8a92ee9221726aeb22ee3
    }

    return NextResponse.json({ appointment }, { status: 200 });
  } catch (err) {
    console.error("GET APPOINTMENT ERROR:", err);

    if (err instanceof TokenExpiredError) {
      return NextResponse.json({ message: "Token expired" }, { status: 401 });
    }
    if (err instanceof JsonWebTokenError) {
      return NextResponse.json({ message: "Invalid token" }, { status: 401 });
    }
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

// PUT route to update appointment status
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const token = cookies().get("token")?.value;
    if (!token) {
      return NextResponse.json({ message: "No token found" }, { status: 401 });
    }

<<<<<<< HEAD
<<<<<<< HEAD
    const decoded = jwt.verify(token, JWT_SECRET) as {
=======
=======
>>>>>>> d7e1328f736a776113c8a92ee9221726aeb22ee3
    const jwtSecret = getJwtSecret();
    if (!jwtSecret) {
      return NextResponse.json(
        { message: "Server configuration error" },
        { status: 500 }
      );
    }

    const decoded = jwt.verify(token, jwtSecret) as {
<<<<<<< HEAD
>>>>>>> f4c0b518f790dd226d4a428698a44b109e98390f
=======
>>>>>>> d7e1328f736a776113c8a92ee9221726aeb22ee3
      id: number;
      email?: string;
      role?: string;
    };

    // Check if user is admin
    if (decoded.role !== "ADMIN") {
      return NextResponse.json(
        { message: "Unauthorized: Admin access required" },
        { status: 403 }
      );
    }

    const { status, service, groomer, date, notes } = await request.json();

    // Validate status if it's provided
    if (
      status &&
      !["SCHEDULED", "COMPLETED", "CANCELLED", "NO_SHOW"].includes(status)
    ) {
      return NextResponse.json({ message: "Invalid status" }, { status: 400 });
    }

    const appointmentId = parseInt(params.id);
    if (isNaN(appointmentId)) {
      return NextResponse.json(
        { message: "Invalid appointment ID" },
        { status: 400 }
      );
    }

    // Build update data based on provided fields
<<<<<<< HEAD
<<<<<<< HEAD
    const updateData: any = {};
=======
    const updateData: AppointmentUpdateData = {};
>>>>>>> f4c0b518f790dd226d4a428698a44b109e98390f
=======
    const updateData: AppointmentUpdateData = {};
>>>>>>> d7e1328f736a776113c8a92ee9221726aeb22ee3
    if (status !== undefined) updateData.status = status;
    if (service !== undefined) updateData.service = service;
    if (groomer !== undefined) updateData.groomer = groomer;
    if (date !== undefined) updateData.date = new Date(date);
    if (notes !== undefined) updateData.notes = notes;

    const updatedAppointment = await prisma.appointment.update({
      where: { id: appointmentId },
      data: updateData,
      include: {
        pet: {
          select: {
            id: true,
            name: true,
            species: true,
            breed: true,
<<<<<<< HEAD
<<<<<<< HEAD
=======
=======
>>>>>>> d7e1328f736a776113c8a92ee9221726aeb22ee3
            owner: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
        user: {
          select: {
            id: true,
            name: true,
            email: true,
<<<<<<< HEAD
>>>>>>> f4c0b518f790dd226d4a428698a44b109e98390f
=======
>>>>>>> d7e1328f736a776113c8a92ee9221726aeb22ee3
          },
        },
      },
    });

    return NextResponse.json(
      { appointment: updatedAppointment },
      { status: 200 }
    );
  } catch (err) {
    console.error("UPDATE APPOINTMENT ERROR:", err);

    if (err instanceof TokenExpiredError) {
      return NextResponse.json({ message: "Token expired" }, { status: 401 });
    }
    if (err instanceof JsonWebTokenError) {
      return NextResponse.json({ message: "Invalid token" }, { status: 401 });
    }
    if ((err as Error).message.includes("RecordNotFound")) {
      return NextResponse.json(
        { message: "Appointment not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

// DELETE route to delete an appointment
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const token = cookies().get("token")?.value;
    if (!token) {
      return NextResponse.json({ message: "No token found" }, { status: 401 });
    }

<<<<<<< HEAD
<<<<<<< HEAD
    const decoded = jwt.verify(token, JWT_SECRET) as {
=======
=======
>>>>>>> d7e1328f736a776113c8a92ee9221726aeb22ee3
    const jwtSecret = getJwtSecret();
    if (!jwtSecret) {
      return NextResponse.json(
        { message: "Server configuration error" },
        { status: 500 }
      );
    }

    const decoded = jwt.verify(token, jwtSecret) as {
<<<<<<< HEAD
>>>>>>> f4c0b518f790dd226d4a428698a44b109e98390f
=======
>>>>>>> d7e1328f736a776113c8a92ee9221726aeb22ee3
      id: number;
      email?: string;
      role?: string;
    };

    // Check if user is admin
    if (decoded.role !== "ADMIN") {
      return NextResponse.json(
        { message: "Unauthorized: Admin access required" },
        { status: 403 }
      );
    }

    const appointmentId = parseInt(params.id);
    if (isNaN(appointmentId)) {
      return NextResponse.json(
        { message: "Invalid appointment ID" },
        { status: 400 }
      );
    }

    await prisma.appointment.delete({
      where: { id: appointmentId },
    });

    return NextResponse.json(
      { message: "Appointment deleted successfully" },
      { status: 200 }
    );
  } catch (err) {
    console.error("DELETE APPOINTMENT ERROR:", err);

    if (err instanceof TokenExpiredError) {
      return NextResponse.json({ message: "Token expired" }, { status: 401 });
    }
    if (err instanceof JsonWebTokenError) {
      return NextResponse.json({ message: "Invalid token" }, { status: 401 });
    }
    if ((err as Error).message.includes("RecordNotFound")) {
      return NextResponse.json(
        { message: "Appointment not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
