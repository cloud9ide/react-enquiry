"use strict";

function compose(fields, key, child) {
    if (fields[key]) return [].concat(fields[key], child);
    return child;
}

/**
 * Recursively walk all child references to retrieve `field` elements.
 * 
 * @returns Object fields An object of key => value children.
 */
function reduceRefs(refs, fields) {
    return Object.keys(refs).reduce(function(fields, key) {
        var child = refs[key];

        if (child.fieldName)
            fields[child.fieldName] = compose(fields, child.fieldName, child);

        if (child.refs)
            return reduceRefs(child.refs, fields);

        return fields;
    }, fields || {});
}


module.exports = reduceRefs;