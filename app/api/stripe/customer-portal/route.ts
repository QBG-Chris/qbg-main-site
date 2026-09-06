import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";
import createServerClient from "@/app/supabase/server";

function getServices() {
  const stripeKey = process.env.STRIPE_SECRET_KEY;
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!stripeKey || !supabaseUrl || !serviceKey) throw new Error("Billing services are not configured.");
  return { stripe: new Stripe(stripeKey), supabase: createClient(supabaseUrl, serviceKey) };
}

export async function POST(req: Request) {
  try {
    const { stripe, supabase } = getServices();
    const authClient = await createServerClient();
    const { data: { user: authUser } } = await authClient.auth.getUser();

    if (!authUser) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const { data: subscription, error: dbError } = await supabase
      .from("subscriptions")
      .select("stripe_customer_id")
      .eq("user_id", authUser.id)
      .single();

    if (dbError || !subscription?.stripe_customer_id) {
      return NextResponse.json(
        { error: "No Stripe customer ID found for this user." },
        { status: 400 }
      );
    }

    const origin = new URL(req.url).origin;

    const session = await stripe.billingPortal.sessions.create({
      customer: subscription.stripe_customer_id,
      return_url: `${origin}/account`,
    });

    return NextResponse.redirect(session.url, 303);
  } catch (error) {
    console.error("Customer portal error:", error);
    return NextResponse.json(
      { error: "Unable to create customer portal session." },
      { status: 500 }
    );
  }
}
