import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ContactService } from '../store/contact.service';

@Component({
  selector: 'app-contact-container',
  templateUrl: './contact-container.component.html',
  styleUrls: ['./contact-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactContainerComponent {

  allContacts$ = this.store.selectByKey('contacts');
  favorite$ = this.store.select(state => state.contacts.filter(c => c.favorite));

  constructor(public store: ContactService) { }

  favorite(id: number) {
    this.store.setAsFavorite(id);
  }

  unFavorite(id: number) {
    this.store.setAsUnfav(id);
  }

}
