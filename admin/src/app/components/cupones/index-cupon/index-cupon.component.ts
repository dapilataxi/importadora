import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../../sidebar/sidebar.component';
import { RouterLink } from '@angular/router';
import { NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { CuponService } from '../../../services/cupon.service';
import { NgIf } from '@angular/common';
import { NgFor } from '@angular/common';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';

declare var iziToast: any;
declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-index-cupon',
  standalone: true,
  imports: [SidebarComponent, RouterLink, NgbPagination, FormsModule, NgIf, NgFor, NgbPaginationModule, CommonModule],
  templateUrl: './index-cupon.component.html',
  styleUrl: './index-cupon.component.css'
})
export class IndexCuponComponent implements OnInit {

  public cupones : Array<any>=[];
  public load_data = true;
  public page = 1;
  public pageSize =20;
  public filtro = '';
  public token: any;
  
  constructor(
    private _cuponService: CuponService
  ) { 
    this.token = localStorage.getItem('token');
  }

  ngOnInit(): void {
    this._cuponService.listar_cupones_admin(this.filtro,this.token).subscribe(
      response => {
        this.cupones = response.data;
        this.load_data = false;
      }
    )
  }

  filtrar(){
    this._cuponService.listar_cupones_admin(this.filtro,this.token).subscribe(
      response => {
        this.cupones = response.data;
        this.load_data = false;
      }
    )
  }

  eliminar(id:any){
    this._cuponService.eliminar_cupon_admin(id,this.token).subscribe(
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
          
          this._cuponService.listar_cupones_admin(this.filtro,this.token).subscribe(
            response => {
              this.cupones = response.data;
              this.load_data = false;
            }
          )
      },
      error=>{
        console.log(error);
      }

    )
  }

}
