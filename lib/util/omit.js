"use strict";
/**
 * Lightweight omit implementation.
 * 
 * Omits "keys" from object "source" by returning a new copy.
 */
module.exports = function omit(source, ...keys) {
    return Object.keys(source).reduce((target, key) => {
        if (keys.indexOf(key) == -1)
            target[key] = source[key];

        return target;
    }, {});
};
