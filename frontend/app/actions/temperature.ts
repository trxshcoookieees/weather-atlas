"use server";

import { cookies } from "next/headers";

export async function setTemperatureUnit(formData: FormData) {
  const unit = formData.get("unit");

  if (unit !== "C" && unit !== "F") return;

  const cookieStore = await cookies();
  cookieStore.set("temperature-unit", unit, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  });
}

export async function getTemperatureUnit() {
  const cookieStore = await cookies();
  return cookieStore.get("temperature-unit")?.value === "F" ? "F" : "C";
}
