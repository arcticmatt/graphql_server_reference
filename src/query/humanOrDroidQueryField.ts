import { Droid, Human, getHumanOrDroid } from "../StarWarsData";

import { GraphQLNonNull } from "graphql";
import humanOrDroid from "../humanOrDroid";
import sumInput from "../sumInput";

const humanOrDroidQueryField = {
  type: humanOrDroid,
  args: {
    input: {
      type: GraphQLNonNull(sumInput),
    },
  },
  resolve(_source: any, args: any): Human | Droid {
    return getHumanOrDroid(args.input);
  },
};

export default humanOrDroidQueryField;
