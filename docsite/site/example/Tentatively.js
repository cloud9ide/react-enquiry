"use strict";

var Form = require("enquiry/form");
var React = require("react");

function onSubmit(errors, values, form) {
    alert(`The form returned the following values:

${JSON.stringify(values, null, 2)}`);
}

function isRequired(value) {
    if (value == "")
        return "This value is required.";
}

class TentativelyValid extends React.Component {
    constructor() {
        super();

        this.state = {};

        this.onChange = (evt) => {
            let valid = this.form.isTentativelyValid;

            this.setState({
                valid: Object.keys(valid).every(key => valid[key])
            });
        };
    }

    render() {
        return (
            <div>
                <p>
                    Sometimes you want to know if the form could be valid without
                    actually validating the form.
                    You can make a ref to your form and call <code>isTentativelyValid</code>.
                    This will return an object with <code>true</code> or <code>false</code>
                    for each form element.
                </p>
                <Form ref={(form) => this.form = form} onSubmit={onSubmit}>
                    <label>You can only submit the form if you agree</label>
                    <input name="name" onChange={this.onChange} validation={isRequired} placeholder="Your name" />
                    <label>
                        <input type="checkbox" name="agree" validation={isRequired} onChange={this.onChange} />
                        I agree to the bla bla
                    </label>
                    <br/>
                    <button disabled={!this.state.valid} className="solid fat important" type="submit">Submit</button>
                </Form>
            </div>
            );
    }
}

module.exports = TentativelyValid;