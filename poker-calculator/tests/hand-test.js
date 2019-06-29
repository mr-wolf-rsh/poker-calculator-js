/* eslint-disable no-undef */
import Hand from "../src/hand";
import HandRank from "../src/hand-rank";
import Card from "../src/card";
import Rank from "../src/rank";
import Suit from "../src/suit";

describe.only('HandTest', () => {
    test('testHand', () => expect(new Hand([
        new Card(Rank.JACK, Suit.SPADES),
        new Card(Rank.FOUR, Suit.HEARTS),
        new Card(Rank.FIVE, Suit.DIAMONDS),
        new Card(Rank.NINE, Suit.DIAMONDS),
        new Card(Rank.JACK, Suit.CLUBS)
    ])).toBeDefined());

    test('testGetCards', () => {
        const cards1 = [
            new Card(Rank.JACK, Suit.SPADES),
            new Card(Rank.FOUR, Suit.HEARTS),
            new Card(Rank.FIVE, Suit.DIAMONDS),
            new Card(Rank.NINE, Suit.DIAMONDS),
            new Card(Rank.JACK, Suit.CLUBS)
        ];
        expect(new Hand(cards1).cards).toEqual(cards1);

        const cards2 = [
            new Card(Rank.QUEEN, Suit.CLUBS),
            new Card(Rank.TEN, Suit.CLUBS),
            new Card(Rank.SIX, Suit.HEARTS),
            new Card(Rank.FIVE, Suit.SPADES),
            new Card(Rank.THREE, Suit.HEARTS)
        ];
        expect(new Hand(cards2).cards).toEqual(cards2);
    });

    test.each([
        [new Hand([
            new Card(Rank.JACK, Suit.SPADES),
            new Card(Rank.FOUR, Suit.HEARTS),
            new Card(Rank.FIVE, Suit.DIAMONDS),
            new Card(Rank.NINE, Suit.DIAMONDS),
            new Card(Rank.JACK, Suit.CLUBS)
        ]).handRank, HandRank.ONE_PAIR],
        [new Hand([
            new Card(Rank.QUEEN, Suit.CLUBS),
            new Card(Rank.TEN, Suit.CLUBS),
            new Card(Rank.SIX, Suit.HEARTS),
            new Card(Rank.FIVE, Suit.SPADES),
            new Card(Rank.THREE, Suit.HEARTS)
        ]).handRank, HandRank.HIGH_CARD]
    ])('testGetHandRank %#',
        (handRank, expectedHandRank) => expect(handRank).toBe(expectedHandRank));

    test('testFromString', () => {
        const cards = Hand.fromString("6C 3D TH KC 4S");
        const sixOfClubs = cards[0];
        const threeOfDiamonds = cards[1];
        const tenOfHearts = cards[2];
        const kingOfClubs = cards[3];
        const fourOfSpades = cards[4];

        expect(sixOfClubs.rank).toBe(Rank.SIX);
        expect(sixOfClubs.suit).toBe(Suit.CLUBS);
        expect(threeOfDiamonds.rank).toBe(Rank.THREE);
        expect(threeOfDiamonds.suit).toBe(Suit.DIAMONDS);
        expect(tenOfHearts.rank).toBe(Rank.TEN);
        expect(tenOfHearts.suit).toBe(Suit.HEARTS);
        expect(kingOfClubs.rank).toBe(Rank.KING);
        expect(kingOfClubs.suit).toBe(Suit.CLUBS);
        expect(fourOfSpades.rank).toBe(Rank.FOUR);
        expect(fourOfSpades.suit).toBe(Suit.SPADES);
    });

    test.each([
        [new Hand([
            new Card(Rank.JACK, Suit.SPADES),
            new Card(Rank.FOUR, Suit.HEARTS),
            new Card(Rank.FIVE, Suit.DIAMONDS),
            new Card(Rank.NINE, Suit.DIAMONDS),
            new Card(Rank.JACK, Suit.CLUBS)
        ]).toStringName(),
            'JACK OF SPADES\nFOUR OF HEARTS\nFIVE OF DIAMONDS\nNINE OF DIAMONDS\nJACK OF CLUBS'],
        [new Hand([
            new Card(Rank.QUEEN, Suit.CLUBS),
            new Card(Rank.TEN, Suit.CLUBS),
            new Card(Rank.SIX, Suit.HEARTS),
            new Card(Rank.FIVE, Suit.SPADES),
            new Card(Rank.THREE, Suit.HEARTS)
        ]).toStringName(),
            'QUEEN OF CLUBS\nTEN OF CLUBS\nSIX OF HEARTS\nFIVE OF SPADES\nTHREE OF HEARTS']
    ])('testToStringName %#', (name, expectedName) => expect(name).toBe(expectedName));

    test.each([
        [new Hand([
            new Card(Rank.JACK, Suit.SPADES),
            new Card(Rank.FOUR, Suit.HEARTS),
            new Card(Rank.FIVE, Suit.DIAMONDS),
            new Card(Rank.NINE, Suit.DIAMONDS),
            new Card(Rank.JACK, Suit.CLUBS)
        ]).toString(), 'JS 4H 5D 9D JC'],
        [new Hand([
            new Card(Rank.QUEEN, Suit.CLUBS),
            new Card(Rank.TEN, Suit.CLUBS),
            new Card(Rank.SIX, Suit.HEARTS),
            new Card(Rank.FIVE, Suit.SPADES),
            new Card(Rank.THREE, Suit.HEARTS)
        ]).toString(), 'QC TC 6H 5S 3H']
    ])('testToString %#', (actual, expected) => expect(actual).toBe(expected));
});
