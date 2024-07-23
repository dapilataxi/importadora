import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { InicioComponent } from './components/inicio/inicio.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ 
    CommonModule,
     RouterOutlet,
     RouterLink,
     RouterLinkActive,
     RouterModule,
     InicioComponent

  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'tienda';
}
