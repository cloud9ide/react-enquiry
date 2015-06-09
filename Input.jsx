
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
        if (this.props.rows || this.props.multiLine)
            return <textarea disabled={this.props.disabled} placeholder={this.props.placeholder} rows={this.props.rows || 3} className={this.classNames(this.props.className)} type={this.props.type} value={this.state.value} onChange={this.onChange} />;
        return <input disabled={this.props.disabled} placeholder={this.props.placeholder} className={this.classNames(this.props.className)} type={this.props.type} value={this.state.value} onChange={this.onChange} />;
    },

    renderLabel: function() {
        if (this.props.label)
            return <label>{this.props.label}</label>;
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
