"use strict";

var React = require('react');
var FormField = require('./mixin/Field.jsx');
var Select = require("react-select");

/**
 * Searchable select input type.
 */
var Searchable = React.createClass({
    displayName: 'Searchable',
    
    propTypes: {
        optionRenderer: React.PropTypes.func,
        field: React.PropTypes.string.isRequired,
        options: React.PropTypes.array.isRequired,
    },
    
    mixins: [
        FormField
    ],

    onSelectChange: function(val) {
        this.setState({
            value: val,
            error: null,
        });
    },

    renderSelect: function() {
        var props = {
            value: this.state.value || this.props.options[0],
            field: this.props.field,
            id: this.props.id,
            name: this.props.id,
            options: this.props.options,
            disabled: this.props.disabled,
            onChange: this.onSelectChange,
            className: this.props.className,
            clearable: this.props.clearable,
        };
        
        return (
            <Select optionRenderer={this.props.optionRenderer} {...props} />
        );
    },

    renderLabel: function() {
        if (this.props.label)
            return <label>{this.props.label}</label>;
    },

    render: function() {
        return (
            <div className={this.props.wrapperClassName}>
                {this.renderLabel()}
                {this.renderSelect()} 
                {this.renderError()}
            </div>
        );
    }
});

module.exports = Searchable;
