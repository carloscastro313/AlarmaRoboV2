import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlarmService } from '../../services/alarm.service';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss'],
})
export class PasswordComponent implements OnInit {
  password: FormGroup;

  constructor(
    private modalController: ModalController,
    private formBuilder: FormBuilder,
    private alarm: AlarmService
  ) {}

  ngOnInit() {
    this.password = this.formBuilder.group({
      clave: ['', [Validators.required, Validators.pattern(this.alarm.clave)]],
    });
  }

  cancelar() {
    this.modalController.dismiss();
  }

  unlock() {
    this.alarm.disableAlarm(this.password.value.clave);
    this.cancelar();
  }
}
