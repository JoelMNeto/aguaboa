import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MenuStructBean } from '../../../bean';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [MatSidenavModule, MatListModule, RouterModule],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss',
})
export class SidenavComponent implements OnInit {

  @Output()
  selectedItem: EventEmitter<MenuStructBean> = new EventEmitter();

  @Output()
  setOpenedValueFn: EventEmitter<(value: boolean) => void> = new EventEmitter();

  opened = true;

  menuList: MenuStructBean[] = [];

  constructor() {}

  ngOnInit(): void {
    this.setMenuList();
    this.setOpenedValueFn.emit(this.setOpenedValue);
  }

  triggerMenuEvent(item: MenuStructBean) {
    this.selectedItem.emit(item);
  }

  setOpenedValue(value: boolean) {
    console.log(this.opened);
    
    this.opened = value;
  }

  private setMenuList() {
    this.menuList = [
      {
        path: '',
        title: 'Clientes',
        menuListName: 'Clientes',
      },
      {
        path: '/produto',
        title: 'Produtos',
        menuListName: 'Produtos',
      },
      {
        path: '/pedido',
        title: 'Pedidos',
        menuListName: 'Pedidos',
      },
    ];
  }
}
