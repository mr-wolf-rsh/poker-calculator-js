"use strict";

import Enum from 'ok-enum';

const Suit = new Enum(
    {
        SPADES: { suitValue: 'S', name: 'SPADES' },
        HEARTS: { suitValue: 'H', name: 'HEARTS' },
        CLUBS: { suitValue: 'C', name: 'CLUBS' },
        DIAMONDS: { suitValue: 'D', name: 'DIAMONDS' }
    }, {
        handlers: {
            getSuitBySuitValue: function (suitValue) {
                const key = this.keys().find(key => this[key].suitValue === suitValue);
                return this[key];
            }
        }
    });

export default Suit;
