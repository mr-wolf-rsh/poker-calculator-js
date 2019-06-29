"use strict";

import Enum from 'ok-enum';

const HandRank = new Enum(
    [
        "HIGH_CARD",
        "ONE_PAIR",
        "TWO_PAIRS",
        "THREE_OF_A_KIND",
        "STRAIGHT",
        "FLUSH",
        "FULL_HOUSE",
        "FOUR_OF_A_KIND",
        "STRAIGHT_FLUSH",
        "ROYAL_FLUSH"
    ], {
        mirror: true,
        handlers: {
            getOrdinal: function (handRank) {
                return this.values().indexOf(handRank) + 1;
            }
        }
    });

export default HandRank;
