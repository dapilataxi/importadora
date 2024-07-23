import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from '../../sidebar/sidebar.component';
import { NgIf } from '@angular/common';
import { CuponService } from '../../../services/cupon.service';
import { Router } from '@angular/router';


declare var iziToast: any;

@Component({
  selector: 'app-create-cupon',
  standalone: true,
  imports: [RouterLink, FormsModule, SidebarComponent, NgIf],
  templateUrl: './create-cupon.component.html',
  styleUrl: './create-cupon.component.css'
})
export class CreateCuponComponent implements OnInit{

  public token: any;
  public cupon: any = {
    tipo : '',
  };
  public load_btn =false;

  constructor(
    private _cuponService : CuponService,
    private _router: Router
  ) { 
    this.token = localStorage.getItem('token');
  }

  ngOnInit(): void {
  }

  registro(registroForm: any){
    if(registroForm.valid){
      this.load_btn = true;
      this._cuponService.registro_cupon_admin(this.cupon, this.token).subscribe(
        response => {
          iziToast.show({
            title: 'SUCESS',
            titleColor: '#74c822',
            color: '#FFF',
            class: 'text-succes',
            position: 'topRight',
            message: 'Cupón Registrado'
          });

          this.load_btn = false;
          this._router.navigate(['/panel/cupones']);

        },
        error => {
          console.log(error);
          this.load_btn = false;
        }
      );

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
}
