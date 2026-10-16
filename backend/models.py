from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field


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
    cloudCover: float | int
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
    cloudCover: float | int
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
    cloudCover: float | int
    avgPressureMsl: int
    maxPressureMsl: int
    minPressureMsl: int
    windDirection: int
    windSpeed: int
    windGusts: int
    uvIndex: int
    sunrise: datetime
    sunset: datetime
    moonPhase: float | int
    moonRise: datetime | None
    moonSet: datetime | None
    daylightDuration: int
    sunlightDuration: int
    visibility: int


class CitySearch(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    id: int
    name: str
    latitude: float | int
    longitude: float | int
    country: str | None = None
    region: str | None = Field(default=None, validation_alias="admin1")
    locale: str = Field(validation_alias="country_code")
    timezone: str
