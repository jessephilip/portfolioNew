import { HttpService, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { WeatherApiResponse } from './models/responses/weather-api.response';

@Injectable()
export class WeatherService {
  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
  ) {}

  public getWeather(lat: number, lon: number): Observable<WeatherApiResponse> {
    const key = this.configService.get('OPEN_WEATHER_API_KEY');
    return this.httpService
      .get(
        `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&units=imperial`,
      )
      .pipe(map(response => response.data));
  }
}
