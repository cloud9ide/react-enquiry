"use strict";

require("./enzyme.env");

const test = require("tape");
const sinon = require("sinon");
const React = require("react");
const {shallow, mount, render} = require("enzyme");

var Fieldset = require("./fieldset");


test("It should render", assert => {
    const fieldset = shallow(<Fieldset />);
    assert.equal(fieldset.nodes.length, 1, "Fieldset was rendered");
    assert.end();
});

test("it should wrap children", assert => {
    const submit = sinon.spy();
    const doc = mount(<Fieldset onSubmit={submit}><input name="test" value="test-value" /></Fieldset>);

    let component = doc.nodes[0];
    assert.deepEqual(Object.keys(component.fields), ["test"], "should list fields");

    let el = doc.find("fieldset");
    assert.ok(el, "found a fieldset");

    assert.end();
});

