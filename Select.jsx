
var React = require('react'),
    FormField = require('./mixin/Field.jsx');

/**
 * Simple select input type.
 */
var Input = React.createClass({
    displayName: 'Select',

    mixins: [
        FormField
    ],

    renderInputElement: function() {
        return <select disabled={this.props.disabled} className={this.classNames(this.props.className)} onChange={this.onChange}>{this.props.children}</select>;
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
