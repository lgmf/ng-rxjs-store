import { ContactState, Contact } from './contact.state';

export namespace ContactSelectors {
  export const loading = (state: ContactState) => state.loading;

  export const contactList = (state: ContactState) => {
    const { contactsEntity } = state;
    const { search } = state.listControls;
    const { limitPerPage, currentPage } = state.listControls;
    const start = (currentPage - 1) * limitPerPage;
    const offset = start + limitPerPage;
    const contacts = filterByName(search, Object.values(contactsEntity));

    return contacts.slice(start, offset);
  };

  export const pages = (state: ContactState) => {
    const { contactsEntity } = state;
    const { limitPerPage, search } = state.listControls;
    const max = filterByName(search, Object.values(contactsEntity)).length;
    const pageNumber = Math.ceil(max / limitPerPage);

    return [...Array.from({ length: pageNumber }, (_, i) => i + 1)];
  };

  export const currentPageNumber = (state: ContactState) =>
    state.listControls.currentPage;
}

function filterByName(search: string, contacts: Contact[]) {
  const normalize = (str: string) =>
    !str ? '' : str.toLocaleLowerCase().replace(/\s/g, '');
  const byName = ({ name }: Contact) =>
    !search || normalize(name).indexOf(normalize(search)) !== -1;
  return contacts.filter(byName);
}
