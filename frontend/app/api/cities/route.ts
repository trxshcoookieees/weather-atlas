import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get("q")?.trim();

  if (!q || q.length < 2 || q.length > 50) {
    return NextResponse.json([]);
  }

  const FASTAPI_URL = process.env.FASTAPI_URL ?? "http://127.0.0.1:8000";
  const url = new URL("/cities", FASTAPI_URL);
  url.searchParams.set("city_name", q);

  const response = await fetch(url, { cache: "no-store" });
  return NextResponse.json(await response.json());
}
