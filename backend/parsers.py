from datetime import datetime
from math import ceil
from zoneinfo import ZoneInfo

import numpy as np
from openmeteo_sdk.VariablesWithTime import VariablesWithTime
from openmeteo_sdk.WeatherApiResponse import WeatherApiResponse

from models import (
    CurrentWeather,
    DailyWeather,
    HourlyWeather,
    Location,
)

MISSING_INT64 = 9223372036854775807


def parse_current(data: VariablesWithTime, timezone: ZoneInfo) -> CurrentWeather:
    return CurrentWeather(
        time=datetime.fromtimestamp(data.Time(), tz=timezone),
        weatherCode=data.Variables(0).Value(),
        temperature=round(data.Variables(1).Value()),
        apparentTemperature=round(data.Variables(2).Value()),
        precipitation=data.Variables(3).Value(),
        humidity=ceil(data.Variables(4).Value()),
        cloudCover=round(data.Variables(5).Value(), 2),
        pressureMsl=round(data.Variables(6).Value()),
        windDirection=round(data.Variables(7).Value()),
        windSpeed=ceil(data.Variables(8).Value()),
        windGusts=ceil(data.Variables(9).Value()),
        isDay=bool(data.Variables(10).Value()),
    )


def parse_hourly(data: VariablesWithTime, timezone: ZoneInfo) -> list[HourlyWeather]:
    (
        weather_codes,
        temperatures,
        apparent_temperatures,
        precipitation_probabilities,
        precipitations,
        humidities,
        cloud_covers,
        pressures,
        wind_directions,
        wind_speeds,
        wind_gusts,
        uv_indexes,
        sunshine_durations,
        visibilities,
        is_days,
    ) = (values(data, i) for i in range(15))

    return [
        HourlyWeather(
            time=get_time(data, i, timezone),
            weatherCode=int(weather_codes[i]),
            temperature=int(temperatures[i]),
            apparentTemperature=int(apparent_temperatures[i]),
            precipitationProbability=int(precipitation_probabilities[i]),
            precipitation=int(precipitations[i]),
            humidity=int(humidities[i]),
            cloudCover=round(cloud_covers[i], 2),
            pressureMsl=int(pressures[i]),
            windDirection=int(wind_directions[i]),
            windSpeed=int(wind_speeds[i]),
            windGusts=int(wind_gusts[i]),
            uvIndex=int(uv_indexes[i]),
            sunshineDuration=int(sunshine_durations[i]),
            visibility=int(visibilities[i]),
            isDay=bool(is_days[i]),
        )
        for i in range(len(weather_codes))
    ]


def parse_daily(data: VariablesWithTime, timezone: ZoneInfo) -> list[DailyWeather]:
    (
        weather_codes,
        max_temperatures,
        min_temperatures,
        max_apparent_temperatures,
        min_apparent_temperatures,
        precipitation_probabilities,
        precipitations,
        humidities,
        cloud_covers,
        avg_pressures_msl,
        max_pressures_msl,
        min_pressures_msl,
        wind_directions,
        wind_speeds,
        wind_gusts,
        uv_indexes,
        moon_phases,
        daylight_durations,
        sunlight_durations,
        visibilities,
    ) = (values(data, i) for i in range(20))

    sunrises = int64_values(data, 20)
    sunsets = int64_values(data, 21)
    moon_rises = int64_values(data, 22)
    moon_sets = int64_values(data, 23)

    return [
        DailyWeather(
            time=get_time(data, i, timezone),
            weatherCode=int(weather_codes[i]),
            maxTemperature=round(max_temperatures[i]),
            minTemperature=round(min_temperatures[i]),
            maxApparentTemperature=round(max_apparent_temperatures[i]),
            minApparentTemperature=round(min_apparent_temperatures[i]),
            precipitationProbability=round(precipitation_probabilities[i]),
            precipitation=round(precipitations[i]),
            humidity=round(humidities[i]),
            cloudCover=round(cloud_covers[i], 2),
            avgPressureMsl=round(avg_pressures_msl[i]),
            maxPressureMsl=round(max_pressures_msl[i]),
            minPressureMsl=round(min_pressures_msl[i]),
            windDirection=round(wind_directions[i]),
            windSpeed=round(wind_speeds[i]),
            windGusts=round(wind_gusts[i]),
            uvIndex=round(uv_indexes[i]),
            sunrise=datetime.fromtimestamp(sunrises[i], tz=timezone),
            sunset=datetime.fromtimestamp(sunsets[i], tz=timezone),
            moonPhase=float(moon_phases[i]),
            moonRise=datetime.fromtimestamp(moon_rises[i], tz=timezone)
            if moon_rises[i] != MISSING_INT64
            else None,
            moonSet=datetime.fromtimestamp(moon_sets[i], tz=timezone)
            if moon_sets[i] != MISSING_INT64
            else None,
            daylightDuration=round(daylight_durations[i]),
            sunlightDuration=round(sunlight_durations[i]),
            visibility=round(visibilities[i]),
        )
        for i in range(len(weather_codes))
    ]


def parse_location(data: WeatherApiResponse, timezone_name: str) -> Location:
    return Location(
        latitude=data.Latitude(),
        longitude=data.Longitude(),
        elevation=data.Elevation(),
        timezone=timezone_name,
    )


def values(data, index: int) -> np.ndarray:
    return data.Variables(index).ValuesAsNumpy()


def int64_values(data, index: int) -> np.ndarray:
    return data.Variables(index).ValuesInt64AsNumpy()


def get_time(data, index: int, timezone: ZoneInfo) -> datetime:
    return datetime.fromtimestamp(
        data.Time() + index * data.Interval(),
        tz=timezone,
    )
