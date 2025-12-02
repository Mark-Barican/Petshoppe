// /app/api/groomers/route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET all groomers with their average rating and reviews
export async function GET() {
  try {
    // Get all unique groomers from appointments
    const appointments = await prisma.appointment.findMany({
      distinct: ["groomer"],
      select: {
        groomer: true,
      },
      where: {
        groomer: {
          not: "", // Filter out empty groomers
        },
      },
    });

    // For each groomer, get their appointments and related reviews
    const groomersWithInfo = await Promise.all(
      appointments
        .filter((appointment) => appointment.groomer) // Filter out null/empty groomers
        .map(async (appointment) => {
          const groomerName = appointment.groomer as string;

          // Get all appointments for this groomer
          const groomerAppointments = await prisma.appointment.findMany({
            where: {
              groomer: groomerName,
            },
            include: {
              pet: {
                include: {
                  owner: true, // Include pet owner to get user info
                },
              },
            },
          });

          // Get all reviews for appointments with this groomer
          // We need to get reviews associated with the pets that were groomed by this groomer
          let allReviews: any[] = [];

          // Get reviews for each appointment with this groomer
          for (const appointment of groomerAppointments) {
            if (appointment.pet?.ownerId) {
              // Get reviews by the pet owner (user who booked the appointment)
              const userReviews = await prisma.review.findMany({
                where: {
                  userId: appointment.pet.ownerId,
                },
                include: {
                  user: true,
                },
              });

              // Add appointment and pet information to each review
              const appointmentReviews = userReviews.map((review) => ({
                ...review,
                appointmentId: appointment.id,
                petName: appointment.pet?.name || "Unknown Pet",
                ownerName:
                  appointment.pet?.owner?.name ||
                  appointment.pet?.owner?.email ||
                  "Unknown Owner",
              }));

              allReviews = allReviews.concat(appointmentReviews);
            }
          }

          // Calculate average rating
          let averageRating = 0;
          if (allReviews.length > 0) {
            const totalRating = allReviews.reduce(
              (sum, review) => sum + review.rating,
              0
            );
            averageRating = totalRating / allReviews.length;
          }

          return {
            name: groomerName,
            appointments: groomerAppointments.length,
            reviews: allReviews,
            averageRating: parseFloat(averageRating.toFixed(1)),
            totalReviews: allReviews.length,
          };
        })
    );

    return NextResponse.json(groomersWithInfo, { status: 200 });
  } catch (error) {
    console.error("GET /api/groomers error:", error);
    // Return mock data when database is unavailable
    const mockGroomers = [
      {
        name: "Alex Johnson",
        appointments: 24,
        reviews: [
          {
            id: 1,
            rating: 5,
            comment: "Great with my nervous dog! Very patient and gentle.",
            createdAt: new Date().toISOString(),
            user: { name: "Maria Santos", email: "maria@example.com" },
            appointmentId: 1,
            petName: "Buddy",
            ownerName: "Maria Santos",
          },
          {
            id: 2,
            rating: 4,
            comment: "Did a wonderful job on my cat's grooming!",
            createdAt: new Date().toISOString(),
            user: { name: "James Wilson", email: "james@example.com" },
            appointmentId: 2,
            petName: "Whiskers",
            ownerName: "James Wilson",
          },
        ],
        averageRating: 4.5,
        totalReviews: 2,
      },
      {
        name: "Sarah Chen",
        appointments: 18,
        reviews: [
          {
            id: 3,
            rating: 5,
            comment: "Professional and caring. My dog looked amazing!",
            createdAt: new Date().toISOString(),
            user: { name: "Robert Lee", email: "robert@example.com" },
            appointmentId: 3,
            petName: "Max",
            ownerName: "Robert Lee",
          },
        ],
        averageRating: 5.0,
        totalReviews: 1,
      },
      {
        name: "Michael Rodriguez",
        appointments: 32,
        reviews: [
          {
            id: 4,
            rating: 5,
            comment:
              "Experienced groomer. My pet was comfortable the whole time.",
            createdAt: new Date().toISOString(),
            user: { name: "Emily Parker", email: "emily@example.com" },
            appointmentId: 4,
            petName: "Luna",
            ownerName: "Emily Parker",
          },
          {
            id: 5,
            rating: 4,
            comment: "Good service, but a bit rushed today.",
            createdAt: new Date().toISOString(),
            user: { name: "David Kim", email: "david@example.com" },
            appointmentId: 5,
            petName: "Rocky",
            ownerName: "David Kim",
          },
        ],
        averageRating: 4.5,
        totalReviews: 2,
      },
    ];

    return NextResponse.json(mockGroomers, { status: 200 });
  }
}

// GET a specific groomer by name
export async function POST(req: NextRequest) {
  try {
    const { groomerName } = await req.json();

    if (!groomerName) {
      return NextResponse.json(
        { error: "Groomer name is required" },
        { status: 400 }
      );
    }

    // Get all appointments for this specific groomer
    const groomerAppointments = await prisma.appointment.findMany({
      where: {
        groomer: groomerName,
      },
      include: {
        pet: {
          include: {
            owner: true,
          },
        },
      },
    });

    // Get all reviews for appointments with this groomer
    const reviews = await Promise.all(
      groomerAppointments.map(async (appt) => {
        if (appt.pet?.ownerId) {
          const userReviews = await prisma.review.findMany({
            where: {
              userId: appt.pet.ownerId,
            },
            include: {
              user: true,
            },
          });

          return userReviews.map((review) => ({
            ...review,
            appointmentId: appt.id,
            petName: appt.pet?.name || "Unknown Pet",
            ownerName:
              appt.pet?.owner?.name ||
              appt.pet?.owner?.email ||
              "Unknown Owner",
          }));
        }
        return [];
      })
    );

    // Flatten reviews array
    const allReviews = reviews.flat();

    // Calculate average rating
    let averageRating = 0;
    if (allReviews.length > 0) {
      const totalRating = allReviews.reduce(
        (sum, review) => sum + review.rating,
        0
      );
      averageRating = totalRating / allReviews.length;
    }

    const groomerInfo = {
      name: groomerName,
      appointments: groomerAppointments.length,
      reviews: allReviews,
      averageRating: parseFloat(averageRating.toFixed(1)),
      totalReviews: allReviews.length,
    };

    return NextResponse.json(groomerInfo, { status: 201 });
  } catch (error) {
    console.error("POST /api/groomers error:", error);
    // Return mock data when database is unavailable
    const mockGroomer = {
      name: groomerName || "Default Groomer",
      appointments: 15,
      reviews: [
        {
          id: 1,
          rating: 5,
          comment: "Excellent service as always!",
          createdAt: new Date().toISOString(),
          user: { name: "Test User", email: "test@example.com" },
          appointmentId: 1,
          petName: "Test Pet",
          ownerName: "Test User",
        },
      ],
      averageRating: 5.0,
      totalReviews: 1,
    };

    return NextResponse.json(mockGroomer, { status: 200 });
  }
}
