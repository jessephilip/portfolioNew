export interface WeatherApiResponse {
  coord: Coord;
  weather: Weather[];
  base: string;
  main: Main;
  visibility: number;
  wind: Wind;
  clouds: Clouds;
  rain: FallRate;
  snow: FallRate;
  dt: number;
  sys: Sys;
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

interface Clouds {
  all: number;
}

interface Coord {
  lon: number;
  lat: number;
}

interface Main {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
  'main.sea_level': number;
  'main.grnd_level': number;
}

interface Sys {
  type: number;
  id: number;
  message: number;
  country: string;
  sunrise: number;
  sunset: number;
}

interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

interface Wind {
  speed: number;
  deg: number;
}

interface FallRate {
  '1h': number;
  '3h': number;
}
