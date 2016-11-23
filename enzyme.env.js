"use strict";

global.document = require('jsdom').jsdom('<body><footer>bye!</footer></body>')
global.window = document.defaultView
global.navigator = window.navigator