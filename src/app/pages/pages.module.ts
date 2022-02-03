import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//
import { PagesComponent } from './pages.component';
import { MoviesComponent } from './movies/movies.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { ComponentsModule } from '../components/components.module';
import { SharedModule } from '../shared/shared.module';
import { SafePipe } from '../pipes/safe.pipe';

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
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    ComponentsModule,
  ],
})
export class PagesModule {}
