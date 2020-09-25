/**
 * Code copied from https://github.com/graphql/graphql-js/blob/master/src/__tests__/starWarsSchema.js.
 */

import {
  GraphQLEnumType,
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLInterfaceType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLUnionType,
} from "graphql";
import {
  getDroid,
  getFriends,
  getHero,
  getHuman,
  getHumanOrDroid,
} from "./StarWarsData";

import invariant from "invariant";

/**
 * Using our shorthand to describe type systems, the type system for our
 * Star Wars example is:
 *
 * enum Episode { NEW_HOPE, EMPIRE, JEDI }
 *
 * interface Character {
 *   id: String!
 *   name: String
 *   friends: [Character]
 *   appearsIn: [Episode]
 * }
 *
 * type Human implements Character {
 *   id: String!
 *   name: String
 *   friends: [Character]
 *   appearsIn: [Episode]
 *   homePlanet: String
 * }
 *
 * type Droid implements Character {
 *   id: String!
 *   name: String
 *   friends: [Character]
 *   appearsIn: [Episode]
 *   primaryFunction: String
 * }
 *
 * input SumInput {
 *   one: Int!
 *   two: Int!
 *   three: Int!
 * }
 *
 * union HumanOrDroid = Human | Droid
 *
 * type Query {
 *   hero(episode: Episode): Character
 *   human(id: String!): Human
 *   droid(id: String!): Droid
 *   humanOrDroid(input: SumInput!): HumanOrDroid
 * }
 */

const episodeEnum = new GraphQLEnumType({
  name: "Episode",
  description: "One of the films in the Star Wars Trilogy",
  values: {
    NEW_HOPE: {
      value: 4,
      description: "Released in 1977.",
    },
    EMPIRE: {
      value: 5,
      description: "Released in 1980.",
    },
    JEDI: {
      value: 6,
      description: "Released in 1983.",
    },
  },
});

const characterInterface: any = new GraphQLInterfaceType({
  name: "Character",
  description: "A character in the Star Wars Trilogy",
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLString),
      description: "The id of the character.",
    },
    name: {
      type: GraphQLString,
      description: "The name of the character.",
    },
    friends: {
      type: new GraphQLList(characterInterface),
      description:
        "The friends of the character, or an empty list if they have none.",
    },
    appearsIn: {
      type: new GraphQLList(episodeEnum),
      description: "Which movies they appear in.",
    },
    secretBackstory: {
      type: GraphQLString,
      description: "All secrets about their past.",
    },
  }),
  resolveType(character) {
    switch (character.type) {
      case "Human":
        return humanType.name;
      case "Droid":
        return droidType.name;
    }

    // istanbul ignore next (Not reachable. All possible types have been considered)
    invariant(false, "throw");
  },
});

const humanType = new GraphQLObjectType({
  name: "Human",
  description: "A humanoid creature in the Star Wars universe.",
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLString),
      description: "The id of the human.",
    },
    name: {
      type: GraphQLString,
      description: "The name of the human.",
    },
    friends: {
      type: new GraphQLList(characterInterface),
      description:
        "The friends of the human, or an empty list if they have none.",
      resolve: (human) => getFriends(human),
    },
    appearsIn: {
      type: new GraphQLList(episodeEnum),
      description: "Which movies they appear in.",
    },
    homePlanet: {
      type: GraphQLString,
      description: "The home planet of the human, or null if unknown.",
    },
    secretBackstory: {
      type: GraphQLString,
      description: "Where are they from and how they came to be who they are.",
      resolve() {
        throw new Error("secretBackstory is secret.");
      },
    },
  }),
  interfaces: [characterInterface],
});

const droidType = new GraphQLObjectType({
  name: "Droid",
  description: "A mechanical creature in the Star Wars universe.",
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLString),
      description: "The id of the droid.",
    },
    name: {
      type: GraphQLString,
      description: "The name of the droid.",
    },
    friends: {
      type: new GraphQLList(characterInterface),
      description:
        "The friends of the droid, or an empty list if they have none.",
      resolve: (droid) => getFriends(droid),
    },
    appearsIn: {
      type: new GraphQLList(episodeEnum),
      description: "Which movies they appear in.",
    },
    secretBackstory: {
      type: GraphQLString,
      description: "Construction date and the name of the designer.",
      resolve() {
        throw new Error("secretBackstory is secret.");
      },
    },
    primaryFunction: {
      type: GraphQLString,
      description: "The primary function of the droid.",
    },
  }),
  interfaces: [characterInterface],
});

const sumInput = new GraphQLInputObjectType({
  name: "SumInput",
  fields: {
    one: {
      type: new GraphQLNonNull(GraphQLInt),
      description: "An arbitrary integer.",
    },
    two: {
      type: new GraphQLNonNull(GraphQLInt),
      description: "An arbitrary integer.",
    },
    three: {
      type: new GraphQLNonNull(GraphQLInt),
      description: "An arbitrary integer.",
    },
  },
});

const humanOrDroid = new GraphQLUnionType({
  name: "HumanOrDroid",
  types: [humanType, droidType],
  resolveType(character) {
    switch (character.type) {
      case "Human":
        return humanType.name;
      case "Droid":
        return droidType.name;
    }

    // istanbul ignore next (Not reachable. All possible types have been considered)
    invariant(false, "throw");
  },
});

const queryType = new GraphQLObjectType({
  name: "Query",
  fields: () => ({
    hero: {
      type: characterInterface,
      args: {
        episode: {
          description:
            "If omitted, returns the hero of the whole saga. If provided, returns the hero of that particular episode.",
          type: episodeEnum,
        },
      },
      resolve: (_source, { episode }) => getHero(episode),
    },
    human: {
      type: humanType,
      args: {
        id: {
          description: "id of the human",
          type: new GraphQLNonNull(GraphQLString),
        },
      },
      resolve: (_source, { id }) => getHuman(id),
    },
    droid: {
      type: droidType,
      args: {
        id: {
          description: "id of the droid",
          type: new GraphQLNonNull(GraphQLString),
        },
      },
      resolve: (_source, { id }) => getDroid(id),
    },
    humanOrDroid: {
      type: humanOrDroid,
      args: {
        input: {
          type: sumInput,
        },
      },
      resolve: (_source, { input }) => getHumanOrDroid(input),
    },
  }),
});

const starWarsSchema: GraphQLSchema = new GraphQLSchema({
  query: queryType,
  types: [humanType, droidType],
});

export default starWarsSchema;
