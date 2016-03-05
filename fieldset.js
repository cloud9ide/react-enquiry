"use strict";

var React = require('react');

var transformChildren = require("./lib/transform-children");

var Fieldset = React.createClass({
    render: function(){
        return React.createElement("fieldset", this.props, transformChildren(this.props.children, 0));
    },
});


module.exports = Fieldset;
