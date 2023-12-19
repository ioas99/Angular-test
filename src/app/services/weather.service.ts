import { Injectable } from '@angular/core';
import { City } from '../constants/constants';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  baseUrl='https://api.open-meteo.com/v1/forecast'

  constructor(private http : HttpClient) { }

  getForecast(city:City) {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("latitude",city.lat);
    queryParams = queryParams.append("longitude",city.long);
    queryParams = queryParams.append("current",'temperature_2m,precipitation,cloud_cover,wind_speed_10m');
    return this.http.get(this.baseUrl, {params: queryParams});
  }

}
