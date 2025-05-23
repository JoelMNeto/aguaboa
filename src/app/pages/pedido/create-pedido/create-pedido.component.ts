import { AfterViewInit, Component, OnInit } from '@angular/core';
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
import { filter, finalize, Subject } from 'rxjs';
import { DialogComponent } from '../../../shared/components/dialog/dialog.component';
import { HeaderService } from '../../../shared/services/header.service';
import { PedidoService } from '../../../shared/services/pedido.service';
import {
  PedidoLancamento,
  TipoPedidoEnum,
  FORMAS_PAGAMENTO,
  CURRENCY_MASK_OPTIONS,
  DisplayItemPedido,
} from '../../../shared/interfaces/pedido.interface';
import { MatSelectModule } from '@angular/material/select';
import { DumpListComponent } from '../../../shared/components/dump-list/dump-list.component';
import {
  ListColumn,
  Pagination,
} from '../../../shared/interfaces/list-component.interface';
import { DialogCreateComponent } from '../dialog/dialog-create/dialog-create.component';
import { UtilsService } from '../../../shared/services/utils.service';
import { AutocompleteComponent } from '../../../shared/components/campos/autocomplete/autocomplete.component';
import { ClienteService } from '../../../shared/services/cliente.service';
import { ClienteInformacoes } from '../../../shared/interfaces/cliente.interface';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-create-pedido',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    DumpListComponent,
    AutocompleteComponent,
    CurrencyMaskModule,
    MatCardModule,
  ],
  templateUrl: './create-pedido.component.html',
  styleUrl: './create-pedido.component.scss',
})
export class CreatePedidoComponent implements OnInit, AfterViewInit {
  itensPedido$: Subject<DisplayItemPedido[]> = new Subject<
    DisplayItemPedido[]
  >();

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

  formasDePagamento = FORMAS_PAGAMENTO;

  itemPedidoColumns: ListColumn[] = [
    {
      label: 'Produto',
      value: 'produtoNome',
    },
    {
      label: 'Quantidade',
      value: 'quantidade',
    },
    {
      label: 'Desconto',
      value: 'desconto',
      format: this.utilsService.formataValorMonetario,
    },
    {
      label: 'Preço unitário',
      value: 'precoUnitario',
      format: this.utilsService.formataValorMonetario,
    },
    {
      label: 'Valor do item',
      value: 'valorItem',
      format: this.utilsService.formataValorMonetario,
    },
    {
      label: '',
      value: 'action',
      icon: 'delete',
      action: (row: DisplayItemPedido) => this.excluiItemPedido(row),
    },
  ];

  currencyMask = CURRENCY_MASK_OPTIONS;

  itensPeidoList: DisplayItemPedido[] = [];

  clienteOptions$ = (pagination: Pagination, filter: any) =>
    this.clienteService.getClientes(pagination, filter);

  displayFormat = (cliente: ClienteInformacoes) =>
    cliente ? `${cliente.id} - ${cliente.nome}` : '';

  detailData = (cliente: ClienteInformacoes) =>
    cliente.endereco
      ? `${cliente.endereco?.logradouro}, ${cliente.endereco?.numero}; ${
          cliente.endereco?.bairro || ''
        }`
      : '';

  valorPedido: string = 'R$ 0,00';

  constructor(
    private headerService: HeaderService,
    private router: Router,
    private service: PedidoService,
    private clienteService: ClienteService,
    private snackbar: MatSnackBar,
    private dialog: MatDialog,
    private utilsService: UtilsService
  ) {}

  ngOnInit(): void {
    this.headerService.setPageTitle('Novo Pedido');

    this.form = this.getEmptyForm();

    this.getFormControl('frete').valueChanges.subscribe(() =>
      this.calculaTotalPedido()
    );
  }

  ngAfterViewInit(): void {
    this.atualizaItens();
  }

  getObservableItensPedido() {
    return this.itensPedido$.asObservable();
  }

  insereNovoItem() {
    this.dialog
      .open(DialogCreateComponent, {
        data: {
          title: 'Inserir item',
          itensPeidoList: this.itensPeidoList,
        },
      })
      .afterClosed()
      .pipe(
        filter((item: DisplayItemPedido) => item !== null && item !== undefined)
      )
      .subscribe((item: DisplayItemPedido) => {
        this.itensPeidoList = [...this.itensPeidoList, item];

        this.calculaTotalPedido();
        this.atualizaItens();
      });
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

  getFormControl(control: string): FormControl {
    return this.form.get(control) as FormControl;
  }

  private calculaTotalPedido(itensList = this.itensPeidoList) {
    if (!itensList || itensList.length <= 0) {
      this.valorPedido = this.utilsService.formataValorMonetario(0);
    }

    this.valorPedido = this.utilsService.formataValorMonetario(
      itensList
        .map(
          (item) => (item.precoUnitario - item.desconto) * item.quantidade || 0
        )
        .reduce((acc, crr) => acc + crr) +
        (Number.parseFloat(this.getFormControl('frete').value) || 0)
    );
  }

  private buildPedidoLancamentoDTO(form: FormGroup): PedidoLancamento {
    let getFormValue = (control: string) => form.get(control)?.value;

    return {
      clienteId: getFormValue('cliente')?.id,
      valorPago: Number.parseFloat(getFormValue('valorPago')),
      frete: Number.parseFloat(getFormValue('frete')),
      tipo: getFormValue('tipo'),
      formaPagamento: getFormValue('formaPagamento'),
      itens: this.itensPeidoList,
    };
  }

  private getEmptyForm(): FormGroup {
    return new FormGroup({
      cliente: new FormControl<{} | null>(null, {
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

  private atualizaItens() {
    this.itensPedido$.next(this.itensPeidoList);
  }

  private excluiItemPedido(item: DisplayItemPedido) {
    this.dialog
      .open(DialogComponent, {
        data: {
          title: 'Desativar Item do Pedido',
          message: `Tem certeza que deseja desativar o item com o produto: ${item.produtoId}?`,
          askConfirmation: true,
        },
      })
      .afterClosed()
      .pipe(filter((answer) => answer === true))
      .subscribe(() => {
        this.itensPeidoList = this.itensPeidoList.filter(
          (i) => i.produtoId !== item.produtoId
        );

        this.atualizaItens();
        this.calculaTotalPedido();
      });
  }

  ngOnDestroy(): void {
    this.headerService.setPageTitle('');
  }
}
