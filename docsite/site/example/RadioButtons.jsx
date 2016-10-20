"use strict";

var Form = require("enquiry/form");
var React = require("react");

function onSubmit(errors, values, form) {
    alert(`The form returned the following values:\n\n${JSON.stringify(values, null, 2)}`);
}

function RadioButtons() {
    return (
        <div>
            <p>Use the normal <code>input[type="radio"]</code> to create radio buttons.</p>
            <Form onSubmit={onSubmit}>
                <h4>Choose your topping:</h4>
                <label>
                    <input name="topping" type="radio" value="funghi" /> Pizza Funghi
                </label>
                <label>
                    <input name="topping" type="radio" value="vegetariana" /> Pizza Vegetariana
                </label>
                <label>
                    <input name="topping" type="radio" value="salami" /> Pizza Salame
                </label>
                <button className="solid fat important" type="submit">Submit</button>
            </Form>
        </div>
    );
}

module.exports = RadioButtons;