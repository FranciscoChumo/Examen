import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, FormBuilder,FormGroup, ReactiveFormsModule, Validators  } from '@angular/forms';
import { IonicModule, AlertController } from '@ionic/angular';
import { UsersService } from '../service/users.service';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { FireService } from '../service/fire.service';

@Component({
  selector: 'app-pag',
  templateUrl: './pag.page.html',
  styleUrls: ['./pag.page.scss'],
  standalone: true,
  imports: [IonicModule,  CommonModule, FormsModule,HttpClientModule, ReactiveFormsModule],
  providers:[UsersService]
})
export class PagPage  {
registerForm:FormGroup;

constructor(
private user:UsersService,
private alert:AlertController,
private formBuilder:FormBuilder,
private router:Router, 
private fireService:FireService
) { 
this.registerForm = this.formBuilder.group({
  email:['',Validators.required, Validators.email],
  password:['',Validators.required]
})
}

ngOnInit() {
}
async loginWithFacebook() {
  try {
    await this.fireService.loginWithFacebook();
    this.router.navigateByUrl('admin');
  } catch (error) {
    const alert = await this.alert.create({
      header: 'Error',
      message: 'Error al iniciar sesión con Facebook',
      buttons: ['Ok'],
    });
    await alert.present();
  }
}
async loginWithGoogle() {
  try {
    await this.fireService.loginWithGoogle();
    this.router.navigateByUrl('admin');
  } catch (error) {
    const alert = await this.alert.create({
      header: 'Error',
      message: 'Error al iniciar sesión con Google',
      buttons: ['Ok'],
    });
    await alert.present();
  }
}
async loginWithGithub(){
  try {
    await this.fireService.loginWithGithub();
    this.router.navigateByUrl('admin');
    } catch (error) {
      const alert = await this.alert.create({
        header: 'Error',
        message: 'Error al iniciar sesión con Github',
        buttons: ['Ok'],
        });
        await alert.present();
        }
}
async login(){
if(this.registerForm.invalid){
  const alert=await this.alert.create({
    header: 'Error',
    message: 'Please complete todo los campos',
    buttons: ['OK']
  });
  await alert.present();
  return;
  }

const {email,password}=this.registerForm.value;
this.user.login(email, password).subscribe({
  next: async (data:any) => {
    localStorage.setItem('token',data.token);
    localStorage.setItem('user',data.dataUser.user);2
    localStorage.setItem('email',data.dataUser.email);
    localStorage.setItem('id',data.dataUser.id);
    localStorage.setItem('idp',data.dataUser.idperson);
    localStorage.setItem('idtu',data.dataUser.typeusers_id);
    
    if (data&&data.token) {
      const alert =await this.alert.create({
        header: 'Success',
        message: 'Login successful',
        buttons: ['OK']
      });
      await alert.present();
      this.router.navigate(['/admin']).then(() => {
        // Refresca la página después de la navegación
        window.location.reload() });;;
    }
  },
  error: async (error:any) => {
    const alert =await this.alert.create({
      header: 'Error',
      message: 'Invalid credentials',
      buttons: ['OK']
    });
    await alert.present();
    // Restablece el formulario sin recargar la página
    this.registerForm.reset(); // Restablece todos los campos del formulario
}
})
}
}
