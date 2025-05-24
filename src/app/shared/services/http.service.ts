import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpConfig } from '../interfaces/http.interface';
import { catchError, Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../components/dialog/dialog.component';

const URL = 'https://aguaboa-servicos.onrender.com';
@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient, private dialog: MatDialog) {}

  get<T>(config: HttpConfig): Observable<T> {
    const endpoint = URL + config?.endpoint;

    return this.http.get<T>(endpoint, {
      params: config.params,
      headers: config.headers,
    })
    .pipe(
      catchError((err) => {
        this.getErrorHandlerDialog(err.error);

        throw new Error(`Erro tratado ${err.error}`);
      })
    );
  }

  post<T>(config: HttpConfig): Observable<T> {
    const endpoint = URL + config?.endpoint;

    return this.http
      .post<T>(endpoint, config?.body, {
        headers: config.headers,
      })
      .pipe(
        catchError((err) => {
          this.getErrorHandlerDialog(err.error);

          throw new Error(`Erro tratado ${err.error}`);
        })
      );
  }

  put<T>(config: HttpConfig): Observable<T> {
    const endpoint = URL + config?.endpoint;

    return this.http
      .put<T>(endpoint, config?.body, {
        headers: config.headers,
      })
      .pipe(
        catchError((err) => {
          this.getErrorHandlerDialog(err.error);

          throw new Error(`Erro tratado ${err.error}`);
        })
      );
  }

  delete<T>(config: HttpConfig): Observable<T> {
    const endpoint = URL + config?.endpoint;

    return this.http.delete<T>(endpoint, {
      headers: config?.headers,
    })
    .pipe(
      catchError((err) => {
        this.getErrorHandlerDialog(err.error);

        throw new Error(`Erro tratado ${err.error}`);
      })
    );
  }

  private getErrorHandlerDialog(error: any[]) {
    return this.dialog
      .open(DialogComponent, {
        data: {
          title: 'Erro',
          message: 'Ocorreu um erro inesperado.',
          buttonOk: true,
          type: 'error',
        },
      });
  }
}
