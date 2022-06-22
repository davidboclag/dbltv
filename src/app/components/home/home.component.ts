import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DetailsService } from 'src/app/services/details.service';
import { GenreService } from 'src/app/services/genre.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  type: string = "movie";
  recommendations: any = [];
  stateOptions: any[] = [];
  dataGenre: any[] = [];

  constructor(private route: ActivatedRoute, private router: Router, private datilsService: DetailsService, private genreService: GenreService) {
    this.stateOptions = [{ label: 'Películas', value: 'movie' }, { label: 'TV\'s', value: 'tv' }];
  }

  ngOnInit(): void {
    this.loadRecommendations();
  }

  loadRecommendations(type?: any) {
    this.recommendations = {};
    if (type) this.type = type;
    if (this.type === "movie") {
      this.genreService.getGenreMovie().subscribe(data => {
        this.dataGenre = data.genres;
        this.datilsService.getTrending(this.type).subscribe(details => {
          this.recommendations = details;
        }, error => console.log(error));
      }, error => console.log(error));
    } else {
      this.genreService.getGenreTvProgram().subscribe(data => {
        this.dataGenre = data.genres;
        this.datilsService.getTrending(this.type).subscribe(details => {
          this.recommendations = details;
        }, error => console.log(error));
      }, error => console.log(error));
    }
  }

  loadRecommendationsLazy(event: any) {
    // console.log(event);
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
