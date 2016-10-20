"use strict";

const React = require("react");
const ReactDom = require("react-dom");
const clone = require("lodash/clone");
const omit = require("lodash/omit");


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
            value: this.getInitialValue()
        };
    },

    getInitialValue: function() {
        let props = this.fieldProps();
        let value = props.value || props.defaultValue || "";

        if (props.multiple)
            value = value || [];

        return value;
    },

    fieldProps: function() {
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

    isChecked: function() {
        return this.getNode().checked;
    },

    getNode: function() {
        return ReactDom.findDOMNode(this);
    },

    getValue: function() {
        if (this.isChecked())
            return this.state.value || true;
        return this.state.value;
    },

    isTentativelyValid: function() {
        let error = this._runAllValidations();
        return !error;
    },

    toggleChecked: function(value) {
        let checked = value == this.fieldProps().value;

        this.getNode().checked = checked;

        return checked;
    },

    onChange: function(evt) {
        if (this._eventShouldPropagate())
            evt.persist();

        if (!this.isChecbox()) {
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
        let error = this._runAllValidations(value, values);

        this.setState({
            error: error
        });

        return error;
    },

    _eventShouldPropagate: function() {
        return typeof this.fieldProps().onChange == "function";
    },

    _onChange: function(evt) {
        if (this._eventShouldPropagate())
            this.fieldProps().onChange(evt);
    },

    _runAllValidations: function(value, values) {
        let error;
        let validation = this.fieldProps().validation;

        if (!validation) return;

        value = value || this.getValue();

        [].concat(validation).every(function(validation) {
            if (typeof validation == "function")
                error = validation(value, clone(values || {}));

            return !error;
        });

        return error;
    },

    render: function() {
        let type = this.props.field.type;
        let fieldProps = clone(this.fieldProps());
        let props = omit(fieldProps, "errors", "validation", "value", "defaultValue");

        props.onChange = (evt) => this.onChange(evt);

        if (!this.isChecbox())
            props.value = this.state.value;

        return React.createElement(type, props);
    }
});
