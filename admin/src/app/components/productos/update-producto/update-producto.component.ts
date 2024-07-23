import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../../sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router'; // Importa RouterModule
import { AdminService } from '../../../services/admin.service';
import { NgxTinymceModule } from 'ngx-tinymce';
import { ProductoService } from '../../../services/producto.service';
import { Router } from '@angular/router'; // Importa RouterModule
import { GLOBAL } from '../../../services/GLOBAL';
declare var iziToast: any;
declare var jQuery: any;
declare var $: any;
@Component({
  selector: 'app-update-producto',
  standalone: true,
  imports: [SidebarComponent, CommonModule,FormsModule, RouterModule,NgxTinymceModule],
  templateUrl: './update-producto.component.html',
  styleUrl: './update-producto.component.css'
})
export class UpdateProductoComponent implements OnInit {
  public producto : any ={};
  public config: any={};
  public token:any ;
  public id:any;
  public imgSelect : String | ArrayBuffer | null |undefined; 
  public url:any;
  public file: File | undefined;
  
  constructor(
    private _productoService : ProductoService,
    private _adminService : AdminService,
    private _route: ActivatedRoute,
    private _router: Router
  ){
    this.config={
      heigh: 500
    }

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
                  this.producto=response.undefined;
                  
              }else{
                  this.producto=response.data;
                  this.imgSelect=this.url+'obtener_portada/'+this.producto.portada;
                  
              }
          },error=>{
            console.log(error);
          }
        )
      }
    )
  }

  actualizar(actualizarForm: any){
    if (actualizarForm.valid){
      var data: any ={}; 
      if(this.file != undefined ){
          data.portada=this.file;
      }
      
      data.titulo= this.producto.titulo;
      data.stock= this.producto.stock;
      data.precio= this.producto.precio;
      data.categoria= this.producto.categoria;
      data.descripcion= this.producto.descripcion;
      data.contenido= this.producto.contenido;
      
      this._productoService.actualizar_producto_admin(data,this.id,this.token).subscribe(
        response=>{
          console.log(response);
          iziToast.show({
            title: 'SUCESS',
            titleColor: '#74c822',
            color: '#FFF',
            class: 'text-succes',
            position: 'topRight',
            message: 'Producto Modificado'
          });
       
          this._router.navigate(['/panel/productos'])
        },
        error=>{
          console.log(error);
        }
      )

    }else{
      iziToast.show({
        title: 'ERROR',
        titleColor: '#FF0000',
        color: '#FFF',
        class: 'text-danger',
        position: 'topRight',
        message: 'Los datos del formulario no son validos'
      });
    }
  }



  fileChangeEvent(event :any){
    var file: any;
    if (event.target.files && event.target.files[0]){
       file = <File>event.target.files[0];

    } else{
      iziToast.show({
        title: 'ERROR',
        titleColor: '#FF0000',
        color: '#FFF',
        class: 'text-danger',
        position: 'topRight',
        message: 'No hay una imagen de envio'
      });
    }

    if (file.size <=  4000000){
        if (file.type== 'image/png' || file.type == 'image/jpg' || file.type == 'image/webp' || file.type == 'image/gif' || file.type == 'image/jpeg' ){
            const reader = new FileReader();
            reader.onload=e=>this.imgSelect = reader.result;
            reader.readAsDataURL(file);
            
            $('#imput-portada').text(file.name);

            this.file = file;
        }else{
          iziToast.show({
            title: 'ERROR',
            titleColor: '#FF0000',
            color: '#FFF',
            class: 'text-danger',
            position: 'topRight',
            message: 'Formato de imagen no permitido'
          });

            this.imgSelect = 'assets/img/01.jpg'
            this.file=undefined;
        }
      
    }else{
        iziToast.show({
          title: 'ERROR',
          titleColor: '#FF0000',
          color: '#FFF',
          class: 'text-danger',
          position: 'topRight',
          message: 'La imagen no puede superar los 4mb'
      });
      this.imgSelect = 'assets/img/01.jpg'
      this.file=undefined;
    }
      console.log(this.file);
    }
  
}
