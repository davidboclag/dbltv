import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {
  url: string = `https://api.themoviedb.org/3/movie/popular?api_key=${environment.apiTmdb}&language=es-ES`;
  urlGenre: string = `https://api.themoviedb.org/3/genre/movie/list?api_key=${environment.apiTmdb}&language=en-US`;

  movies: any[] = [];
  page: number = 1;
  rows: number = 20;
  totalRecords: number = 400;
  dataGenre: any[] = [];

  constructor(private http: HttpClient, private primengConfig: PrimeNGConfig) { }

  ngOnInit(): void {
    this.getGenreMovie();
    this.primengConfig.ripple = true;
  }

  getMoviesPopulars() {
    this.http.get<any>(this.url + "&page=" + this.page).subscribe(movies => {
      this.movies = movies.results;
      // this.totalRecords = movies.total_pages; Tienen en la api un límite de 500 paginas y lo sobrepasaba.
    }, error => console.log(error));
  }

  loadData(event: any) {
    if (event.first === 0) {
      this.page = 1;
    } else {
      this.page = (event.first / event.rows) + 1;
    }
    this.getMoviesPopulars();
  }

  getGenreMovie() {
    this.http.get<any>(`https://api.themoviedb.org/3/genre/movie/list?api_key=${environment.apiTmdb}&language=en-US`).subscribe(dataGenre => {
      this.dataGenre = dataGenre.genres;
      // this.totalRecords = movies.total_pages; Tienen en la api un límite de 500 paginas y lo sobrepasaba.
    }, error => console.log(error));
  }

  getGenreMovieByMovie(genres: any[]) {
    let results: any = [];
    genres.forEach(idGenre => {
      this.dataGenre.filter(x => {
        if (x.id === idGenre) {
          results.push(x.name);
        }
      });
    });

    if (results.length > 0) {
      let cadena = "";
      let operator: string = ", ";
      results.forEach((genre: string, index: number) => {
        if (index === 0) {
          cadena += genre;
        } else if (index === results.length - 1) {
          operator = " y ";
          cadena += operator + genre;
        } else {
          cadena += operator + genre;
        }
      });
      return cadena;
    } else {
      return results[0].name;
    }
  }
}
