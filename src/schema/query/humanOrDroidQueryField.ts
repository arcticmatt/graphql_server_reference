import { Droid } from "../../data/types/Droid";
import { GraphQLNonNull } from "graphql";
import { Human } from "../../data/types/Human";
import { getHumanOrDroid } from "../../data/getHumanOrDroid";
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
