"use strict";

/**
 * These are just examples - don't use these snippets in production!
 */

var Validate = {
    isRequired: function(value, values) {
        if (value == "")
            return "This field is required";
    },

    validateEmail: function(value, values) {
        if (!/.+@.+[.]\w+/.test(value))
            return "Please supply a valid e-mail address";
    },

    validatePassword: function(value) {
        if (value.length < 8)
            return "Please use a password longer then 8 characters";
    },

    validateEqual: function(name) {
        return function(value, values) {
            if (value !== values[name])
                return "Value does not match " + name;
        };
    },
};


module.exports = Validate;