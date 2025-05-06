import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpConfig } from '../interfaces/http.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {}

  get<T>(config: HttpConfig): Observable<T> {
    return this.http.get<T>(config?.endpoint, {
      params: config.params,
      headers: config.headers,
    });
  }

  post<T>(config: HttpConfig): Observable<T> {
    return this.http.post<T>(config?.endpoint, config?.body, {
      headers: config.headers,
    });
  }
}
