import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonItem, IonLabel, IonButton, IonList, IonInput, IonTabButton, IonIcon, IonTabBar } from '@ionic/angular/standalone';
import { ProductService } from '../service/product.service';
import { cog, search, person ,mail,create,trash,add, home,close, exit,arrowBack} from 'ionicons/icons';
import { addIcons } from 'ionicons';
import{ chevronDownCircle,
  chevronForwardCircle,
  chevronUpCircle,
  colorPalette,
  document,
  globe,}from 'ionicons/icons';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-searchnc',
  templateUrl: './searchnc.page.html',
  styleUrls: ['./searchnc.page.scss'],
  standalone: true,
  imports: [IonTabBar,RouterLink, IonIcon, IonTabButton, IonInput, IonList, IonButton, ReactiveFormsModule, IonLabel, IonItem, IonCardContent, IonCardTitle, IonCardHeader, IonCard, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, ]
})
export class SearchncPage implements OnInit {
  searchForm: FormGroup;
  products: any[] = [];

  constructor(private fb: FormBuilder, private productService: ProductService) {
    // Inicializamos el formulario con validaciones
    this.searchForm = this.fb.group({
      nombre: ['', ], // Campo obligatorio
      categoria: ['']
    });
    addIcons({ cog, search ,person, mail,create,trash,add,home,close,exit,arrowBack});
    addIcons({ chevronDownCircle, chevronForwardCircle, chevronUpCircle, colorPalette, document, globe });

  }
  ngOnInit() {
  }
// Método para realizar la búsqueda
onSubmit() {
  if (this.searchForm.valid) {
    const { nombre, categoria } = this.searchForm.value;

    // Construir el objeto de filtro dinámico
    const searchData: any = {};

    // Siempre incluir el nombre si está presente
    if (nombre) searchData.nombre = nombre;

    // Siempre incluir la categoría si está presente
    if (categoria) searchData.categoria = categoria;

    // Llamamos al servicio para realizar la búsqueda
    this.productService.searchProducts(searchData).subscribe(
      (response: any) => {
        this.products = response.Buss;  // Aquí guardamos los productos devueltos
        console.log('Productos encontrados:', this.products);
      },
      error => {
        console.error('Error al realizar la búsqueda', error);
      }
    );
  } else {
    console.log('Formulario inválido');
  }
}

}