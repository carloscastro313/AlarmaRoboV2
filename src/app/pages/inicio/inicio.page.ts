import { Component, OnInit } from '@angular/core';
import { AlarmService } from '../../services/alarm.service';
import { ModalController } from '@ionic/angular';
import { PasswordComponent } from '../../components/password/password.component';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
  constructor(
    public alarma: AlarmService,
    private modalController: ModalController
  ) {}

  ngOnInit() {}

  async lock() {
    if (this.alarma.isActive) {
      await this.presentModal();
    } else {
      this.alarma.armedAlarm();
    }
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: PasswordComponent,
      swipeToClose: true,
      presentingElement: await this.modalController.getTop(), // Get the top-most ion-modal
    });
    return await modal.present();
  }
}
