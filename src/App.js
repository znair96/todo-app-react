import { InputAdornment, TextField, Typography } from '@mui/material';
import './App.css';
import moon from './assets/icon-moon.svg';
import sun from './assets/icon-sun.svg';
import { useState } from 'react';
import SubmitIcon from './components/SubmitIcon';
import TodoListContainer from './components/TodoListContainer';
import DarkSubmitIcon from './components/DarkSubmitIcon';
import 'animate.css';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import {
  addTodoItemToList,
  clearCompletedListItems,
} from './redux/actions/action';
function App() {
  const [darkTheme, setDarkTheme] = useState(false);
  const [animate, setAnimate] = useState(false);
  const [todoItemName, setTodoItemName] = useState('');
  const [todoListStatus, setTodoListStatus] = useState('all');
  const todoHeadingText = {
    fontFamily: 'Josefin Sans',
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: 24,
    lineHeight: '40px',
    letterSpacing: '15px',
    color: '#ffffff',
  };
  const changeHandler = (event) => {
    setTodoItemName(event.target.value);
    console.log(event.target.value);
  };
  const todoList = useSelector((state) => state.todoListContainer);
  const dispatch = useDispatch();
  const todoListActive = todoList.filter((todoItem) => !todoItem.isCompleted);
  const todoListCompleted = todoList.filter((todoItem) => todoItem.isCompleted);
  const [newTodoList, setNewTodoList] = useState(todoList);
  return (
    <>
      <div
        className={
          darkTheme ? 'header-background-dark' : 'header-background-light'
        }
      >
        <div className='header-content'>
          <Typography component='h1' style={todoHeadingText}>
            TODO
          </Typography>
          <div
            className={`${
              animate ? 'animate__animated animate__rollIn' : ''
            } theme-change-image`}
            onClick={() => {
              setDarkTheme(!darkTheme);
              setAnimate(!animate);
            }}
          >
            <img src={!darkTheme ? moon : sun} alt='light' />
          </div>
        </div>
      </div>
      <div
        className='todo-list-container'
        style={{
          background: darkTheme ? '#171823' : '',
        }}
      >
        <div className={darkTheme ? 'text-field-dark' : 'text-field'}>
          <TextField
            placeholder='Create a new todo ...'
            variant='outlined'
            autoComplete='off'
            onChange={changeHandler}
            value={todoItemName}
            sx={{
              '& fieldset': { border: 'none' },
              '& input::placeholder': {
                color: darkTheme ? '#767992' : '#9495A5',
              },
            }}
            style={{
              width: '100%',
              height: 48,
              padding: 0,
              background: darkTheme ? '#25273D' : '#FFFFFF',
              borderRadius: 5,
              outline: 'none',
            }}
            inputProps={{
              style: {
                fontFamily: 'Josefin Sans',
                fontStyle: 'normal',
                fontWeight: 400,
                fontSize: 13,
                lineHeight: '12px',
                letterSpacing: '-0.166667px',
                color: darkTheme ? '#C8CBE7' : '#393A4B',
                paddingLeft: 12,
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment>
                  {darkTheme ? (
                    <DarkSubmitIcon
                      onClickProp={() => {
                        dispatch(
                          addTodoItemToList({
                            id: uuidv4(),
                            title: todoItemName,
                            isCompleted: false,
                          })
                        );
                        setTodoItemName('');
                      }}
                    />
                  ) : (
                    <SubmitIcon
                      onClickProp={() => {
                        console.log('I clicked here');
                        dispatch(
                          addTodoItemToList({
                            id: uuidv4(),
                            title: todoItemName,
                            isCompleted: false,
                          })
                        );
                        setTodoItemName('');
                      }}
                    />
                  )}
                </InputAdornment>
              ),
            }}
          />
          <div
            className='todo-list'
            style={{
              background: darkTheme ? '#25273D' : '',
              borderBottom: darkTheme ? '1px solid #25273D' : '',
              boxShadow: darkTheme
                ? '0px 35px 50px -15px rgba(0, 0, 0, 0.5)'
                : '',
              borderBottomLeftRadius: 0,
              borderBottomRightRadius: 0,
              minHeight:
                todoListStatus === 'active' || todoListStatus === 'completed'
                  ? 412
                  : '',
              maxHeight:
                todoListStatus === 'active' || todoListStatus === 'completed'
                  ? 412
                  : '',
            }}
          >
            <TodoListContainer
              darkTheme={darkTheme}
              todoList={
                todoListStatus === 'all'
                  ? todoList
                  : todoListStatus === 'active'
                  ? todoListActive
                  : todoListCompleted
              }
            />
          </div>
          {todoListStatus === 'all' && (
            <div
              className='todo-list-status'
              style={{
                background: darkTheme ? '#25273D' : '',
                borderTop: darkTheme ? '1px solid #393A4B' : '',
                borderBottomLeftRadius: 5,
                borderBottomRightRadius: 5,
              }}
            >
              <Typography
                style={{
                  fontFamily: 'Josefin Sans',
                  fontStyle: 'normal',
                  fontWeight: 400,
                  fontSize: 12,
                  lineHeight: '12px',
                  letterSpacing: '-0.166667px',
                  color: darkTheme ? '#9495A5' : '#9495A5',
                }}
              >
                {todoList.filter((todoItem) => !todoItem.isCompleted).length}{' '}
                {todoList.length > 1 ? 'items' : 'item'} left
              </Typography>
              <Typography
                style={{
                  fontFamily: 'Josefin Sans',
                  fontStyle: 'normal',
                  fontWeight: 400,
                  fontSize: 12,
                  lineHeight: '12px',
                  letterSpacing: '-0.166667px',
                  color: darkTheme ? '#9495A5' : '#9495A5',
                }}
                onClick={() => dispatch(clearCompletedListItems())}
              >
                Clear completed
              </Typography>
            </div>
          )}

          <div
            className='todo-status-indicator'
            style={{
              background: darkTheme ? '#25273D' : '',
              boxShadow: darkTheme
                ? '0px 35px 50px -15px rgba(0, 0, 0, 0.5)'
                : '',
            }}
          >
            <Typography
              style={{
                fontFamily: 'Josefin Sans',
                fontStyle: 'normal',
                fontWeight: 700,
                fontSize: '14px',
                lineHeight: '14px',
                letterSpacing: '-0.194444px',
                color: todoListStatus === 'all' ? '#3A7CFD' : '#9495A5',
              }}
              onClick={() => {
                setTodoListStatus('all');
              }}
            >
              All
            </Typography>
            <Typography
              style={{
                fontFamily: 'Josefin Sans',
                fontStyle: 'normal',
                fontWeight: 700,
                fontSize: '14px',
                lineHeight: '14px',
                letterSpacing: '-0.194444px',
                color: todoListStatus === 'active' ? '#3A7CFD' : '#9495A5',
              }}
              onClick={() => {
                setTodoListStatus('active');
              }}
            >
              Active
            </Typography>
            <Typography
              style={{
                fontFamily: 'Josefin Sans',
                fontStyle: 'normal',
                fontWeight: 700,
                fontSize: '14px',
                lineHeight: '14px',
                letterSpacing: '-0.194444px',
                color: todoListStatus === 'completed' ? '#3A7CFD' : '#9495A5',
              }}
              onClick={() => {
                setTodoListStatus('completed');
              }}
            >
              Completed
            </Typography>
          </div>
          <div>
            <Typography
              style={{
                fontFamily: 'Josefin Sans',
                fontStyle: 'normal',
                fontWeight: 400,
                fontSize: '14px',
                lineHeight: '14px',
                textAlign: 'center',
                letterSpacing: '-0.194444px',
                color: '#9495A5',
                marginTop: 20,
              }}
            >
              Drag and drop to reorder list
            </Typography>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
