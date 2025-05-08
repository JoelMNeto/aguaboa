import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import {
  FormGroup,
  ReactiveFormsModule,
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

  data = inject(MAT_DIALOG_DATA);

  constructor(private snackbar: MatSnackBar) {}

  ngOnInit(): void {
    this.form = this.getEmptyForm();
  }

  onSubmit() {
    if (this.form.invalid) {
      this.snackbar.open('Preencha corretamente os campos!')
      return;
    }

    let objToSave = this.buildItemPedidoCadastroDTO(this.form);

    this.dialogRef.close(objToSave);
  }

  closeDialog() {
    this.dialogRef.close();
  }

  private getEmptyForm(): FormGroup {
    return new FormGroup({});
  }

  private buildItemPedidoCadastroDTO(form: FormGroup): ItemPedidoCadastro {
    let getFormValue = (control: string) => form.get(control)?.value;

    return {
      produtoId: 0,
      quantidade: 0,
    };
  }
}
