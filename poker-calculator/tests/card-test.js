/* eslint-disable no-undef */
import Card from "../src/card";
import Rank from "../src/rank";
import Suit from "../src/suit";

describe.only('CardTest', () => {
    test.each([
        new Card(Rank.JACK, Suit.SPADES),
        new Card(Rank.ACE, Suit.DIAMONDS),
        new Card(Rank.KING, Suit.CLUBS),
        new Card(Rank.QUEEN, Suit.HEARTS)
    ])('testCard %#', (card) => expect(card).toBeDefined());

    test.each([
        [new Card(Rank.TWO, Suit.DIAMONDS).rank, Rank.TWO],
        [new Card(Rank.FIVE, Suit.SPADES).rank, Rank.FIVE],
        [new Card(Rank.TEN, Suit.CLUBS).rank, Rank.TEN],
        [new Card(Rank.SIX, Suit.HEARTS).rank, Rank.SIX],
        [new Card(Rank.SEVEN, Suit.DIAMONDS).rank, Rank.SEVEN]
    ])('testGetRank %#', (rank, expectedRank) => expect(rank).toBe(expectedRank));

    test.each([
        [new Card(Rank.SIX, Suit.DIAMONDS).suit, Suit.DIAMONDS],
        [new Card(Rank.ACE, Suit.SPADES).suit, Suit.SPADES],
        [new Card(Rank.QUEEN, Suit.CLUBS).suit, Suit.CLUBS],
        [new Card(Rank.THREE, Suit.HEARTS).suit, Suit.HEARTS]
    ])('testGetSuit %#', (suit, expectedSuit) => expect(suit).toBe(expectedSuit));

    test('testFromString', () => {
        const tenOfClubs = Card.fromString("TC");
        expect(tenOfClubs.rank).toBe(Rank.TEN);
        expect(tenOfClubs.suit).toBe(Suit.CLUBS);
        const jackOfHearts = Card.fromString("JH");
        expect(jackOfHearts.rank).toBe(Rank.JACK);
        expect(jackOfHearts.suit).toBe(Suit.HEARTS);
        const eightOfDiamonds = Card.fromString("8D");
        expect(eightOfDiamonds.rank).toBe(Rank.EIGHT);
        expect(eightOfDiamonds.suit).toBe(Suit.DIAMONDS);
    });

    test.each([
        [new Card(Rank.TWO, Suit.CLUBS).toStringName(), 'TWO OF CLUBS'],
        [new Card(Rank.ACE, Suit.SPADES).toStringName(), 'ACE OF SPADES']
    ])('testToStringName %#', (name, expectedName) => expect(name).toBe(expectedName));

    test.each([
        [new Card(Rank.SEVEN, Suit.DIAMONDS).toString(), '7D'],
        [new Card(Rank.KING, Suit.HEARTS).toString(), 'KH']
    ])('testToString %#', (actual, expected) => expect(actual).toBe(expected));
});
