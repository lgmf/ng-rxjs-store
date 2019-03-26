export interface Entity<T> {
  ids?: number[];
  [id: number]: T;
}
export interface Contact {
  id: number;
  name: string;
  phone: string;
  email: string;
  favorite: boolean;
}

export interface ListControls {
  currentPage: number;
  limitPerPage: number;
}

export interface ContactState {
  contactsEntity: Entity<Contact>;
  contacts: Contact[];
  loading: boolean;
  listControls: ListControls;
}
