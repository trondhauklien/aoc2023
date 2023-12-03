import day3 from "./index";

const testInput = `467..114..\r
...*......\r
..35..633.\r
......#...\r
617*......\r
.....+.58.\r
..592.....\r
......755.\r
...$.*....\r
.664.598..\r
`;

describe("On Day 3", () => {
  it(`part1 is finding part numbers`, () => {
    expect(day3.solveForPartOne(testInput)).toBe("4361");
  }),
    it(`part2 is finding gear '*' part numbers`, () => {
      expect(day3.solveForPartTwo(testInput)).toBe("467835");
    });
});
