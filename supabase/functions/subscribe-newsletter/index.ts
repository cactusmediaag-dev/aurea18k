const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SHOPIFY_DOMAIN = "hd5ps3-wc.myshopify.com";
const SHOPIFY_API_VERSION = "2025-07";
const ADMIN_GRAPHQL_URL = `https://${SHOPIFY_DOMAIN}/admin/api/${SHOPIFY_API_VERSION}/graphql.json`;

const CUSTOMER_CREATE = `
  mutation customerCreate($input: CustomerInput!) {
    customerCreate(input: $input) {
      customer { id email }
      userErrors { field message }
    }
  }
`;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const token = Deno.env.get("SHOPIFY_ACCESS_TOKEN");
    if (!token) {
      return new Response(
        JSON.stringify({ error: "Server misconfigured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const body = await req.json().catch(() => ({}));
    const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";

    if (!email || email.length > 255 || !EMAIL_RE.test(email)) {
      return new Response(
        JSON.stringify({ error: "Invalid email" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const shopifyRes = await fetch(ADMIN_GRAPHQL_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Access-Token": token,
      },
      body: JSON.stringify({
        query: CUSTOMER_CREATE,
        variables: {
          input: {
            email,
            emailMarketingConsent: {
              marketingState: "SUBSCRIBED",
              marketingOptInLevel: "CONFIRMED_OPT_IN",
            },
            tags: ["newsletter", "inner-circle"],
          },
        },
      }),
    });

    const json = await shopifyRes.json();
    const userErrors = json?.data?.customerCreate?.userErrors ?? [];
    const customer = json?.data?.customerCreate?.customer;

    if (customer) {
      return new Response(
        JSON.stringify({ success: true, alreadySubscribed: false }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const taken = userErrors.some((e: { message?: string }) =>
      typeof e?.message === "string" && e.message.toLowerCase().includes("taken")
    );
    if (taken) {
      return new Response(
        JSON.stringify({ success: true, alreadySubscribed: true }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    console.error("Shopify customerCreate failed", { userErrors, errors: json?.errors });
    return new Response(
      JSON.stringify({ error: "Could not subscribe" }),
      { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (err) {
    console.error("subscribe-newsletter error:", err);
    return new Response(
      JSON.stringify({ error: "Internal error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
