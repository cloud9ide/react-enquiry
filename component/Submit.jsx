"use strict";

var React = require("react");
var _ = require("lodash");
var propTypes = require("plugins/c9.profile/lib/prop-types");

module.exports = React.createClass({
    displayName: "SubmitButton",

    propTypes: {
        label: React.PropTypes.string.isRequired,
        activeLabel: React.PropTypes.string,
        className: propTypes.className.isRequired,
    },

    componentWillReceiveProps: function(props) {
        this.setState({
            active: props.active
        });
    },

    getInitialState: function() {
        return {
            active: false
        };
    },

    renderLabel: function() {
        if (this.props.active && this.props.activeLabel)
            return this.props.activeLabel;

        return this.props.label;
    },

    render: function() {
        var disabled = this.props.active;

        return <button className={this.props.className} disabled={disabled} type="submit">{this.renderLabel()}</button>;
    }
});