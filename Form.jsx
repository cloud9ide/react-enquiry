
"use strict";

var React = require('react'),
    clone = require('lodash').clone;

function traverseChildren(children, ref, passProps) {
    if (typeof children !== 'object' || children === null)
        return children;

    return React.Children.map(children, function(child, idx) {
        if (!child) return null;
        
        var props = clone(passProps || {});
        props.ref = [ref, idx].join('_');

        return React.cloneElement(child, props, traverseChildren(child.props.children, props.ref, passProps));
    });
}

/**
 * Recursively walk all child references to retrieve `field` elements.
 * 
 * @returns Object fields An object of key => value children.
 */
function reduceRefs(refs, fields) {
    return Object.keys(refs).reduce(function(fields, key) {
        var child = refs[key];

        if (child.props.field)
            fields[child.props.field] = child;

        if (child.refs)
            return reduceRefs(child.refs, fields);

        return fields;
    }, fields || {});
}

/**
 * The form component: manages form fields and can call validate on all of them.
 */
var Form = React.createClass({

    propTypes: {
        errors: React.PropTypes.object,
        onValidate: React.PropTypes.func,
    },

    getDefaultProps: function() {
        return {
            errors: {},
        };
    },

    componentWillReceiveProps: function(nextProps) {
        if (nextProps.errors)
            this._setErrors(nextProps.errors);
    },

    getInitialState: function() {
        return {
            errors: this.props.errors,
        };
    },

    getFields: function() {
        return reduceRefs(this.refs);
    },

    getValues: function() {
        var fields = this.getFields();

        return Object.keys(fields).reduce(function(values, key) {
            values[key] = fields[key].getValue();
            return values;
        }, {});
    },

    clearErrors: function() {
        var fields = this.getFields();

        for (var key in fields) {
            fields[key].clearError();
        }
    },

    hasValues: function() {
        var values = this.getValues();

        for (var key in values) {
            if (values[key] === undefined) return false;
        }

        return true;
    },

    _setErrors: function(errors) {
        var fields = this.getFields();

        Object.keys(errors).forEach(function(fieldName) {
            if (!fields[fieldName]) return;

            fields[fieldName].setError(errors[fieldName]);
        });
    },

    getErrors: function() {
        var key,
            errs = {};

        for (key in this.props.errors) {
            errs[key] = this.props.errors[key];
        }

        for (key in this.state.errors) {
            errs[key] = this.state.errors[key];
        }

        return errs;
    },

    validate: function(done) {
        var fields = this.getFields(),
            values = this.getValues();

        var errors = Object.keys(fields).reduce(function(errors, key) {
            var child = fields[key];
            var error = child.validate(values, child.state.value);

            if (error)
                errors[key] = error;

            return errors;
        }, {});

        if (Object.keys(errors).length == 0)
            errors = undefined;

        return done(errors, values);
    },

    onSubmit: function(evt) {
        evt.preventDefault();

        this.validate(function(errors, values) {
            if (!this.props.onSubmit) return;
            this.props.onSubmit(errors, values, this);
        }.bind(this));
    },

    /**
     * Inject references into the given chilren fo this component.
     * e.g. in `render`, call `this.renderChildren()` instead of `this.props.children`
     * 
     * @returns Object fields An object of key => value children.
     */

    renderChildren: function() {
        return traverseChildren(this.props.children, 0, {
            errors: this.getErrors()
        });
    },

    render: function() {
        return <form onSubmit={this.onSubmit}>{this.renderChildren()}</form>;
    }
});

module.exports = Form;
