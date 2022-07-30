import { mockHandHistory1Converted } from "./mocks/handHistoryParserMocks"
import { countHashKeys, findWord, returnNullAndWarn } from "../utils/helpers"

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
    it("returns null if no matching word is found", () => {
      const result = findWord(mockHandHistory1Converted, "Pokemon")
      expect(result).toEqual(null)
    })
    it("returns null if final index is a negative number", () => {
      const result = findWord(mockHandHistory1Converted, "PokerStars", -8)
      expect(result).toEqual(null)
    })
    it("returns null if final index is a higher then the total length of the array", () => {
      const result = findWord(
        ["hello", "world", "this", "is", "a", "test"],
        "hello",
        7,
      )
      expect(result).toEqual(null)
    })
  })

  describe("returnNullAndWarn()", () => {
    it("should return null and log a warning message in the console", () => {
      const data = ["hello", "world", "this", "is", "a", "test"]

      const consoleSpy = jest.spyOn(console, "warn")
      const result = returnNullAndWarn("This is a warning", data)
      expect(consoleSpy).toHaveBeenCalledWith("This is a warning", [
        "hello",
        "world",
        "this",
        "is",
        "a",
        "test",
      ])
      expect(result).toEqual(null)
    })
  })
})
