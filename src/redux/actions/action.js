export const addTodoItemToList = (todoItem) => {
  return {
    type: 'ADD_TODO_TO_LIST',
    payload: todoItem,
  };
};

export const fetchActiveListItems = () => {
  return {
    type: 'FETCH_ACTIVE_LIST_ITEMS',
  };
};
export const fetchCompletedListItems = () => {
  return {
    type: 'FETCH_COMPLETED_LIST_ITEMS',
  };
};
export const clearCompletedListItems = () => {
  return {
    type: 'CLEAR_COMPLETED_LIST_ITEMS',
  };
};
export const deleteTodoListItem = (todoId) => {
  return {
    type: 'DELETE_TODO_ITEM',
    payload: todoId,
  };
};
export const markCompletedListItem = (todoId) => {
  return {
    type: 'MARK_COMPLETE_LIST_ITEM',
    payload: todoId,
  };
};
