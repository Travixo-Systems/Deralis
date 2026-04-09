import { Resend } from "resend";

export async function sendAuditConfirmationEmail(
  buyerEmail: string,
  _buyerName: string,
  language: "en" | "fr"
) {
  const resendApiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.RESEND_FROM_EMAIL;
  const schedulingLink = process.env.SCHEDULING_LINK;

  if (!resendApiKey || !fromEmail || !schedulingLink) {
    throw new Error(
      "Missing required env vars: RESEND_API_KEY, RESEND_FROM_EMAIL, or SCHEDULING_LINK"
    );
  }

  const resend = new Resend(resendApiKey);

  const subject =
    language === "fr"
      ? "Votre audit est confirm\u00e9. \u00c9tape suivante\u00a0: prenez votre rendez-vous"
      : "Your audit is confirmed. Next step: book your call";

  const bodyEN = `Thanks for booking the Systems Audit. Payment received.

Next step: book your 60 to 90 minute call here:
${schedulingLink}

How it works from here:

1. You pick a slot that works for you.
2. Before the call, I'll review the information you shared during checkout and prepare. If you'd like to send anything else ahead of time, internal docs, a description of where the friction is, anything, reply to this email and I'll factor it into the prep.
3. We do the call. 60 to 90 minutes. I map your operation, identify the friction points, and we work through what to build, what not to build, and in what order.
4. Within 5 working days of the call, assuming I have what I need from you to write it, I send you the written brief.

If you have any questions before the call, reply to this email directly.

Uwa
Deralis Digital`;

  const bodyFR = `Merci d'avoir r\u00e9serv\u00e9 l'Audit syst\u00e8me. Le paiement est confirm\u00e9.

\u00c9tape suivante\u00a0: prenez votre rendez-vous pour l'appel de 60 \u00e0 90 minutes ici\u00a0:
${schedulingLink}

Comment \u00e7a se passe \u00e0 partir de maintenant\u00a0:

1. Vous choisissez un cr\u00e9neau qui vous convient.
2. Avant l'appel, je relirai les informations que vous avez partag\u00e9es lors du paiement et je pr\u00e9parerai. Si vous souhaitez m'envoyer autre chose \u00e0 l'avance, documents internes, description des points de friction, tout ce qui peut aider, r\u00e9pondez \u00e0 cet email et je l'int\u00e9grerai \u00e0 la pr\u00e9paration.
3. Nous faisons l'appel. 60 \u00e0 90 minutes. Je cartographie votre fonctionnement, j'identifie les points de friction, et nous travaillons ensemble sur ce qu'il faut construire, ce qu'il ne faut pas construire, et dans quel ordre.
4. Sous 5 jours ouvr\u00e9s apr\u00e8s l'appel, \u00e0 condition que je dispose de tout ce dont j'ai besoin de votre part, je vous envoie le brief \u00e9crit.

Si vous avez des questions avant l'appel, r\u00e9pondez directement \u00e0 cet email.

Uwa
Deralis Digital`;

  const { error } = await resend.emails.send({
    from: `Deralis Digital <${fromEmail}>`,
    to: [buyerEmail],
    replyTo: fromEmail,
    subject,
    text: language === "fr" ? bodyFR : bodyEN,
  });

  if (error) {
    throw new Error(`Resend error: ${JSON.stringify(error)}`);
  }
}
