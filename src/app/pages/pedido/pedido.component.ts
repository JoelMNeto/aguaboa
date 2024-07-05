import { Component, OnInit } from '@angular/core';
import { HeaderService } from '../../shared/services/header.service';

@Component({
  selector: 'app-pedido',
  standalone: true,
  imports: [],
  templateUrl: './pedido.component.html',
  styleUrl: './pedido.component.scss',
})
export class PedidoComponent implements OnInit {

  constructor(private headerService: HeaderService) {}

  ngOnInit(): void {
    this.headerService.setPageTitle('Pedidos');
  }
}
