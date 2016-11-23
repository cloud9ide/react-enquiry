"use strict";

/**
 * Lightweight clone without protection for deep recursion or circular deps.
 */
function clone(values, d = 0, e = new Error("max level")) {
    if (!values) return values;
    if (typeof values != "object") return values;

    return Object.keys(values).reduce((collect, key) => {
        collect[key] = clone(values[key], d++, e);
        return collect;
    }, {});
}

module.exports = clone;