import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  OnDestroy
} from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';

export class ValueChangedEvent {
  value: string;

  constructor(value: string) {
    this.value = value;
  }
}

@Component({
  selector: 'app-contact-list-search',
  templateUrl: './contact-list-search.component.html',
  styleUrls: ['./contact-list-search.component.scss']
})
export class ContactListSearchComponent implements OnInit, OnDestroy {
  @Output() valueChanged = new EventEmitter<ValueChangedEvent>();

  private _value$ = new Subject<string>();
  private value$ = this._value$.asObservable().pipe(
    debounceTime(500),
    map(next => new ValueChangedEvent(next))
  );
  private subscription: Subscription = null;

  ngOnInit() {
    this.subscription = this.value$.subscribe(change =>
      this.valueChanged.emit(change)
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onInput(event: any) {
    const value = event.target.value;
    this._value$.next(value);
  }
}
