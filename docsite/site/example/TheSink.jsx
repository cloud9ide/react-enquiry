var React = require("react");

var Reform = require("enquiry/form");
var Fieldset = require("enquiry/fieldset");
var Validate = require("./lib/validate");
var _ = require("lodash");

var Input = React.createClass({

    generateId: function() {
        return "id-" + this.props.name;
    },

    renderLabel: function() {
        if (this.props.label)
            return <label htmlFor={this.generateId()}>{this.props.label}</label>;
    },

    getError: function() {
        if (this.props.errors)
            return this.props.errors[this.props.name];
    },

    renderFormError: function() {
        if (this.getError())
            return <small className="text-color-danger">{this.getError()}</small>;
    },

    validationFactory: function() {
        var validation = [];

        if (this.props.required)
            validation.push(Validate.isRequired);

        if (this.props.type == "email")
            validation.push(Validate.validateEmail);

        return validation;
    },

    render: function() {
        /**
         * Omit invalid html attributes and the required flag...
         */
        var passProps = _.omit(this.props, "required", "label");

        return (
            <Fieldset ref="reform">
                {this.renderLabel()}
                <input validation={Validate.isRequired} id={this.generateId()} {...passProps} />
                {this.renderFormError()}
            </Fieldset>
            );
    }
});

var Deep = React.createClass({
    render: function() {
        return (
            <Fieldset ref="reform" type="fieldset">
                <p>I am a deeply nested component</p>
                <label>How much?</label>
                <input name="howmuch" type="number" />
            </Fieldset>
            );
    }
});

var Prefs = React.createClass({
    foo: function() {},

    render: function() {
        return (
            <Fieldset ref="reform" type="fieldset">
                <label>
                    <input type="checkbox" name="thing" value="1" /> I want one
                </label>
                <label>
                    <input type="checkbox" name="thing" value="2" /> I want two
                </label>
                <label>
                    <input type="checkbox" name="thing" value="3" /> I want three
                </label>
                <Deep />
            </Fieldset>
            );
    }
});

var Things = React.createClass({
    render: function() {
        return (
            <Fieldset ref="hookup" type="fieldset">
                <select name="picone">
                    <option value="a">Choose A</option>
                    <option value="b">Choose B</option>
                    <option value="c">Choose C</option>
                    <option value="d">Choose D</option>
                    <option value="e">Choose E</option>
                </select>
            </Fieldset>
            );
    }
});


var TheSink = React.createClass({

    getInitialState: function() {
        return {
            foo: "foo",
            what: "this",
            thing: [2, 3],
            picone: "c"
        };
    },

    onSubmit: function(errors, values, form) {
        this.setState({
            style: {
                backgroundColor: "green"
            },
            errorr: errors
        });
    },

    onChange: function() {
        console.log(this.refs.fooform.isTentativelyValid);
    },

    render: function() {
        return (
            <div>
                <Reform style={this.state.style} ref="fooform" defaultValues={this.state} onSubmit={this.onSubmit}>
                    <Input errors={this.state.errors} onChange={this.onChange} type="text" name="foo" />
                    <textarea defaultValue="You can set a default value here too!" name="text" rows={3} placeholder="Tell me..." />
                    <div>
                        <input type="radio" value="this" name="what" /> this
                        <input type="radio" value="that" name="what" /> that
                    </div>
                    <Prefs />
                    <Things />
                    <select name="allthings" multiple={true}>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="4">Three</option>
                    </select>
                    <button>submit</button>
                </Reform>
            </div>
            );
    }
});

module.exports = TheSink;

