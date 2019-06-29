"use strict";

const esmImport = require("esm")(module);
const App = esmImport("./src/app.js").App;

App.main();
