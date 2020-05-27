import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from } from 'rxjs';
import { concatMap } from 'rxjs/operators';

export interface WeatherResponse {
  clouds: {
    all: number;
  };
  coord: { lat: number; lon: number };
  dt: number;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    'main.sea_level': number;
    'main.grnd_level': number;
  };
  name: string;
  sys: { sunrise: number; sunset: number };
  weather: { id: number; main: string; description: string; icon: string }[];
  wind: {
    speed: number;
    deg: number;
  };
  rain?: {
    '1h': number;
    '3h': number;
  };
  snow?: {
    '1h': number;
    '3h': number;
  };
}

enum CardinalDirections {
  N = 'N',
  NNE = 'NNE',
  NE = 'NE',
  ENE = 'ENE',
  E = 'E',
  ESE = 'ESE',
  SE = 'SE',
  SSE = 'SSE',
  S = 'S',
  SSW = 'SSW',
  SW = 'SW',
  WSW = 'WSW',
  W = 'W',
  WNW = 'WNW',
  NW = 'NW',
  NNW = 'NNW',
}

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private position$ = from(this.getPosition());

  constructor(private http: HttpClient) {}

  public getWeather$ = this.position$.pipe(
    concatMap((x) =>
      this.http.get<WeatherResponse>(`api/weather/?lat=${x.lat}&lon=${x.lon}`)
    )
  );

  public getCardinalDirection(degree: number) {
    if (degree === undefined || degree === null) {
      return;
    }

    if (
      (degree > 348.75 && degree <= 360) ||
      (degree >= 0 && degree <= 11.25)
    ) {
      return CardinalDirections.N;
    } else if (degree > 11.25 && degree <= 33.75) {
      return CardinalDirections.NNE;
    } else if (degree > 33.75 && degree <= 56.25) {
      return CardinalDirections.NE;
    } else if (degree > 56.25 && degree <= 78.75) {
      return CardinalDirections.ENE;
    } else if (degree > 78.75 && degree <= 101.25) {
      return CardinalDirections.E;
    } else if (degree > 101.25 && degree <= 123.75) {
      return CardinalDirections.ESE;
    } else if (degree > 123.75 && degree <= 146.25) {
      return CardinalDirections.SE;
    } else if (degree > 146.25 && degree <= 168.75) {
      return CardinalDirections.SSE;
    } else if (degree > 168.75 && degree <= 191.25) {
      return CardinalDirections.S;
    } else if (degree > 191.25 && degree <= 213.75) {
      return CardinalDirections.SSW;
    } else if (degree > 213.75 && degree <= 236.25) {
      return CardinalDirections.SW;
    } else if (degree > 236.25 && degree <= 258.75) {
      return CardinalDirections.WSW;
    } else if (degree > 258.75 && degree <= 281.25) {
      return CardinalDirections.W;
    } else if (degree > 281.25 && degree <= 303.75) {
      return CardinalDirections.WNW;
    } else if (degree > 303.75 && degree <= 326.25) {
      return CardinalDirections.NW;
    } else if (degree > 326.25 && degree <= 348.75) {
      return CardinalDirections.NNW;
    } else {
      console.warn(
        'The value given for wind degree was not a recognized value'
      );
    }
  }

  private getPosition(): Promise<{ lat: number; lon: number }> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (resp) => {
          resolve({ lat: resp.coords.latitude, lon: resp.coords.longitude });
        },
        (err) => {
          reject(err);
        }
      );
    });
  }
}
