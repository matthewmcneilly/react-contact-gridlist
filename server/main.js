// everything in the server folder is only executed on the server
// same for client folder only executed on the client

import _ from 'lodash';
import { Meteor } from 'meteor/meteor';
import { Employees } from '../imports/collections/employees';
import { image, helpers } from 'faker';

// faker is only used for development not in a production environment

Meteor.startup(() => {
  // Check to see if data exists in the collection
  // returns the number of records (employees) in the collection
  // passes in empty object {} saying give me everthing in the collection i.e. no filter params
  // count is used because a cursor is being sent back not an array so .length cant be used
  // a cursor is like a bookmark, it isnt acctually sending back data to the find method
  // it just says this is what I have, if you want it I can send it
  const numberRecords = Employees.find({}).count();
  // logs number of records to terminal
  // console.log(numberRecords);

  // if no records
  if (!numberRecords) {
    // Generate some data...
    // function called 5000 times
    _.times(5000, () => {
      // same as writting const { name } = helpers.CreateCard.name ... const { email } = helpers... blah blah
      const { name, email, phone } = helpers.createCard();

      // insert new generated employee into collection
      Employees.insert({
        // same as writting name: name, email: email...
        name, email, phone,
        avatar: image.avatar()
      });
    });
  }

  // meteor has a publish and subscribe method
  // by default meteor will want to publish all the records in a collection to the client (server to client)
  // this is for ease of use when developing
  // we dont want because of performance and security reasons
  // the subscribe is the client asking can I have (client to server)
  Meteor.publish('employees', function(per_page) {
    // limit statement limits the amount of data send back to anyone accessing the employees collection
    return Employees.find({}, { limit: per_page });
  });
});
