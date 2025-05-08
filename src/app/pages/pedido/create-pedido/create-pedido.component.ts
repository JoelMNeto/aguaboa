import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { DialogComponent } from '../../../shared/components/dialog/dialog.component';
import { HeaderService } from '../../../shared/services/header.service';
import { PedidoService } from '../../../shared/services/pedido.service';
import {
  FormaPagamentoEnum,
  PedidoLancamento,
  TipoPedidoEnum,
} from '../../../shared/interfaces/pedido.interface';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-create-pedido',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
  ],
  templateUrl: './create-pedido.component.html',
  styleUrl: './create-pedido.component.scss',
})
export class CreatePedidoComponent {
  form!: FormGroup;

  tiposPedido = [
    {
      viewValue: 'Entrega',
      value: TipoPedidoEnum.ENTREGA,
    },
    {
      viewValue: 'Retirada',
      value: TipoPedidoEnum.RETIRADA,
    },
  ];

  formasDePagamento = [
    {
      viewValue: 'Dinheiro',
      value: FormaPagamentoEnum.DINHEIRO,
    },
    {
      viewValue: 'Pix',
      value: FormaPagamentoEnum.PIX,
    },
    {
      viewValue: 'Cartão',
      value: FormaPagamentoEnum.CARTAO,
    },
    {
      viewValue: 'Saldo em conta',
      value: FormaPagamentoEnum.SALDO,
    },
  ];

  constructor(
    private headerService: HeaderService,
    private router: Router,
    private service: PedidoService,
    private snackbar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.headerService.setPageTitle('Pedido');

    this.form = this.getEmptyForm();
  }

  onSubmit() {
    if (this.form.invalid) {
      this.dialog
        .open(DialogComponent, {
          data: {
            title: 'Erro',
            message: 'Preencha corretamente os campos!',
            buttonOk: true,
            type: 'error',
          },
        })
        .afterClosed()
        .subscribe(() => {
          return;
        });

      return;
    }

    let objToSave = this.buildPedidoLancamentoDTO(this.form);

    this.service
      .lancaPedido(objToSave)
      .pipe(finalize(() => {}))
      .subscribe(() => {
        this.snackbar.open('Pedido lançado com sucesso!', 'Ok');

        this.navigateToHome();
      });
  }

  onCancel() {
    this.navigateToHome();
  }

  private buildPedidoLancamentoDTO(form: FormGroup): PedidoLancamento {
    let getFormValue = (control: string) => form.get(control)?.value;

    return {
      clienteId: getFormValue('clienteId'),
      valorPago: getFormValue('valorPago'),
      frete: getFormValue('frete'),
      tipo: getFormValue('tipo'),
      formaPagamento: getFormValue('formaPagamento'),
      itens: [],
    };
  }

  private getEmptyForm(): FormGroup {
    return new FormGroup({
      clienteId: new FormControl<string>('', {
        nonNullable: true,
        validators: Validators.required,
      }),

      frete: new FormControl<string>(''),

      tipo: new FormControl<string>(''),

      formaPagamento: new FormControl<string>(''),

      valorPago: new FormControl<string>(''),
    });
  }

  private navigateToHome() {
    this.form = this.getEmptyForm();

    this.router.navigateByUrl('/pedido');
  }
}
