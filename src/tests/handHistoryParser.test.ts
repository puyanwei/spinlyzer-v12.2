import {
  getBuyIn,
  getNumberOfPlayers,
  getRake,
  getTotalBuyIn,
  getTournamentNumber,
  putIntoArrayAndRemoveNewLines,
  resolveTotalBuyIn,
} from "../server/router/handHistoryParser"
import {
  mockHandHistory1Converted,
  mockHandHistory1,
} from "./mocks/handHistoryParserMocks"

describe(`handhistoryParser.ts`, () => {
  describe(`putIntoArrayAndRemoveNewLines()`, () => {
    it(`throws an error if the data is empty`, () => {
      expect.assertions(2)
      try {
        putIntoArrayAndRemoveNewLines(``)
      } catch (error) {
        expect(error).toBeInstanceOf(Error)
        expect(error).toHaveProperty("message", "No data found")
      }
    })

    it(`transforms the text data into an array of words and removes the new line tags`, () => {
      const result = putIntoArrayAndRemoveNewLines(mockHandHistory1)
      const arrayOfNewLines = result.filter((word) => word.includes("/n"))
      expect(result).toEqual(mockHandHistory1Converted)
      expect(arrayOfNewLines).toEqual([])
    })
  })

  describe(`getTournamentNumber()`, () => {
    it(`gets the tournament number`, () => {
      const result = getTournamentNumber(mockHandHistory1Converted)
      expect(result).toEqual(3205974213)
    })
    it(`returns null if it does not find a word with a hashtag in it`, () => {
      const result = getTournamentNumber(["hello", "world"])
      expect(result).toEqual(null)
    })
  })

  describe(`resolveTotalBuyIns()`, () => {
    it(`parses the string after the BuyIn text, splits up the rake and buyin and returns a tuple as a number`, () => {
      const result = resolveTotalBuyIn(mockHandHistory1Converted)
      expect(result).toEqual([4.65, 0.35])
    })
    it(`returns null if data does not contain both the rake and the buy in fee`, () => {
      const result = resolveTotalBuyIn(["Hold'emBuy-In:", "$4.65"])
      expect(result).toEqual(null)
      const anotherResult = resolveTotalBuyIn(["Hold'emBuy-In:", "/$0.35"])
      expect(anotherResult).toEqual(null)
    })
  })

  describe(`getBuyIn()`, () => {
    it(`gets the take`, () => {
      const result = getBuyIn(mockHandHistory1Converted)
      expect(result).toEqual(4.65)
    })
  })

  describe(`getRake()`, () => {
    it(`gets the take`, () => {
      const result = getRake(mockHandHistory1Converted)
      expect(result).toEqual(0.35)
    })
  })

  describe(`getTotalBuyIn()`, () => {
    it(`gets the buy in`, () => {
      const result = getTotalBuyIn(mockHandHistory1Converted)
      expect(result).toEqual(5)
    })
  })

  describe(`getNumberOfPlayers()`, () => {
    it(`gets the total number of tournament players`, () => {
      const result = getNumberOfPlayers(mockHandHistory1Converted)
      expect(result).toEqual(3)
    })
  })
})
