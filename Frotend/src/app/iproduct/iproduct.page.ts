import { ProductService } from './../service/product.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder,ReactiveFormsModule , FormGroup, FormsModule, Validators } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/angular/standalone';
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
  selector: 'app-iproduct',
  templateUrl: './iproduct.page.html',
  styleUrls: ['./iproduct.page.scss'],
  standalone: true,
  imports: [IonLabel, IonIcon,RouterLink, IonTabButton, IonTabBar,  ReactiveFormsModule,  IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class IproductPage implements OnInit {
  ProForm: FormGroup;
  selectedImage: File | null = null;

  constructor(private productService:ProductService,private fb: FormBuilder) {
    this.ProForm = this.fb.group({
      codigo: ['', Validators.required],
      nombre: ['', Validators.required], 
      descripcion: ['', Validators.required],
      precio: ['', [Validators.required, Validators.min(1)]],
      cantidad: ['', [Validators.required, Validators.min(1)]],
      categoria: ['', Validators.required]
    });
     addIcons({ cog, search ,person, mail,create,trash,add,home,close,exit,arrowBack});
        addIcons({ chevronDownCircle, chevronForwardCircle, chevronUpCircle, colorPalette, document, globe });
    
   }

  ngOnInit() {
  }
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedImage = file;
    }
  }
  onSubmit() {
    if (this.ProForm.valid && this.selectedImage) {
      const { codigo, nombre, descripcion, precio, cantidad ,categoria} = this.ProForm.value;
  
      this.productService.createP(codigo, nombre, descripcion, precio, cantidad, categoria, this.selectedImage).subscribe(
        (response) => {
          alert(' registrado exitosamente');
         // this.router.navigate(['/admin']).then(() => {
            // Refresca la página después de la navegación
           // window.location.reload() });;
        },
        (error) => {
          console.error('Error al registrar:', error);
          alert('Error al registrar ');
        }
      );
    } else {
      alert('Por favor, completa todos los campos y selecciona una imagen');
    }
  }
}
