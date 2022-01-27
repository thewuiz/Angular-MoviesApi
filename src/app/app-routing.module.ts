import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//Rutas
import { RouterModule, Routes } from '@angular/router';
import { PagesRoutingModule } from './pages/pages.routing';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './shared/shared.module';

//
const routes: Routes = [
  { path: '', redirectTo: '/movies-api', pathMatch: 'full' },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes), PagesRoutingModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
