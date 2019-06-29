/* eslint-disable no-undef */
import Calculator from "../src/calculator";

const FILE_PATH_SOURCE = process.cwd() + "\\" + "pokerdata.txt";

let calculator = null/* new Calculator(FILE_PATH_SOURCE) */;

describe.only('CalculatorTest', () => {
    beforeAll(() => {
        calculator = new Calculator(FILE_PATH_SOURCE);
    });

    test('testCalculator', () => expect(new Calculator(FILE_PATH_SOURCE)).toBeDefined());

    test('testGetWinners', () => expect(calculator.winners).toEqual([376, 624, 0]));

    test('testGetGames', () => expect(calculator.games).toBe(1000));

    test('testPrintResults', () => {
        const filePathTarget = process.cwd() + "\\";
        expect(calculator.printResults(filePathTarget)).toBeTruthy();
    });

    test('testToString', () => expect(calculator.toString())
        .toBe('Total Games: 1000\nPlayer 1: 376\nPlayer 2: 624\nTie: 0'));
});
