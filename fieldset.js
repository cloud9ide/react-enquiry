"use strict";

const Wrapper = require("./field-wrapper");

class Fieldset extends Wrapper {
    static defaultProps = {
        type: "fieldset"
    }
}

module.exports = Fieldset;
