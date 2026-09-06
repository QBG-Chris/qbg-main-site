import Stripe from "stripe";
import { NextResponse } from "next/server";
import createServerClient from "@/app/supabase/server";

const getStripe = () => {
  if (!process.env.STRIPE_SECRET_KEY) throw new Error("Stripe is not configured.");
  return new Stripe(process.env.STRIPE_SECRET_KEY);
};

export async function POST(req: Request) {
  try {
    const authClient = await createServerClient();
    const { data: { user }, error: authError } = await authClient.auth.getUser();
    if (authError || !user) return NextResponse.json({ error: "Please sign in to subscribe." }, { status: 401 });
    const { lookupKey } = await req.json();

    if (!lookupKey) {
      return NextResponse.json(
        { error: "Missing lookupKey" },
        { status: 400 }
      );
    }

    const stripe = getStripe();
    const prices = await stripe.prices.list({
      lookup_keys: [lookupKey],
      expand: ["data.product"],
    });

    const price = prices.data[0];

    if (!price) {
      return NextResponse.json(
        { error: "No Stripe price found for that lookup key" },
        { status: 404 }
      );
    }

    const origin = process.env.NEXT_PUBLIC_SITE_URL ?? new URL(req.url).origin;
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      client_reference_id: user.id,
      line_items: [
        {
          price: price.id,
          quantity: 1,
        },
      ],
      success_url: `${origin}/blend-iq/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/blend-iq/go-pro`,
      billing_address_collection: "required",
      phone_number_collection: { enabled: true },
      custom_text: {
        submit: {
          message: "You’ll get immediate access after checkout.",
        },
      },

      branding_settings: {
        background_color: "#fff4f6",
        button_color: "#111111",
        border_style: "rounded",
        display_name: "Quantum Beauty Group",
        font_family: "default",
        logo: {
          type: "url",
          url: `${origin}/icon0.svg`,
        },
      },

      subscription_data: {
        trial_settings: {
          end_behavior: {
            missing_payment_method: "cancel",
          },
        },
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Stripe error:", error);

    return NextResponse.json(
      { error: "Unable to create checkout session" },
      { status: 500 }
    );
  }
}
