import { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLInt } from "graphql";

export const EmployeeType = new GraphQLObjectType({
  name: "Employee",
  fields: () => ({
    id: { type: GraphQLID },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    age: { type: GraphQLInt },
    phoneNumber: { type: GraphQLString },
    email: { type: GraphQLString },
    jobLocation: { type: GraphQLString }
  }),
});