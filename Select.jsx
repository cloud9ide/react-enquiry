
var React = require('react');
var FormField = require('./mixin/Field.jsx');
var Select = require("react-select");

/**
 * Simple select input type.
 */
var Input = React.createClass({
    displayName: 'Select',

    mixins: [
        FormField
    ],

    onSelectChange: function(value) {
        this.onChange({
            target: {
                value: value
            }
        });
    },

    renderInputElement: function() {
        return <Select disabled={this.props.disabled} className={this.classNames(this.props.className)} onChange={this.onSelectChange} {...this.props} />;
    },

    renderLabel: function() {
        if (this.props.label)
            return <label>{this.props.label}</label>;
    },

    render: function() {
        return (
            <div className={this.props.wrapperClassName}>
                {this.renderLabel()}
                {this.renderInputElement()} {this.renderError()}
            </div>
        );
    }
});

module.exports = Input;
