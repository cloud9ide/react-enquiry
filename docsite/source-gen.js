"use strict";

var fs = require("fs");
var _ = require("lodash");
var async = require("async");

var sources = [
    {
        title: "Basic form example with validation",
        name: "basic",
        source: "./example/Basic.jsx",
    },
    {
        title: "Custom form elements",
        name: "custom",
        source: "./example/Custom.jsx",
    },
    {
        title: "The kitchen sink example",
        name: "sink",
        source: "./example/TheSink.jsx",
    },
];


async.reduce(sources, {}, function(out, value, next){
    fs.readFile(value.source, function(err, src){
        if(err) return next(err);
        
        out[value.name] = {
            source: src.toString(),
            name: value.name,
            title: value.title,
            component: value.component,
        };
        
        next(null, out);
    });
}, function(err, data){
    if(err) throw err;

    fs.writeFile("./example-sources.json", "module.exports = " + JSON.stringify(data, null, 4), function(err){
        if (err) throw err;

        var examples = sources.map(function(desc){
            return "module.exports." + desc.name + " = require(\"" + desc.component + "\");";
        });
        
        fs.writeFile("./examples.js", examples.join("\n"));
    });
});