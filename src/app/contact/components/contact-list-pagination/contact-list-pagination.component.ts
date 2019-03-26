import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  OnChanges
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface PageChangedEvent {
  nextPage: number;
}

@Component({
  selector: 'app-contact-list-pagination',
  templateUrl: './contact-list-pagination.component.html',
  styleUrls: ['./contact-list-pagination.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactListPaginationComponent implements OnChanges, OnInit {
  @Input() pages: number[] = [];
  @Input() current = 1;

  @Output() pageChanged = new EventEmitter<PageChangedEvent>();

  isOnLastPage$ = new BehaviorSubject(true);
  isOnFirstPage$ = new BehaviorSubject(false);

  private get isOnFirstPage(): boolean {
    return this.current === 1;
  }

  private get isOnLastPage(): boolean {
    return this.current === this.pages.length;
  }

  ngOnChanges() {
    this.updateFlags();
  }

  ngOnInit() {
    this.isOnFirstPage$ = new BehaviorSubject(this.isOnFirstPage);
    this.isOnLastPage$ = new BehaviorSubject(this.isOnLastPage);
  }

  next() {
    if (this.isOnLastPage) {
      return;
    }

    this.current++;
    this.pageChanged.emit({ nextPage: this.current });
    this.updateFlags();
  }

  previous() {
    if (this.isOnFirstPage) {
      return;
    }

    this.current--;
    this.pageChanged.emit({ nextPage: this.current });
    this.updateFlags();
  }

  private updateFlags() {
    this.isOnFirstPage$.next(this.isOnFirstPage);
    this.isOnLastPage$.next(this.isOnLastPage);
  }
}
