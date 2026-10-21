import type { Metadata } from "next";
import { generateWeatherMetadata, formatSlug } from "@/lib/utils";
import { parseWeatherDateTime } from "@/lib/formatters";
import { WeatherIcon } from "@/components/weather/weather-icon";
import { getWeatherIconName } from "@/lib/weather/weather-codes";
import { getUVILabel } from "@/lib/weather/weather-descriptions";
import { getWeatherForecast, getCityById } from "@/lib/server/weather";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/[region]/[city]/[id]/forecast">): Promise<Metadata> {
  const { city, region } = await params;

  return generateWeatherMetadata(formatSlug(city), formatSlug(region));
}

async function Forecast(
  props: PageProps<"/[locale]/[region]/[city]/[id]/forecast">,
) {
  const { id } = await props.params;
  const city = await getCityById(Number(id));

  const { location, current, daily } = await getWeatherForecast(
    city.latitude,
    city.longitude,
  );

  return (
    <>
      <section className="flex gap-5">
        <div>
          <WeatherIcon
            name={getWeatherIconName(current.weatherCode, current.isDay)}
          />
          <div>
            <p>Fresh with bright intervals</p>
            <p>
              Clouds break from the west after lunch. Peak warmth reaches 16°
              around 15:00, followed by a short shower and a cooler evening.
            </p>
            <div>
              <div>
                <span>Best outdoors 13:00-16:00</span>
              </div>
              <div>
                <span>Sunset 19:27</span>
              </div>
            </div>
          </div>
        </div>
        <div>
          <p>Day at a glance</p>
          <div>
            <div>
              <span>Sunrise</span>
              <p>
                {
                  parseWeatherDateTime(daily[0]?.sunrise, location.timezone)
                    .time
                }
              </p>
            </div>
            <div>
              <span>Sunrise</span>
              <p>
                {parseWeatherDateTime(daily[0].sunrise, location.timezone).time}
              </p>
            </div>
            <div>
              <span>Sunset</span>
              <p>
                {parseWeatherDateTime(daily[0].sunset, location.timezone).time}
              </p>
            </div>
            <div>
              <span>UV Index</span>
              <p>{getUVILabel(daily[0].uvIndex)}</p>
            </div>
            <div>
              <span>Rain Total</span>
              <p>{daily[0].precipitation} mm</p>
            </div>
            <div>
              <span>Humidity</span>
              <p>{daily[0].humidity}%</p>
            </div>
            <div>
              <span>Pressure</span>
              <p>
                {daily[0].minPressureMsl} - {daily[0].maxPressureMsl} hPa
              </p>
            </div>
          </div>
        </div>
      </section>
      <div>Today by hour</div>
      <div>Rain & Wind / 7 day-details</div>
    </>
  );
}

export default Forecast;
