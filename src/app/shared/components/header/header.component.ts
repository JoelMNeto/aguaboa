import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Subscription } from 'rxjs';
import { HeaderService } from '../../services/header.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit, OnDestroy {
  title = '';

  subscription: Subscription = new Subscription();

  @Output()
  onClickToggle: EventEmitter<void> = new EventEmitter();

  constructor(private headerService: HeaderService) {}

  ngOnInit(): void {
    this.subscription = this.headerService
      .getObservableTitle()
      .subscribe((value) => (this.title = value));
  }

  onClick() {
    this.onClickToggle.emit();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
