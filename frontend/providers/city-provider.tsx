"use client";

import { CityContext } from "@/context/city-context";
import {
  getSavedCities,
  saveCity as saveCityToStorage,
  removeCity as removeCityFromStorage,
} from "@/lib/weather/saved-cities";
import type { City } from "@/lib/weather/types";
import React, { useCallback, useEffect, useReducer } from "react";

type CityState = {
  savedCities: City[];
  isLoading: boolean;
};

type CityAction =
  | {
      type: "INITIALIZE";
      payload: Pick<CityState, "savedCities">;
    }
  | { type: "SAVE_CITY"; payload: City }
  | { type: "REMOVE_CITY"; payload: number };

const initialCityState: CityState = {
  savedCities: [],
  isLoading: true,
};

function cityReducer(state: CityState, action: CityAction): CityState {
  switch (action.type) {
    case "INITIALIZE":
      return {
        ...state,
        savedCities: action.payload.savedCities,
        isLoading: false,
      };

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

    default:
      return state;
  }
}

export function CityProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cityReducer, initialCityState);

  useEffect(() => {
    let savedCities: City[];

    try {
      savedCities = getSavedCities();
    } catch {
      savedCities = [];
    }

    dispatch({
      type: "INITIALIZE",
      payload: { savedCities },
    });
  }, []);

  const saveCity = useCallback((city: City) => {
    saveCityToStorage(city);
    dispatch({ type: "SAVE_CITY", payload: city });
  }, []);

  const removeCity = useCallback((id: number) => {
    removeCityFromStorage(id);
    dispatch({ type: "REMOVE_CITY", payload: id });
  }, []);

  return (
    <CityContext.Provider
      value={{
        savedCities: state.savedCities,
        saveCity,
        removeCity,
        isLoading: state.isLoading,
      }}
    >
      {children}
    </CityContext.Provider>
  );
}
