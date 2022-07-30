import {
  getBuyIn,
  getTournamentNumber,
  putIntoArrayAndRemoveNewLines,
} from "../server/router/handHistoryParser";
import {
  mockHandHistory1Converted,
  mockHandHistory1,
} from "./mocks/handHistoryParserMocks";

describe(`handhistoryParser.ts`, () => {
  describe(`putIntoArrayAndRemoveNewLines()`, () => {
    it(`throws an error if the data is empty`, () => {
      expect.assertions(2);
      try {
        putIntoArrayAndRemoveNewLines(``);
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(error).toHaveProperty("message", "No data found");
      }
    });

    it(`transforms the text data into an array of words and removes the new line tags`, () => {
      const result = putIntoArrayAndRemoveNewLines(mockHandHistory1);
      const arrayOfNewLines = result.filter((word) => word.includes("/n"));
      expect(result).toEqual(mockHandHistory1Converted);
      expect(arrayOfNewLines).toEqual([]);
    });
  });

  describe(`getTournamentNumber()`, () => {
    it(`gets the tournament number`, () => {
      const result = getTournamentNumber(mockHandHistory1Converted);
      expect(result).toEqual(3205974213);
    });
  });

  describe(`getBuyIn()`, () => {
    it(`gets the buy in`, () => {
      const result = getBuyIn(mockHandHistory1Converted);
      expect(result).toEqual(5);
    });
  });
});
