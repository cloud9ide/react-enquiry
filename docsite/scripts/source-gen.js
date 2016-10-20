#!/usr/bin/env node

"use strict";

var fs = require("fs");
var _ = require("lodash");
var async = require("async");
var path = require("path");

var BASE_PATH = path.resolve(path.dirname(__filename) + "/../site/");

var sources = [
    {
        title: "Basic usage",
        name: "basic",
        source: "/example/Basic.jsx"
    },
    {
        title: "Form validation",
        name: "validation",
        source: "/example/Validation.jsx"
    },
    {
        title: "Advanced form valiation",
        name: "advanced_validation",
        source: "/example/ValidationAdvanced.jsx"
    },
    {
        title: "Displaying errors",
        name: "errors",
        source: "/example/Errors.jsx"
    },
    {
        title: "Responding to change",
        name: "responding",
        source: "/example/Responding.jsx"
    },
    {
        title: "Radio buttons",
        name: "radiobuttons",
        source: "/example/RadioButtons.jsx"
    },
    {
        title: "Check buttons",
        name: "checkbuttons",
        source: "/example/CheckButtons.jsx"
    },
    {
        title: "Select inputs",
        name: "select",
        source: "/example/Select.jsx"
    },
    {
        title: "Tentatively valid forms",
        name: "tentatively",
        source: "/example/Tentatively.jsx"
    },
    {
        title: "Nested components in forms",
        name: "nested",
        source: "/example/Nested.jsx"
    }
];


async.reduce(sources, {}, function(out, value, next) {
    fs.readFile(BASE_PATH + value.source, function(err, src) {
        if (err) return next(err);

        out[value.name] = {
            source: src.toString(),
            name: value.name,
            title: value.title,
            component: value.component,
        };

        next(null, out);
    });
}, function(err, data) {
    if (err)
        throw err;

    fs.writeFile(BASE_PATH + "/example-sources.json", "module.exports = " + JSON.stringify(data, null, 4), function(err) {
        if (err)
            throw err;

        var examples = sources.map(function(desc) {
            return "module.exports." + desc.name + " = require(\"." + desc.source + "\");";
        });

        fs.writeFile(BASE_PATH + "/examples.js", examples.join("\n"));
    });
});