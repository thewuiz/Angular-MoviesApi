import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//
import { MoviesComponent } from './movies/movies.component';
import { SharedModule } from '../shared/shared.module';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { SafePipe } from '../pipes/safe.pipe';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  declarations: [
    MoviesComponent,
    PagesComponent,
    MovieDetailsComponent,
    SafePipe,
  ],
  exports: [MoviesComponent, MovieDetailsComponent],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
  ],
})
export class PagesModule {}
