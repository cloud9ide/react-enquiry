"use strict";

var Form = require("enquiry/form");
var React = require("react");

function onSubmit(errors, values, form) {
    if (errors)
        return alert(`Your form was not valid. it contained the following errors: \n\n${JSON.stringify(errors, null, 2)}`);
    
    alert(`The form was valid! values:\n\n${JSON.stringify(values, null, 2)}`);
}

/**
 * Validates for "username"
 */
function isValidUsername(value) {
    if (!/[a-z0-9]/.test(value))
        return "This is not valid username. You can only use lowercase a-z and 0-9";
}

function isRequired(value) {
    if (value == "")
        return "This value is required";
}

function isStrongPassword(value) {
    let entropy = Math.round(value.length * (Math.log(255) / Math.log(2)));
    
    if (entropy < 80)
        return "Please choose a stronger password";
}

function isMatchingPassword(value, values) {
    if (value != values.password)
        return "The passwords don't match";
}

module.exports = function SimpleForm() {
    return (
        <div>
            <p>Form validation is done by supplying a <em>validation</em> function
            as an attribut to your inputs. A validation function takes two arguments: <code>(value, values)</code>.
            Value contains the current value, values contains all values in the form as a javascript object.
            </p>
            <p>The <code>validation</code> attribute can be either a function or an array of functions, where 
            each validation is only executed if the previous validation was successful.</p>
            <p>
            Reform captures submit events and reads data and validates the form.</p>
            <Form onSubmit={onSubmit}>
                <label>Please enter a valid username (a-z and 0-9)</label>
                <input type="text" name="test" validation={isValidUsername} />
                <label>Please pick a password</label>
                <input type="password" name="password" validation={[isRequired, isStrongPassword]} />
                <label>Type your password again to confirm</label>
                <input type="password" name="password_confirm" validation={[isRequired, isMatchingPassword]} />
                <br/>
                <button className="solid fat important" type="submit">Submit</button>
            </Form>
        </div>
    );
};