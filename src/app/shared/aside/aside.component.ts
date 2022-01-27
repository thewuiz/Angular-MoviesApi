import { Component, OnInit } from '@angular/core';
import { Genre } from 'src/app/models/movie.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.css'],
})
export class AsideComponent implements OnInit {
  public genresMovies: Genre[] = [];
  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.getGenresMovies();
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
}
