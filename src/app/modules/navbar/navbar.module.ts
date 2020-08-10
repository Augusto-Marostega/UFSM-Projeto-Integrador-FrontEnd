import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar.component';
import { NavSemLoginComponent } from './nav-sem-login/nav-sem-login.component';
import { NavCliComponent } from './nav-cli/nav-cli.component';
import { NavFuncComponent } from './nav-func/nav-func.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    NavbarComponent,
    NavSemLoginComponent,
    NavCliComponent,
    NavFuncComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [NavbarComponent]
})
export class NavbarModule { }
