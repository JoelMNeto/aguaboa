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
  ItemPedidoCadastro,
  PedidoLancamento,
  TipoPedidoEnum,
  FORMAS_PAGAMENTO,
} from '../../../shared/interfaces/pedido.interface';
import { MatSelectModule } from '@angular/material/select';
import { DumpListComponent } from '../../../shared/components/dump-list/dump-list.component';
import { ListColumn } from '../../../shared/interfaces/list-component.interface';
import { DialogCreateComponent } from '../dialog/dialog-create/dialog-create.component';
import { UtilsService } from '../../../shared/services/utils.service';

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
  ],
  templateUrl: './create-pedido.component.html',
  styleUrl: './create-pedido.component.scss',
})
export class CreatePedidoComponent implements OnInit, AfterViewInit {
  itensPedido$: Subject<ItemPedidoCadastro[]> = new Subject<
    ItemPedidoCadastro[]
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
      label: 'Código do produto',
      value: 'produtoId',
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
      label: '',
      value: 'action',
      icon: 'delete',
      action: (row: ItemPedidoCadastro) => this.excluiItemPedido(row),
    },
  ];

  itensPeidoList: ItemPedidoCadastro[] = [];

  constructor(
    private headerService: HeaderService,
    private router: Router,
    private service: PedidoService,
    private snackbar: MatSnackBar,
    private dialog: MatDialog,
    private utilsService: UtilsService,
  ) {}

  ngOnInit(): void {
    this.headerService.setPageTitle('Novo Pedido');

    this.form = this.getEmptyForm();
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
        filter(
          (item: ItemPedidoCadastro) => item !== null && item !== undefined
        )
      )
      .subscribe((item: ItemPedidoCadastro) => {
        this.itensPeidoList = [...this.itensPeidoList, item];

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

  private buildPedidoLancamentoDTO(form: FormGroup): PedidoLancamento {
    let getFormValue = (control: string) => form.get(control)?.value;

    return {
      clienteId: getFormValue('clienteId'),
      valorPago: getFormValue('valorPago'),
      frete: getFormValue('frete'),
      tipo: getFormValue('tipo'),
      formaPagamento: getFormValue('formaPagamento'),
      itens: this.itensPeidoList,
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

  private atualizaItens() {
    this.itensPedido$.next(this.itensPeidoList);
  }

  private excluiItemPedido(item: ItemPedidoCadastro) {
    this.dialog
      .open(DialogComponent, {
        data: {
          title: 'Excluir Item do Pedido',
          message: `Tem certeza que deseja excluir o item com o produto: ${item.produtoId}?`,
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
      });
  }
}
