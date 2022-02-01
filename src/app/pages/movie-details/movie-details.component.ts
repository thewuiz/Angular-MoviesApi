import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Movie, TrailersMovies } from 'src/app/models/movie.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css'],
})
export class MovieDetailsComponent implements OnInit, AfterViewInit, OnDestroy {
  public movie!: Movie;
  public similarMovies: Movie[] = [];
  public trailerMovies: TrailersMovies[] = [];
  public showSpinner: boolean = true;
  private subscription: Subscription = new Subscription();

  constructor(
    private apiService: ApiService,
    private activatedRoute: ActivatedRoute,
    private elementRef: ElementRef
  ) {}

  ngOnInit(): void {
    this.getParamSearch();
  }

  ngAfterViewInit(): void {
    this.sliderSimilarMovies();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  //===================================================================================
  //======================== GET MOVIE BY ID===========================================
  getMovieById(id: string) {
    this.subscription.add(
      this.apiService.getMovieById(id).subscribe({
        next: (movie) => {
          this.movie = movie;
          this.getVideoMovies(movie);
          this.showSpinner = false;
        },
        error: (err) => {
          console.log(err.error);
        },
      })
    );
  }

  //===================================================================================
  //======================== GET ALL VIDEO MOVIE BY ID ================================
  getVideoMovies(movie: Movie) {
    this.subscription.add(
      this.apiService.getVideoMovies(movie.id).subscribe({
        next: (response) => {
          this.trailerMovies = response;
        },
      })
    );
  }

  //===================================================================================
  //===================================================================================
  getParamSearch() {
    this.activatedRoute.params.subscribe((params) => {
      const { id } = params;
      if (id) {
        this.getSimilarMovies(id);
        return this.getMovieById(id);
      }
    });
  }

  //===================================================================================
  //======================== GET SIMILAR MOVIES =======================================
  getSimilarMovies(movieId: string) {
    this.subscription.add(
      this.apiService.getSimilarMovies(movieId).subscribe({
        next: (response) => {
          this.similarMovies = response.slice(0, 10);
        },
        error: (err) => {
          console.log(err);
        },
        complete: () => {
          setTimeout(() => {
            this.sliderSimilarMovies();
          }, 100);
        },
      })
    );
  }

  //===================================================================================
  //===================================================================================
  sliderSimilarMovies() {
    const items =
      this.elementRef.nativeElement.querySelectorAll('.carousel-item');

    items.forEach((el: any) => {
      const minPerSlide = 4;
      let next = el.nextElementSibling;
      for (var i = 1; i < minPerSlide; i++) {
        if (!next) {
          // wrap carousel by using first child
          next = items[0];
        }
        let cloneChild = next.cloneNode(true) as any;
        el.appendChild(cloneChild.children[0]);
        next = next.nextElementSibling;
      }
    });
  }
}
