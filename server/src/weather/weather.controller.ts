import { BadRequestException, Controller, Get, Query } from '@nestjs/common';
import { throwError } from 'rxjs';

import { WeatherService } from './weather.service';

@Controller('weather')
export class WeatherController {
  constructor(private weatherService: WeatherService) {}

  @Get()
  public getWeather(@Query('lat') lat: number, @Query('lon') lon: number) {
    if (
      lat === undefined ||
      lat === null ||
      lon === undefined ||
      lon === null
    ) {
      return throwError(new BadRequestException('Lat and Lon are required'));
    }
    return this.weatherService.getWeather(lat, lon);
  }

  @Get('test')
  public testWeather() {
    return this.weatherService.testWeather();
  }
}
