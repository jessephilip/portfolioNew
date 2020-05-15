import { Body, Controller, HttpCode, Post } from '@nestjs/common';

import GetWeatherRequest from './requests/get-weather.request';
import { WeatherService } from './weather.service';

@Controller('weather')
export class WeatherController {
  constructor(private weatherService: WeatherService) {}

  // TODO: Refactor this route as a GET
  @Post()
  @HttpCode(200)
  public getWeather(@Body() request: GetWeatherRequest) {
    return this.weatherService.getWeather(request.lng, request.lat);
  }
}
