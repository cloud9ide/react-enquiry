#!/usr/bin/env babel-node
"use strict";

require("./enzyme.env");

const React = require("react");
const test = require("tape");
const sinon = require("sinon");
const {shallow, mount} = require("enzyme");

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

test("Input elements should return a defaultValue", assert => {
    const submit = sinon.spy();
    const doc = mount(<Form onSubmit={submit}><input name="test" defaultValue="test-value" /></Form>);

    doc.find("form").simulate("submit");

    assert.ok(submit.calledOnce);

    let [errors, values] = submit.args[0];

    assert.equal(errors, undefined);
    assert.deepEqual(values, {
        test: "test-value"
    });

    assert.end();
});


test("Multiple checkboxes return array values", assert => {
    const submit = sinon.spy();
    const doc = mount(<Form onSubmit={submit}>
        <input name="test" type="checkbox" value="1" />
        <input name="test" type="checkbox" value="2" />
        <input name="test" type="checkbox" value="3" />
    </Form>);

    doc.find("form").simulate("submit");

    assert.ok(submit.calledOnce);

    let [errors, values] = submit.args[0];

    assert.equal(errors, undefined);
    assert.deepEqual(values, {
        test: []
    }, "value is an array");

    assert.end();
});

test("A select can have a defaultValue", assert => {
    const submit = sinon.spy();
    const doc = mount(<Form onSubmit={submit}>
        <select name="foo" value="bar">
            <option value="biz" />
            <option value="bar" />
            <option value="baz" />
        </select>
    </Form>);

    doc.find("form").simulate("submit");

    assert.ok(submit.calledOnce);

    let [errors, values] = submit.args[0];

    assert.equal(errors, undefined);
    assert.deepEqual(values, {
        foo: "bar"
    }, "value is an array");

    assert.end();
});


