import { ContactState } from './contact.state';

export const favoriteSelector = (state: ContactState) =>
  state.contacts.filter(c => c.favorite);

export const loadingState = (state: ContactState) => state.loading;

export const contactsSelector = (state: ContactState) =>
  state.contacts.filter(c => !c.favorite);
