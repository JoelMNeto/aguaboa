import { Component, OnInit } from '@angular/core';
import { HeaderService } from '../../shared/services/header.service';

@Component({
  selector: 'app-produto',
  standalone: true,
  imports: [],
  templateUrl: './produto.component.html',
  styleUrl: './produto.component.scss'
})
export class ProdutoComponent implements OnInit {

  constructor(private headerService: HeaderService) {}

  ngOnInit(): void {
    this.headerService.setPageTitle('Produtos');
  }
}
