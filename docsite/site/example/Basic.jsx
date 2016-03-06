"use strict";

var Form = require("enquiry/form");
var React = require("react");

/**
 * We require a small validation lib here -
 * form validations are just plain functions where the first argument is the
 * actual value, and the second argument contains all the values from our form.
 */
var Validate = require("./lib/validate");


var SignupForm = React.createClass({
    displayName: "Signup",
    
    getInitialState: function(){
        return { errors: {} };
    },
    
    /**
     * Standard submit handler. 
     * 
     * The form is always validated on submit.
     * 
     * @argument Object errors - Form erors, if any, or undefined
     * @argument Object values - All form values as a key-value object
     * @argument Reform form   - The actual form component for advanced use
     */
    onSubmit: function(errors, values, form){
        /**
         * If any errors present, store them and bail out.
         */
        if(errors) 
            return this.setState({ errors: errors });
            
        /**
         * Form is now validated, so better store values somewhere!
         */
    },
    
    render: function(){
        /**
         * Wrap normal input tags in a enqury/form component.
         * 
         * The form will go trough each of the children wraps them in a 
         * decorator that'll take care of the state.
         * 
         * Each input rendered in this form will be a react "controlled input".
         */
        return (
            <Form onSubmit={this.onSubmit}>
                <div>
                    <label>E-mail</label>
                    <input type="email" validation={[Validate.isRequired, Validate.validateEmail]} name="email" placeholder="you@example.com" />
                    <small className="text-color-danger">{this.state.errors.email}</small>
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" validation={[Validate.isRequired, Validate.validatePassword]} name="password" placeholder="********" />
                    <small className="text-color-danger">{this.state.errors.password}</small>
                </div>
                <div>
                    <label>Confirm password</label>
                    <input type="password" validation={[Validate.isRequired, Validate.validateEqual("password")]} name="confirm" placeholder="********" />
                    <small className="text-color-danger">{this.state.errors.password}</small>
                </div>
                <br/>
                <button className="solid fat important" type="submit">Create account</button>
            </Form>
        );
    }
});

module.exports = SignupForm;