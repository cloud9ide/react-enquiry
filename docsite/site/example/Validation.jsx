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

module.exports = function SimpleForm() {
    return (
        <div>
            <p>Form validation is done by supplying a <em>validation</em> function
            as an attribut to your inputs. A validation funciton takes two arguments: <code>(value, values)</code>.
            </p>
            <p>
            Reform captures submit events and reads data and validates the form.</p>
            <Form onSubmit={onSubmit}>
                <label>Please enter a valid username (a-z and 0-9)</label>
                <input type="text" name="test" validation={isValidUsername} />
                <br/>
                <button className="solid fat important" type="submit">Submit</button>
            </Form>
        </div>
    );
};