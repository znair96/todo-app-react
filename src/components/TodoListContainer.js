import { Typography } from '@mui/material';
import React, { useState } from 'react';
import notSelected from '../assets/not-selected-icon.svg';
import notSelectedDark from '../assets/not-selected-dark.svg';
import crossIcon from '../assets/icon-cross.svg';
import selectedIcon from '../assets/icon-check.svg';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteTodoListItem,
  markCompletedListItem,
} from '../redux/actions/action';
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
  return (
    <div>
      {todoList.map((todoItem) => (
        <div
          className='todo-list-item'
          style={{
            background: darkTheme ? '#25273D' : '',
            borderBottom: darkTheme ? '1px solid #393A4B' : '',
          }}
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
                <img src={darkTheme ? notSelectedDark : notSelected} alt='' />
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
      ))}
    </div>
  );
};

export default TodoListContainer;
