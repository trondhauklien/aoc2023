import day2 from "./index";

describe("On Day 2", () => {
  it(`part1 is identity function`, () => {
    expect(
      day2.solveForPartOne(
        "Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green"
      )
    ).toBe("1");
  });
});
