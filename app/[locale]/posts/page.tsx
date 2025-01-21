import { Locale } from "../../../i18n/routing";
import { Posts } from "./components/Posts";

export default async function PostsPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;

  return <Posts locale={locale} />;
}
