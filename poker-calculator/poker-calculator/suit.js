"use strict";

import Enum from 'ok-enum';

const Suit = new Enum(
    {
        SPADES: { suitValue: 'S' },
        HEARTS: { suitValue: 'H' },
        CLUBS: { suitValue: 'C' },
        DIAMONDS: { suitValue: 'D' }
    }, {
        handlers: {
            getSuitBySuitValue: function (suitValue) {
                const key = this.keys().find(key => this[key].suitValue === suitValue);
                const suit = { ...this[key], name: key };
                return suit;
            }
        }
    });

export default Suit;
