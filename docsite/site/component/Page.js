"use strict";

var React = require('react');

var sources = require("../example-sources");
var examples = require("../examples");

var Dockblock = require("./Dockblock");

class Page extends React.Component {
    className = "Page";

    renderNav = () => {
        return Object.keys(examples).map(function(name) {
            var src = sources[name];

            return (
                <a href={"#example-" + name} key={"nav-" + name}>{src.title}</a>
                );
        });
    };

    renderDocs = () => {
        return Object.keys(examples).map(function(name) {
            var Example = examples[name];
            var src = sources[name];

            return (
                <Dockblock key={"key-" + name} {...src}>
                    <Example />
                </Dockblock>
                );
        });
    };

    render() {
        return (
            <div id="doc-wrapper">
                <div id="doc-sidebar">
                    <nav id="doc-nav" className="pills padding-top-6 margin-2">
                        {this.renderNav()}
                    </nav>
                </div>
                <div id="doc-contents" className="padding-4">
                    {this.renderDocs()}
                </div>
            </div>
            );
    }
}

module.exports = Page;