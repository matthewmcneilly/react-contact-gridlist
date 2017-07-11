import React from 'react';

// saves the need for props.employee
const EmployeeDetail = ({ employee }) => {

  // destructuring saves the need for employee.name
  const { name, email, phone, avatar } = employee;

  return (
    <div className="thumbnail">
      <img src={avatar} />
      <div className="caption">
        <h3>{name}</h3>
        <ul className="list-group">
          <li className="list-group-item">Email: {email}</li>
          <li className="list-group-item">Phone: {phone}</li>
        </ul>
      </div>
    </div>
  );
};

export default EmployeeDetail;
