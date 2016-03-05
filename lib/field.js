"use strict";

var React = require("react");
var ReactDom = require("react-dom");
var clone = require("lodash/clone");

module.exports = React.createClass({
    
    propTypes: {
        field: React.PropTypes.element,
        validation: React.PropTypes.oneOfType([
            React.PropTypes.arrayOf(React.PropTypes.func),
            React.PropTypes.func
        ])
    },

    getInitialState: function() {
        return {
            value: this.fieldProps().value || this.fieldProps().defaultValue
        };
    },
    
    fieldProps: function(){
        return this.props.field.props;
    },

    fieldName: function() {
        return this.fieldProps().name;
    },

    isRadio: function() {
        return this.fieldProps().type === "radio";
    },

    isChecbox: function() {
        return /^(radio|checkbox)$/.test(this.fieldProps().type);
    },  
    
    isChecked: function(){
        return this.getNode().checked;  
    },

    getNode: function() {
        return ReactDom.findDOMNode(this);
    },

    getValue: function() {
        return this.state.value;
    },

    isTentativelyValid: function(){
        var error = this._runAllValidations();
        if(error) console.log(error);
        return !error;
    },

    toggleChecked: function(value) {
        var checked = value == this.fieldProps().value;

        this.getNode().checked = checked;

        return checked;
    },

    onChange: function(evt) {
        if(this._eventShouldPropagate())
            evt.persist();

        if (!this.isChecbox()){
            this.setState({
                value: evt.target.value
            }, this._onChange.bind(this, evt));
        }
        
        this._onChange(evt);
    },

    setValue: function(value) {
        if (this.isRadio())
            return this.toggleChecked(value);

        if (this.isChecbox())
            return [].concat(value).some(this.toggleChecked);

        this.setState({
            value: value
        });
    },

    validate: function(value, values) {
        var error = this._runAllValidations(value, values);

        this.setState({
            error: error
        });

        return error;
    },
    
    _eventShouldPropagate: function(){
        return typeof this.fieldProps().onChange == "function";
    },
    
    _onChange: function(evt){
        if (this._eventShouldPropagate())
            this.fieldProps().onChange(evt);
    },

    _runAllValidations: function(value, values){
        var error;
        var validation = this.fieldProps().validation;
        
        if(!validation) return;

        value = value || this.getValue();

        [].concat(validation).every(function(validation) {
            if (typeof validation == "function")
                error = validation(value, clone(values || {}));

            return !error;
        });
        
        return error;
    },

    render: function() {
        var type = this.props.field.type;
        var props = clone(this.fieldProps());

        props.onChange = this.onChange;

        if (!this.isChecbox())
            props.value = this.state.value;

        return React.createElement(type, props);
    }
});
