import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import {
  MatTableModule,
  MatTable,
  MatTableDataSource,
} from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import {
  ListColumn,
  Pagination,
} from '../../interfaces/list-component.interface';
import {
  catchError,
  map,
  merge,
  Observable,
  of,
  startWith,
  Subject,
  switchMap,
} from 'rxjs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    RouterLink,
  ],
})
export class ListComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @ViewChild(MatSort) sort!: MatSort;

  @ViewChild(MatTable) table!: MatTable<any>;

  @Input()
  displayedColumns!: ListColumn[];

  @Input()
  pageSizes!: number[];

  @Input()
  getTableData$!: (pagination: Pagination, filter?: any) => Observable<any>;

  @Input()
  filter!: any;

  @Input()
  loadingFn!: (loading: boolean) => void;

  @Input()
  linkNovo!: string;

  totalData: number = 0;

  data!: any[];

  dataSource = new MatTableDataSource<any>();

  filter$ = new Subject<any>();

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

  getClasses(column: ListColumn, row: any) {
    let classes: string[] = [''];

    this.fillAlignClass(column, classes);

    this.fillColorClass(column, row, classes);

    return classes;
  }

  private fillAlignClass(column: ListColumn, classes: string[]) {
    if (!column?.align) {
      return;
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
  }

  private fillColorClass(column: ListColumn, row: any, classes: string[]) {
    if (!column?.color) {
      return;
    }

    let color = this.getColumnColor(column, row);

    switch (color) {
      case 'accent':
        classes.push('color-accent');
        break;
      case 'primary':
        classes.push('color-primary');
        break;
      case 'success':
        classes.push('color-success');
        break;
      case 'danger':
        classes.push('color-danger');
        break;
    }
  }

  getColumnColor(column: ListColumn, row: any) {
    return typeof column.color === 'function'
      ? column.color(row)
      : column.color ?? '';
  }

  search(event: Event) {
    let search = (event.target as HTMLInputElement).value;

    this.filter = {
      ...this.filter,
      busca: search,
    };

    this.filter$.next(this.filter);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    merge(
      this.paginator.page,
      this.sort.sortChange,
      this.filter$.asObservable()
    )
      .pipe(
        startWith({}),
        switchMap(() => {
          return this.getTableData$(
            {
              page: this.paginator.pageIndex,
              size: this.paginator.pageSize,
              sort: this.getSort(),
            },
            this.filter
          ).pipe(catchError(() => of(null)));
        }),
        map((data) => {
          if (data == null) {
            return [];
          }
          this.totalData = data.totalElements;

          return data?.content;
        })
      )
      .subscribe((data) => {
        this.data = data;
        this.dataSource = new MatTableDataSource(this.data);
      });
  }

  private getSort() {
    if (!this.sort?.active) {
      return '';
    }

    return `${this.sort?.active},${this.sort?.direction}`;
  }
}
