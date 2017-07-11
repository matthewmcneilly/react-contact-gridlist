// Anything in the imports folder will be shared between client and server
// Imports folders will be run before anything else

// The mongodb server is ran when meteor command is given in terminal
import { Mongo } from 'meteor/mongo';

// Declares our mongodb collection called employees
// Collection is a bucket of related data (documents)
// Kind of like a RDBMS table
export const Employees = new Mongo.Collection('employees');

// use export default when exporting just one variable
// use export when exporting multiple variables 
