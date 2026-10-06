from datetime import timedelta

import openmeteo_requests
import requests_cache
from retry_requests import retry

OPENMETEO_URL = "https://api.open-meteo.com/v1/forecast"

cache_session = requests_cache.CachedSession(
    ".cache",
    expire_after=timedelta(minutes=5),
)

retry_session = retry(
    cache_session,
    retries=5,
    backoff_factor=0.2,
)

openmeteo = openmeteo_requests.Client(
    session=retry_session,
)


def fetch_weather(latitude: float, longitude: float):
    params = {
        "latitude": latitude,
        "longitude": longitude,
        "daily": [
            "weather_code",
            "temperature_2m_max",
            "temperature_2m_min",
            "apparent_temperature_max",
            "apparent_temperature_min",
            "precipitation_probability_max",
            "precipitation_sum",
            "relative_humidity_2m_mean",
            "cloud_cover_max",
            "pressure_msl_mean",
            "pressure_msl_max",
            "pressure_msl_min",
            "wind_direction_10m_dominant",
            "wind_speed_10m_max",
            "wind_gusts_10m_max",
            "uv_index_max",
            "moon_phase",
            "daylight_duration",
            "sunshine_duration",
            "visibility_min",
            "sunrise",
            "sunset",
            "moonrise",
            "moonset",
        ],
        "hourly": [
            "weather_code",
            "temperature_2m",
            "apparent_temperature",
            "precipitation_probability",
            "precipitation",
            "relative_humidity_2m",
            "cloud_cover",
            "pressure_msl",
            "wind_direction_10m",
            "wind_speed_10m",
            "wind_gusts_10m",
            "uv_index",
            "sunshine_duration",
            "visibility",
            "is_day",
        ],
        "current": [
            "weather_code",
            "temperature_2m",
            "apparent_temperature",
            "precipitation",
            "relative_humidity_2m",
            "cloud_cover",
            "pressure_msl",
            "wind_direction_10m",
            "wind_speed_10m",
            "wind_gusts_10m",
            "is_day",
        ],
        "wind_speed_unit": "ms",
        "timezone": "auto"
    }

    return openmeteo.weather_api(
        OPENMETEO_URL,
        params=params,
    )[0]
