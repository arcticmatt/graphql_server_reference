import { droidData, humanData } from "./Data";

import { Character } from "./types/Character";

/**
 * Helper function to get a character by ID.
 */
function getCharacter(id: string): Promise<Character | null> {
  // Returning a promise just to illustrate that GraphQL.js supports it.
  return Promise.resolve(humanData[id] ?? droidData[id]);
}

export default getCharacter;
