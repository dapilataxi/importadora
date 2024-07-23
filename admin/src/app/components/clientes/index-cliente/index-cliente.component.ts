import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../../sidebar/sidebar.component';
import { ClienteService } from '../../../services/cliente.service';
import { response } from 'express'
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router'; // Importa RouterModule
import { CommonModule } from '@angular/common';
import { AdminService } from '../../../services/admin.service';
import { ChangeDetectorRef } from '@angular/core';
declare var iziToast: any;
declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-index-cliente',
  standalone: true,
  imports: [ SidebarComponent, CommonModule,RouterModule, FormsModule, NgbPaginationModule],
  templateUrl: './index-cliente.component.html',
  styleUrl: './index-cliente.component.css'
})
  export class IndexClienteComponent implements OnInit {
    public clientes : Array<any>=[];
    public filtro_cedula='';
    public filtro_correo='';
    public page = 1;
    public pageSize =2;
    public token;
    public load_data=true;
    constructor(
    private _clienteService:ClienteService,
    private _adminService: AdminService,
    private cdr: ChangeDetectorRef
  ){
    this.token=this._adminService.getToken();
  }

  ngOnInit(): void { 
    this.init_Data();
  }

    init_Data(){
      this._clienteService.listar_clientes_filtro_admin(null,null,this.token).subscribe(
        response=>{
          this.clientes = response.data;
          this.load_data=false;
          // setTimeout(()=>{
           
          // },2000)
          
        },
        error=>{
          console.log(error);
        }
  
      );
    }

  filtro(tipo:any){
   if (tipo== 'dni'){
      if(this.filtro_cedula){
        this.load_data=true;
        this._clienteService.listar_clientes_filtro_admin(tipo,this.filtro_cedula,this.token).subscribe(
          response=>{
            this.clientes = response.data;
          setTimeout(()=>{
            this.load_data=false;
           },500);
            
          },
          error=>{
            console.log(error);
          }
    
        );
      }else{
        this.init_Data();
      }
   }else if (tipo== 'correo'){
      if(this.filtro_correo){
        this.load_data=true;
        this._clienteService.listar_clientes_filtro_admin(tipo,this.filtro_correo,this.token).subscribe(
          response=>{
            this.clientes = response.data;
            setTimeout(()=>{
              this.load_data=false;
             },500);
          },
          error=>{
            console.log(error);
          }
    
        );
      }else{
        this.init_Data();
      }
   }
  
  }

  eliminar(id:any){
    this._clienteService.eliminar_cliente_admin(id,this.token).subscribe(
      response=>{
          iziToast.show({
            title: 'SUCESS',
            titleColor: '#74c822',
            color: '#FFF',
            class: 'text-succes',
            position: 'topRight',
            message: 'Usuario Eliminado'
          });
          $('#delete-'+id).modal('hide');
          $('body').removeClass('modal-open');
          $('.modal-backdrop').remove();
          this.init_Data();
          this.cdr.detectChanges();
      },
      error=>{
        console.log(error);
      }

    )
  }
}
