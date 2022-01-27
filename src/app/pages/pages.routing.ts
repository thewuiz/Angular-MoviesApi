import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { MoviesComponent } from './movies/movies.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';

const routes: Routes = [
  {
    path: 'movies-api',
    component: PagesComponent,
    children: [
      { path: '', component: MoviesComponent },
      { path: 'page/:page', component: MoviesComponent },
      { path: 'search/:search', component: MoviesComponent },
      { path: 'search/:search/:page', component: MoviesComponent },
      { path: 'genre/:genreId/:genreName', component: MoviesComponent },
      { path: 'genre/:genreId/:genreName/:page', component: MoviesComponent },
      { path: 'movie/:id', component: MovieDetailsComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
