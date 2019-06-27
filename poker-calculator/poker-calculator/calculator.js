/* eslint-disable no-console */
'use strict';

import * as fs from 'fs';
import Hand from './hand';
import HandRank from './hand-rank';
import Utility from './utility';

export default class Calculator {
    constructor(filePath) {
        this.winners = [0, 0, 0];
        this.games = 0;
        this.messages = [];
        this.calculate(filePath);
    }

    printResults(filePath) {
        try {
            const writeStreamReport = fs.createWriteStream(filePath + 'poker_results_report.txt');
            const writeStreamResults = fs.createWriteStream(filePath + 'poker_results.txt');

            const format = new Date().toLocaleDateString('default',
                {
                    year: 'numeric', month: '2-digit', day: '2-digit',
                    hour: '2-digit', minute: '2-digit', second: '2-digit'
                });
            const dateFormat = 'Date and Time: ' + format;

            const winners = this.winners;
            const games = this.games;

            for (let i = 0; i < 3; i++) {
                writeStreamReport.write((i + 1) + ': ' + winners[i] + '\n');
            }

            const p1Percentage = ((winners[0] / games) * 100).toFixed(2);
            const p2Percentage = ((winners[1] / games) * 100).toFixed(2);

            writeStreamReport.write('4:' + '\n');
            writeStreamReport.write('--------- PLAYER 1 --------- | --------- PLAYER 2 ---------' + '\n');
            writeStreamReport.write('           ' + p1Percentage + '%            |             ' +
                p2Percentage + '%          ' + '\n');
            writeStreamReport.write('---------------------------- | ----------------------------' + '\n');

            writeStreamReport.write('Total Games: ' + games + '\n');

            this.messages.forEach(message => writeStreamResults.write(message + '\n'));

            writeStreamReport.end(dateFormat);
            writeStreamResults.end(dateFormat);

            return true;
        } catch (error) {
            console.trace();
            console.log(error);
            return false;
        }
    }

    calculate(filePath) {
        const pokerData = this.getPokerData(filePath);

        if (pokerData == null) {
            return;
        }

        const pokerArray = pokerData.split('-');
        this.games = pokerArray.length;

        for (const game of pokerArray) {
            const gameArray = game.split(' ');
            const n = (gameArray.length + 1) / 2;

            const handString1 = gameArray.slice(0, n).join(' ');
            const handString2 = gameArray.slice(n, gameArray.length).join(' ');

            const hand1 = new Hand(Hand.fromString(handString1));
            const hand2 = new Hand(Hand.fromString(handString2));

            const winnerIndex = this.checkWinner(hand1, hand2);
            const winnerMessage = (winnerIndex < 2 ? 'Winner ' + (winnerIndex + 1) : 'Draw');

            this.messages.push(winnerMessage + ' : '
                + hand1.handRank.replace('_', ' ') + ' - '
                + hand2.handRank.replace('_', ' '));

            this.winners[winnerIndex]++;
        }
    }

    getPokerData(filePath) {
        const lines = fs.readFileSync(filePath).toString().split('\r\n');
        return lines.join('-');
    }

    breakTie(hand1, hand2) {
        const rank = hand1.handRank;

        if (rank == HandRank.ROYAL_FLUSH) {
            return 2;
        }

        const rankNumbers1 = hand1.cards.map(card => card.rank.rankNumber).sort((a, b) => a - b);
        const rankNumbers2 = hand2.cards.map(card => card.rank.rankNumber).sort((a, b) => a - b);

        if ([HandRank.STRAIGHT_FLUSH, HandRank.STRAIGHT].includes(rank)) {
            return this.breakTieStraight(rankNumbers1, rankNumbers2);
        }

        if ([HandRank.FLUSH, HandRank.HIGH_CARD].includes(rank)) {
            return this.breakTieHighCard(rankNumbers1, rankNumbers2);
        }

        const tieBreaker = this.breakTieRestHelper(rank);

        if (tieBreaker == -1) {
            return 2;
        }

        return this.breakTieRest(rankNumbers1, rankNumbers2, tieBreaker);
    }

    breakTieRestHelper(rank) {
        switch (rank) {
            case HandRank.FOUR_OF_A_KIND:
                return 4;
            case HandRank.FULL_HOUSE:
            case HandRank.THREE_OF_A_KIND:
                return 3;
            case HandRank.TWO_PAIRS:
            case HandRank.ONE_PAIR:
                return 2;
            default:
                return -1;
        }
    }

    breakTieRest(rankNumbers1, rankNumbers2, tieBreaker) {
        const frequencyObject1 = Utility.getFrequencyObject(rankNumbers1);
        const frequencyObject2 = Utility.getFrequencyObject(rankNumbers2);

        const frequentEqualN1 = [...frequencyObject1.keys()].find(k =>
            frequencyObject1.get(k) === tieBreaker);
        const frequentEqualN2 = [...frequencyObject2.keys()].find(k =>
            frequencyObject2.get(k) === tieBreaker);

        const winners = this.checkWinnerHelper(frequentEqualN1, frequentEqualN2);

        if (winners != 2) {
            return winners;
        }

        rankNumbers1 = rankNumbers1.filter(rankN => rankN != frequentEqualN1);
        rankNumbers2 = rankNumbers2.filter(rankN => rankN != frequentEqualN1);

        return this.breakTieHighCard(rankNumbers1, rankNumbers2);
    }

    breakTieStraight(rankNumbers1, rankNumbers2) {
        const max1 = Math.max(...Utility.replaceAceForOneIf(rankNumbers1));
        const max2 = Math.max(...Utility.replaceAceForOneIf(rankNumbers2));

        return this.checkWinnerHelper(max1, max2);
    }

    breakTieHighCard(rankNumbers1, rankNumbers2) {
        let winners = 2;
        for (let i = rankNumbers1.length - 1; i >= 0; i--) {
            winners = this.checkWinnerHelper(rankNumbers1[i], rankNumbers2[i]);
            if (winners != 2) {
                return winners;
            }
        }
        return winners;
    }

    checkWinner(hand1, hand2) {
        const hand1Rank = HandRank.getOrdinal(hand1.handRank);
        const hand2Rank = HandRank.getOrdinal(hand2.handRank);

        const winners = this.checkWinnerHelper(hand1Rank, hand2Rank);

        return winners != 2 ? winners : this.breakTie(hand1, hand2);
    }

    checkWinnerHelper(num1, num2) {
        const resultComparer = (+(num1 > num2)) - (+(num1 < num2));

        return (resultComparer + 2) % 3;
    }

    toString() {
        const winners = this.winners;
        const games = this.games;

        return 'Total Games: ' + games + '\n' +
            'Player 1: ' + winners[0] + '\n' +
            'Player 2: ' + winners[1] + '\n'
            + 'Tie: ' + winners[2];
    }
}
