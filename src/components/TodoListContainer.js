import { Typography } from '@mui/material';
import React, { useState } from 'react';
import notSelected from '../assets/not-selected-icon.svg';
import notSelectedDark from '../assets/not-selected-dark.svg';
import crossIcon from '../assets/icon-cross.svg';
import selectedIcon from '../assets/icon-check.svg';
import { useDispatch } from 'react-redux';
import {
  deleteTodoListItem,
  markCompletedListItem,
  reorderTodoList,
} from '../redux/actions/action';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
const TodoListContainer = ({ darkTheme, todoList }) => {
  const textStyleActive = {
    fontFamily: 'Josefin Sans',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: 12,
    lineHeight: '12px',
    letterSpacing: '-0.166667px',
    color: '#494C6B',
  };
  const textStyleCompleted = {
    fontFamily: 'Josefin Sans',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: 12,
    lineHeight: '12px',
    letterSpacing: '-0.166667px',
    textDecorationLine: 'line-through',
    color: '#D1D2DA',
  };
  const [completed, setCompleted] = useState(false);
  const dispatch = useDispatch();
  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    const newList = Array.from(todoList);
    const [reorderedList] = newList.splice(result.source.index, 1);
    newList.splice(result.destination.index, 0, reorderedList);
    dispatch(reorderTodoList(newList));
  };
  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId='todoItems'>
        {(provided) => (
          <div
            className='todoItems'
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {todoList.map((todoItem, index) => (
              <Draggable
                key={todoItem.id}
                draggableId={todoItem.id}
                index={index}
              >
                {(provided) => (
                  <div
                    className='todo-list-item'
                    style={{
                      background: darkTheme ? '#25273D' : '',
                      borderBottom: darkTheme ? '1px solid #393A4B' : '',
                    }}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <div className='todo-list-item-detail'>
                      <div
                        className='item-select-img'
                        onClick={() => {
                          setCompleted(!completed);
                          dispatch(
                            markCompletedListItem({
                              id: todoItem.id,
                              isCompleted: completed,
                            })
                          );
                        }}
                      >
                        {todoItem.isCompleted ? (
                          <img src={selectedIcon} alt='' />
                        ) : (
                          <img
                            src={darkTheme ? notSelectedDark : notSelected}
                            alt=''
                          />
                        )}
                      </div>
                      <div>
                        <Typography
                          style={
                            todoItem.isCompleted
                              ? darkTheme
                                ? { ...textStyleCompleted, color: '#4D5067' }
                                : textStyleCompleted
                              : darkTheme
                              ? { ...textStyleActive, color: '#C8CBE7' }
                              : textStyleActive
                          }
                        >
                          {todoItem.title}
                        </Typography>
                      </div>
                    </div>
                    <div
                      className='cross-icon'
                      onClick={() => dispatch(deleteTodoListItem(todoItem.id))}
                    >
                      <img src={crossIcon} alt='cross' />
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default TodoListContainer;
