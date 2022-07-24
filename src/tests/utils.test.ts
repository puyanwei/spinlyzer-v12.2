import { countHashKeys } from "../utils/common";

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
    ];

    expect(countHashKeys(data, "bob")).toEqual({ hello: 4 });
    expect(countHashKeys(data, "mike")).toEqual({
      bye: 2,
      laters: 1,
      "see ya": 1,
    });
    expect(countHashKeys(data, "john")).toEqual({
      hello: 2,
      yo: 2,
    });
    expect(countHashKeys(data, "peter")).toEqual({
      hello: 1,
      hi: 1,
      sup: 2,
    });
  });
});
