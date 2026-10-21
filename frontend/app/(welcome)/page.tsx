import { WelcomeClient } from "@/app/(welcome)/welcome";
import { CityProvider } from "@/providers/city-provider";

export default async function WelcomePage() {
  return (
    <CityProvider>
      <WelcomeClient />
    </CityProvider>
  );
}
