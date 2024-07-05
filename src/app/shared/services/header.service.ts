import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HeaderService {
  private subject: Subject<string> = new Subject<string>();

  constructor() {}

  setPageTitle(title: string) {
    this.subject.next(title);
  }

  getObservableTitle(): Observable<string> {
    return this.subject.asObservable();
  }
}
