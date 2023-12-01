import day1 from './index';

describe('On Day 1', () =>{
    it(`part1 is reading first and last number in string`, ()=>{
        expect(day1.solveForPartOne('1abc2')).toBe("12");
        expect(day1.solveForPartOne('pqr3stu8vwx')).toBe("38");
        expect(day1.solveForPartOne('a1b2c3d4e5f')).toBe("15");
        expect(day1.solveForPartOne('treb7uchet')).toBe("77");
    }),
    it(`part2 includes numbers as strings, eg. 'one'`, ()=>{
        expect(day1.solveForPartTwo('two1nine')).toBe("29");
        expect(day1.solveForPartTwo('eightwothree')).toBe("83");
        expect(day1.solveForPartTwo('abcone2threexyz')).toBe("13");
        expect(day1.solveForPartTwo('xtwone3four')).toBe("24");
    })
});