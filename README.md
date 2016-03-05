# reform

Reform is a form validation framework for React that does not interfer with the
way you want to structure your markup or render your components. 

Reform recursively wraps your form components using a supercomponent to provide
easy and intiuitive validation.

### Installation

```
    npm install reform
```

### Usage

Examples below are written in `jsx` and demonstrate how to perform validation
and render components. Note that the form is composed of plain-old-divs and 
input fields. Reform does not render your form errors or anything else, 
but makes it trivial for you to create them yourself.

```jsx
var Reform = require("reform/form");

// form validation functions are plain functions
// they should return an error or nothing if valid
// first argument is the actual value, second value
// contains all form values
//
// these validation functions are pure for demonstration purposes!
// don't use these for real!

function isRequired(value, values){
    if(value == undefined)
        return "Field is required";
}

function validateEmail(value, values){
    if (/.+@.+/.test(value))
        return "Please supply a valid e-mail"
}

function validatePassword(value){
    if (!value.length > 8)
        return "Please use a password longer then 8 characters";
}

function validateEqual(name){
    return function(value, values){
        if (value !== values[name] )
            return "Value does not match " + name;
    }
}


var SignupForm = React.createClass({
    displayName: "Signup",
    
    getInitialState: function(){
        return {};
    },
    
    onSubmit: function(errors, values, form){
        if(errors) return this.setState({ errors: errors });
        
        // form is valid, values contains
        // an array of { email: "", password: "", confirm: "" }
        // so store somewhere...
    },
    
    render: function(){
        return (
            <Reform onSubmit={this.onSubmit}>
                <div>
                    <label>E-mail</label>
                    <input type="email" validation={[isRequired, validateEmail]} name="email" placeholder="you@example.com" />
                    <div class="error">{this.state.errors.email}</div>
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" validation={[isRequired, validatePassword]} name="password" placeholder="********" />
                    <div class="error">{this.state.errors.password}</div>
                </div>
                <div>
                    <label>Confirm password</label>
                    <input type="password" validation={[isRequired, validateEqual("password")]} name="confirm" placeholder="********" />
                    <div class="error">{this.state.errors.confirm}</div>
                </div>
                <button type="submit">Create account</button>
            </Reform>
        );
    }
});

```

### Nested components

You will propably separate out some of the common stuff into components, such as
an `Input` component that renders labels and errors.

Nested components must be wrapped in either a `reform/fieldset` or `reform/field-wrapper`.
A field-wrapper renders it's `type` wich must be a valid HTML tagname, and will
default to "div".

The following example shows how you would avoid repetative coding with Bootstrap
by wrapping class logic in a component:

```jsx

var Wrapper = require("reform/field-wrapper");
var classNames = require("classnames");

var Input = React.createClass({

    renderError: function(){
        if (!this.props.error)
            return;
            
        return (
            <p class="text-muted text-help">
              A block of help text that breaks onto a new line and may extend beyond one line.
            </p>
        );
    },

    render: function(){
        var id = "id-" + this.props.name;
        var className = classNames(this.props.className, "form-control", {
            "form-control-danger": !!this.props.error
        });
        
        var wrapperClassName = classNames(this.props.wrapperClassName, "form-group", {
            "has-warning": !!this.props.error
        });

        return (
            <Wrapper className={wrapperClassName}>
                <label className="form-control-label" for={id}>{this.props.label}</label>
                <input {...this.props} id={id} className={className} />
            </Wrapper>
        );
    }
});

```

More examples will be provided later.