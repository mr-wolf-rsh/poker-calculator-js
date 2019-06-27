"use strict";

import Enum from 'ok-enum';

const Rank = new Enum(
    {
        TWO: { rankNumber: 2, rankValue: '2' },
        THREE: { rankNumber: 3, rankValue: '3' },
        FOUR: { rankNumber: 4, rankValue: '4' },
        FIVE: { rankNumber: 5, rankValue: '5' },
        SIX: { rankNumber: 6, rankValue: '6' },
        SEVEN: { rankNumber: 7, rankValue: '7' },
        EIGHT: { rankNumber: 8, rankValue: '8' },
        NINE: { rankNumber: 9, rankValue: '9' },
        TEN: { rankNumber: 10, rankValue: 'T' },
        JACK: { rankNumber: 11, rankValue: 'J' },
        QUEEN: { rankNumber: 12, rankValue: 'Q' },
        KING: { rankNumber: 13, rankValue: 'K' },
        ACE: { rankNumber: 14, rankValue: 'A' }
    }, {
        handlers: {
            getRankByRankValue: function (rankValue) {
                const key = this.keys().find(key => this[key].rankValue === rankValue);
                const rank = { ...this[key], name: key };
                return rank;
            }
        }
    });

export default Rank;
