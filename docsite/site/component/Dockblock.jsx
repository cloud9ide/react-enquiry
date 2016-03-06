"use strict";

var React = require('react');
var Highlight = require('react-highlight');

var Dockblock = React.createClass({
    
    getInitialState: function(){
        return {};  
    },
    
    toggleSource: function(evt){
        evt.preventDefault();

        this.setState({
            source: !this.state.source
        });
    },
    
    renderSource: function(){
        if(!this.state.source)
            return;
            
        return (
            <Highlight className="react">
                {this.props.source}
            </Highlight>
        );
    },

    render: function(){
        return (
            <div id={"example-" + this.props.name}>
                <h1>{this.props.title}</h1>
                <div className="row">
                    <div className="col-md-5">
                        {this.props.children}
                        <div className="flex-center-right margin-vertical-2">
                            <button className="float-right noborder" onClick={this.toggleSource}>{"{...} Toggle source"}</button>
                        </div>
                    </div>
                    
                    <div className="col-md-8 col-lg-10">
                        {this.renderSource()}
                    </div>
                </div>
                
                <hr className="margin-vertical-4" />
                
            </div>
        );
    }
});


module.exports = Dockblock;