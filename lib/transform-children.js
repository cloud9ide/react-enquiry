"use strict";

var React = require('react');
var Field = require("./field");

function traverseChildren(children, ref) {
    if (typeof children !== 'object' || children === null) {
        return children;
    }

    return React.Children.map(children, function(child, idx) {
        if (!child) return null;
        if (typeof child == "string") return child;

        var props = {
            ref: [ref, idx].join('_')
        };

        if (/^(input|select|textarea)$/.test(child.type)) {
            return React.createElement(Field, {
                ref: props.ref,
                validation: child.props.validation,
                field: child
            });
        }

        return React.cloneElement(child, props, traverseChildren(child.props.children, props.ref));
    });
}

module.exports = traverseChildren;