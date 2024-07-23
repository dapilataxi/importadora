import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../../sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { AdminService } from '../../../services/admin.service';
import { NgxTinymceModule } from 'ngx-tinymce';
import { ProductoService } from '../../../services/producto.service';
import { Router } from '@angular/router'; // Importa RouterModule
import { GLOBAL } from '../../../services/GLOBAL';
declare var iziToast: any;
declare var jQuery: any;
declare var $: any;
@Component({
  selector: 'app-inventario-producto',
  standalone: true,
  imports: [SidebarComponent, CommonModule,FormsModule, RouterModule],
  templateUrl: './inventario-producto.component.html',
  styleUrl: './inventario-producto.component.css'
})
export class InventarioProductoComponent implements OnInit {
  public token:any ;
  public url:any;
  public id:any;
  public producto : any ={};
  public inventarios : Array<any>= [];
  constructor(
    private _productoService : ProductoService,
    private _adminService : AdminService,
    private _route: ActivatedRoute,
    private _router: Router,
    private cdr: ChangeDetectorRef
  ){

    this.token= this._adminService.getToken();
    this.url=GLOBAL.url;
  }

  ngOnInit(): void {
    this._route. params.subscribe(
      params=>{
        this.id = params['id'];
        this._productoService.obtener_producto_admin(this.id, this.token).subscribe(
          response=>{
              console.log(response);
              if (response.data==undefined){
                  this.producto=undefined;
                  
              }else{
                  this.producto=response.data;
                  this._productoService.listar_inventario_producto_admin(this.producto._id, this.token).subscribe(
                    response =>{
                        this.inventarios = response.data;
                    },
                    error => {
                      console.log(error);
                    }

                  )
              }
          },error=>{
            console.log(error);
          }
        )
      }
    )
  }


eliminar(id: any){
  this._productoService.eliminar_inventario_producto_admin(id,this.token).subscribe(
    response=>{
        iziToast.show({
          title: 'SUCESS',
          titleColor: '#74c822',
          color: '#FFF',
          class: 'text-succes',
          position: 'topRight',
          message: 'Producto Eliminado'
        });
        $('#delete-'+id).modal('hide');
        $('body').removeClass('modal-open');
        $('.modal-backdrop').remove();
        this._productoService.listar_inventario_producto_admin(this.producto._id, this.token).subscribe(
          response =>{
              this.inventarios = response.data;
          },
          error => {
            console.log(error);
          }

        )
        this.cdr.detectChanges();
      
    },
    error=>{
      iziToast.show({
        title: 'ERROR',
        titleColor: '#FF0000',
        color: '#FFF',
        class: 'text-danger',
        position: 'topRight',
        message: 'Error al eliminar'
      });
    }

  )
}
}
