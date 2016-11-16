"use strict";

const React = require('react');
const transformChildren = require("./lib/transform-children");
const reduceRefs = require("./lib/reduce-refs");

const Wrapper = require("./field-wrapper");

class Form extends Wrapper {

    constructor() {
        super();

        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        this.setValues(this.props.defaultValues);
    }

    setValues(values) {
        if (typeof values !== 'object' || values === null)
            return;

        var fields = reduceRefs(this.refs);

        Object.keys(fields).forEach(function(key) {
            if (!values[key])
                return;

            var field = fields[key];

            if (Array.isArray(field)) {
                field.forEach(function(child) {
                    child.setValue(values[key]);
                });
            } else {
                field.setValue(values[key]);
            }
        });
    }

    onSubmit(evt) {
        evt.preventDefault();
        this.submit();
    }

    submit() {
        this.validate(function(errors, values) {
            if (!this.props.onSubmit) return;
            this.props.onSubmit(errors, values, this);
        }.bind(this));
    }

    render() {
        var props = Object.assign({}, this.props);

        delete (props.defaultValues);

        props.onSubmit = this.onSubmit;
        props.noValidate = true;

        return React.createElement("form", props, transformChildren(this.props.children, 0));
    }
}

Form.propTypes = {
    onSubmit: React.PropTypes.func,
    values: React.PropTypes.object,
    initialValues: React.PropTypes.object,
};

module.exports = Form;
