"use strict";

var Form = require("enquiry/form");
var React = require("react");

function onSubmit(errors, values, form) {
    alert(`The form returned the following values:\n\n${JSON.stringify(values, null, 2)}`);
}

function RadioButtons() {
    return (
        <div>
            <p>Use the normal <code>input[type="checkbox"]</code> to create checkboxes.</p>
            <p>Enquiry will create an array of values for each checked item</p>
            <Form onSubmit={onSubmit}>
                <h4>How do you like your tea?</h4>
                <label>
                    <input name="tea" type="checkbox" value="milk" /> Milk please
                </label>
                <label>
                    <input name="tea" type="checkbox" value="sugar" /> Sugar
                </label>
                <label>
                    <input name="tea" type="checkbox" value="biscuit" /> And a biscuit
                </label>
                <button className="solid fat important" type="submit">Submit</button>
            </Form>
        </div>
    );
}

module.exports = RadioButtons;