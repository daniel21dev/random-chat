import { messageResolvers } from "./message";
import { userResolvers } from "./user";

export const resolvers ={
    Query:{
        ...userResolvers.Query,
        ...messageResolvers.Query,
    },
    Mutation:{
        ...userResolvers.Mutation,
        ...messageResolvers.Mutation,
    }
}