import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, delay, map, of, tap } from 'rxjs';
import { Country } from '../interfaces/country.interface';
import { CachedStore } from '../interfaces/cached-store.interface';
import { Region } from '../interfaces/region.type';

@Injectable({ providedIn: 'root' })
export class CountriesService {
  private apiUrl: string = 'https://restcountries.com/v3.1';
  cacheStore: CachedStore = {
    byCapital: { term: '', countries: [] },
    byRegion: { region: '', countries: [] },
    byCountryName: { term: '', countries: [] },
  };

  constructor(private http: HttpClient) {
    this.loadFromLocalStorage();
  }

  private saveToLocalStorage() {
    localStorage.setItem('cachedStore', JSON.stringify(this.cacheStore));
  }

  private loadFromLocalStorage() {
    if (!localStorage.getItem('cachedStore')) return;
    this.cacheStore = JSON.parse(localStorage.getItem('cachedStore')!);
  }

  searchCountryByCapital(capital: string): Observable<Country[]> {
    const url = `${this.apiUrl}/capital/${capital}`;
    return this.getCountriesReq(url).pipe(
      tap(
        (countries) =>
          (this.cacheStore.byCapital = { term: capital, countries })
      ),
      tap(() => this.saveToLocalStorage())
    );
  }

  searchCountryByName(countryName: string): Observable<Country[]> {
    const url = `${this.apiUrl}/name/${countryName}`;
    return this.getCountriesReq(url).pipe(
      tap(
        (countries) =>
          (this.cacheStore.byCountryName = { term: countryName, countries })
      ),
      tap(() => this.saveToLocalStorage())
    );
  }

  searchCountryByAlphaCode(code: string): Observable<Country | null> {
    const url = `${this.apiUrl}/alpha/${code}`;
    return this.http.get<Country[]>(url).pipe(
      map((countries) => (countries.length > 0 ? countries[0] : null)),
      catchError((err) => of(null))
    );
  }

  searchRegion(region: Region): Observable<Country[]> {
    const url = `${this.apiUrl}/region/${region}`;
    return this.http.get<Country[]>(url).pipe(
      tap((countries) => (this.cacheStore.byRegion = { region, countries })),
      tap(() => this.saveToLocalStorage()),
      catchError((err) => of([]))
    );
  }

  private getCountriesReq(url: string): Observable<Country[]> {
    return this.http.get<Country[]>(url).pipe(
      delay(900),
      catchError((err) => of([]))
    );
  }
}
