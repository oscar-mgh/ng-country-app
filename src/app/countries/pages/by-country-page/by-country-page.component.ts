import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/country.interface';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'by-country-page',
  templateUrl: './by-country-page.component.html',
  styles: ``,
})
export class ByCountryPageComponent implements OnInit {
  countries: Country[] = [];
  isLoading: boolean = false;
  initialValue: string = '';

  constructor(private countriesService: CountriesService) {}

  ngOnInit(): void {
    this.countries = this.countriesService.cacheStore.byCountryName.countries;
    this.initialValue = this.countriesService.cacheStore.byCountryName.term;
  }

  searchCountry(countryName: string) {
    this.isLoading = true;
    this.countriesService
      .searchCountryByName(countryName)
      .subscribe((countries) => {
        this.countries = countries;
        this.isLoading = false;
      });
  }
}
