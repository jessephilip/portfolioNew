import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from } from 'rxjs';
import { concatMap } from 'rxjs/operators';

export interface Position {
  lng: number;
  lat: number;
}

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private position$ = from(this.getPosition());

  constructor(private http: HttpClient) {}

  public getWeather$ = this.position$.pipe(
    concatMap((x) => this.http.post('api/weather', x))
  );

  private getPosition(): Promise<Position> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (resp) => {
          resolve({ lng: resp.coords.longitude, lat: resp.coords.latitude });
        },
        (err) => {
          reject(err);
        }
      );
    });
  }
}
