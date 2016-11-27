# React Enquiry

Enquiry a the form validation framework for React you can already use if you
know how HTML and forms work. Simply wrap your `<input />` element in an `enquiry/form` and you're ready go.

Check the [documentation site](http://cloud9ide.github.io/react-enquiry/) for examples and documentation!

### Architecture

Enquiry recursively wraps your form components in an [higher-order-component](https://medium.com/@dan_abramov/mixins-are-dead-long-live-higher-order-components-94a0d2f9e750#.63i93014a) that
captures validation properties and change listeners. These HOC components are then registered with the containing form component to easily retrieve validation results and values on a single `onSubmit` handler.

Enquiry makes it easy to create re-usable form sub-sections by attaching child-wrappers using refs.

### Installation

```
    npm install enquiry
```

### Usage

The [documentation site](http://cloud9ide.github.io/react-enquiry/) is a showcase
of enquiry's features. 

Examples from the documentation site can be found [here](https://github.com/cloud9ide/react-enquiry/tree/master/docsite/site/example)

#### Getting values from input elements

Geting all the values from your form is as un-exiting as simply replacing the 
`<form>` tag with `enquiry/from`:

```javascript
const Form = require("enquiry/form");
const React = require("react");

// values will be an object containing {name, password}
// errors can be an object of {name, password}
function onSubmitRegisterForm(errors, values) {
    if (errors) return alert(`Your form was invalid! ${JSON.stringify(errors)}`);
    return alert(`Your form was valid! ${JSON.stringify(values)}`);
}

function RegisterFrom() {
    return (
        <Form onSubmit={onSubmitRegisterForm}>
            <label>Your name: </label>
            <input name="name" />
            <label>Choose a password: </label>
            <input name="password" type="password" />
            <button>submit</button>
        </Form>
    );
}
```

#### Validating values from input elements

You can supply a `validation` property to your input elements, comprising of either
one single function or an array of functions.

Validation functions will be executing in order, returning at the first failed
validation. A validation function should return a single string if validation fails.

Validation functions receive two arguments: the value of the field being checked,
and the values of all other fields as a key => value object.

For more advanced examples plese refer to the [documentation site](http://cloud9ide.github.io/react-enquiry/)

Example:

```javascript
const Form = require("enquiry/form");
const React = require("react");

function isRequired(value) {
    if (!value) return "This is a required field";
}

function isPositiveInt(value) {
    if (!/^\d+$/.test(value)) return "This must be a positive int";
}

function AgeForm() {
    return (
        <Form onSubmit={onSubmitNameForm}>
            <label>How old are you?: </label>
            <input name="age" validation={[isRequired, isPositiveInt]} />
            <button>submit</button>
        </Form>
    );
}
```
