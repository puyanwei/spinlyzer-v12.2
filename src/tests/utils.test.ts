import { countHashKeys } from '../utils/common';

describe.only(`function countHashKeys()`, () => {
  it(`should accept an array of objects and count the number of times a value was used on a specified key`, () => {
    const data = [
      {
        bob: 'hello',
        mike: 'see ya',
        john: 'hello',
        peter: 'hello',
      },
      {
        bob: 'hello',
        mike: 'bye',
        john: 'hello',
        peter: 'hello',
      },
      {
        bob: 'hello',
        mike: 'laters',
        john: 'hello',
        peter: 'hello',
      },
      {
        bob: 'hello',
        mike: 'bye',
        john: 'hello',
        peter: 'hello',
      },
    ];

    expect(countHashKeys(data, 'bob')).toEqual({ hello: 4 });
    expect(countHashKeys(data, 'mike')).toEqual({
      bye: 2,
      laters: 1,
      'see ya': 1,
    });
  });
  it(`should return an empty array if the value does not exist`, () => {
    const data = [
      {
        bob: 'hello',
        mike: 'laters',
        john: 'hello',
        peter: 'hello',
      },
      {
        bob: 'hello',
        mike: 'bye',
        john: 'hello',
        peter: 'hello',
      },
    ];
    expect(countHashKeys(data, 'aaron')).toEqual({});
  });
});