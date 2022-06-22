import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsComponent } from './components/details/details.component';
import { HomeComponent } from './components/home/home.component';
import { MoviesComponent } from './components/movies/movies.component';
import { TvProgramsComponent } from './components/tv-programs/tv-programs.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'movie', component: MoviesComponent },
  { path: 'movie/:id', component: DetailsComponent },
  { path: 'tv', component: TvProgramsComponent },
  { path: 'tv/:id', component: DetailsComponent },
  // { path: '**', component: PageNotFoundComponent },  // Wildcard route for a 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
