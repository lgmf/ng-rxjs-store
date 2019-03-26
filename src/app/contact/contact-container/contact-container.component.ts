import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { PageChangedEvent } from '../components/contact-list-pagination/contact-list-pagination.component';
import { ContactService } from '../store';
import { ContactSelectors } from '../store/contact.selectors';

@Component({
  selector: 'app-contact-container',
  templateUrl: './contact-container.component.html',
  styleUrls: ['./contact-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactContainerComponent implements OnInit {
  loading$ = this.store.select(ContactSelectors.loading);
  pages$ = this.store.select(ContactSelectors.pages);
  contacts$ = this.store.select(ContactSelectors.contactList);

  currentPage = 1;

  constructor(public store: ContactService) {}

  ngOnInit() {
    this.store.list().subscribe(contacts => this.store.setContacts(contacts));
    this.currentPage = this.store.state.listControls.currentPage;
  }

  onPageChanged({ nextPage }: PageChangedEvent) {
    this.store.setCurrentPage(nextPage);
  }
}
