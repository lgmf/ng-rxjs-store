import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { delay, finalize } from 'rxjs/operators';
import { Store } from 'src/app/store/store';
import contacts from 'src/assets/data/contacts';
import { ContactState, Contact } from './contact.state';

const initialState: ContactState = {
  contacts: [],
  loading: false
};

@Injectable({
  providedIn: 'root'
})
export class ContactService extends Store<ContactState> {

  constructor() {
    super(initialState);
  }

  list(): Observable<Contact[]> {
    this.setState({ loading: true });
    return of(contacts).pipe(
      delay(1200),
      finalize(() => this.setState({ loading: false }))
    );
  }

  setContacts(data: Contact[]) {
    this.setState({ contacts: data });
  }

  setAsFavorite(id: number) {
    const index = this.state.contacts.findIndex(c => c.id === id);

    if (index === -1) {
      return;
    }

    const found = this.state.contacts.find(c => c.id === id);
    const next = [
      ...this.state.contacts.slice(0, index),
      { ...found, favorite: true },
      ...this.state.contacts.slice(index + 1)
    ];

    this.setState({ contacts: next });
  }

  setAsUnfav(id: number) {
    const index = this.state.contacts.findIndex(c => c.id === id);

    if (index === -1) {
      return;
    }

    const found = this.state.contacts.find(c => c.id === id);
    const next = [
      ...this.state.contacts.slice(0, index),
      { ...found, favorite: false },
      ...this.state.contacts.slice(index + 1)
    ];

    this.setState({ contacts: next });
  }
}
