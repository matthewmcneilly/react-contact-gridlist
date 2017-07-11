import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Employees } from '../../imports/collections/employees';
import EmployeeDetail from './employee_detail';

const PER_PAGE = 20;

class EmployeeList extends Component {
  // life cycle method
  componentWillMount() {
    this.page = 1;
  }

  handleButtonClick() {
    // (this.page + 1) prevents the first 20 being loaded again
    // when button click give me 20 more records
    Meteor.subscribe('employees', PER_PAGE * (this.page + 1));
    this.page += 1;
  }

  // must include render methods for class based components
  // this.props must be used for class based components
  // unlilke functional based components which just require props
  // as this.props is defined in the react {compoent} i.e. class ... extends compoent {
  render() {
    // props.employees => an array of employee objects
    // creating an EmployeeDetail for each employee
    // {employee} is the employee being passed down through the map function
    // employee= is the property that shows up on props object inside employeedetail component
    // react requires id for each employee or else it complains key={employee._id}
    // id being used is the one mongodb has created for us
    return (
      <div>
        <div className="employee-list">
          {this.props.employees.map(employee =>
            <EmployeeDetail key={employee._id} employee={employee} />
          )}
        </div>
        <button onClick={this.handleButtonClick.bind(this)}
          className="btn btn-primary">
          Load More...
        </button>
      </div>
    );
  }
};

// ^ onClick is an event handler

// container wraps the component and collection
// container watches for changes in collection and publishes those to the component (re-render)
export default createContainer(() => {
  // set up subscription
  Meteor.subscribe('employees', PER_PAGE);

  // returns an object.  Whatever is returned will be sent to EmployeeList
  // as props
  // fetch acctually executes the search
  // without fetch a cursor would be sent back
  // fetches only records we have subscribed to in Meteor.subscribe... above
  return { employees: Employees.find({}).fetch() };
}, EmployeeList);
