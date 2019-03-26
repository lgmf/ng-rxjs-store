import { ContactState } from './contact.state';

export namespace ContactSelectors {
  export const loading = (state: ContactState) => state.loading;

  export const contactList = (state: ContactState) => {
    const { contactsEntity } = state;
    const { limitPerPage, currentPage } = state.listControls;
    const start = (currentPage - 1) * limitPerPage;
    const offset = start + limitPerPage;

    let result = [];
    for (let i = start + 1; i <= offset; i++) {
      result = [...result, contactsEntity[i]];
    }

    return result.filter(Boolean);
  };

  export const pages = (state: ContactState) => {
    const { contactsEntity } = state;
    const { limitPerPage } = state.listControls;
    const max = Object.values(contactsEntity).length;
    const pageNumber = Math.ceil(max / limitPerPage);

    return [...Array.from({ length: pageNumber }, (_, i) => i + 1)];
  };

  export const currentPageNumber = (state: ContactState) =>
    state.listControls.currentPage;
}
