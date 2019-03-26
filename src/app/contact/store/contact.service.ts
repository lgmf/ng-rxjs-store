import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, finalize, map } from 'rxjs/operators';
import { Store } from 'src/app/store/store';
import contacts from 'src/assets/data/contacts';
import { Contact, ContactState, Entity } from './contact.state';

const initialState: ContactState = {
  contactsEntity: null,
  contacts: [],
  loading: false,
  listControls: {
    limitPerPage: 10,
    currentPage: 1
  }
};

@Injectable({
  providedIn: 'root'
})
export class ContactService extends Store<ContactState> {
  constructor() {
    super(initialState);
  }

  list(): Observable<Contact[]> {
    const byName = (a: Contact, b: Contact) =>
      a.name < b.name ? -1 : a.name > b.name ? 1 : 0;

    this.setState({ loading: true });

    return of(contacts).pipe(
      delay(1500),
      map(contactList => contactList.sort(byName)),
      finalize(() => this.setState({ loading: false }))
    );
  }

  setContacts(data: Contact[]) {
    const entity = data.reduce(
      (acc, current) => {
        return {
          ...acc,
          [current.id]: current
        };
      },
      null as Entity<Contact>
    );

    this.setState({ contactsEntity: entity });
  }

  setCurrentPage(next: number) {
    this.setState({
      listControls: {
        ...this.state.listControls,
        currentPage: next
      }
    });
  }
}
