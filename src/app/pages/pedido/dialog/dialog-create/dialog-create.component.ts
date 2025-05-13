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
import { ItemPedidoCadastro } from '../../../../shared/interfaces/pedido.interface';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dialog-create.component.html',
  styleUrl: './dialog-create.component.scss',
})
export class DialogCreateComponent implements OnInit {
  form!: FormGroup;

  readonly dialogRef = inject(MatDialogRef<DialogComponent>);

  data: {
    title: string,
    itensPeidoList: ItemPedidoCadastro[]
  } = inject(MAT_DIALOG_DATA);

  constructor(private snackbar: MatSnackBar) {}

  ngOnInit(): void {
    this.form = this.getEmptyForm();
  }

  onSubmit() {
    if (this.form.invalid) {
      this.snackbar.open('Preencha corretamente os campos!');
      return;
    }

    let objToSave = this.buildItemPedidoCadastroDTO(this.form);

    if (this.data?.itensPeidoList.map(i => i.produtoId).includes(objToSave.produtoId)) {
      this.snackbar.open('Este produto já foi adicionado ao pedido!');
      return;
    }

    this.dialogRef.close(objToSave);
  }

  onCloseDialog() {
    this.dialogRef.close();
  }

  private getEmptyForm(): FormGroup {
    return new FormGroup({
      produtoId: new FormControl<string>('', {
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

  private buildItemPedidoCadastroDTO(form: FormGroup): ItemPedidoCadastro {
    let getFormValue = (control: string) => form.get(control)?.value;

    return {
      produtoId: Number.parseInt(getFormValue('produtoId')) || 0,
      quantidade: Number.parseInt(getFormValue('quantidade')) || 0,
      desconto: Number.parseFloat(getFormValue('desconto')) || 0,
      precoUnitario: Number.parseFloat(getFormValue('precoUnitario')) || 0
    };
  }
}
