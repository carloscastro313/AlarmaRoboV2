import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../../../login/services/auth.service';
import { NavController } from '@ionic/angular';
import { AlarmService } from '../../../services/alarm.service';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
})
export class SideMenuComponent implements OnInit {
  @Input() routes: any[] = [];
  constructor(
    public auth: AuthService,
    private nav: NavController,
    public alarma: AlarmService
  ) {}

  ngOnInit() {}

  goto(route: string) {
    this.nav.navigateForward(route);
  }
}
