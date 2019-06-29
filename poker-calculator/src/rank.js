"use strict";

import Enum from 'ok-enum';

const Rank = new Enum(
    {
        TWO: { rankNumber: 2, rankValue: '2', name: 'TWO' },
        THREE: { rankNumber: 3, rankValue: '3', name: 'THREE' },
        FOUR: { rankNumber: 4, rankValue: '4', name: 'FOUR' },
        FIVE: { rankNumber: 5, rankValue: '5', name: 'FIVE' },
        SIX: { rankNumber: 6, rankValue: '6', name: 'SIX' },
        SEVEN: { rankNumber: 7, rankValue: '7', name: 'SEVEN' },
        EIGHT: { rankNumber: 8, rankValue: '8', name: 'EIGHT' },
        NINE: { rankNumber: 9, rankValue: '9', name: 'NINE' },
        TEN: { rankNumber: 10, rankValue: 'T', name: 'TEN' },
        JACK: { rankNumber: 11, rankValue: 'J', name: 'JACK' },
        QUEEN: { rankNumber: 12, rankValue: 'Q', name: 'QUEEN' },
        KING: { rankNumber: 13, rankValue: 'K', name: 'KING' },
        ACE: { rankNumber: 14, rankValue: 'A', name: 'ACE' }
    }, {
        handlers: {
            getRankByRankValue: function (rankValue) {
                const key = this.keys().find(key => this[key].rankValue === rankValue);
                return this[key];
            }
        }
    });

export default Rank;
