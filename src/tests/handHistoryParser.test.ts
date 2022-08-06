import {
  getBuyIn,
  getCurrency,
  getDateStartedEasternTime,
  getFirstPlace,
  getFirstPlaceCountry,
  getNumberOfPlayers,
  getPrizePool,
  getRake,
  getResult,
  getSecondPlace,
  getSecondPlaceCountry,
  getThirdPlace,
  getThirdPlaceCountry,
  getTotalBuyIn,
  getTournamentNumber,
  handHistoryParser,
  putIntoArrayAndRemoveNewLines,
  resolveTotalBuyIn,
} from "../utils/handHistoryParser"
import {
  mockHandHistory1Converted,
  mockHandHistory1,
  mockHandHistory2,
} from "./mocks/handHistoryParserMocks"

describe(`handhistoryParser.ts`, () => {
  it("parses a hand history and returns the data in a statistics object", () => {
    const statistics = {
      buyIn: 4.65,
      currency: "USD",
      dateStartedEasternTime: "2021/06/02 5:25:45",
      firstPlace: "puyan",
      firstPlaceCountry: "United Kingdom",
      numberOfPlayers: 3,
      prizePool: 10,
      rake: 0.35,
      result: "1st",
      secondPlace: "bubonik90",
      secondPlaceCountry: "Russia",
      thirdPlace: "Lesnik995",
      thirdPlaceCountry: "Russia",
      totalBuyIn: 5,
      tournamentNumber: 3205974213,
    }
    expect(handHistoryParser(mockHandHistory1)).toEqual(statistics)
  })
  it("parses another hand history and returns the data in a statistics object", () => {
    const statistics = {
      buyIn: 4.65,
      currency: "USD",
      dateStartedEasternTime: "2021/06/02 5:39:04",
      firstPlace: "puyan",
      firstPlaceCountry: "United Kingdom",
      numberOfPlayers: 3,
      prizePool: 15,
      rake: 0.35,
      result: "1st",
      secondPlace: "nixON232",
      secondPlaceCountry: "Belarus",
      thirdPlace: "TotalBeton",
      thirdPlaceCountry: "Belarus",
      totalBuyIn: 5,
      tournamentNumber: 3205978211,
    }
    expect(handHistoryParser(mockHandHistory2)).toEqual(statistics)
  })

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
      const arrayOfNewLines = result.filter(word => word.includes("/n"))
      expect(result).toEqual(mockHandHistory1Converted)
      expect(arrayOfNewLines).toEqual([])
    })
  })

  describe(`getTournamentNumber()`, () => {
    it(`gets the tournament number`, () => {
      const result = getTournamentNumber(mockHandHistory1Converted)
      expect(result).toEqual(3205974213)
    })
    it(`throws an error if it does not find a word with a hashtag in it`, () => {
      expect.assertions(2)
      try {
        getTournamentNumber(["hello", "world"])
      } catch (error) {
        expect(error).toBeInstanceOf(Error)
        expect(error).toHaveProperty("message", "Did not find # in data")
      }
    })
  })

  describe(`resolveTotalBuyIns()`, () => {
    it(`parses the string after the BuyIn text, splits up the rake and buyin and returns a tuple as a number`, () => {
      const result = resolveTotalBuyIn(mockHandHistory1Converted)
      expect(result).toEqual([4.65, 0.35])
    })
    it(`throws an error if data does not contain both the rake and the buy in fee`, () => {
      expect.assertions(2)
      try {
        resolveTotalBuyIn(["Hold'emBuy-In:", "$4.65"])
      } catch (error) {
        expect(error).toBeInstanceOf(Error)
        expect(error).toHaveProperty("message", "Did not find a slash to split")
      }
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
  describe(`getPrizePool()`, () => {
    it(`gets the prize pool`, () => {
      const result = getPrizePool(mockHandHistory1Converted)
      expect(result).toEqual(10)
    })
  })
  describe(`getCurrency()`, () => {
    it(`gets the currency`, () => {
      const result = getCurrency(mockHandHistory1Converted)
      expect(result).toEqual("USD")
    })
  })
  describe(`getDateStarted()`, () => {
    it(`gets the date and time the tournament started`, () => {
      const result = getDateStartedEasternTime(mockHandHistory1Converted)
      expect(result).toEqual("2021/06/02 5:25:45")
    })
  })
  describe(`getFirstPlace()`, () => {
    it(`gets the username of first place`, () => {
      const result = getFirstPlace(mockHandHistory1Converted)
      expect(result).toEqual("puyan")
    })
  })
  describe(`getSecondPlace()`, () => {
    it(`gets the username of second place`, () => {
      const result = getSecondPlace(mockHandHistory1Converted)
      expect(result).toEqual("bubonik90")
    })
  })
  describe(`getThirdPlace()`, () => {
    it(`gets the username of third place`, () => {
      const result = getThirdPlace(mockHandHistory1Converted)
      expect(result).toEqual("Lesnik995")
    })
  })
  describe(`getFirstPlaceCountry()`, () => {
    it(`gets the country of first place`, () => {
      const result = getFirstPlaceCountry(mockHandHistory1)
      expect(result).toEqual("United Kingdom")
    })
  })
  describe(`getSecondPlaceCountry()`, () => {
    it(`gets the country of first place`, () => {
      const result = getSecondPlaceCountry(mockHandHistory1)
      expect(result).toEqual("Russia")
    })
  })
  describe(`getThirdPlaceCountry()`, () => {
    it(`gets the country of first place`, () => {
      const result = getThirdPlaceCountry(mockHandHistory1)
      expect(result).toEqual("Russia")
    })
  })
  describe(`getResult()`, () => {
    it(`gets the result of the tournament`, () => {
      const result = getResult(mockHandHistory1Converted)
      expect(result).toEqual("1st")
    })
  })
})
