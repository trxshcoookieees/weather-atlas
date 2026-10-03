from zoneinfo import ZoneInfo

from fastapi import FastAPI

from client import fetch_weather
from models import WeatherForecast
from parsers import (
    parse_location,
    parse_current,
    parse_hourly,
    parse_daily,
)

app = FastAPI()


@app.get("/forecast", response_model=WeatherForecast)
def get_weather(
        latitude: float,
        longitude: float,
):
    response = fetch_weather(latitude, longitude)
    timezone_name = response.Timezone().decode()
    timezone = ZoneInfo(timezone_name)

    current_data = response.Current()
    hourly_data = response.Hourly()
    daily_data = response.Daily()

    if current_data is None or hourly_data is None or daily_data is None:
        raise ValueError("Weather response is missing required data")

    current = parse_current(current_data, timezone)
    hourly = parse_hourly(hourly_data, timezone)
    daily = parse_daily(daily_data, timezone)

    return WeatherForecast(
        location=parse_location(response, timezone_name),
        current=current,
        hourly=hourly,
        daily=daily,
    )
