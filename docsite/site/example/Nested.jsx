"use strict";

var Form = require("enquiry/form");
var FieldWrapper = require("enquiry/field-wrapper");
var Fieldset = require("enquiry/fieldset");
var React = require("react");

function onSubmit(errors, values, form) {
    alert(`The form returned the following values:\n\n${JSON.stringify(values, null, 2)}`);
}

class TeaSection extends React.Component {
    render() {
        if (!this.props.visible)
            return null;

        return (
            <FieldWrapper ref="tea">
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
            </FieldWrapper>
        );
    }
}

class CoffeeSection extends React.Component {
    render() {
        if (!this.props.visible)
            return null;

        return (
            <Fieldset ref="coffee">
                <h4>How do you like your coffee?</h4>
                <label>
                    <input name="coffee" type="radio" value="espresso" /> Espresso
                </label>
                <label>
                    <input name="coffee" type="radio" value="cappucino" /> Cappucino
                </label>
                <label>
                    <input name="coffee" type="radio" value="americano" /> Americano
                </label>
            </Fieldset>
        );
    }
}


class NestedForm extends React.Component {
    constructor() {
        super();

        this.state = {};

        this.onChange = (evt) => {
            this.setState(this.form.values);
        };
    }

    render() {
        return (
            <div>
                <p>
                    You can create sub-form components using the <code>Fieldset</code>
                    or <code>FieldWrapper</code> components.
                </p>
                <pre>
                    const Fieldset = require("enquiry/fieldset");<br/>
                    const FieldWrapper = require("enquiry/field-wrapper");
                </pre>
                <h3>N.B.</h3>
                <p>
                    Enquiry needs to be able to reach the children of each child-component.
                    You <strong>must</strong> define a ref attribute on your Fieldset or 
                    FieldWrapper for this to work. 
                </p>
                <h3>N.B.</h3>
                <p>
                    Functional components don't support refs yet. You need to create a
                    manage component (using <code>class</code> or <code>React.createClass</code>)
                </p>
                <Form ref={(form) => this.form = form} onSubmit={onSubmit}>
                    <h4>What would you like to drink?</h4>
                    <label>
                        <input name="beverage" type="radio" value="tea" onChange={this.onChange} /> Tea
                    </label>
                    <label>
                        <input name="beverage" type="radio" value="coffee" onChange={this.onChange} /> Coffee
                    </label>
                    
                    <TeaSection visible={this.state.beverage == "tea"} />
                    <CoffeeSection visible={this.state.beverage == "coffee"} />

                    <button className="solid fat important" type="submit">Submit</button>
                </Form>
            </div>
        );
    }
}

module.exports = NestedForm;