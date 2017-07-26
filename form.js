"use strict";

const React = require('react');
const PropTypes = require('prop-types');
const transformChildren = require("./lib/transform-children");
const reduceRefs = require("./lib/reduce-refs");
const clone = require("./lib/util/clone");
const omit = require("./lib/util/omit");

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
            if (typeof values[key] == 'undefined')
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
        if (!this.props.preventDefault)
            evt.preventDefault();

        this.submit(evt);
    }

    submit(evt) {
        this.validate(function(errors, values) {
            if (!this.props.onSubmit) return;
            this.props.onSubmit(errors, values, this, evt);
        }.bind(this));
    }

    render() {
        let props = omit(this.props, "defaultValues", "preventDefault");

        props.onSubmit = this.onSubmit;
        props.noValidate = true;

        return React.createElement("form", props, transformChildren(this.props.children, 0));
    }
}

Form.propTypes = {
    onSubmit: PropTypes.func,
    values: PropTypes.object,
    initialValues: PropTypes.object,
};

module.exports = Form;
