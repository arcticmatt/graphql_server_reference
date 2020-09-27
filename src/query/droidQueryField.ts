import { Droid, getDroid } from "../StarWarsData";
import { GraphQLNonNull, GraphQLString } from "graphql";

import droid from "../droid";

const droidQueryField = {
  type: droid,
  args: {
    id: {
      description: "id of the droid",
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  resolve: (_source: any, args: any): Droid | null => getDroid(args.id),
};
export default droidQueryField;
