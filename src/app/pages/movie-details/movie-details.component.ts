import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie, TrailersMovies } from 'src/app/models/movie.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css'],
})
export class MovieDetailsComponent implements OnInit {
  public movie!: Movie;
  public trailerMovies: TrailersMovies[] = [];
  constructor(
    private apiService: ApiService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getParamSearch();
  }

  //===================================================================================
  //======================== GET MOVIE BY ID===========================================
  getMovieById(id: string) {
    this.apiService.getMovieById(id).subscribe({
      next: (movie) => {
        this.movie = movie;
        this.getVideoMovies(movie);
      },
      error: (err) => {
        console.log(err.error);
      },
    });
  }

  //===================================================================================
  //======================== GET ALL VIDEO MOVIE BY ID ================================
  getVideoMovies(movie: Movie) {
    this.apiService.getVideoMovies(movie.id).subscribe({
      next: (response) => {
        this.trailerMovies = response;
      },
    });
  }

  //===================================================================================
  //===================================================================================
  getParamSearch() {
    this.activatedRoute.params.subscribe((params) => {
      const { id } = params;
      if (id) {
        return this.getMovieById(id);
      }
    });
  }
}
