import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'spinner',
  standalone: true,
  imports: [MatProgressSpinnerModule],
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.scss'
})
export class SpinnerComponent implements OnInit {

  @Output()
  setSpinnerHandler: EventEmitter<(value: boolean) => void> = new EventEmitter();

  private _spinnerHandler!: boolean;
  
  ngOnInit(): void {
    this.setSpinnerHandler.emit(this.setSpinnerHandlerFn);
  }

  get spinnerHandler() {
    return this._spinnerHandler;
  }

  setSpinnerHandlerFn(value: boolean) {
    this._spinnerHandler = value;
  }
}
