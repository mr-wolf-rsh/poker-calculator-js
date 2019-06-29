/* eslint-disable no-console */
'use strict';

import * as readlineSync from 'readline-sync';
import Calculator from './calculator';

export class App {
    static main() {
        try {
            let nextLine = readlineSync.questionPath("Enter the pokerdata.txt source directory " +
                "(Press Enter for default):\n", {
                    isDirectory: true
                }).trim();
            const sourcePath = this.getFolder(nextLine) + "pokerdata.txt";

            nextLine = readlineSync.questionPath("Enter the target directory " +
                "(Press Enter for default):\n", {
                    isDirectory: true
                }).trim();
            const targetPath = this.getFolder(nextLine);

            if (new Calculator(sourcePath).printResults(targetPath)) {
                console.log("Successful results in your folder.");
            } else {
                console.log("There's been an error processing the information.");
            }
        } catch (error) {
            console.trace();
            console.log(error);
        }
    }

    static getFolder(line) {
        return line + (line[line.length - 1] == '\\' ? "" : "\\");
    }
}
