import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ClickedEvent } from '../components/contact-list.component';
import { ContactService } from '../store';
import { contactsSelector, favoriteSelector, loadingState } from '../store/contact.selectors';

@Component({
  selector: 'app-contact-container',
  templateUrl: './contact-container.component.html',
  styleUrls: ['./contact-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactContainerComponent implements OnInit {
  loading$ = this.store.select(loadingState);
  favorite$ = this.store.select(favoriteSelector);
  contacts$ = this.store.select(contactsSelector);

  constructor(public store: ContactService) {}

  ngOnInit() {
    this.store.list().subscribe(contacts => this.store.setContacts(contacts));
  }

  favorite({ id }: ClickedEvent) {
    this.store.setAsFavorite(id);
  }

  unFavorite({ id }: ClickedEvent) {
    this.store.setAsUnfav(id);
  }
}
