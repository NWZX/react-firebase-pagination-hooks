"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.snapshotToData = void 0;
exports.snapshotToData = (snapshot, idField, refField) => {
    if (!snapshot.exists) {
        return undefined;
    }
    return Object.assign(Object.assign(Object.assign({}, snapshot.data()), (idField ? { [idField]: snapshot.id } : null)), (refField ? { [refField]: snapshot.ref } : null));
};
