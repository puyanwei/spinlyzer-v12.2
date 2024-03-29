import {
  mockHandHistory1,
  mockHandHistory1Converted,
} from "./mocks/handHistoryParserMocks"
import { countHashKeys, findCountries, findWord } from "../utils/helpers"
import { resolveForPieChart } from "../utils/parserForCharts"

describe(`utils.ts`, () => {
  describe(`countHashKeys()`, () => {
    it(`should accept an array of objects and count the number of times a value was used on a specified key`, () => {
      const data = [
        {
          bob: "hello",
          mike: "see ya",
          john: "yo",
          peter: "sup",
        },
        {
          bob: "hello",
          mike: "bye",
          john: "hello",
          peter: "hi",
        },
        {
          bob: "hello",
          mike: "laters",
          john: "yo",
          peter: "hello",
        },
        {
          bob: "hello",
          mike: "bye",
          john: "hello",
          peter: "sup",
        },
      ]

      expect(countHashKeys(data, "bob")).toEqual({ hello: 4 })
      expect(countHashKeys(data, "mike")).toEqual({
        bye: 2,
        laters: 1,
        "see ya": 1,
      })
      expect(countHashKeys(data, "john")).toEqual({
        hello: 2,
        yo: 2,
      })
      expect(countHashKeys(data, "peter")).toEqual({
        hello: 1,
        hi: 1,
        sup: 2,
      })
    })
  })

  describe("findWord()", () => {
    it("returns the word from the array of strings", () => {
      const result = findWord(mockHandHistory1Converted, "Tournament")
      expect(result).toEqual("Tournament")
    })
    it("returns the word after the chosen one from the array of strings", () => {
      const result = findWord(mockHandHistory1Converted, "Tournament", 1)
      expect(result).toEqual("#3205974213,")
    })
    it("returns the word before the chosen one from the array of strings", () => {
      const result = findWord(mockHandHistory1Converted, "Tournament", -1)
      expect(result).toEqual("PokerStars")
    })
    it("throws an error if no matching word is found", () => {
      expect.assertions(2)
      try {
        findWord(mockHandHistory1Converted, "Pokemon")
      } catch (error) {
        expect(error).toBeInstanceOf(Error)
        expect(error).toHaveProperty("message", "No word found")
      }
    })
    it("throws an error if final index is a negative number", () => {
      expect.assertions(2)
      try {
        findWord(mockHandHistory1Converted, "PokerStars", -8)
      } catch (error) {
        expect(error).toBeInstanceOf(Error)
        expect(error).toHaveProperty(
          "message",
          "Element movement parameter too low"
        )
      }
    })
    it("throws an error if final index is a higher then the total length of the array", () => {
      expect.assertions(2)
      try {
        findWord(["hello", "world", "this", "is", "a", "test"], "hello", 8)
      } catch (error) {
        expect(error).toBeInstanceOf(Error)
        expect(error).toHaveProperty(
          "message",
          "Element movement parameter too high"
        )
      }
    })
  })

  describe("findCountries()", () => {
    it("finds the countries in the data and returns them in an array", () => {
      const result = findCountries(mockHandHistory1)
      expect(result).toEqual(["United Kingdom", "Russia", "Russia"])
    })
  })

  describe("resolveForPieChart()", () => {
    it(`parses the object into array of objects with the key is the name's value and the value is the value`, () => {
      const args = { "2nd": 464, "3rd": 325, "1st": 447 }
      const result = [
        { x: "2nd", y: 464, z: "37.5%" },
        { x: "3rd", y: 325, z: "26.3%" },
        { x: "1st", y: 447, z: "36.2%" },
      ]
      expect(resolveForPieChart(args)).toEqual(result)
    })
  })
})
