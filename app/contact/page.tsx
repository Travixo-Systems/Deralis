import { Metadata } from "next";
import ContactForm from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Deralis Digital. Let's discuss your project and build something real.",
  openGraph: {
    title: "Contact | Deralis Digital",
    description:
      "Start a conversation about your next web platform or digital project.",
  },
};

type ContactPageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const params = await searchParams;
  const serviceParam = params.service;
  const prefilledService =
    typeof serviceParam === "string"
      ? serviceParam
      : Array.isArray(serviceParam)
      ? serviceParam[0]
      : "";

  return <ContactForm prefilledService={prefilledService} />;
}