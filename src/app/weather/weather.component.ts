import { Component, OnInit } from '@angular/core';
import {City, cities} from '../constants/constants'
import { WeatherService } from '../services/weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {

  selectedCities:City[] = cities.slice(0,3);
  citiesOptions = cities;

  constructor(private weatherService : WeatherService) { }

  ngOnInit(): void {
    this.fetchWeatherData();

    setInterval(() => {
      this.fetchWeatherData();
    }, 300000);
  }

  fetchWeatherData(): void {
    cities.forEach(city => {
      this.weatherService.getForecast(city).subscribe((res: any) => {
        city.temp = res.current.temperature_2m;
        city.precipitation = res.current.precipitation;
        city.wind = res.current.wind_speed_10m;
        city.sunny = res.current.cloud_cover;
      });
    });
  }

  async getForecast() {
    await cities.forEach(city => {
       this.weatherService.getForecast(city).subscribe((res:any) => {
        city.temp = res.current.temperature_2m;
        city.precipitation = res.current.precipitation;
        city.wind = res.current.wind_speed_10m;
        city.sunny = res.current.cloud_cover;
      })
    }), 300000
  }

  updateSelectedCities(city: City, selected: boolean): void {
    if (selected) {
      if (this.selectedCities.length < 3) {
        this.selectedCities.push(city);
      }
    } else {
      this.selectedCities = this.selectedCities.filter(c => c !== city);
    }
  }



}
