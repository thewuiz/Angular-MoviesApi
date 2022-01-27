import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Genre, Movie } from 'src/app/models/movie.model';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css'],
})
export class MoviesComponent implements OnInit, OnDestroy {
  constructor(
    private apiService: ApiService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  private subscription: Subscription = new Subscription();

  public movies: Movie[] = [];
  public genresMovies: Genre[] = [];
  public searchMovie: string = '';
  public show_spinner: boolean = false;
  public titulo: string = '';
  public page: number = 1;
  public path: string = '';

  ngOnInit(): void {
    this.getParamsHTTP();
    this.getGenresMovies();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  //===================================================================================
  //============================= GET MOVIES BY NAME ==================================
  getMoviesByName(movieTitle: string, page: number) {
    this.show_spinner = true;
    this.movies = [];

    if (movieTitle)
      this.subscription.add(
        this.apiService.getMovieByTitle(movieTitle, page).subscribe({
          next: (movies) => {
            this.movies = movies;
            this.titulo = `Resultados de la busqueda: ${this.movies.length}`;
            this.show_spinner = false;
          },
          error: (err) => {
            console.log(err.error);
          },
        })
      );
    else this.getPopularMovies();
  }

  //===================================================================================
  //============================= GET POPULAR MOVIES ==================================
  getPopularMovies(page?: number) {
    this.show_spinner = true;
    this.movies = [];

    this.subscription.add(
      this.apiService.getPopularMovies(page).subscribe({
        next: (movies) => {
          this.movies = movies;
          this.titulo = 'Películas más populares del momento';
          this.show_spinner = false;
        },
        error: (err) => {
          Swal.fire('Ups!', err.error.errors[0], 'error');
        },
      })
    );
  }

  //===================================================================================
  //============================= GET MOVIES BY GENRE =================================
  getMoviesByGenre(genreId: string, genreName: string, page: number) {
    this.show_spinner = true;
    this.movies = [];

    this.subscription.add(
      this.apiService.getMoviesByGenre(genreId, page).subscribe({
        next: (movies) => {
          this.movies = movies;
          this.titulo = `Peliculas por genero: ${genreName}`;
          this.show_spinner = false;
        },
        error: (err) => {
          if (this.movies.length === 0) {
            Swal.fire('Ups!', 'Ocurrio un error: ' + err.error.errors, 'error');
            this.router.navigate([this.path, 1]);
          }
        },
      })
    );
  }

  //===================================================================================
  //===================================================================================
  getParamsHTTP() {
    this.path = `/movies-api/page`;
    this.activatedRoute.params.subscribe((params) => {
      const { search, genreId, genreName, page } = params;

      if (page) {
        if (page >= 0) {
          this.page = Number.parseInt(page);
        } else {
          Swal.fire('Ups!', 'La pagina no existe', 'error').then(() => {
            this.router.navigate([this.path, 1]);
          });
        }
      }

      if (search) {
        this.path = `/movies-api/search/${search}/`;
        return this.getMoviesByName(search, page);
      }

      if (genreId) {
        this.path = `/movies-api/genre/${genreId}/${genreName}/`;

        return this.getMoviesByGenre(genreId, genreName, page);
      }

      return this.getPopularMovies(page);
    });
  }

  //===================================================================================
  //============================= GET GENRE NAME ======================================
  getGenreName(genreId: string): string {
    let genreName = '';
    this.genresMovies.forEach((genre) => {
      if (genre.id.toString() === genreId) {
        genreName = genre.name;
      }
    });
    return genreName;
  }

  //===================================================================================
  //============================= GET GENRES MOVIES ===================================
  getGenresMovies() {
    this.subscription.add(
      this.apiService.getGenresMovies().subscribe({
        next: (genres) => {
          this.genresMovies = genres;
        },
        error: (err) => {
          console.log(err.error);
        },
      })
    );
  }

  //===================================================================================
  //============================= PAGINATION MOVIES ===================================
  paginationMovies(page: number, currentPage: number, path: string) {
    if (page > 0 && this.page < 1000) {
      this.page = currentPage + page;
      this.router.navigate([path, this.page]);
    }
    if (this.page > 1 && page < 0) {
      this.page = currentPage + page;
      this.router.navigate([path, this.page]);
    }
  }
}
