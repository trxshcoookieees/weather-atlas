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


class CitySearch(BaseModel):
    id: int
    name: str
    latitude: float
    longitude: float
    timezone: str
    country_code: str
    country: str

    elevation: float | None = None
    feature_code: str | None = None
    country_id: int | None = None
    population: int | None = None
    postcodes: list[str] | None = None
    admin1: str | None = None
    admin2: str | None = None
    admin3: str | None = None
    admin4: str | None = None
    admin1_id: int | None = None
    admin2_id: int | None = None
    admin3_id: int | None = None
    admin4_id: int | None = None
