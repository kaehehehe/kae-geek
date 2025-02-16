import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { Locale, routing } from "@/i18n/routing";
import { Container, Flex, UIProvider } from "@yamada-ui/react";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import "../reset.css";

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <title>Hi, I&apos;m Kae.</title>
      <body>
        <NextIntlClientProvider messages={messages}>
          <UIProvider>
            <Navbar locale={locale} />
            <Flex direction={"column"} justify={"center"} alignItems={"center"}>
              <Container height={"fit-content"} minHeight={"90vh"}>
                {children}
              </Container>
              <Footer />
            </Flex>
          </UIProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
