import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DialogComponent } from '../../../../shared/components/dialog/dialog.component';
import {
  DisplayItemPedido,
  ItemPedidoCadastro,
} from '../../../../shared/interfaces/pedido.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AutocompleteComponent } from '../../../../shared/components/campos/autocomplete/autocomplete.component';
import { ProdutoService } from '../../../../shared/services/produto.service';
import { Pagination } from '../../../../shared/interfaces/list-component.interface';
import { ProdutoInformacoes } from '../../../../shared/interfaces/produto.interface';
import { CURRENCY_MASK_OPTIONS } from '../../../../shared/interfaces/pedido.interface';
import { CurrencyMaskModule } from 'ng2-currency-mask';

@Component({
  selector: 'app-dialog-create',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    AutocompleteComponent,
    CurrencyMaskModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dialog-create.component.html',
  styleUrl: './dialog-create.component.scss',
})
export class DialogCreateComponent implements OnInit {
  form!: FormGroup;

  readonly dialogRef = inject(MatDialogRef<DialogComponent>);

  data: {
    title: string;
    itensPeidoList: ItemPedidoCadastro[];
  } = inject(MAT_DIALOG_DATA);

  currencyMask = CURRENCY_MASK_OPTIONS;

  produtoOptions$ = (pagination: Pagination, filter: any) =>
    this.produtoService.getProdutos(pagination, filter);

  displayFormat = (produto: ProdutoInformacoes) =>
    produto ? `${produto.id} - ${produto.nome}` : '';

  detailData = (produto: ProdutoInformacoes) => produto?.marca ?? '';

  constructor(
    private snackbar: MatSnackBar,
    private produtoService: ProdutoService
  ) {}

  ngOnInit(): void {
    this.form = this.getEmptyForm();
  }

  onSubmit() {
    if (this.form.invalid) {
      this.snackbar.open('Preencha corretamente os campos!');
      return;
    }

    if (Number.parseInt(this.getFormControl('quantidade').value) <= 0) {
      this.snackbar.open('Quantidade inválida!');
      return;
    }

    let objToSave = this.buildItemPedidoCadastroDTO(this.form);

    if (
      this.data?.itensPeidoList
        .map((i) => i.produtoId)
        .includes(objToSave.produtoId)
    ) {
      this.snackbar.open('Este produto já foi adicionado ao pedido!');
      return;
    }

    this.dialogRef.close(objToSave);
  }

  onCloseDialog() {
    this.dialogRef.close();
  }

  getFormControl(control: string): FormControl {
    return this.form.get(control) as FormControl;
  }

  private getEmptyForm(): FormGroup {
    return new FormGroup({
      produto: new FormControl<{} | null>(null, {
        nonNullable: true,
        validators: Validators.required,
      }),

      quantidade: new FormControl<string>('', {
        nonNullable: true,
        validators: Validators.required,
      }),

      desconto: new FormControl<string>(''),

      precoUnitario: new FormControl<string>(''),
    });
  }

  private buildItemPedidoCadastroDTO(form: FormGroup): DisplayItemPedido {
    let getFormValue = (control: string) => form.get(control)?.value;

    let produto: ProdutoInformacoes = getFormValue('produto');

    let precoUnitario = Number.parseFloat(getFormValue('precoUnitario')) || produto?.preco;

    let quantidade = Number.parseInt(getFormValue('quantidade')) || 0;

    let desconto = Number.parseFloat(getFormValue('desconto')) || 0;

    return {
      produtoId: produto?.id,
      produtoNome: produto?.nome,
      produtoMarca: produto?.marca,
      quantidade,
      desconto,
      precoUnitario,
      valorItem: (precoUnitario - desconto) * quantidade,
    };
  }
}
