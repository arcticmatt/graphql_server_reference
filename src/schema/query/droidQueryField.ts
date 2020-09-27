import { GraphQLNonNull, GraphQLString } from "graphql";

import { Droid } from "../../data/types/Droid";
import droid from "../droid";
import { getDroid } from "../../data/getDroid";

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
