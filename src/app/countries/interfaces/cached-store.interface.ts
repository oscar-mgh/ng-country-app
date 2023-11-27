import { Country } from './country.interface';
import { Region } from './region.type';

export interface CachedStore {
  byCapital:     TermCountries;
  byRegion:      RegionCountries;
  byCountryName: TermCountries;
}

interface TermCountries {
  term: string;
  countries: Country[];
}

interface RegionCountries {
  region: Region;
  countries: Country[];
}
