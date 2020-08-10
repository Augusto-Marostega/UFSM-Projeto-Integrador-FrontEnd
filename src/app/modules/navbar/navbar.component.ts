import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {


  public tipo_usuario?: String = 'cliente';

  constructor() { }

  ngOnInit(): void {
    console.log('nav bar teste');
  }

}
