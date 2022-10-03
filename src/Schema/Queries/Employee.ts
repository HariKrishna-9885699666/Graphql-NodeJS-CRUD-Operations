import { GraphQLList } from "graphql";
import { EmployeeType } from "../TypeDefs/Employee";
import { Employees } from "../../Entities/Employees";

export const GET_ALL_EMPLOYEES = {
  type: new GraphQLList(EmployeeType),
  resolve() {
    return Employees.find();
  },
};