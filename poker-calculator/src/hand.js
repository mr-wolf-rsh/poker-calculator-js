'use strict';

import HandRank from './hand-rank';
import Card from './card';
import Rank from './rank';
import Utility from './utility';

const HAND_SIZE = 5;

export default class Hand {
    constructor(cards) {
        this.cards = cards;
        this.handRank = this.evaluate();
    }

    static fromString(input) {
        const parts = input.split(" ");
        const cards = parts.map(part => Card.fromString(part));
        return cards;
    }

    toStringName() {
        return this.cards.map(card => card.toStringName()).join("\n");
    }

    evaluate() {
        const cardsInHand = this.cards;
        const isFlush = new Set(cardsInHand.map(card => card.suit.suitValue)).size === 1;

        let rankNumbers = cardsInHand.map(card => card.rank.rankNumber).sort((a, b) => a - b);
        const isStraight = this.isStraight(rankNumbers);

        if (isFlush && isStraight) {
            if (this.isRoyal(cardsInHand)) {
                return HandRank.ROYAL_FLUSH;
            }
            return HandRank.STRAIGHT_FLUSH;
        }

        const frequencyObject = Utility.getFrequencyObject(rankNumbers);
        const frequencyValues = [...frequencyObject.values()];

        if (frequencyValues.includes(4)) {
            return HandRank.FOUR_OF_A_KIND
        }

        const isThreeOfAKind = frequencyValues.includes(3);
        const isOnePair = frequencyValues.includes(2);

        if (isThreeOfAKind && isOnePair) {
            return HandRank.FULL_HOUSE;
        }
        if (isFlush) {
            return HandRank.FLUSH;
        }
        if (isStraight) {
            return HandRank.STRAIGHT;
        }
        if (isThreeOfAKind) {
            return HandRank.THREE_OF_A_KIND;
        }
        if (isOnePair) {
            if (frequencyValues.filter(val => val === 2).length === 2) {
                return HandRank.TWO_PAIRS;
            }
            return HandRank.ONE_PAIR;
        }

        return HandRank.HIGH_CARD;
    }

    isStraight(rankNumbers) {
        rankNumbers = Utility.replaceAceForOneIf(rankNumbers);
        const sequentialRanks = Array.from({ length: HAND_SIZE }, (_, key) => key + rankNumbers[0]);

        // return [...new Set([...sequentialRanks, ...rankNumbers])].length === 5;
        return JSON.stringify(sequentialRanks) === JSON.stringify(rankNumbers);
    }

    isRoyal(cardsInhand) {
        const ten = Rank.TEN.rankNumber;
        const ace = Rank.ACE.rankNumber;

        return cardsInhand.every(card => ten <= card.rank.rankNumber &&
            card.rank.rankNumber <= ace);
    }

    toString() {
        return this.cards.map(card => card.toString()).join(" ");
    }
}
