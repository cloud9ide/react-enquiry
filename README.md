# React Enquiry

Enquiry is a form validation framework for React that does not interfer with the
way you want to structure your markup or render your components. 

Enquiry recursively wraps your form components using a supercomponent to provide
easy and intiuitive validation.

### Installation

```
    npm install enquiry
```

### Usage

Taken from https://github.com/cloud9ide/react-enquiry/blob/master/docsite/site/example/Basic.jsx

```javascript
    var Form = require("enquiry/form");
    var React = require("react");
    
    function onSubmit(errors, values, form) {
        alert(`The form returned the following values:\n${JSON.stringify(values, null, 2)}`);
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
```

### Documentation, examples

Many examples can be found on the [documentation site](http://cloud9ide.github.io/react-enquiry/).
Raw sources of the examples are located [here](https://github.com/cloud9ide/react-enquiry/tree/master/docsite/site/example).
