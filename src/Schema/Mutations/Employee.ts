import { GraphQLID, GraphQLString, GraphQLInt } from "graphql";
import { EmployeeType } from "../TypeDefs/Employee";
import { MessageType } from "../TypeDefs/Messages";
import { Employees } from "../../Entities/Employees";

export const CREATE_EMPLOYEE = {
  type: EmployeeType,
  args: {
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    age: { type: GraphQLInt },
    phoneNumber: { type: GraphQLString },
    email: { type: GraphQLString },
    jobLocation: { type: GraphQLString },
  },
  async resolve(parent: any, args: any) {
    const { firstName, lastName, age, phoneNumber, email, jobLocation, id } = args;
    let res = await Employees.insert({ firstName, lastName, age, phoneNumber, email, jobLocation });
    args.id = res.identifiers[0].id;
    return args;
  },
};

export const UPDATE_EMPLOYEE = {
  type: MessageType,
  args: {
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    age: { type: GraphQLInt },
    phoneNumber: { type: GraphQLString },
    email: { type: GraphQLString },
    jobLocation: { type: GraphQLString },
    id: { type: GraphQLInt }
  },
  async resolve(parent: any, args: any) {
    const { firstName, lastName, age, phoneNumber, email, jobLocation, id } = args;
    const employee = await Employees.findOne({ 
        where: { 
          id: id 
        } 
      });

    if (!employee) {
      throw new Error("Employee not exists");
    }

    await Employees.save({
        firstName: firstName,
        lastName: lastName,
        age: age,
        phoneNumber: phoneNumber,
        email: email,
        jobLocation: jobLocation,
        id: id
    });
    return { successful: true, message: "Employee details are updated successfully" };
  },
};

export const DELETE_EMPLOYEE = {
  type: MessageType,
  args: {
    id: { type: GraphQLID },
  },
  async resolve(parent: any, args: any) {
    const id = args.id;
    await Employees.delete(id);

    return { successful: true, message: "Employee deleted successfully" };
  },
};