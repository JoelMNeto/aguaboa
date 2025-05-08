import { Component } from '@angular/core';
import { DialogComponent } from '../../../shared/components/dialog/dialog.component';
import { finalize } from 'rxjs';
import { ProdutoService } from '../../../shared/services/produto.service';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { HeaderService } from '../../../shared/services/header.service';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ProdutoCadastro } from '../../../shared/interfaces/produto.interface';

@Component({
  selector: 'app-create-produto',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './create-produto.component.html',
  styleUrl: './create-produto.component.scss'
})
export class CreateProdutoComponent {
  form!: FormGroup;
  
    constructor(
      private headerService: HeaderService,
      private router: Router,
      private service: ProdutoService,
      private snackbar: MatSnackBar,
      private dialog: MatDialog
    ) {}
  
    ngOnInit(): void {
      this.headerService.setPageTitle('Produto');
  
      this.form = this.getEmptyForm();
    }
  
    onSubmit() {
      if (this.form.invalid) {
        this.dialog
          .open(DialogComponent, {
            data: {
              title: 'Erro',
              message: 'Preencha corretamente os campos',
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
  
      let objToSave = this.buildProdutoCadastroDTO(this.form);
  
      this.service
        .cadastraProduto(objToSave)
        .pipe(finalize(() => {}))
        .subscribe(() => {
          this.snackbar.open('Produto cadastrado com sucesso!', 'Ok');
  
          this.navigateToHome();
        });
    }
  
    onCancel() {
      this.navigateToHome();
    }
  
    private buildProdutoCadastroDTO(form: FormGroup): ProdutoCadastro {
      let getFormValue = (control: string) => form.get(control)?.value;
  
      return {
        nome: getFormValue('nome'),
        marca: getFormValue('marca'),
        preco: getFormValue('preco'),
      };
    }
  
    private getEmptyForm(): FormGroup {
      return new FormGroup({
        nome: new FormControl<string>('', {
          nonNullable: true,
          validators: Validators.required,
        }),
  
        marca: new FormControl<string>(''),
  
        preco: new FormControl<string>('', {
          nonNullable: true,
          validators: Validators.required,
        }),
      });
    }
  
    private navigateToHome() {
      this.form = this.getEmptyForm();
  
      this.router.navigateByUrl('/produto');
    }
}
