define(function(require, exports, module) {
    "use strict";

    var React = require("react");

    var FieldSet = React.createClass({
        displayName: "FieldSet",

        propTypes: {
            disabled: React.PropTypes.bool,
        },

        render: function() {
            if (this.props.disabled)
                return <fieldset disabled="disabled">{this.props.children}</fieldset>;

            return <fieldset>{this.props.children}</fieldset>;
        }
    });
    
    module.exports = FieldSet;
});
