import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import prisma from "@/lib/prisma";
<<<<<<< HEAD
<<<<<<< HEAD

const JWT_SECRET = process.env.JWT_SECRET!;
=======
import { getJwtSecret } from "@/lib/env";
>>>>>>> f4c0b518f790dd226d4a428698a44b109e98390f
=======
import { getJwtSecret } from "@/lib/env";
>>>>>>> d7e1328f736a776113c8a92ee9221726aeb22ee3

export async function POST(req: NextRequest) {
  try {
    // Check for authentication
    const token = cookies().get("token")?.value;
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

<<<<<<< HEAD
<<<<<<< HEAD
    let decoded;
    try {
      decoded = jwt.verify(token, JWT_SECRET) as {
=======
=======
>>>>>>> d7e1328f736a776113c8a92ee9221726aeb22ee3
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
<<<<<<< HEAD
>>>>>>> f4c0b518f790dd226d4a428698a44b109e98390f
=======
>>>>>>> d7e1328f736a776113c8a92ee9221726aeb22ee3
        id: number;
        email?: string;
        role?: string;
      };
<<<<<<< HEAD
<<<<<<< HEAD
    } catch (err) {
=======
    } catch {
>>>>>>> f4c0b518f790dd226d4a428698a44b109e98390f
=======
    } catch {
>>>>>>> d7e1328f736a776113c8a92ee9221726aeb22ee3
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
<<<<<<< HEAD
export async function GET(req: NextRequest) {
=======
export async function GET() {
>>>>>>> f4c0b518f790dd226d4a428698a44b109e98390f
=======
export async function GET() {
>>>>>>> d7e1328f736a776113c8a92ee9221726aeb22ee3
  try {
    // Check for authentication
    const token = cookies().get("token")?.value;
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

<<<<<<< HEAD
<<<<<<< HEAD
    let decoded;
    try {
      decoded = jwt.verify(token, JWT_SECRET) as {
=======
=======
>>>>>>> d7e1328f736a776113c8a92ee9221726aeb22ee3
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
<<<<<<< HEAD
>>>>>>> f4c0b518f790dd226d4a428698a44b109e98390f
=======
>>>>>>> d7e1328f736a776113c8a92ee9221726aeb22ee3
        id: number;
        email?: string;
        role?: string;
      };
<<<<<<< HEAD
<<<<<<< HEAD
    } catch (err) {
=======
    } catch {
>>>>>>> f4c0b518f790dd226d4a428698a44b109e98390f
=======
    } catch {
>>>>>>> d7e1328f736a776113c8a92ee9221726aeb22ee3
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
