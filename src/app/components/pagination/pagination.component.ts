import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],
})
export class PaginationComponent implements OnInit {
  constructor(private router: Router) {}

  public page: number = 0;
  public path: string = '';

  ngOnInit(): void {}

  //===================================================================================
  //============================= GET GENRES MOVIES ===================================
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
