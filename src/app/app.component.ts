import { Component } from '@angular/core';
import { HeaderComponent } from './shared/components/header/header.component';
import { SidenavComponent } from './shared/components/sidenav/sidenav.component';
import { MenuStructBean } from './bean';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, SidenavComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = '';

  opened = false;

  setSidenavOpen: (value: boolean) => void = () => {};

  constructor() {}

  changeTitle(item: MenuStructBean) {
    this.title = item?.title;
  }

  onClickToggle() {
    console.log('app', this.opened);
    
    this.opened = !this.opened;
    this.setSidenavOpen(this.opened);
  }
}
