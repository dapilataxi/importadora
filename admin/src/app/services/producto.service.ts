
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { GLOBAL } from './GLOBAL';
@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  public url: string;

  constructor(
    private _http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: any
  ) {
    this.url = GLOBAL.url;
  }

  registro_producto_admin(data:any,file:any,token:any): Observable<any> {
    let headers = new HttpHeaders({'Authorization':token });
    const fd = new FormData();
    fd.append('titulo', data.titulo);
    fd.append('stock', data.stock);
    fd.append('precio', data.precio);
    fd.append('descripcion', data.descripcion);
    fd.append('contenido', data.contenido);
    fd.append('categoria', data.categoria);
    fd.append('portada', file);
    return this._http.post(this.url + 'registro_producto_admin',fd,{ headers: headers });
  }

  listar_productos_admin(filtro:any, token:any): Observable<any> {
    let headers = new HttpHeaders({'Content-Type': 'application/json','Authorization':token});
    return this._http.get(this.url + 'listar_productos_admin/'+filtro,{ headers: headers });
  }

  obtener_producto_admin(id:any, token:any): Observable<any> {
    let headers = new HttpHeaders({'Content-Type': 'application/json','Authorization':token});
    return this._http.get(this.url + 'obtener_producto_admin/'+id,{ headers: headers });
  }

  actualizar_producto_admin(data:any, id:any,token:any):Observable<any>{
    if (data.portada){
      let headers = new HttpHeaders({'Authorization':token });
      const fd = new FormData();
      fd.append('titulo', data.titulo);
      fd.append('stock', data.stock);
      fd.append('precio', data.precio);
      fd.append('descripcion', data.descripcion);
      fd.append('contenido', data.contenido);
      fd.append('categoria', data.categoria);
      fd.append('portada', data.portada);
      return this._http.put(this.url + 'actualizar_producto_admin/'+id,fd,{ headers: headers });
    }else{
      let headers = new HttpHeaders({'Content-Type': 'application/json','Authorization':token});
      return this._http.put(this.url + 'actualizar_producto_admin/'+id,data,{ headers: headers });
    }
  }

  eliminar_producto_admin(id:any, token:any): Observable<any> {
    let headers = new HttpHeaders({'Content-Type': 'application/json','Authorization':token});
    return this._http.delete(this.url + 'eliminar_producto_admin/'+id,{ headers: headers });
  }

 
   listar_inventario_producto_admin(id:any, token:any): Observable<any> {
    let headers = new HttpHeaders({'Content-Type': 'application/json','Authorization':token});
    return this._http.get(this.url + 'listar_inventario_producto_admin/'+id,{ headers: headers });
  }

  eliminar_inventario_producto_admin(id:any, token:any): Observable<any> {
    let headers = new HttpHeaders({'Content-Type': 'application/json','Authorization':token});
    return this._http.delete(this.url + 'eliminar_inventario_producto_admin/'+id,{ headers: headers });
  }
}
