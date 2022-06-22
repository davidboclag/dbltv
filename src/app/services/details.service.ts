import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DetailsService {

  constructor(private http: HttpClient) { }

  getDetailsMovie(idMovie: number) {
    return this.http.get<any>(`${environment.baseUrl}${environment.urlMovie}/${idMovie}?api_key=${environment.apiTmdb}&language=es-ES`);
  }

  getDetailsTv(idTv: number) {
    return this.http.get<any>(`${environment.baseUrl}${environment.urlTv}/${idTv}?api_key=${environment.apiTmdb}&language=es-ES`);
  }

  getSimilar(id: number, url: string, page: number) {
    return this.http.get<any>(`${environment.baseUrl}${url}/${id}/similar?api_key=${environment.apiTmdb}&language=es-ES&page=${page}`);
  }

  getTrending(type: string) {
    return this.http.get<any>(`${environment.baseUrl}/trending/${type}/day?api_key=${environment.apiTmdb}`);
  }

}
