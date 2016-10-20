"use strict";

var Form = require("enquiry/form");
var React = require("react");

function onSubmit(errors, values, form) {
    alert(`The form returned the following values:

${JSON.stringify(values, null, 2)}`);
}

module.exports = function SimpleForm() {
    return (
        <div>
            <p>This example shows the most basic form.</p>
            <p>Enquiry captures submit events and reads data from the form.</p>
            <Form onSubmit={onSubmit}>
                <label>Enter some text and press submit</label>
                <input type="text" name="test" />
                <br/>
                <button className="solid fat important" type="submit">Submit</button>
            </Form>
        </div>
        );
};