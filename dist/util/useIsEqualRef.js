"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
// ommited useComparatorRef
// https://github.com/CSFrequency/react-firebase-hooks/blob/master/util/refHooks.ts
const React = tslib_1.__importStar(require("react"));
const { useEffect, useRef } = React;
const isEqual = (v1, v2) => {
    const bothNull = !v1 && !v2;
    const equal = !!v1 && !!v2 && v1.isEqual(v2);
    return bothNull || equal;
};
const useIsEqualRef = (value, onChange) => {
    const ref = useRef(value);
    useEffect(() => {
        if (!isEqual(value, ref.current)) {
            ref.current = value;
            if (onChange) {
                onChange();
            }
        }
    });
    return ref;
};
exports.default = useIsEqualRef;
