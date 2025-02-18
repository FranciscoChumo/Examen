import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators, FormGroup, FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar,  IonCardContent, IonCardHeader, IonCardTitle, IonCard, IonTabButton, IonIcon, IonLabel, IonTabBar } from '@ionic/angular/standalone';
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
  selector: 'app-ilocal',
  templateUrl: './ilocal.page.html',
  styleUrls: ['./ilocal.page.scss'],
  standalone: true,
  imports: [IonTabBar, IonLabel, IonIcon, IonTabButton,  
    IonContent, IonHeader, IonTitle, IonToolbar,RouterLink, 
    CommonModule, ReactiveFormsModule, FormsModule
  ]
})

export class IlocalPage implements OnInit {
  LocForm: FormGroup;

  constructor(private productService: ProductService, private fb: FormBuilder) {
    this.LocForm = this.fb.group({
      name: ['', Validators.required],
      dueño: ['', Validators.required],
      latitud: ['', Validators.required],
      longitud: ['', Validators.required]
    });
    addIcons({ cog, search ,person, mail,create,trash,add,home,close,exit,arrowBack});
    addIcons({ chevronDownCircle, chevronForwardCircle, chevronUpCircle, colorPalette, document, globe });

  }

  ngOnInit() {}

  onSubmit() {
    if (this.LocForm.valid) {
      const { name, dueño, latitud, longitud } = this.LocForm.value;
  
      const payload = {
        name: name,
        dueño: dueño,
        latitud: parseFloat(latitud),
        longitud: parseFloat(longitud)
      };
  
      this.productService.createL(payload).subscribe(
        (response) => {
          alert('Local registrado exitosamente');
        },
        (error) => {
          console.error('Error al registrar:', error);
          alert(`Error al registrar local: ${error.error.message || 'Error desconocido'}`);
        }
      );
    } else {
      alert('Por favor, completa todos los campos correctamente');
    }
  }
}