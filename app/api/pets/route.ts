import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import prisma from "@/lib/prisma";
<<<<<<< HEAD

const JWT_SECRET = process.env.JWT_SECRET!;
=======
import { getJwtSecret } from "@/lib/env";
>>>>>>> f4c0b518f790dd226d4a428698a44b109e98390f

export async function POST(req: NextRequest) {
  try {
    // Check for authentication
    const token = cookies().get("token")?.value;
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

<<<<<<< HEAD
    let decoded;
    try {
      decoded = jwt.verify(token, JWT_SECRET) as {
=======
    const jwtSecret = getJwtSecret();
    if (!jwtSecret) {
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    let decoded;
    try {
      decoded = jwt.verify(token, jwtSecret) as {
>>>>>>> f4c0b518f790dd226d4a428698a44b109e98390f
        id: number;
        email?: string;
        role?: string;
      };
<<<<<<< HEAD
    } catch (err) {
=======
    } catch {
>>>>>>> f4c0b518f790dd226d4a428698a44b109e98390f
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const { name, species, breed, sex, dob } = await req.json();

    // Validate required fields
    if (!name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    // Create the pet record
    const pet = await prisma.pet.create({
      data: {
        name,
        species: species || null,
        breed: breed || null,
        sex: sex || null,
        dob: dob ? new Date(dob) : null,
        ownerId: decoded.id,
      },
    });

    return NextResponse.json(
      { message: "Pet registered successfully", pet },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error registering pet:", error);
    return NextResponse.json(
      { error: "Failed to register pet" },
      { status: 500 }
    );
  }
}

<<<<<<< HEAD
export async function GET(req: NextRequest) {
=======
export async function GET() {
>>>>>>> f4c0b518f790dd226d4a428698a44b109e98390f
  try {
    // Check for authentication
    const token = cookies().get("token")?.value;
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

<<<<<<< HEAD
    let decoded;
    try {
      decoded = jwt.verify(token, JWT_SECRET) as {
=======
    const jwtSecret = getJwtSecret();
    if (!jwtSecret) {
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    let decoded;
    try {
      decoded = jwt.verify(token, jwtSecret) as {
>>>>>>> f4c0b518f790dd226d4a428698a44b109e98390f
        id: number;
        email?: string;
        role?: string;
      };
<<<<<<< HEAD
    } catch (err) {
=======
    } catch {
>>>>>>> f4c0b518f790dd226d4a428698a44b109e98390f
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const pets = await prisma.pet.findMany({
      where: {
        ownerId: decoded.id,
      },
    });

    return NextResponse.json(pets, { status: 200 });
  } catch (error) {
    console.error("Error fetching pets:", error);
    return NextResponse.json(
      { error: "Failed to fetch pets" },
      { status: 500 }
    );
  }
}
