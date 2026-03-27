import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY")!;
const ADMIN_EMAIL = "dukavia@gmail.com";

const translations: Record<string, Record<string, string>> = {
  fi: {
    subject: "Tilausvahvistus — Aurinkotarha",
    thanks: "Kiitos tilauksestasi!",
    summary: "Tilauksen yhteenveto",
    variety: "Lajike",
    quantity: "Määrä",
    total: "Yhteensä",

    address: "Toimitusosoite",
    notes: "Lisätietoja",
    contact:
      "Otamme sinuun yhteyttä vahvistaaksemme toimituksen. Maksu tapahtuu toimituksen yhteydessä.",
  },
  sv: {
    subject: "Beställningsbekräftelse — Aurinkotarha",
    thanks: "Tack för din beställning!",
    summary: "Beställningsöversikt",
    variety: "Sort",
    quantity: "Antal",
    total: "Totalt",

    address: "Leveransadress",
    notes: "Ytterligare information",
    contact:
      "Vi kontaktar dig för att bekräfta leveransen. Betalning sker vid leverans.",
  },
  en: {
    subject: "Order confirmation — Aurinkotarha",
    thanks: "Thank you for your order!",
    summary: "Order summary",
    variety: "Variety",
    quantity: "Quantity",
    total: "Total",

    address: "Delivery address",
    notes: "Notes",
    contact:
      "We will contact you to confirm the delivery. Payment is made upon delivery.",
  },
};

function customerEmail(order: Record<string, string>, t: Record<string, string>): string {
  return `
    <div style="font-family:sans-serif;max-width:560px;margin:0 auto">
      <h2 style="color:#6b8f71">${t.thanks}</h2>
      <p style="color:#999;font-size:0.9em">#${order.order_id}</p>
      <h3>${t.summary}</h3>
      <table style="border-collapse:collapse;width:100%">
        <tr><td style="padding:6px 12px 6px 0;font-weight:bold">${t.variety}</td><td>${order.variety}</td></tr>
        <tr><td style="padding:6px 12px 6px 0;font-weight:bold">${t.quantity}</td><td>${order.quantity}</td></tr>
        <tr><td style="padding:6px 12px 6px 0;font-weight:bold">${t.total}</td><td>${order.total_eur} €</td></tr>
        <tr><td style="padding:6px 12px 6px 0;font-weight:bold">${t.address}</td><td>${order.address}, ${order.city}</td></tr>
        ${order.notes ? `<tr><td style="padding:6px 12px 6px 0;font-weight:bold">${t.notes}</td><td>${order.notes}</td></tr>` : ""}
      </table>
      <p style="margin-top:1.5em;color:#666">${t.contact}</p>
      <p style="margin-top:2em;color:#999;font-size:0.85em">— Aurinkotarha Mustio</p>
    </div>
  `;
}

function adminEmail(order: Record<string, string>): string {
  return `
    <h2>Uusi tilaus / New order #${order.order_id}</h2>
    <table style="border-collapse:collapse">
      <tr><td style="padding:4px 12px 4px 0;font-weight:bold">Nimi</td><td>${order.customer_name}</td></tr>
      <tr><td style="padding:4px 12px 4px 0;font-weight:bold">Puhelin</td><td>${order.phone}</td></tr>
      <tr><td style="padding:4px 12px 4px 0;font-weight:bold">Email</td><td>${order.email}</td></tr>
      <tr><td style="padding:4px 12px 4px 0;font-weight:bold">Lajike</td><td>${order.variety}</td></tr>
      <tr><td style="padding:4px 12px 4px 0;font-weight:bold">Kaupunki</td><td>${order.city}</td></tr>
      <tr><td style="padding:4px 12px 4px 0;font-weight:bold">Osoite</td><td>${order.address}</td></tr>
      <tr><td style="padding:4px 12px 4px 0;font-weight:bold">Määrä</td><td>${order.quantity} kpl</td></tr>
      <tr><td style="padding:4px 12px 4px 0;font-weight:bold">Yhteensä</td><td>${order.total_eur} €</td></tr>
      ${order.notes ? `<tr><td style="padding:4px 12px 4px 0;font-weight:bold">Huomautukset</td><td>${order.notes}</td></tr>` : ""}
    </table>
  `;
}

async function sendEmail(from: string, to: string, subject: string, html: string, replyTo?: string) {
  return fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ from, to, subject, html, reply_to: replyTo }),
  });
}

const CORS = { "Access-Control-Allow-Origin": "https://aurinkotarha.fi" };

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      headers: {
        ...CORS,
        "Access-Control-Allow-Methods": "POST",
        "Access-Control-Allow-Headers": "authorization, content-type, apikey",
      },
    });
  }

  try {
    const order = await req.json();
    const lang = order.lang || "fi";
    const t = translations[lang] || translations.fi;
    const from = "Aurinkotarha <orders@aurinkotarha.fi>";

    await Promise.all([
      sendEmail(from, ADMIN_EMAIL, `Tilaus: ${order.customer_name} — ${order.quantity} kpl`, adminEmail(order)),
      sendEmail(from, order.email, t.subject, customerEmail(order, t), ADMIN_EMAIL),
    ]);

    return new Response(JSON.stringify({ ok: true }), { headers: CORS });
  } catch (e) {
    console.error(e);
    return new Response(JSON.stringify({ error: "server_error" }), {
      status: 500,
      headers: CORS,
    });
  }
});
