"use strict";

var Form = require("enquiry/form");
var React = require("react");

function isRequired(value) {
    if (value == "")
        return "This value is required.";
}

function isStrongPassword(value) {
    let entropy = Math.round(value.length * (Math.log(255) / Math.log(2)));
    
    if (entropy < 100)
        return "Please choose a stronger password";
}

function Progress({progress=0}) {
    let done = Math.round(Math.min(progress, 100));
    
    let style = {
        width: `${done}%`,
        height: "15px",
        borderRadius: "5px",
        backgroundColor: done > 50 ? "green" : "red"
    };
    
    return (
        <div style={{backgroundColor: "#eee", borderRadius: "5px"}}>
            <div style={style} />
        </div>
    );
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

        this.onChange = (evt) => {
            this.setState({ entropy: Math.round(evt.target.value.length * (Math.log(255) / Math.log(2)))/2 });
        };
    }

    render() {
        return (
            <div>
                <p>
                    You can set an `onChange` on your input, just like you would do
                    in a "plain old form". Enquiry stil keeps track of your values
                    and validations.
                </p>
                <p><em>Type something to move the progress-bar. Hit submit to trigger validation</em></p>
                <Form onSubmit={this.onSubmit}>
                    <label>The password strength-meter</label>
                    <input type="password" name="test" placeholder="Try me!" validation={[isRequired, isStrongPassword]} onChange={this.onChange} />
                    <Error errors={this.state.errors} name="test" />
                    <Progress progress={this.state.entropy} />
                    <br/>
                    <button className="solid fat important" type="submit">Submit</button>
                </Form>
            </div>
        );
    }
}

module.exports = FormWithErrors;