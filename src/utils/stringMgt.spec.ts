import { describe, expect, it } from "vitest";
import { decodePokemonName } from "./stringMgt";

describe("stringMgt", () => {
  describe("decodePokemonName", () => {
    const samples = [
      {
        title: "should return a number between min and max",
        pokemonName: "",
        expected: "",
      },
    ];

    samples.forEach(({ title, pokemonName, expected }) => {
      it(title, () => {
        expect(decodePokemonName(pokemonName)).toEqual(expected);
      });
    });
  });
});
