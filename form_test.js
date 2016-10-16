"use strict";

require("./enzyme.env");

const test = require("tape");
const sinon = require("sinon");
const React = require("react");
const {shallow, mount, render} = require("enzyme");

var Form = require("./form");


test("It should render a form", assert => {
    const form = shallow(<Form />);
    assert.equal(form.nodes.length, 1, "Form was rendered");
    assert.end();
});

test("The form should wrap children", assert => {
    const submit = sinon.spy();
    const doc = mount(<Form onSubmit={submit}><input name="test" value="test-value" /></Form>);

    doc.find("form").simulate("submit");

    assert.ok(submit.calledOnce);

    let [errors, values] = submit.args[0];

    assert.ok(!errors, 'no errors');
    assert.deepEqual(values, {
        test: "test-value"
    }, "found element");

    assert.end();
});

test("The form should run validations", assert => {
    const notValid = value => `not valid: ${value}`;
    const submit = sinon.spy();
    const doc = mount(<Form onSubmit={submit}><input validation={notValid} name="test" value="test-value" /></Form>);

    doc.find("form").simulate("submit");

    assert.ok(submit.calledOnce);

    let [errors, values] = submit.args[0];
    let expect = {
        test: 'not valid: test-value'
    };

    assert.deepEqual(errors, expect);
    assert.deepEqual(values, {
        test: "test-value"
    }, "found element");

    assert.end();
});