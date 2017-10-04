"use strict";
var React = require('react');
var Page = require("./Page");

class HTML extends React.Component {
    render() {
        return (
            <html>
                <head>
                    <meta charset="UTF-8"/>
                    <link href="./css/profile.css" rel="stylesheet"/>
                    <link href="./css/index.css" rel="stylesheet"/>
                    <link href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.2.0/styles/default.min.css" rel="stylesheet"/>
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
}

module.exports = HTML;