import { Component, OnInit } from '@angular/core';
import { HeaderService } from '../../shared/services/header.service';

@Component({
  selector: 'app-cliente',
  standalone: true,
  imports: [],
  templateUrl: './cliente.component.html',
  styleUrl: './cliente.component.scss'
})
export class ClienteComponent implements OnInit {

  constructor(private headerService: HeaderService) {}

  ngOnInit(): void {
    this.headerService.setPageTitle('Clientes');
  }
}
