import { CommonModule } from '@angular/common';
import { Component, Input, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import {
  MatTable,
  MatTableModule,
} from '@angular/material/table';
import {
  Observable,
} from 'rxjs';
import {
  ListColumn,
} from '../../interfaces/list-component.interface';

@Component({
  selector: 'dump-list',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    CommonModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './dump-list.component.html',
  styleUrl: './dump-list.component.scss',
})
export class DumpListComponent {
  @ViewChild(MatTable) table!: MatTable<any>;

  @Input()
  displayedColumns!: ListColumn[];

  @Input()
  buttonName!: string;

  @Input()
  getTableData$!: () => Observable<any>;

  @Input()
  insereNovoItem!: () => void;

  totalData: number = 0;

  constructor() {}

  get columns() {
    return this.displayedColumns.map((c) => c.value);
  }

  get objColumns() {
    return this.displayedColumns;
  }

  getProperty(obj: any, column: ListColumn) {
    let value = column.value
      .split('.')
      .reduce((acc, part) => acc && acc[part], obj);

    if (!column?.format) {
      return value;
    }

    return column?.format(value);
  }

  getClasses(column: ListColumn) {
    let classes: string[] = [''];

    if (!column.align) {
      return classes;
    }

    switch (column.align) {
      case 'center':
        classes.push('justify-content-center');
        break;
      case 'end':
        classes.push('justify-content-end');
        break;
      case 'start':
        classes.push('justify-content-start');
        break;
    }

    return classes;
  }
}
