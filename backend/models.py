from datetime import datetime

from pydantic import BaseModel


class Location(BaseModel):
    latitude: float
    longitude: float
    elevation: float
    timezone: str


class WeatherForecast(BaseModel):
    location: Location
    current: CurrentWeather
    hourly: list[HourlyWeather] | None
    daily: list[DailyWeather] | None


class CurrentWeather(BaseModel):
    time: datetime
    weatherCode: float | int
    temperature: int
    apparentTemperature: int
    precipitation: float | int
    humidity: int
    cloudCover: float
    pressureMsl: int
    windDirection: int
    windSpeed: int
    windGusts: int
    isDay: bool


class HourlyWeather(BaseModel):
    time: datetime
    weatherCode: float | int
    temperature: int
    apparentTemperature: int
    precipitationProbability: int
    precipitation: float | int
    humidity: int
    cloudCover: float
    pressureMsl: int
    windDirection: int
    windSpeed: int
    windGusts: int
    uvIndex: int
    sunshineDuration: int
    visibility: int
    isDay: bool


class DailyWeather(BaseModel):
    time: datetime
    weatherCode: float | int
    maxTemperature: int
    minTemperature: int
    maxApparentTemperature: int
    minApparentTemperature: int
    precipitationProbability: int
    precipitation: float | int
    humidity: int
    cloudCover: float
    avgPressureMsl: int
    maxPressureMsl: int
    minPressureMsl: int
    windDirection: int
    windSpeed: int
    windGusts: int
    uvIndex: int
    sunrise: datetime
    sunset: datetime
    moonPhase: float
    moonRise: datetime | None
    moonSet: datetime | None
    daylightDuration: int
    sunlightDuration: int
    visibility: int
