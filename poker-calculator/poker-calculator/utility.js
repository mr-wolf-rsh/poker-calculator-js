'use strict';

export default class Utility {
    static replaceAceForOneIf(rankNumbers) {
        const hasAceAndTwo = [2, 14].every(rankN => rankNumbers.includes(rankN));

        if (hasAceAndTwo) {
            rankNumbers = rankNumbers.map(rankN => (rankN === 14) ? 1 : rankN).sort((a, b) => a - b);
        }

        return rankNumbers;
    }

    static getFrequencyObject(rankNumbers) {
        const integersCount = new Map();

        for (const i of rankNumbers) {
            if (!integersCount.has(i)) {
                integersCount.set(i, 1);
            } else {
                integersCount.set(i, integersCount.get(i) + 1);
            }
        }

        return integersCount;
    }
}
