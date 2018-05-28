import { createStore, applyMiddleware } from 'redux';
import axios from 'axios';
import loggingMiddleware from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

//inital states
const initalState = {
  students: [],
  selectedStudent: {},
  showStudent: false,
};

//actions
const GET_STUDENTS = 'GET_STUDENTS';

//action creater
export const getStudents = students => {
  return {
    type: GET_STUDENTS,
    students,
  };
};

export const gotStudents = () => {
  // return dispatch => {
  //   const { data } = axios.get('/student');
  //   const action = getStudents(data);
  //   dispatch(action);
  // };
  return function thunk(dispatch) {
    return axios
      .get('/student')
      .then(res => res.data)
      .then(students => dispatch(getStudents(students)));
  };
};

const reducer = (state = initalState, action) => {
  switch (action.type) {
    case GET_STUDENTS:
      return { ...state, students: action.students };
    default:
      return state;
  }
};

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(loggingMiddleware, thunkMiddleware))
);

export default store;
