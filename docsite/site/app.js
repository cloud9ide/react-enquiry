"use strict";

var React = require('react');
var ReactDOM = require('react-dom');
var ReactDOMServer = require("react-dom/server");

var HTML = require("./component/HTML.jsx");
var Page = require("./component/Page.jsx");
var formatHtml = require('js-beautify').html;


if (typeof document !== 'undefined') {
    ReactDOM.render(React.createElement(Page), document.getElementById('app'));
}

module.exports = function render(locals, callback) {
    var html = ReactDOMServer.renderToStaticMarkup(React.createElement(HTML, locals));

    callback(null, formatHtml("<!DOCTYPE html>\n" + html, {}));
};