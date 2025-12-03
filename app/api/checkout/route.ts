import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    // Simulate payment processing
<<<<<<< HEAD
    const body = await request.json();
=======
>>>>>>> f4c0b518f790dd226d4a428698a44b109e98390f
    const {
      items,
      total,
      tax,
      finalTotal,
      firstName,
      lastName,
      email,
      phone,
      address,
      city,
      state,
      zipCode,
      country,
      paymentMethod,
<<<<<<< HEAD
    } = body;
=======
    } = await request.json();
>>>>>>> f4c0b518f790dd226d4a428698a44b109e98390f

    // In a real application, this would integrate with a payment processor like Stripe
    // For now, we'll simulate a successful payment

    // Validate that required fields are present
    if (!items || !Array.isArray(items) || items.length === 0) {
      return new Response(
        JSON.stringify({ error: "Cart items are required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    if (
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !address ||
      !city ||
      !state ||
<<<<<<< HEAD
      !zipCode
=======
      !zipCode ||
      !country ||
      !paymentMethod
>>>>>>> f4c0b518f790dd226d4a428698a44b109e98390f
    ) {
      return new Response(
        JSON.stringify({
          error: "All delivery information fields are required",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

<<<<<<< HEAD
=======
    const expectedFinalTotal = Number((total + tax).toFixed(2));
    if (Math.abs(expectedFinalTotal - finalTotal) > 0.01) {
      return new Response(
        JSON.stringify({ error: "Totals do not add up" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

>>>>>>> f4c0b518f790dd226d4a428698a44b109e98390f
    // Simulate payment processing (in real app, this would be handled by payment processor)
    // For now, just return success
    return new Response(
      JSON.stringify({
        success: true,
        message: "Payment processed successfully",
        paymentIntent: {
          id: `pi_${Math.random().toString(36).substr(2, 9)}`,
          status: "succeeded",
          amount: finalTotal,
        },
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Checkout error:", error);
    return new Response(
      JSON.stringify({ error: "Payment processing failed" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
