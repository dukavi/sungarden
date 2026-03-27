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
    <div style="font-family:sans-serif;max-width:560px;margin:0 auto;background:#faf8f3;border-radius:12px;overflow:hidden">
      <div style="text-align:center;padding:2em 1em 1em">
        <img src="https://aurinkotarha.fi/logo_round.png" alt="Aurinkotarha" width="80" height="80" style="border-radius:50%" />
        <h1 style="font-family:Georgia,serif;color:#2c2c2c;margin:0.5em 0 0.1em;font-size:1.6em">${t.thanks}</h1>
        <p style="color:#888;font-size:0.9em;margin:0">#${order.order_id}</p>
      </div>
      <div style="padding:1.5em 2em">
        <h3 style="color:#4a7c2e;font-size:1em;margin:0 0 0.8em;text-transform:uppercase;letter-spacing:0.05em">${t.summary}</h3>
        <table style="border-collapse:collapse;width:100%">
          <tr><td style="padding:8px 12px 8px 0;color:#666;font-size:0.9em">${t.variety}</td><td style="padding:8px 0;font-weight:600">${order.variety}</td></tr>
          <tr style="border-top:1px solid #e8e4da"><td style="padding:8px 12px 8px 0;color:#666;font-size:0.9em">${t.quantity}</td><td style="padding:8px 0;font-weight:600">${order.quantity}</td></tr>
          <tr style="border-top:1px solid #e8e4da"><td style="padding:8px 12px 8px 0;color:#666;font-size:0.9em">${t.total}</td><td style="padding:8px 0;font-weight:600;color:#4a7c2e">${order.total_eur} €</td></tr>
          <tr style="border-top:1px solid #e8e4da"><td style="padding:8px 12px 8px 0;color:#666;font-size:0.9em">${t.address}</td><td style="padding:8px 0;font-weight:600">${order.address}, ${order.city}</td></tr>
          ${order.notes ? `<tr style="border-top:1px solid #e8e4da"><td style="padding:8px 12px 8px 0;color:#666;font-size:0.9em">${t.notes}</td><td style="padding:8px 0">${order.notes}</td></tr>` : ""}
        </table>
        <p style="margin-top:1.5em;padding:1em;background:#f0ede4;border-radius:8px;color:#555;font-size:0.9em;line-height:1.6">${t.contact}</p>
      </div>
      <div style="text-align:center;padding:1.5em;border-top:1px solid #e8e4da">
        <p style="margin:0;font-family:Georgia,serif;color:#4a7c2e;font-size:1.1em;font-weight:600">Aurinkotarha Mustio</p>
        <p style="margin:0.3em 0 0;font-size:0.85em"><a href="https://aurinkotarha.fi" style="color:#888;text-decoration:none">aurinkotarha.fi</a></p>
      </div>
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
