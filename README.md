# [Poker Calculator in JavaScript](https://github.com/lone-wolf-96/poker-calculator-js/)

Demo which 'calculates' the winning poker hand between 2 players through algorithms using JavaScript and its runtime environment Node.js.
This is the JavaScript version of:

* [Poker Calculator in Java](https://github.com/lone-wolf-96/poker-calculator-java/)
* [Poker Calculator in Python](https://github.com/lone-wolf-96/poker-calculator-python/)
* [Poker Calculator in C#](https://github.com/lone-wolf-96/poker-calculator-csharp/)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.
Probably needed:

* [JavaScript in Visual Studio Code](https://code.visualstudio.com/docs/languages/javascript)
* [Working with JavaScript](https://code.visualstudio.com/docs/nodejs/working-with-javascript)
* [Node.js tutorial in Visual Studio Code](https://code.visualstudio.com/docs/nodejs/nodejs-tutorial)

### Installation

It requires no other installation than having Node.js latest release (12.4.0 by this date).

### Built with

* [Visual Studio Code](https://code.visualstudio.com/) was used for this, it requires no other extensions than the built-ins from VSCode.

* For testing: [Jest](https://jestjs.io/).

### Usage

The process is simple, once is run, it will ask for the pokerdata.txt source directory and then, for the target directory (pokerdata.txt was added as an example for file format).

Unit tests are included.

### Bear-in-mind

For module loading: [esm](https://www.npmjs.com/package/esm/). It is very useful as an alternative to Babel.
Helpful: [How To Enable ECMAScript 6 Imports in Node.JS](https://timonweb.com/tutorials/how-to-enable-ecmascript-6-imports-in-nodejs/)

For linting: [ESLint](https://eslint.org/) was used.

About testing from non-root folder, the right way to run it would be:

`node ./[project-name]/node_modules/jest/bin/jest --config ./[project-name]/jest.config.js`

## Authors

* **LoneWolf96** - *Final work* - [lone-wolf-96](https://github.com/lone-wolf-96/)

## Contributing

All kind of suggestions are welcome. This has academic purposes only.

## License

This project is licensed under the [GNU General Public License v3.0](https://choosealicense.com/licenses/gpl-3.0/).
