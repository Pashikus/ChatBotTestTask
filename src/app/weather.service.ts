import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class WeatherService {
  currentWeather : string = '';

  constructor(private http: HttpClient) { }
  

/**
* getCurrentWeather
* Retrieves the current weather information for a specified city.
* @param city: The name of the city for which to fetch the weather information.
* @returns A promise that resolves to the current weather data in the specified city.
* @example
* getCurrentWeather("New York") 
* Note: This function relies on an HTTP request to the "https://wttr.in" API to fetch the weather information in the specified city. The returned data is in text format.
**/

  getCurrentWeather(city: string) {
    return this.http.get(`https://wttr.in/${city.replace(/ /g, '+')}?format=%C+%t+%w&lang=en`,{responseType: 'text'});
  }
  
}


