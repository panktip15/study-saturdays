import React, { Component } from 'react';
import axios from 'axios';

import StudentList from './StudentList.js';
import SingleStudent from './SingleStudent.js';
import NewStudentForm from './NewStudentForm.js';
import store, { gotStudents } from './store';

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = store.getState();
    // {
    //     students: [],
    //     selectedStudent: {},
    //     showStudent: false,
    //   };

    this.selectStudent = this.selectStudent.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.addStudent = this.addStudent.bind(this);
  }

  componentDidMount() {
    this.getStudents();
    this.unsubscribe = store.subscribe(() => this.setState(store.getState()));
  }

  getStudents() {
    console.log('fetching');
    store.dispatch(gotStudents());
    // axios
    //   .get('/student')
    //   .then(res => this.setState({ students: res.data }))
    //   .catch(console.error);
  }
  componentWillUnmount() {
    this.unsubscribe();
  }

  selectStudent(student) {
    return this.setState({
      selectedStudent: student,
    });
  }

  addStudent(student) {
    axios
      .post('/student', student)
      .then(res => {
        return res.data;
      })
      .then(newStudent => {
        this.setState({
          students: [...this.state.students, newStudent],
          showStudent: false,
        });
      });
  }

  handleClick(e) {
    return this.setState({
      showStudent: !this.state.showStudent,
    });
  }

  render() {
    console.log('MYSTATE', this.state);
    return (
      <div>
        <h1>Students</h1>
        <button onClick={this.handleClick}>Add Student</button>
        {this.state.showStudent ? (
          <NewStudentForm addStudent={this.addStudent} />
        ) : null}
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Tests</th>
            </tr>
          </thead>
          <StudentList
            students={this.state.students}
            selectStudent={this.selectStudent}
          />
        </table>
        {this.state.selectedStudent.id ? (
          <SingleStudent student={this.state.selectedStudent} />
        ) : null}
      </div>
    );
  }
}
