import { redirect } from "next/navigation";
import { WelcomeClient } from "@/app/(welcome)/_component.WelcomeClient";

export default async function WelcomePage({ searchParams }: PageProps<"/">) {
  const params = await searchParams;
  const cityParam = params.city;
  const city = Array.isArray(cityParam) ? cityParam[0] : cityParam;

  if (city) {
    redirect(`/overview?city=${encodeURIComponent(city)}`);
  }

  return <WelcomeClient />;
}
