import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY")!;
const NOTIFY_EMAIL = "dukavia@gmail.com";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      headers: {
        "Access-Control-Allow-Origin": "https://aurinkotarha.fi",
        "Access-Control-Allow-Methods": "POST",
        "Access-Control-Allow-Headers": "authorization, content-type, apikey",
      },
    });
  }

  try {
    const order = await req.json();

    const html = `
      <h2>Uusi tilaus / New order</h2>
      <table style="border-collapse:collapse">
        <tr><td style="padding:4px 12px 4px 0;font-weight:bold">Nimi</td><td>${order.customer_name}</td></tr>
        <tr><td style="padding:4px 12px 4px 0;font-weight:bold">Puhelin</td><td>${order.phone}</td></tr>
        <tr><td style="padding:4px 12px 4px 0;font-weight:bold">Email</td><td>${order.email}</td></tr>
        <tr><td style="padding:4px 12px 4px 0;font-weight:bold">Kaupunki</td><td>${order.city}</td></tr>
        <tr><td style="padding:4px 12px 4px 0;font-weight:bold">Osoite</td><td>${order.address}</td></tr>
        <tr><td style="padding:4px 12px 4px 0;font-weight:bold">Määrä</td><td>${order.quantity} kpl</td></tr>
        <tr><td style="padding:4px 12px 4px 0;font-weight:bold">Yhteensä</td><td>${order.total_eur} €</td></tr>
        ${order.notes ? `<tr><td style="padding:4px 12px 4px 0;font-weight:bold">Huomautukset</td><td>${order.notes}</td></tr>` : ""}
      </table>
    `;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Aurinkotarha <orders@aurinkotarha.fi>",
        to: NOTIFY_EMAIL,
        subject: `Tilaus: ${order.customer_name} — ${order.quantity} kpl`,
        html,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("Resend error:", err);
      return new Response(JSON.stringify({ error: "email_failed" }), {
        status: 500,
        headers: { "Access-Control-Allow-Origin": "https://aurinkotarha.fi" },
      });
    }

    return new Response(JSON.stringify({ ok: true }), {
      headers: { "Access-Control-Allow-Origin": "https://aurinkotarha.fi" },
    });
  } catch (e) {
    console.error(e);
    return new Response(JSON.stringify({ error: "server_error" }), {
      status: 500,
      headers: { "Access-Control-Allow-Origin": "https://aurinkotarha.fi" },
    });
  }
});
