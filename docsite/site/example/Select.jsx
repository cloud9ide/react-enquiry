"use strict";

var Form = require("enquiry/form");
var React = require("react");

function onSubmit(errors, values, form) {
    if (errors)
        return alert(`ERROR! \nValidation errors: \n\n${JSON.stringify(errors, null, 2)}`);
    
    alert(`SUCCESS!\nThe form was valid!\n\n${JSON.stringify(values, null, 2)}`);
}

function isRequired(value) {
    if (value == "")
        return "This value is required";
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
                <label>You can validate and use selects like any other input element:</label>
                <select name="beverage" value="" validation={isRequired}>
                    <option value="" disabled={true}>Pick one</option>
                    <option value="water">Water</option>
                    <option value="sodapop">Soda Pop</option>
                    <option value="milk">Milk</option>
                </select>
                <label>When you specify "multiple" values turn into an array</label>
                <select name="food" value="" validation={isRequired} multiple>
                    <option value="cake">Cake</option>
                    <option value="fries">Fries</option>
                    <option value="broccoli">Broccoli</option>
                </select>
                <br/>
                <br/>
                <button className="solid fat important" type="submit">Submit</button>
            </Form>
        </div>
    );
};