import { Character, getHero } from "../StarWarsData";

import character from "../character";
import episode from "../episode";

const heroQueryField = {
  type: character,
  args: {
    episode: {
      description:
        "If omitted, returns the hero of the whole saga. If provided, returns the hero of that particular episode.",
      type: episode,
    },
  },
  resolve: (_source: any, args: any): Character => {
    return getHero(args.episode);
  },
};

export default heroQueryField;
