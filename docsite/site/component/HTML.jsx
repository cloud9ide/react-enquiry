"use strict";
var React = require('react');
var Page  = require("./Page.jsx");

var HTML = React.createClass({
    render: function() {
        return (
            <html>
                <head>
                    <meta charset="UTF-8"/>
                    <link href="https://cdn.c9.io/nc-3.1.1636-3f510945-wf/skin/profile.css" rel="stylesheet"/>
                    <link href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.2.0/styles/default.min.css" rel="stylesheet"/>
                    <link href="index.css" rel="stylesheet"/>
                    <title>{this.props.title}</title>
                </head>
                <body>
                    <div id="app">
                        <Page />
                    </div>
                    <script src="./index.js"></script>
                </body>
            </html>
        );
    }
});

module.exports = HTML;