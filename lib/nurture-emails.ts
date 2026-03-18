import { Resend } from "resend";

const NURTURE_FROM = "Uwa at Deralis Digital <contact@deralis.digital>";
const NURTURE_REPLY_TO = "contact@deralis.digital";

const EMAIL_1 = {
  subject: "Good to meet you",
  text: `Hey,

Thanks for signing up. Wanted to introduce myself properly.

I'm Uwa, the engineer behind Deralis Digital. I work with founders and small businesses who need a real technical partner, not just someone to write code and disappear.

What that means in practice: I help you go from idea to working product. I include you in the process the whole way through. And when we are done, you get full documentation, a clean handoff, and a system you actually understand and own.

No black box. No being locked into paying an agency forever just to keep the lights on.

If you have something in mind, even if it is still just an idea, reply and tell me about it. I read every reply.

Uwa
Deralis Digital`,
};

const EMAIL_2 = {
  subject: "Something I built from scratch",
  text: `Hey,

A couple of years ago I worked in the equipment rental industry and kept running into the same problem. Companies were tracking expensive lifting equipment on paper forms and Excel sheets. Inspections were missed. Regulatory fines happened. Nobody had a clear picture of what was compliant and what was not.

So I built TraviXO to solve it. A full multi-tenant SaaS platform. QR-based equipment tracking, automated inspection scheduling, compliance dashboards. Built on Next.js, Supabase, and PostgreSQL.

That is how I approach every project. I need to understand your problem before I write a single line of code.

You can see TraviXO live at app.travixosystems.com.

If you are sitting on a problem that feels like "there should be software for this," reply and describe it. Sometimes that is all it takes to get started.

Uwa
Deralis Digital`,
};

const EMAIL_3 = {
  subject: "One thing worth knowing before you hire a developer",
  text: `Hey,

One thing I see go wrong a lot with early-stage builds: the founder gets a finished product they do not understand, cannot maintain, and are locked into paying the same agency forever just to keep the lights on.

It happens because most developers optimize for shipping fast, not for handing over properly.

My approach is different. Every project ends with documentation, a recorded walkthrough, clean code structure, and a clear path for whoever maintains it next, whether that is me, your in-house team, or someone else entirely.

You should own what you paid for.

If you are thinking about building something and want to talk through whether it makes sense, here is a link to book 30 minutes. No pitch, just a conversation.

calendly.com/deralisdigital/30min

Uwa
Deralis Digital`,
};

export async function sendNurtureSequence(resend: Resend, recipientEmail: string) {
  const now = new Date();
  const threeDaysLater = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000);
  const sevenDaysLater = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

  const results = await Promise.allSettled([
    resend.emails.send({
      from: NURTURE_FROM,
      to: [recipientEmail],
      replyTo: NURTURE_REPLY_TO,
      subject: EMAIL_1.subject,
      text: EMAIL_1.text,
    }),
    resend.emails.send({
      from: NURTURE_FROM,
      to: [recipientEmail],
      replyTo: NURTURE_REPLY_TO,
      subject: EMAIL_2.subject,
      text: EMAIL_2.text,
      scheduledAt: threeDaysLater.toISOString(),
    }),
    resend.emails.send({
      from: NURTURE_FROM,
      to: [recipientEmail],
      replyTo: NURTURE_REPLY_TO,
      subject: EMAIL_3.subject,
      text: EMAIL_3.text,
      scheduledAt: sevenDaysLater.toISOString(),
    }),
  ]);

  const failures = results.filter((r) => r.status === "rejected");
  if (failures.length > 0) {
    console.error("Some nurture emails failed to send:", failures);
  }

  return results;
}
