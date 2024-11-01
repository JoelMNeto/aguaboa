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

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
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
    let value = column.value.split('.').reduce((acc, part) => acc && acc[part], obj);

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
      case 'center': classes.push('justify-content-center'); break;
      case 'end': classes.push('justify-content-end'); break;  
      case 'start': classes.push('justify-content-start'); break;
    }

    return classes;
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
