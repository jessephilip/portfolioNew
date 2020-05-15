import { Component, OnInit } from '@angular/core';

import { WeatherService } from '../../services/weather.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent implements OnInit {
  constructor(private weatherService: WeatherService) {}

  // TODO: establish the shape of this object
  public weather: any;

  public ngOnInit(): void {
    this.weatherService.getWeather$.subscribe({
      next: (response: any) => {
        this.weather = response;
      },
    });
  }
}
