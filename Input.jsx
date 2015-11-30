
var React = require('react'),
    FormField = require('./mixin/Field.jsx');

/**
 * Covers 90% use case for <input> element. Specify mutiline or rows in props
 * to make a textarea.
 * 
 */
var Input = React.createClass({
    displayName: 'Input',

    mixins: [
        FormField
    ],


    renderInputElement: function() {
        var attrs = {
            autoFocus: this.props.autoFocus,
            disabled: this.props.disabled,
            placeholder: this.props.placeholder,
            className: this.classNames(this.props.className),
            type: this.props.type,
            name: this.props.name || this.props.key,
            value: this.state.value,
            onChange: this.onChange,
            initialValue: this.props.initialValue,
        };
        
        if (this.props.rows || this.props.multiLine)
            return <textarea rows={this.props.rows || 3} {...attrs} />;

        return <input  {...attrs}/>;
    },

    renderOptional: function() {
        if (this.props.optional)
            return <small className="lighten">&nbsp; (optional)</small>
    },

    renderLabel: function() {
        if (!this.props.label)
            return;

        return <label>{this.props.label}{this.renderOptional()}</label>;
    },

    render: function() {
        return (
            <div className={this.props.wrapperClassName}>
                {this.renderLabel()}
                {this.renderInputElement()} {this.renderError()}
            </div>
            );
    }
});

module.exports = Input;
