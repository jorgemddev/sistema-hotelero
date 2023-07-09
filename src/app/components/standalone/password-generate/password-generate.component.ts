import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import {  FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  standalone:true,
  imports:[CommonModule,FormsModule],
  selector: 'app-password-generate',
  templateUrl: './password-generate.component.html',
  styleUrls: ['./password-generate.component.css']
})
export class PasswordGenerateComponent {
  constructor(private toast:ToastrService){}
  length = 8;
  uppercase = false;
  specialChars = false;
  password = '';

  @Output()
  result: EventEmitter<string> = new EventEmitter();

  generatePassword() {
    let chars = 'abcdefghijklmnopqrstuvwxyz';
    if (this.uppercase) {
      chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    }
    if (this.specialChars) {
      chars += '!@#$%^&*()_+-=[]{}|;:,.<>?';
    }

    let newPassword = '';
    for (let i = 0; i < this.length; i++) {
      newPassword += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    this.result.emit(newPassword);
    this.password = newPassword;
  }
  copyPassword() {
    const textarea = document.createElement('textarea');
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    textarea.value = this.password;
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    this.toast.info("¡Contraseña copiada al portapapeles!");
  }
  
}