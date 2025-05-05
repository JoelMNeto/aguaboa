import { Component } from '@angular/core';
import { HeaderComponent } from './shared/components/header/header.component';
import { SidenavComponent } from './shared/components/sidenav/sidenav.component';
import { MenuStructBean } from './bean';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { menu } from './bean';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, SidenavComponent, MatListModule, RouterModule, MatIconModule, MatListModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  opened = false;

  menuList: MenuStructBean[] = menu;

  setSidenavOpen: (value: boolean) => void = () => {};

  constructor() {}

  onClickToggle() {
    this.opened = !this.opened;
    this.setSidenavOpen(this.opened);
  }

  closeSidenav() {
    this.setSidenavOpen(false);
  }
}
