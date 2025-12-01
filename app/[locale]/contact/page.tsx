import { getTranslations, setRequestLocale } from "next-intl/server";
import ContactForm from "@/components/contact/ContactForm";

type Props = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact.metadata" });

  return {
    title: t("title"),
    description: t("description"),
    openGraph: {
      title: `${t("title")} | Deralis Digital`,
      description: t("description"),
    },
  };
}

export default async function ContactPage({ params, searchParams }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const searchParamsData = await searchParams;
  const serviceParam = searchParamsData.service;
  const prefilledService =
    typeof serviceParam === "string"
      ? serviceParam
      : Array.isArray(serviceParam)
      ? serviceParam[0]
      : "";

  return <ContactForm prefilledService={prefilledService} />;
}
