"use strict";

var React = require('react');
var clone = require("lodash/clone");

var transformChildren = require("./lib/transform-children");

var Fieldset = React.createClass({
    render: function() {
        var props = clone(this.props);

        delete (props.defaultValues);

        props.onSubmit = this.onSubmit;
        props.noValidate = true;

        return React.createElement("fieldset", this.props, transformChildren(this.props.children, 0));
    },
});


module.exports = Fieldset;
