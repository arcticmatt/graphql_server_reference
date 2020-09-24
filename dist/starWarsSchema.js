"use strict";
/**
 * Code copied from https://github.com/graphql/graphql-js/blob/master/src/__tests__/starWarsSchema.js.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const StarWarsData_1 = require("./StarWarsData");
const invariant_1 = __importDefault(require("invariant"));
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
 * type Query {
 *   hero(episode: Episode): Character
 *   human(id: String!): Human
 *   droid(id: String!): Droid
 * }
 */
const episodeEnum = new graphql_1.GraphQLEnumType({
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
const characterInterface = new graphql_1.GraphQLInterfaceType({
    name: "Character",
    description: "A character in the Star Wars Trilogy",
    fields: () => ({
        id: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString),
            description: "The id of the character.",
        },
        name: {
            type: graphql_1.GraphQLString,
            description: "The name of the character.",
        },
        friends: {
            type: new graphql_1.GraphQLList(characterInterface),
            description: "The friends of the character, or an empty list if they have none.",
        },
        appearsIn: {
            type: new graphql_1.GraphQLList(episodeEnum),
            description: "Which movies they appear in.",
        },
        secretBackstory: {
            type: graphql_1.GraphQLString,
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
        invariant_1.default(false, "throw");
    },
});
const humanType = new graphql_1.GraphQLObjectType({
    name: "Human",
    description: "A humanoid creature in the Star Wars universe.",
    fields: () => ({
        id: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString),
            description: "The id of the human.",
        },
        name: {
            type: graphql_1.GraphQLString,
            description: "The name of the human.",
        },
        friends: {
            type: new graphql_1.GraphQLList(characterInterface),
            description: "The friends of the human, or an empty list if they have none.",
            resolve: (human) => StarWarsData_1.getFriends(human),
        },
        appearsIn: {
            type: new graphql_1.GraphQLList(episodeEnum),
            description: "Which movies they appear in.",
        },
        homePlanet: {
            type: graphql_1.GraphQLString,
            description: "The home planet of the human, or null if unknown.",
        },
        secretBackstory: {
            type: graphql_1.GraphQLString,
            description: "Where are they from and how they came to be who they are.",
            resolve() {
                throw new Error("secretBackstory is secret.");
            },
        },
    }),
    interfaces: [characterInterface],
});
const droidType = new graphql_1.GraphQLObjectType({
    name: "Droid",
    description: "A mechanical creature in the Star Wars universe.",
    fields: () => ({
        id: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString),
            description: "The id of the droid.",
        },
        name: {
            type: graphql_1.GraphQLString,
            description: "The name of the droid.",
        },
        friends: {
            type: new graphql_1.GraphQLList(characterInterface),
            description: "The friends of the droid, or an empty list if they have none.",
            resolve: (droid) => StarWarsData_1.getFriends(droid),
        },
        appearsIn: {
            type: new graphql_1.GraphQLList(episodeEnum),
            description: "Which movies they appear in.",
        },
        secretBackstory: {
            type: graphql_1.GraphQLString,
            description: "Construction date and the name of the designer.",
            resolve() {
                throw new Error("secretBackstory is secret.");
            },
        },
        primaryFunction: {
            type: graphql_1.GraphQLString,
            description: "The primary function of the droid.",
        },
    }),
    interfaces: [characterInterface],
});
const queryType = new graphql_1.GraphQLObjectType({
    name: "Query",
    fields: () => ({
        hero: {
            type: characterInterface,
            args: {
                episode: {
                    description: "If omitted, returns the hero of the whole saga. If provided, returns the hero of that particular episode.",
                    type: episodeEnum,
                },
            },
            resolve: (_source, { episode }) => StarWarsData_1.getHero(episode),
        },
        human: {
            type: humanType,
            args: {
                id: {
                    description: "id of the human",
                    type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString),
                },
            },
            resolve: (_source, { id }) => StarWarsData_1.getHuman(id),
        },
        droid: {
            type: droidType,
            args: {
                id: {
                    description: "id of the droid",
                    type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString),
                },
            },
            resolve: (_source, { id }) => StarWarsData_1.getDroid(id),
        },
    }),
});
const starWarsSchema = new graphql_1.GraphQLSchema({
    query: queryType,
    types: [humanType, droidType],
});
exports.default = starWarsSchema;
