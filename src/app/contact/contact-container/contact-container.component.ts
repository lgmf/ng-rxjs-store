import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { PageChangedEvent } from '../components/contact-list-pagination/contact-list-pagination.component';
import { ContactService } from '../store';
import { ContactSelectors } from '../store/contact.selectors';
import { ValueChangedEvent } from '../components/contact-list-search/contact-list-search.component';

@Component({
  selector: 'app-contact-container',
  templateUrl: './contact-container.component.html',
  styleUrls: ['./contact-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactContainerComponent implements OnInit {
  loading$ = this.store.select(ContactSelectors.loading);
  contacts$ = this.store.select(ContactSelectors.contactList);
  pages$ = this.store.select(ContactSelectors.pages);

  currentPage = 1;

  constructor(public store: ContactService) {}

  ngOnInit() {
    this.store.list().subscribe(contacts => this.store.setContacts(contacts));
    this.currentPage = this.store.state.listControls.currentPage;
  }

  onSearchChanged({ value }: ValueChangedEvent) {
    this.store.setSearch(value);
  }

  onPageChanged({ nextPage }: PageChangedEvent) {
    this.store.setCurrentPage(nextPage);
  }
}
