"use strict";

const Wrapper = require("./field-wrapper");

class Fieldset extends Wrapper {}

Fieldset.defaultProps = {
    type: "fieldset"
};

module.exports = Fieldset;
