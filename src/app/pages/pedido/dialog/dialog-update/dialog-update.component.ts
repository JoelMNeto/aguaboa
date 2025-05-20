import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
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
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  CURRENCY_MASK_OPTIONS,
  PedidoAlteracao,
  PedidoInformacoes,
} from '../../../../shared/interfaces/pedido.interface';
import { CurrencyMaskModule } from 'ng2-currency-mask';

@Component({
  selector: 'app-dialog-update',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    CurrencyMaskModule,
  ],
  templateUrl: './dialog-update.component.html',
  styleUrl: './dialog-update.component.scss',
})
export class DialogUpdateComponent implements OnInit {
  form!: FormGroup;

  readonly dialogRef = inject(MatDialogRef<DialogComponent>);

  data: {
    title: string;
    pedido: PedidoInformacoes;
  } = inject(MAT_DIALOG_DATA);

  currencyMask = CURRENCY_MASK_OPTIONS;

  constructor(private snackbar: MatSnackBar) {}

  ngOnInit(): void {
    this.form = this.getEmptyForm();
  }

  onSubmit() {
    if (this.form.invalid) {
      this.snackbar.open('Preencha corretamente o campo!');
      return;
    }

    let objToSave = this.buildPedidoAlteracaoDTO(this.form, this.data?.pedido);

    this.dialogRef.close(objToSave);
  }

  onCloseDialog() {
    this.dialogRef.close();
  }

  private getEmptyForm(): FormGroup {
    return new FormGroup({
      valorPago: new FormControl<string>('', {
        nonNullable: true,
        validators: Validators.required,
      }),
    });
  }

  private buildPedidoAlteracaoDTO(
    form: FormGroup,
    pedido: PedidoInformacoes
  ): PedidoAlteracao {
    let getFormValue = (control: string) => form.get(control)?.value;

    return {
      id: pedido?.id,
      valorPago: Number.parseFloat(getFormValue('valorPago')) || 0,
    };
  }
}
