import { Component, Input } from '@angular/core';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'country-table',
  templateUrl: './country-table.component.html',
  styles: ``,
})
export class CountryTableComponent {
  @Input()
  countries: Country[] = [];

  @Input()
  noResults: string = '';
}
