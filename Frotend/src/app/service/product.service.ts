import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }

  createP(codigo: string,  nombre: string, descripcion: string,precio:string,cantidad:string,categoria: string, foto: File) {
    const formData = new FormData();
    formData.append('codigo', codigo);
    formData.append('nombre', nombre);
    formData.append('descripcion', descripcion);
    formData.append('precio',precio);
    formData.append('cantidad',cantidad)
    formData.append('categoria', categoria);
    formData.append('foto', foto);

    return this.http.post('http://localhost:3000/api/registerp', formData);
  }
   // Cambia la firma del método para aceptar un solo objeto
   createL(data: { name: string, dueño: string, latitud: number, longitud: number }): Observable<any> {
    return this.http.post('http://localhost:3000/api/registerl', data);
};

searchProducts(searchData: any): Observable<any> {
  return this.http.post('http://localhost:3000/api/search', searchData);
}
}
