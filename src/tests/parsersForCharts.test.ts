import { resolveForLineChart } from "../utils/parserForCharts"
import {
  profitByResultsMock1,
  profitByResultsMock2,
} from "./mocks/ParserForChartsMocks"

describe(`parsersForCharts.ts`, () => {
  describe(`resolveForLineChart()`, () => {
    it(`returns an array of objects of number of games and profit`, () => {
      const result = [
        { gameNumber: 0, profit: -10 },
        { gameNumber: 1, profit: 5 },
        { gameNumber: 2, profit: -10 },
        { gameNumber: 3, profit: -25 },
        { gameNumber: 4, profit: -35 },
        { gameNumber: 5, profit: -45 },
        { gameNumber: 6, profit: -30 },
        { gameNumber: 7, profit: -40 },
        { gameNumber: 8, profit: -50 },
        { gameNumber: 9, profit: -40 },
        { gameNumber: 10, profit: -30 },
        { gameNumber: 11, profit: -45 },
        { gameNumber: 12, profit: -55 },
        { gameNumber: 13, profit: -65 },
        { gameNumber: 14, profit: -75 },
        { gameNumber: 15, profit: -65 },
      ]
      expect(resolveForLineChart(profitByResultsMock1)).toEqual(result)
    })

    it(`returns an array of objects of number of games and profit`, () => {
      const result = [
        { gameNumber: 0, profit: 15 },
        { gameNumber: 1, profit: 30 },
        { gameNumber: 2, profit: 15 },
        { gameNumber: 3, profit: 25 },
        { gameNumber: 4, profit: 15 },
        { gameNumber: 5, profit: 30 },
        { gameNumber: 6, profit: 20 },
        { gameNumber: 7, profit: 10 },
        { gameNumber: 8, profit: -5 },
        { gameNumber: 9, profit: 10 },
        { gameNumber: 10, profit: 0 },
        { gameNumber: 11, profit: 15 },
      ]

      expect(resolveForLineChart(profitByResultsMock2)).toEqual(result)
    })
  })
})
