import {
  DeviceMotion,
  DeviceMotionAccelerationData,
  DeviceMotionAccelerometerOptions,
} from '@ionic-native/device-motion/ngx';
import { Flashlight } from '@ionic-native/flashlight/ngx';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { SystemService } from '../utility/services/system.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AlarmService {
  public isActive: boolean = false;
  private watcher: any;
  public clave: string = '';
  flagFlash: boolean = true;
  flagVibra: boolean = true;
  flagLeft: boolean = true;
  flagRight: boolean = true;

  constructor(
    private deviceMotion: DeviceMotion,
    private system: SystemService,
    private flashlight: Flashlight,
    private storage: Storage
  ) {}

  Active() {
    let option: DeviceMotionAccelerometerOptions = {
      frequency: 100,
    };
    try {
      this.watcher = this.deviceMotion
        .watchAcceleration(option)
        .subscribe((acc: DeviceMotionAccelerationData) => {
          if (acc.y <= -3 && this.flagVibra == true) {
            this.flagVibra = false;
            this.system.playAudio('vertical');
            this.system.vibration.vibrate(5000);
            setTimeout(() => {
              this.system.stopAudio('vertical');
              this.system.vibration.vibrate(0);
            }, 5000);
          } else if (acc.y >= -1 && this.flagVibra == false) {
            this.flagVibra = true;
            this.system.vibration.vibrate(0);
          }

          if (acc.y >= 3 && this.flagFlash == true) {
            this.flagFlash = false;
            this.system.playAudio('horizontal');
            this.flashlight.switchOn();
            setTimeout(() => {
              this.system.stopAudio('horizontal');
              this.flashlight.switchOff();
            }, 5000);
          } else if (acc.y <= 1 && this.flagFlash == false) {
            this.flagFlash = true;
            this.flashlight.switchOff();
          }

          if (acc.x >= 5 && this.flagRight == true) {
            this.system.playAudio('derecha');
            this.flagRight = false;
          } else if (acc.x <= 3 && this.flagRight == false) {
            this.flagRight = true;
            this.system.stopAudio('derecha');
          }

          if (acc.x <= -5 && this.flagLeft == true) {
            this.flagLeft = false;
            this.system.playAudio('izquierda');
          } else if (acc.x >= -3 && this.flagLeft == false) {
            this.flagLeft = true;
            this.system.stopAudio('izquierda');
          }
        });
    } catch (error) {}
  }

  async armedAlarm() {
    try {
      this.clave = await this.storage.get('clave');
      this.Active();
      this.system.vibration.vibrate([200, 0, 200, 0]);
      this.system.playAudio('activado');
      this.isActive = true;
    } catch (error) {
      this.system.presentToastError('');
    }
  }

  disableAlarm(clave: string) {
    if (clave !== this.clave) return false;

    this.watcher.unsubscribe();
    this.system.vibration.vibrate(0);
    this.flashlight.switchOff();
    this.isActive = false;
    return true;
  }
}
