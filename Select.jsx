"use strict";

var React = require('react');
var FormField = require('./mixin/Field.jsx');

/**
 * Simple select input type.
 */
var Select = React.createClass({
    displayName: 'Select',

    mixins: [
        FormField
    ],

    renderOptions: function(){
        return this.props.options.map(function(val){
            return <option key={val.value} value={val.value}>{val.label}</option>;
        });
    },

    renderSelect: function() {
        var props = {
            field: this.props.field,
            id: this.props.id,
            name: this.props.id,
            disabled: this.props.disabled,
            onChange: this.onChange,
            className: this.props.className,
            value: this.props.value,
            initialValue: this.props.initialValue,
        };
        
        return (
            <div className="select-caret">
                <select {...props}>
                    {this.renderOptions()}
                </select>
            </div>
        );
    },

    renderLabel: function() {
        if (this.props.label)
            return <label>{this.props.label}</label>;
    },

    render: function() {
            // <div className={this.props.wrapperClassName}>
        return (
            <div>
                {this.renderLabel()}
                {this.renderSelect()} 
                {this.renderError()}
            </div>
        );
    }
});

module.exports = Select;
