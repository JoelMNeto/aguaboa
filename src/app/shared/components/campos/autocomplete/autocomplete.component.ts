import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { debounceTime, distinctUntilChanged, Observable, startWith, switchMap } from 'rxjs';
import { Pagination } from '../../../interfaces/list-component.interface';

@Component({
  selector: 'autocomplete',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule
  ],
  templateUrl: './autocomplete.component.html',
  styleUrl: './autocomplete.component.scss'
})
export class AutocompleteComponent implements OnInit {

  @Input()
  label: string = '';

  @Input()
  control: FormControl<any> = new FormControl();

  @Input()
  options$!: (pagination: Pagination, filter?: any) => Observable<any>;

  @Input()
  displayFormat: (value: any) => string = () => '';

  @Input()
  detailData: (value: any) => string = () => '';

  filteredOptions!: any[];

  ngOnInit() {
    this.control.valueChanges.pipe(
      startWith(''),
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(busca => this.options$({}, {busca}))
    ).subscribe((data) => {
      this.filteredOptions = data?.content;
    });
  }
}
