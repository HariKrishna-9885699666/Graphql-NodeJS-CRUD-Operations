import { GraphQLObjectType, GraphQLSchema } from "graphql";
import { GET_ALL_EMPLOYEES } from "./Queries/Employee";
import { CREATE_EMPLOYEE, DELETE_EMPLOYEE, UPDATE_EMPLOYEE } from "./Mutations/Employee";

const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    getAllEmployees: GET_ALL_EMPLOYEES,
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    createEmployee: CREATE_EMPLOYEE,
    deleteEmployee: DELETE_EMPLOYEE,
    updateEmployee: UPDATE_EMPLOYEE,
  },
});

export const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});