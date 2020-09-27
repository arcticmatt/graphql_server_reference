import { Character } from "../../data/types/Character";
import character from "../character";
import episode from "../episode";
import getHero from "../../data/getHero";

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
