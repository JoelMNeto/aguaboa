import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [MatSidenavModule, CommonModule, MatButtonModule],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss',
})
export class SidenavComponent implements OnInit {
  @Output()
  setOpenedValueFn: EventEmitter<(value: boolean) => void> = new EventEmitter();

  opened = false;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.setOpenedValueFn.emit(this.setOpenedValue.bind(this));

    this.cdr?.detectChanges();
  }

  setOpenedValue(value: boolean) {
    this.opened = value;
  }
}
