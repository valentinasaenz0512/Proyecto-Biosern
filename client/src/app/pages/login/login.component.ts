import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [MessageService],
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    ToastModule,
    ButtonModule
  ]
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  // Usuario y contraseña válidos predefinidos
  validUsername: string = 'admin';
  validPassword: string = 'biosern';

  constructor(private router: Router, private messageService: MessageService) {}

  login() {
    if (this.username === this.validUsername && this.password === this.validPassword) {
      this.messageService.add({ severity: 'success', summary: 'Login Exitoso', detail: 'Bienvenido!' });
      this.router.navigate(['/home']);
    } else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Usuario o contraseña incorrectos' });
    }
  }
}
