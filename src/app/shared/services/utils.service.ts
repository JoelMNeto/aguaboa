import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  formataValorMonetario(value: number) {
    if (value === 0) {
      return '';
    }

    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }
}
