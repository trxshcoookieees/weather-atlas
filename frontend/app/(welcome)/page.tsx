import { WelcomeClient } from "@/app/(welcome)/_component.WelcomeClient";
import { CityProvider } from "@/providers/CityProvider";

export default async function WelcomePage() {
  return (
    <CityProvider>
      <WelcomeClient />
    </CityProvider>
  );
}
