import { Component, OnInit } from '@angular/core';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

import { WeatherService } from '../../services/weather.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent implements OnInit {
  constructor(private weatherService: WeatherService) {}

  public weather$ = this.weatherService.getWeather$;
  public faSpinner = faSpinner;

  public ngOnInit(): void {}

  public displayWeatherIcon(code: string) {
    return `http://openweathermap.org/img/wn/${code}@2x.png`;
  }

  public setWeatherIconTitle(main: string, description: string) {
    return `${main} (${description})`;
  }

  public displayLocation(
    name: string,
    coordinates: { lat: number; lon: number }
  ) {
    return `${name} (${coordinates.lat}, ${coordinates.lon})`;
  }

  // the open weather api returns a date in seconds, but the Angular date pipe wants it in milliseconds
  public calculateDate(date: number) {
    return date * 1000;
  }

  public displayWindDirection(degree: number) {
    return this.weatherService.getCardinalDirection(degree);
  }
}
