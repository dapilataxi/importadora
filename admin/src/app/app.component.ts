import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InicioComponent } from './components/inicio/inicio.component';
import { LoginComponent } from './components/login/login.component';
import { IndexClienteComponent } from './components/clientes/index-cliente/index-cliente.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { EditClienteComponent } from './components/clientes/edit-cliente/edit-cliente.component';
import { CreateProductoComponent } from './components/productos/create-producto/create-producto.component';
import { NgxTinymceModule } from 'ngx-tinymce';
import { IndexProductoComponent } from './components/productos/index-producto/index-producto.component';
import { UpdateProductoComponent } from './components/productos/update-producto/update-producto.component';
import { InventarioProductoComponent } from './components/productos/inventario-producto/inventario-producto.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ 
     CommonModule,
     RouterOutlet,
     RouterLink,
     RouterLinkActive,
     RouterModule,
     FormsModule,
     SidebarComponent,
     LoginComponent,
     InicioComponent,
     IndexClienteComponent,
     NgbPaginationModule,
     EditClienteComponent,
     CreateProductoComponent,
     NgxTinymceModule,
     IndexProductoComponent,
     UpdateProductoComponent,
     InventarioProductoComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
 
  providers: [
    { 
      provide: NgxTinymceModule,
      useValue: NgxTinymceModule.forRoot({
        baseURL: '../../assets/tinymce/'
      })
    }
  ]
})
export class AppComponent {
  title = 'admin';
}
