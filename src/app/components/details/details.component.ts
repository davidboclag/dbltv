import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DetailsService } from 'src/app/services/details.service';
import { GenreService } from 'src/app/services/genre.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  id: number = 0;
  details: any = {};
  dataGenre: any[] = [];
  ratingPorcentaje: number = 0;
  page: number = 0;
  recommendations: any = [];
  isMovie: boolean = false;

  constructor(private route: ActivatedRoute, private router: Router, private datilsService: DetailsService, private genreService: GenreService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params["id"];
      this.loadDetails();
    });
  }

  loadDetails() {
    // Según el path de la URL, atacamos al endpoint de movie o tv
    if (this.router.url.indexOf("movie") !== -1) {
      this.isMovie = true;
      this.genreService.getGenreMovie().subscribe(data => {
        this.dataGenre = data.genres;
        this.datilsService.getDetailsMovie(this.id).subscribe(details => {
          this.details = details;
          this.ratingPorcentaje = details.vote_average * 10;
          // Cargamos recomendaciones del movie
          this.getRecommendations();
        }, error => console.log(error));
      }, error => console.log(error));
    } else {
      this.genreService.getGenreTvProgram().subscribe(data => {
        this.dataGenre = data.genres;
        this.datilsService.getDetailsTv(this.id).subscribe(details => {
          this.details = details;
          this.ratingPorcentaje = details.vote_average * 10;
          // Cargamos recomendaciones del TV show
          this.getRecommendations();
        }, error => console.log(error));
      }, error => console.log(error));
    }
  }

  getRecommendations() {
    this.datilsService.getSimilar(this.id, this.isMovie ? environment.urlMovie : environment.urlTv, this.page = 1).subscribe(recommendations => {
      this.recommendations = recommendations;
    }, error => console.log(error));
  }

  loadRecommendationsLazy(event: any) {
    // console.log(event);
  }

  getGenresById(genres: any[]) {
    if (genres.length > 0) {
      let cadena = "";
      let operator: string = ", ";
      genres.forEach((genre: any, index: number) => {
        if (index === 0) {
          cadena += genre.name;
        } else if (index === genres.length - 1) {
          operator = " y ";
          cadena += operator + genre.name;
        } else {
          cadena += operator + genre.name;
        }
      });
      return cadena;
    } else {
      return genres[0].name;
    }
  }

  getGenresRecommendationById(genres: any[]) {
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
