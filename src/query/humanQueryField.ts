import { GraphQLNonNull, GraphQLString } from "graphql";
import { Human, getHuman } from "../StarWarsData";

import human from "../human";

const humanQueryField = {
  type: human,
  args: {
    id: {
      description: "id of the human",
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  resolve: (_source: any, args: any): Human | null => getHuman(args.id),
};

export default humanQueryField;
