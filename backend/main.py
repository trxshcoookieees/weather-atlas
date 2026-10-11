from zoneinfo import ZoneInfo

from fastapi import FastAPI, HTTPException

from client import redis, fetch_weather
from models import WeatherForecast
from parsers import (
    parse_location,
    parse_current,
    parse_hourly,
    parse_daily,
)

import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI()


@app.get("/forecast", response_model=WeatherForecast)
async def get_weather(
        latitude: float,
        longitude: float,
):
    cache_key = f"forecast:{latitude:.4f}:{longitude:.4f}"

    try:
        cached = redis.get(cache_key)
    except Exception:
        logger.exception("redis GET failed")
        cached = None

    if cached is not None:
        if isinstance(cached, bytes):
            cached = cached.decode("utf-8")

        try:
            forecast = WeatherForecast.model_validate_json(cached)
            logger.info("Cache HIT: %s", cache_key)
            return forecast
        except (ValueError, TypeError):
            logger.warning("Invalid cache entry: %s", cache_key)

    logger.info("Cache MISS: %s", cache_key)
    response = fetch_weather(latitude, longitude)

    timezone_name = response.Timezone().decode()
    timezone = ZoneInfo(timezone_name)

    current_data = response.Current()
    hourly_data = response.Hourly()
    daily_data = response.Daily()

    if current_data is None or hourly_data is None or daily_data is None:
        raise HTTPException(
            status_code=502,
            detail="Weather provider returned incomplete data",
        )

    forecast = WeatherForecast(
        location=parse_location(response, timezone_name),
        current=parse_current(current_data, timezone),
        hourly=parse_hourly(hourly_data, timezone),
        daily=parse_daily(daily_data, timezone),
    )

    try:
        redis.set(cache_key, forecast.model_dump_json(), ex=900)
        logger.info("Cache SET: %s (TTL=900s)", cache_key)
    except Exception:
        logger.exception("Redis SET failed")

    return forecast
