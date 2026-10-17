"use client";

import { CityContext } from "@/context/CityContext";
import {
  getActiveCity,
  getSavedCities,
  saveCity as saveCityToStorage,
  setActiveCity as setActiveCityInStorage,
  removeCity as removeCityFromStorage,
} from "@/lib/weather/saved-cities";
import { getCityById } from "@/lib/weather/api";
import type { City } from "@/lib/weather/types";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useReducer, useRef } from "react";

type CityState = {
  activeCity: City | null;
  savedCities: City[];
  isLoaded: boolean;
  resolvedRouteKey: string | null;
  cityResolutionError: Error | null;
};

type CityAction =
  | {
      type: "INITIALIZE";
      payload: Pick<CityState, "activeCity" | "savedCities">;
    }
  | { type: "SET_ACTIVE_CITY"; payload: City }
  | { type: "SAVE_CITY"; payload: City }
  | { type: "REMOVE_CITY"; payload: number }
  | {
      type: "RESOLVE_ROUTE";
      payload: { routeKey: string | null; error: Error | null };
    };

const initialCityState: CityState = {
  activeCity: null,
  savedCities: [],
  isLoaded: false,
  resolvedRouteKey: null,
  cityResolutionError: null,
};

function cityReducer(state: CityState, action: CityAction): CityState {
  switch (action.type) {
    case "INITIALIZE":
      return {
        ...state,
        activeCity: action.payload.activeCity,
        savedCities: action.payload.savedCities,
        isLoaded: true,
      };

    case "SET_ACTIVE_CITY":
      return { ...state, activeCity: action.payload };

    case "SAVE_CITY":
      if (state.savedCities.some((city) => city.id === action.payload.id)) {
        return state;
      }

      return {
        ...state,
        savedCities: [...state.savedCities, action.payload],
      };

    case "REMOVE_CITY":
      return {
        ...state,
        savedCities: state.savedCities.filter(
          (city) => city.id !== action.payload,
        ),
      };

    case "RESOLVE_ROUTE":
      if (
        state.resolvedRouteKey === action.payload.routeKey &&
        state.cityResolutionError === action.payload.error
      ) {
        return state;
      }

      return {
        ...state,
        resolvedRouteKey: action.payload.routeKey,
        cityResolutionError: action.payload.error,
      };

    default:
      return state;
  }
}

export function CityProvider({ children }: { children: React.ReactNode }) {
  const params = useParams<{ geocodingId?: string | string[] }>();
  const rawGeocodingId = params.geocodingId;
  const geocodingId = Array.isArray(rawGeocodingId)
    ? rawGeocodingId[0]
    : rawGeocodingId;

  const [state, dispatch] = useReducer(cityReducer, initialCityState);
  const requestId = useRef(0);

  useEffect(() => {
    let activeCity: City | null = null;
    let savedCities: City[] = [];

    try {
      activeCity = getActiveCity();
    } catch {
      activeCity = null;
    }

    try {
      savedCities = getSavedCities();
    } catch {
      savedCities = [];
    }

    dispatch({
      type: "INITIALIZE",
      payload: { activeCity, savedCities },
    });
  }, []);

  const setActiveCity = useCallback((city: City) => {
    setActiveCityInStorage(city);
    dispatch({ type: "SET_ACTIVE_CITY", payload: city });
  }, []);

  const saveCity = useCallback((city: City) => {
    saveCityToStorage(city);
    dispatch({ type: "SAVE_CITY", payload: city });
  }, []);

  const removeCity = useCallback((id: number) => {
    removeCityFromStorage(id);
    dispatch({ type: "REMOVE_CITY", payload: id });
  }, []);

  useEffect(() => {
    if (!state.isLoaded) return;

    const id = ++requestId.current;
    const controller = new AbortController();

    async function resolveCity() {
      if (geocodingId == null) {
        dispatch({
          type: "RESOLVE_ROUTE",
          payload: { routeKey: null, error: null },
        });
        return;
      }

      const cityId = Number(geocodingId);

      if (!Number.isSafeInteger(cityId) || cityId <= 0) {
        dispatch({
          type: "RESOLVE_ROUTE",
          payload: {
            routeKey: geocodingId,
            error: new Error("Invalid city ID"),
          },
        });
        return;
      }

      const city =
        state.activeCity?.id === cityId
          ? state.activeCity
          : state.savedCities.find((savedCity) => savedCity.id === cityId);

      try {
        let resolvedCity = city;

        if (!resolvedCity) {
          resolvedCity = await getCityById(cityId, controller.signal);
        }

        if (id !== requestId.current || controller.signal.aborted) return;

        if (state.activeCity?.id !== resolvedCity.id) {
          setActiveCity(resolvedCity);
        }

        dispatch({
          type: "RESOLVE_ROUTE",
          payload: { routeKey: geocodingId, error: null },
        });
      } catch (err) {
        if (id !== requestId.current || controller.signal.aborted) return;

        dispatch({
          type: "RESOLVE_ROUTE",
          payload: {
            routeKey: geocodingId,
            error:
              err instanceof Error ? err : new Error("Failed to load city"),
          },
        });
      }
    }

    void resolveCity();

    return () => {
      controller.abort();
      requestId.current++;
    };
  }, [
    geocodingId,
    state.isLoaded,
    state.activeCity,
    state.savedCities,
    setActiveCity,
  ]);

  const isCityResolved =
    state.isLoaded &&
    (geocodingId == null || state.resolvedRouteKey === geocodingId);

  return (
    <CityContext.Provider
      value={{
        activeCity: state.activeCity,
        savedCities: state.savedCities,
        setActiveCity,
        saveCity,
        removeCity,
        isLoaded: state.isLoaded,
        isCityResolved,
        cityResolutionError: isCityResolved ? state.cityResolutionError : null,
      }}
    >
      {children}
    </CityContext.Provider>
  );
}
