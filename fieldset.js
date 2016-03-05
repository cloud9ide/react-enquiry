
"use strict";

var React = require("react");

var FieldSet = React.createClass({
    displayName: "FieldSet",

    propTypes: {
        disabled: React.PropTypes.bool,
    },
    
    getInitialState: function(){
        return { mounted: false };  
    },
    
    componentDidMount: function(){
        this.setState({ mounted: true });
    },

    render: function() {
        var attrs = {};
        
        if (this.props.disabled || !this.state.mounted )
            attrs.disabled = "disabled";

        return <fieldset {...attrs} className={this.props.className}>{this.props.children}</fieldset>;
    }
});

module.exports = FieldSet;
