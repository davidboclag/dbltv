import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { PrimeNGConfig, SelectItem } from 'primeng/api';

@Component({
  selector: 'app-tv-programs',
  templateUrl: './tv-programs.component.html',
  styleUrls: ['./tv-programs.component.scss']
})
export class TvProgramsComponent implements OnInit {
  url: string = `https://api.themoviedb.org/3/tv/popular?api_key=${environment.apiTmdb}&language=es-ES`;
  urlGenre: string = `https://api.themoviedb.org/3/genre/tv/list?api_key=${environment.apiTmdb}&language=en-US`;

  tvPrograms: any[] = [];
  page: number = 1;
  rows: number = 20;
  totalRecords: number = 400;
  dataGenre: any[] = [];

  constructor(private http: HttpClient, private primengConfig: PrimeNGConfig) { }

  ngOnInit(): void {
    this.getGenreTvProgram();
    this.primengConfig.ripple = true;
  }

  getTvProgramsPopulars() {
    this.http.get<any>(this.url + "&page=" + this.page).subscribe(tvPrograms => {
      this.tvPrograms = tvPrograms.results;
      // this.totalRecords = tvPrograms.total_pages; Tienen en la api un límite de 500 paginas y lo sobrepasaba.
    }, error => console.log(error));
  }

  loadData(event: any) {
    if (event.first === 0) {
      this.page = 1;
    } else {
      this.page = (event.first / event.rows) + 1;
    }
    this.getTvProgramsPopulars();
  }

  getGenreTvProgram() {
    this.http.get<any>(`https://api.themoviedb.org/3/genre/tv/list?api_key=${environment.apiTmdb}&language=es-ES`).subscribe(dataGenre => {
      this.dataGenre = dataGenre.genres;
      // this.totalRecords = tvPrograms.total_pages; Tienen en la api un límite de 500 paginas y lo sobrepasaba.
    }, error => console.log(error));
  }

  getGenreTvProgramById(genres: any[]) {
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
