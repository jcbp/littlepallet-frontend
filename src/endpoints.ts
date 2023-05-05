const API_URL = "http://localhost:3001/api";

export const Endpoints = {
  login: () => `${API_URL}/user/login`,
  getCurrentUser: () => `${API_URL}/user/current`,
  getList: (id: string) => `${API_URL}/list/${id}`,
  getLists: () => `${API_URL}/list`,
  createUser: () => `${API_URL}/user`,
  updateUser: (id: string) => `${API_URL}/user/${id}`,
  addUserToList: (listId: string) => `${API_URL}/list/${listId}/user`,
  updateUserInList: (listId: string, userId: string) =>
    `${API_URL}/list/${listId}/user/${userId}`,
  deleteUserFromList: (listId: string, userId: string) =>
    `${API_URL}/list/${listId}/user/${userId}`,
  createItemComment: (listId: string, itemId: string) =>
    `${API_URL}/list/${listId}/item/${itemId}/comment`,
  createItemCommentWithImage: (listId: string, itemId: string) =>
    `${API_URL}/list/${listId}/item/${itemId}/comment/image`,
  getListsAuthenticated: () => `${API_URL}/list`,
  getDeletedLists: () => `${API_URL}/list/trash`,
  getListById: (id: string) => `${API_URL}/list/${id}`,
  createList: () => `${API_URL}/list`,
  createListFromAnother: (id: string) => `${API_URL}/list/from/${id}`,
  updateList: (id: string) => `${API_URL}/list/${id}`,
  deleteList: (id: string) => `${API_URL}/list/${id}`,
  updateListViewById: (id: string) => `${API_URL}/list/${id}/view`,
  createTemplate: (listId: string) => `${API_URL}/template/from/${listId}`,
  getTemplates: (lang: string) => `${API_URL}/template/${lang}`,
  createItem: (id: string) => `${API_URL}/list/${id}/item`,
  createItemAtPosition: (id: string, position: string) =>
    `${API_URL}/list/${id}/item/at/${position}`,
  moveItemAtPosition: (listId: string, itemId: string, position: string) =>
    `${API_URL}/list/${listId}/item/${itemId}/move/${position}`,
  updateItem: (listId: string, itemId: string) =>
    `${API_URL}/list/${listId}/item/${itemId}`,
  deleteItem: (listId: string, itemId: string) =>
    `${API_URL}/list/${listId}/item/${itemId}`,
  updateItemField: (listId: string, itemId: string, fieldId: string) =>
    `${API_URL}/list/${listId}/item/${itemId}/field/${fieldId}`,
  createField: (id: string) => `${API_URL}/list/${id}/field`,
  createFieldAtPosition: (id: string, position: string) =>
    `${API_URL}/list/${id}/field/at/${position}`,
  moveFieldAtPosition: (listId: string, fieldId: string, position: string) =>
    `${API_URL}/list/${listId}/field/${fieldId}/move/${position}`,
  updateField: (listId: string, fieldId: string) =>
    `${API_URL}/list/${listId}/field/${fieldId}`,
  deleteField: (listId: string, fieldId: string) =>
    `${API_URL}/list/${listId}/field/${fieldId}`,
};
