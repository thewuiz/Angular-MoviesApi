import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [NavbarComponent, FooterComponent],
  exports: [NavbarComponent, FooterComponent],
  imports: [CommonModule, RouterModule, ReactiveFormsModule, FormsModule],
})
export class SharedModule {}
