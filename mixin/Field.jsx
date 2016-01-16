"use strict";

var React = require('react'),
    cx = require('classnames');

/**
 * Mixin that defines a "FormField", e.g. anythign that can do `validate` & co.
 * All state is managed react-native.
 */
module.exports = {

    propTypes: {
        field: React.PropTypes.string.isRequired,
        validation: React.PropTypes.oneOfType([
            React.PropTypes.array,
            React.PropTypes.func,
        ]),
        onChange: React.PropTypes.func,
        notifyOnChange: React.PropTypes.func,
        errors: React.PropTypes.object,
        type: React.PropTypes.string,
        value: React.PropTypes.any,
        initialValue: React.PropTypes.any,
        format: React.PropTypes.func,
    },

    getDefaultProps: function() {
        return {
            validation: [],
            errors: {},
        };
    },

    getInitialState: function() {
        return {
            value: this.props.initialValue || this.props.value,
            error: this.props.errors[this.props.field]
        };
    },

    onChange: function(evt) {
        this.setState({
            value: evt.target.value
        }, function() {
            this.validateTentatively();
            if (!this.props.onChange) return;
            this.props.onChange(this);
        }.bind(this));
    },

    componentWillReceiveProps: function(nextProps) {
        var nextState = {};

        if ('value' in nextProps)
            nextState.value = nextProps.value;

        if (nextProps.errors && nextProps.errors[this.props.field])
            nextState.error = nextProps.errors[this.props.field];

        this.setState(nextState);
    },

    getValue: function() {
        if (!this.state.value)
            return;

        if (this.props.format)
            return this.props.format(this.state.value);

        return this.state.value;
    },

    isValid: function() {
        return !!this.state.error;
    },

    setValue: function(value) {
        this.setState({
            value: value
        });
    },

    clearError: function() {
        this.setState({
            error: null
        });
    },

    setError: function(error) {
        this.setState({
            error: error
        });
    },

    classNames: function(classNames) {
        return cx(classNames, {
            success: this.state.isTentativelyValid,
            error: this.isValid()
        });
    },

    isTentativelyValid: function(){
        var error = this._runAllValidations();
        return !error;
    },

    
    validateTentatively: function(){
        var valid = this.isTentativelyValid();

        this.setState({
            error: !valid,
            isTentativelyValid: valid,
        });
    },

    validate: function(values, value) {
        var error = this._runAllValidations(values, value);

        this.setState({
            error: error
        });

        return error;
    },
    
    _getValidation: function(){
        var validation = this.props.validation;
        return Array.isArray(validation) ? validation : [validation];
    },
    
    _runAllValidations: function(values, value){
        var validation = this._getValidation();
        var error;

        values = values || {};
        value = value || this.getValue();

        validation.every(function(validation) {
            error = validation(values, value);

            if (!error) return true;
            return false;
        });
        
        return error;
    },

    renderError: function() {
        if (!this.state.error) return <span />;
        return <small className="text-color-danger">{this.state.error}</small>;
    }
};
