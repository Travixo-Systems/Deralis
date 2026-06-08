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
      : "Your audit is confirmed. Next step: book your dates";

  const bodyEN = `Thanks for booking the Systems Audit. Payment received.

Next step: book your audit dates here:
${schedulingLink}

How it works from here:

1. You pick the dates that work for you. Two days of analysis, on-site where it matters, remote otherwise.
2. Before we start, I'll review the information you shared during checkout and prepare. If you'd like to send anything else ahead of time, internal docs, a description of where the friction is, anything, reply to this email and I'll factor it into the prep.
3. We run the audit over two days. I map your operation, rank the break points, and define what should connect it all, what to build, what not to build, and in what order.
4. Within five business days, assuming I have what I need from you to write it, I send you the written dossier.

If you have any questions before we start, reply to this email directly.

Uwa
Deralis Digital`;

  const bodyFR = `Merci d'avoir r\u00e9serv\u00e9 l'Audit syst\u00e8me. Le paiement est confirm\u00e9.

\u00c9tape suivante\u00a0: prenez vos dates d'audit ici\u00a0:
${schedulingLink}

Comment \u00e7a se passe \u00e0 partir de maintenant\u00a0:

1. Vous choisissez les dates qui vous conviennent. Deux jours d'analyse, sur site quand c'est utile, \u00e0 distance sinon.
2. Avant de commencer, je relirai les informations que vous avez partag\u00e9es lors du paiement et je pr\u00e9parerai. Si vous souhaitez m'envoyer autre chose \u00e0 l'avance, documents internes, description des points de friction, tout ce qui peut aider, r\u00e9pondez \u00e0 cet email et je l'int\u00e9grerai \u00e0 la pr\u00e9paration.
3. Nous menons l'audit sur deux jours. Je cartographie votre fonctionnement, je hi\u00e9rarchise les points de rupture, et je d\u00e9finis ce qui devrait tout relier, ce qu'il faut construire, ce qu'il ne faut pas construire, et dans quel ordre.
4. Sous cinq jours ouvr\u00e9s, \u00e0 condition que je dispose de tout ce dont j'ai besoin de votre part, je vous envoie le dossier \u00e9crit.

Si vous avez des questions avant de commencer, r\u00e9pondez directement \u00e0 cet email.

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
