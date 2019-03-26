import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Contact } from '../store';

export interface ClickedEvent {
  id: number;
}

@Component({
  selector: 'app-contact-list',
  template: `
    <ul class="list-group">
      <li *ngFor="let item of data" class="item">
        <div class="info">
          <span class="title">{{ item.name }}</span>
          <span class="description">{{ item.email }}</span>
        </div>
        <div class="actions">
          <button class="btn" (click)="onClick(item.id)">{{ actionIcon }}</button>
        </div>
      </li>
    </ul>
  `,
  styles: [
    `
      :host {
        display: grid;
        grid-gap: 12px;
      }

      :host > .title {
        font-size: 1.75rem;
        font-weight: bolder;
      }
    `
  ]
})
export class ContactListComponent {
  @Input() data: Contact[];
  @Input() actionIcon: string;
  @Output() clicked = new EventEmitter<ClickedEvent>();

  onClick(id: number) {
    this.clicked.emit({ id });
  }
}
