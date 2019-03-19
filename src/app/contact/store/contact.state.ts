export interface Contact {
  id: number;
  name: string;
  phone: string;
  email: string;
  favorite: boolean;
}

export interface ContactState {
  contacts: Contact[];
}
