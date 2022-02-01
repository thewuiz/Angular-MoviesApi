import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Genre, Movie, TrailersMovies } from '../models/movie.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private urlEndPoint = environment.base_url;
  private api_key = environment.api_key;

  constructor(private http: HttpClient) {}

  httpParams(titleMovie: string = '', page: number = 1): HttpParams {
    let params = new HttpParams();
    params = params.set('api_key', this.api_key);
    params = params.set('query', titleMovie);
    params = params.set('language', 'es-MX');
    params = params.set('page', page);
    return params;
  }

  //===============================================================================
  //================== GET MOVIE BY ID ==========================================
  getMovieById(id: string): Observable<Movie> {
    let http_params = new HttpParams();
    http_params = http_params.set('api_key', this.api_key);
    http_params = http_params.set('movie_id', id);
    http_params = http_params.set('language', 'es-MX');

    return this.http
      .get<Movie>(`${this.urlEndPoint}/movie/${id}`, {
        params: http_params,
      })
      .pipe(
        map((response) => {
          response as Movie;
          response.poster_path = this.convertPathToImageURL(
            response.poster_path
          );
          return response;
        })
      );
  }

  //===============================================================================
  //================== GET MOVIE BY TITLE =========================================
  getMovieByTitle(titleMovie: string, page: number = 1): Observable<Movie[]> {
    if (page <= 0) page = 1;

    let params = this.httpParams(titleMovie);
    params = params.set('page', page);

    return this.http
      .get<Movie[]>(`${this.urlEndPoint}/search/movie`, {
        params: params,
      })
      .pipe(
        map((response: any) => {
          return response.results.map((movie: Movie) => {
            movie.backdrop_path = this.convertPathToImageURL(
              movie.backdrop_path
            );
            movie.poster_path = this.convertPathToImageURL(movie.poster_path);
            return movie;
          });
        })
      );
  }

  //===============================================================================
  //================== GET MOVIES BY GENRES =======================================
  getMoviesByGenre(id: string, page: number = 1): Observable<Movie[]> {
    let params = this.httpParams();
    params = params.set('with_genres', id);
    params = params.set('page', page);

    if (page <= 0) page = 1;

    return this.http
      .get<Movie[]>(`${this.urlEndPoint}/discover/movie`, {
        params: params,
      })
      .pipe(
        map((response: any) => {
          return response.results.map((movie: Movie) => {
            movie.backdrop_path = this.convertPathToImageURL(
              movie.backdrop_path
            );
            movie.poster_path = this.convertPathToImageURL(movie.poster_path);
            return movie;
          });
        })
      );
  }

  //===============================================================================
  //================== GET ALL POPULAR MOVIES =====================================
  getPopularMovies(page: number = 1): Observable<Movie[]> {
    if (page <= 0) page = 1;

    return this.http
      .get<any[]>(`${this.urlEndPoint}/movie/popular`, {
        params: this.httpParams('', page),
      })
      .pipe(
        map((response: any) => {
          return response.results.map((movie: Movie) => {
            movie.backdrop_path = this.convertPathToImageURL(
              movie.backdrop_path
            );
            movie.poster_path = this.convertPathToImageURL(movie.poster_path);
            return movie;
          });
        })
      );
  }
  //=============================================================================================
  //============================ GET TRAILER VIDEOS =============================================
  getVideoMovies(id: string): Observable<TrailersMovies[]> {
    let params = this.httpParams();
    params = params.delete('page');
    params = params.delete('query');
    params = params.delete('language');

    return this.http
      .get<any[]>(`${this.urlEndPoint}/movie/${id}/videos`, {
        params: params,
      })
      .pipe(
        map((response: any) => {
          let movies = response.results
            .filter((trailer: TrailersMovies) => {
              return (
                trailer.site.toLowerCase() === 'youtube' &&
                trailer.type.toLowerCase() === 'trailer'
              );
            })
            .map((trailer: TrailersMovies) => {
              trailer.key = `https://www.youtube.com/embed/${trailer.key}`;
              return trailer;
            });

          return movies.splice(0, 1) as TrailersMovies[];
        })
      );
  }

  //===============================================================================
  //============================ GET ALL GENRES MOVIES ============================
  getGenresMovies(): Observable<Genre[]> {
    let httpParams = new HttpParams();
    httpParams = httpParams.set('api_key', '08b8f7fca954f13adc0244e8a3ae6d80');
    httpParams = httpParams.set('language', 'es-MX');

    return this.http
      .get<Genre[]>(`${this.urlEndPoint}/genre/movie/list`, {
        params: httpParams,
      })
      .pipe(
        map((response: any) => {
          return response.genres as Genre[];
        })
      );
  }

  //===============================================================================
  //============================ GET ALL GENRES MOVIES ============================
  getSimilarMovies(movieId: string): Observable<Movie[]> {
    let params = this.httpParams();
    params = params.delete('page');
    params = params.delete('query');

    return this.http
      .get<any[]>(`${this.urlEndPoint}/movie/${movieId}/similar`, {
        params: params,
      })
      .pipe(
        map((response: any) => {
          return response.results.map((movie: Movie) => {
            movie.backdrop_path = this.convertPathToImageURL(
              movie.backdrop_path
            );
            movie.poster_path = this.convertPathToImageURL(movie.poster_path);
            return movie;
          });
        })
      );
  }

  //=============================================================================================
  //============================ GET POSTER URL =================================================
  convertPathToImageURL(path: string): string {
    return path
      ? `https://image.tmdb.org/t/p/w500/${path}`
      : 'https://www.publicdomainpictures.net/pictures/280000/velka/not-found-image-15383864787lu.jpg';
  }
}
