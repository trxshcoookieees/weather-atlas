"use client";

import { WeatherContext } from "@/context/WeatherContext";
import { useCity } from "@/context/CityContext";
import type { WeatherResponse } from "@/lib/weather/types";
import type { City } from "@/lib/weather/types";
import { getWeatherForecast } from "@/lib/weather/api";
import { useCallback, useEffect, useReducer, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { slugify } from "@/lib/utils";

const CACHE = new Map<number, { data: WeatherResponse; t: number }>();
const STALE = 5 * 60 * 1000;

type WeatherState = {
  city: City | null;
  weather: WeatherResponse | null;
  loading: boolean;
  error: Error | null;
};

type WeatherAction =
  | { type: "LOAD_START"; payload: { city: City | null } }
  | {
      type: "LOAD_SUCCESS";
      payload: { city: City; weather: WeatherResponse };
    }
  | { type: "LOAD_ERROR"; payload: Error }
  | { type: "RESET" };

const initialWeatherState: WeatherState = {
  city: null,
  weather: null,
  loading: false,
  error: null,
};

function weatherReducer(
  state: WeatherState,
  action: WeatherAction,
): WeatherState {
  switch (action.type) {
    case "LOAD_START":
      return {
        city: action.payload.city,
        weather: null,
        loading: true,
        error: null,
      };

    case "LOAD_SUCCESS":
      return {
        city: action.payload.city,
        weather: action.payload.weather,
        loading: false,
        error: null,
      };

    case "LOAD_ERROR":
      return { ...state, loading: false, error: action.payload };

    case "RESET":
      return initialWeatherState;

    default:
      return state;
  }
}

export function WeatherProvider({ children }: { children: React.ReactNode }) {
  const { activeCity, isLoaded, isCityResolved, cityResolutionError } =
    useCity();

  const [state, dispatch] = useReducer(weatherReducer, initialWeatherState);
  const requestId = useRef(0);

  const router = useRouter();
  const searchParams = useSearchParams();
  const unit = searchParams.get("unit") === "F" ? "F" : "C";

  useEffect(() => {
    if (!isLoaded || !isCityResolved) {
      dispatch({ type: "LOAD_START", payload: { city: null } });
      return;
    }

    if (cityResolutionError) {
      dispatch({ type: "LOAD_ERROR", payload: cityResolutionError });
      return;
    }

    if (!activeCity) {
      dispatch({ type: "RESET" });
      return;
    }

    const city = activeCity;
    const id = ++requestId.current;
    let cancelled = false;

    async function loadWeather() {
      dispatch({ type: "LOAD_START", payload: { city } });

      try {
        const cached = CACHE.get(city.id);

        if (cached && Date.now() - cached.t < STALE) {
          if (!cancelled && id === requestId.current) {
            dispatch({
              type: "LOAD_SUCCESS",
              payload: { city, weather: cached.data },
            });
          }
          return;
        }

        const weather = await getWeatherForecast(city.latitude, city.longitude);

        if (cancelled || id !== requestId.current) return;

        CACHE.set(city.id, { data: weather, t: Date.now() });

        dispatch({
          type: "LOAD_SUCCESS",
          payload: { city, weather },
        });
      } catch (err) {
        if (cancelled || id !== requestId.current) return;

        dispatch({
          type: "LOAD_ERROR",
          payload:
            err instanceof Error ? err : new Error("Failed to load weather"),
        });
      }
    }

    void loadWeather();

    return () => {
      cancelled = true;
      requestId.current++;
    };
  }, [activeCity, isLoaded, isCityResolved, cityResolutionError]);

  const setCity = useCallback(
    (city: City) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("unit", unit);

      router.push(
        `/${slugify(city.locale)}/${slugify(city.region)}/${slugify(city.name)}/${city.id}/today?${params.toString()}`,
        { scroll: false },
      );
    },
    [unit, router, searchParams],
  );

  return (
    <WeatherContext.Provider
      value={{
        city: state.city,
        weather: state.weather,
        loading: state.loading,
        error: state.error,
        setCity,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
}
