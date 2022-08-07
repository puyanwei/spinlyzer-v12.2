import { resolveForLineChart } from "../utils/parserForCharts"
import {
  profitByResultsMock1,
  profitByResultsMock2,
} from "./mocks/ParserForChartsMocks"

describe(`parsersForCharts.ts`, () => {
  describe(`resolveForLineChart()`, () => {
    it(`returns an array of objects of number of games and profit`, () => {
      const result = [
        { x: 0, y: -5 },
        { x: 1, y: 5 },
        { x: 2, y: 0 },
        { x: 3, y: -5 },
        { x: 4, y: -10 },
        { x: 5, y: -15 },
        { x: 6, y: -5 },
        { x: 7, y: -10 },
        { x: 8, y: -15 },
        { x: 9, y: -10 },
        { x: 10, y: -5 },
        { x: 11, y: -10 },
        { x: 12, y: -15 },
        { x: 13, y: -20 },
        { x: 14, y: -25 },
        { x: 15, y: -20 },
      ]
      expect(resolveForLineChart(profitByResultsMock1)).toEqual(result)
    })

    it(`returns an array of objects of number of games and profit`, () => {
      const result = [
        { x: 0, y: 10 },
        { x: 1, y: 20 },
        { x: 2, y: 15 },
        { x: 3, y: 20 },
        { x: 4, y: 15 },
        { x: 5, y: 25 },
        { x: 6, y: 20 },
        { x: 7, y: 15 },
        { x: 8, y: 10 },
        { x: 9, y: 20 },
        { x: 10, y: 15 },
        { x: 11, y: 25 },
      ]

      expect(resolveForLineChart(profitByResultsMock2)).toEqual(result)
    })
  })
})
