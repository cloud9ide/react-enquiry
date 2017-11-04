"use strict";

const React = require("react");
const PropTypes = require('prop-types');
const ReactDom = require("react-dom");
const clone = require("./util/clone");
const omit = require("./util/omit");

class FormField extends React.Component {

    constructor({field}) {
        super();
        
        this.state = {
            value: this.getFieldValue(field)
        };
    }

    componentWillReceiveProps({field}) {
        this.setState({
            value: this.getFieldValue(field)
        });
    }

    getFieldValue(field) {
        let props = field.props;
        let {value = "", defaultValue = ""} = props;

        value = value || defaultValue;

        if (props.multiple)
            value = value || [];
        
        return value;
    }

    get fieldProps() {
        return this.props.field.props;
    }

    get fieldName() {
        return this.fieldProps.name;
    }

    get isRadio() {
        return this.fieldProps.type === "radio";
    }

    get isCheckbox() {
        return /^(radio|checkbox)$/.test(this.fieldProps.type);
    }

    get isChecked() {
        return ReactDom.findDOMNode(this).checked;
    }

    getValue() {
        if (this.isChecked)
            return this.state.value || true;
        return this.state.value;
    }

    isTentativelyValid() {
        let error = this._runAllValidations();
        return !error;
    }

    toggleChecked(value) {
        ReactDom.findDOMNode(this).checked = value == this.fieldProps.value;
        return this.isChecked;
    }

    onChange(evt) {
        if (this._eventShouldPropagate())
            evt.persist();

        if (!this.isCheckbox) {
            this.setState({
                value: evt.target.value
            }, this._onChange.bind(this, evt));
            return;
        }

        this._onChange(evt);
    }

    setValue(value) {
        if (this.isRadio)
            return this.toggleChecked(value);

        if (this.isCheckbox)
            return [].concat(value).some(this.toggleChecked);

        this.setState({
            value: value
        });
    }

    validate(value, values) {
        let error = this._runAllValidations(value, values);

        this.setState({
            error: error
        });

        this._onValidate(error, value, values);
        return error;
    }

    _onValidate(err, value, values) {
        let {onValidate} = this.fieldProps;

        if (typeof onValidate == "function")
            onValidate(err, value, values);
    }

    _eventShouldPropagate() {
        return typeof this.fieldProps.onChange == "function";
    }

    _onChange(evt) {
        if (this._eventShouldPropagate())
            this.fieldProps.onChange(evt);
    }

    _runAllValidations(value, values) {
        let error;
        let validation = this.fieldProps.validation;

        if (!validation) return;

        value = value || this.getValue();

        [].concat(validation).every(function(validation) {
            if (typeof validation == "function")
                error = validation(value, clone(values) || {});

            return !error;
        });

        return error;
    }

    render() {
        let type = this.props.field.type;
        let props = omit(this.fieldProps, "errors", "validation", "value", "defaultValue", "onValidate");

        props.onChange = (evt) => this.onChange(evt);

        if (this.isCheckbox)
            props.onClick = (evt) => this.onChange(evt);

        if (!this.isCheckbox)
            props.value = this.state.value;
        
        props.ref = (field) => { this.field = field; };

        return React.createElement(type, props);
    }
}

FormField.propTypes = {
    field: PropTypes.element,
    validation: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.func),
        PropTypes.func
    ])
};

module.exports = FormField;

