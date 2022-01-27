import { Component, OnInit } from '@angular/core';
import { Genre } from 'src/app/models/movie.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  constructor(private apiService: ApiService) {}

  public searchMovie: string = '';
  public genresMovies: Genre[] = [];

  ngOnInit(): void {
    this.getGenresMovies();
    this.scroll();
  }

  //===================================================================================
  //===================================================================================
  getGenresMovies() {
    this.apiService.getGenresMovies().subscribe({
      next: (genres) => {
        this.genresMovies = genres;
      },
      error: (err) => {
        console.log(err.error);
      },
    });
  }

  //===================================================================================
  //===================================================================================
  scroll = (): void => {
    var nav = document.querySelector('nav');
    window.addEventListener('scroll', function () {
      if (window.scrollY > 100) {
        nav?.classList.add('nav-bgp');
      } else {
        nav?.classList.remove('nav-bgp');
      }
    });
  };
}
