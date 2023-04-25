import { combineReducers } from 'redux';

const todoReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO_TO_LIST':
      return [...state, action.payload];
    case 'DELETE_TODO_ITEM':
      return state.filter((todoItem) => todoItem.id !== action.payload);
    case 'MARK_COMPLETE_LIST_ITEM':
      return state.map((todoItem) => ({
        ...todoItem,
        isCompleted:
          action.payload.id === todoItem.id
            ? !todoItem.isCompleted
            : todoItem.isCompleted,
      }));
    case 'CLEAR_COMPLETED_LIST_ITEMS':
      return state.filter((todoItem) => !todoItem.isCompleted);
    case 'REORDER_TODO_ITEM':
      return [...action.payload];
    default:
      return state;
  }
};

export const rootReducer = combineReducers({
  todoListContainer: todoReducer,
});
