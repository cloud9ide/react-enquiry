"use strict";

var Form = require("enquiry/form");
var React = require("react");

function isRequired(value) {
    if (value == "")
        return "This value is required.";
}

function isNumber(value) {
    if (!/^\d+$/.test(value))
        return "Plese enter a numeric value.";
}

function isWithinRange(start, end) {
    return function (value) {
        if (value < start || value > end)
            return `Expected a value within the range ${start} to ${end}.`;
    };
}

function Error({errors={}, name}) {
    if (errors[name])
        return <div style={{color: "red"}}>{errors[name]}</div>;
    return null;
}

class FormWithErrors extends React.Component {
    constructor() {
        super();
        
        this.state = {};
        this.onSubmit = (errors, values, form) => {
            this.setState({ errors: errors, success: !errors });
        };
    }

    render() {
        return (
            <div>
                <p>
                    Enquiry does not handle display logic. Instead, capture validation
                    errors inside  your component state and render where appropriate.<br/>
                    <em>Note how validation is chained for super-re-useability</em>
                </p>
                <Form onSubmit={this.onSubmit}>
                    <label>Please enter a number between 1 and 20</label>
                    <input type="text" name="test" validation={[isRequired, isNumber, isWithinRange(1,20)]} />
                    <Error errors={this.state.errors} name="test" />
                    <br/>
                    <button className="solid fat important" type="submit">Submit</button>
                </Form>
            </div>
        );
    }
}

module.exports = FormWithErrors;