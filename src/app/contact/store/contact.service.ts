import { Injectable } from '@angular/core';
import { Store } from 'src/app/store/store';
import { ContactState } from './contact.state';
import contacts from 'src/assets/data/contacts';


const initialState: ContactState = {
  contacts: contacts.slice(10)
};

@Injectable({
  providedIn: 'root'
})
export class ContactService extends Store<ContactState> {

  constructor() {
    super(initialState);
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

    this.mutate({ contacts: next });
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

    this.mutate({ contacts: next });
  }
}
