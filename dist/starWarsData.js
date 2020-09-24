"use strict";
/**
 * Code copied from https://github.com/graphql/graphql-js/blob/master/src/__tests__/starWarsData.js.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDroid = exports.getHuman = exports.getHero = exports.getFriends = void 0;
/**
 * This defines a basic set of data for our Star Wars Schema.
 *
 * This data is hard coded for the sake of the demo, but you could imagine
 * fetching this data from a backend service rather than from hardcoded
 * JSON objects in a more complex demo.
 */
const luke = {
    type: "Human",
    id: "1000",
    name: "Luke Skywalker",
    friends: ["1002", "1003", "2000", "2001"],
    appearsIn: [4, 5, 6],
    homePlanet: "Tatooine",
};
const vader = {
    type: "Human",
    id: "1001",
    name: "Darth Vader",
    friends: ["1004"],
    appearsIn: [4, 5, 6],
    homePlanet: "Tatooine",
};
const han = {
    type: "Human",
    id: "1002",
    name: "Han Solo",
    friends: ["1000", "1003", "2001"],
    appearsIn: [4, 5, 6],
};
const leia = {
    type: "Human",
    id: "1003",
    name: "Leia Organa",
    friends: ["1000", "1002", "2000", "2001"],
    appearsIn: [4, 5, 6],
    homePlanet: "Alderaan",
};
const tarkin = {
    type: "Human",
    id: "1004",
    name: "Wilhuff Tarkin",
    friends: ["1001"],
    appearsIn: [4],
};
const humanData = {
    [luke.id]: luke,
    [vader.id]: vader,
    [han.id]: han,
    [leia.id]: leia,
    [tarkin.id]: tarkin,
};
const threepio = {
    type: "Droid",
    id: "2000",
    name: "C-3PO",
    friends: ["1000", "1002", "1003", "2001"],
    appearsIn: [4, 5, 6],
    primaryFunction: "Protocol",
};
const artoo = {
    type: "Droid",
    id: "2001",
    name: "R2-D2",
    friends: ["1000", "1002", "1003"],
    appearsIn: [4, 5, 6],
    primaryFunction: "Astromech",
};
const droidData = {
    [threepio.id]: threepio,
    [artoo.id]: artoo,
};
/**
 * Helper function to get a character by ID.
 */
function getCharacter(id) {
    var _a;
    // Returning a promise just to illustrate that GraphQL.js supports it.
    return Promise.resolve((_a = humanData[id]) !== null && _a !== void 0 ? _a : droidData[id]);
}
/**
 * Allows us to query for a character's friends.
 */
function getFriends(character) {
    // Notice that GraphQL accepts Arrays of Promises.
    return character.friends.map((id) => getCharacter(id));
}
exports.getFriends = getFriends;
/**
 * Allows us to fetch the undisputed hero of the Star Wars trilogy, R2-D2.
 */
function getHero(episode) {
    if (episode === 5) {
        // Luke is the hero of Episode V.
        return luke;
    }
    // Artoo is the hero otherwise.
    return artoo;
}
exports.getHero = getHero;
/**
 * Allows us to query for the human with the given id.
 */
function getHuman(id) {
    return humanData[id];
}
exports.getHuman = getHuman;
/**
 * Allows us to query for the droid with the given id.
 */
function getDroid(id) {
    return droidData[id];
}
exports.getDroid = getDroid;
