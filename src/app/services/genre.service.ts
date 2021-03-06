import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GenreService {

  constructor(private http: HttpClient) { }

  getGenreMovie() {
    return this.http.get<any>(`${environment.baseUrl}${environment.urlGenre}${environment.urlMovieGenre}?api_key=${environment.apiTmdb}&language=es-ES`);
  }
  getGenreTvProgram() {
    return this.http.get<any>(`${environment.baseUrl}${environment.urlGenre}${environment.urlTvGenre}?api_key=${environment.apiTmdb}&language=es-ES`);
  }
}
