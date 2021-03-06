import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PasswordComponent } from './password/password.component';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [PasswordComponent],
  imports: [CommonModule, IonicModule, ReactiveFormsModule],
  exports: [PasswordComponent],
})
export class ComponentsModule {}
