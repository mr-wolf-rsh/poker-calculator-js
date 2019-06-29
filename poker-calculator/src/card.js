"use strict";

import Suit from './suit';
import Rank from './rank';

export default class Card {
    constructor(rank, suit) {
        this.rank = rank;
        this.suit = suit;
    }

    static fromString(input) {
        const rank = Rank.getRankByRankValue(input[0]);
        const suit = Suit.getSuitBySuitValue(input[1]);

        return new Card(rank, suit);
    }

    toStringName() {
        const rankName = this.rank.name;
        const suitName = this.suit.name;

        return rankName + " OF " + suitName;
    }

    toString() {
        const rankChar = this.rank.rankValue;
        const suitChar = this.suit.suitValue;

        return rankChar + "" + suitChar;
    }
}
