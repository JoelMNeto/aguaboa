import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HeaderService } from '../../../shared/services/header.service';
import { Router } from '@angular/router';
import { ClienteService } from '../../../shared/services/cliente.service';
import { ClienteCadastro } from '../../../shared/interfaces/cliente.interface';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { finalize } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../../shared/components/dialog/dialog.component';

@Component({
  selector: 'app-create-cliente',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './create-cliente.component.html',
  styleUrl: './create-cliente.component.scss',
})
export class CreateClienteComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private headerService: HeaderService,
    private router: Router,
    private service: ClienteService,
    private snackbar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.headerService.setPageTitle('Novo Clientes');

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

    let objToSave = this.buildClienteCadastroDTO(this.form);

    this.service
      .cadastraCliente(objToSave)
      .pipe(finalize(() => {}))
      .subscribe(() => {
        this.snackbar.open('Cliente cadastrado com sucesso!', 'Ok');

        this.navigateToHome();
      });
  }

  onCancel() {
    this.navigateToHome();
  }

  private buildClienteCadastroDTO(form: FormGroup): ClienteCadastro {
    let getFormValue = (control: string) => form.get(control)?.value;

    return {
      nome: getFormValue('nome'),
      contato: getFormValue('contato'),
      endereco: {
        logradouro: getFormValue('logradouro'),
        numero: getFormValue('numero'),
        complemento: getFormValue('complemento'),
        bairro: getFormValue('bairro'),
        cep: getFormValue('cep'),
        cidade: getFormValue('cidade'),
      },
    };
  }

  private getEmptyForm(): FormGroup {
    return new FormGroup({
      nome: new FormControl<string>('', {
        nonNullable: true,
        validators: Validators.required,
      }),

      contato: new FormControl<string>('', {
        nonNullable: true,
        validators: Validators.required,
      }),

      logradouro: new FormControl<string>('', {
        nonNullable: true,
        validators: Validators.required,
      }),

      numero: new FormControl<string>('', {
        nonNullable: true,
        validators: Validators.required,
      }),

      bairro: new FormControl<string>(''),

      complemento: new FormControl<string>(''),

      cep: new FormControl<string>(''),

      cidade: new FormControl<string>(''),
    });
  }

  private navigateToHome() {
    this.form = this.getEmptyForm();

    this.router.navigateByUrl('/');
  }
}
