"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addItem = exports.deleteItem = exports.updateItem = void 0;
const findIndexOfDocument = (doc, items) => items.findIndex((item) => {
    return item.id === doc.id;
});
exports.updateItem = (doc, items) => {
    const i = findIndexOfDocument(doc, items);
    items[i] = doc;
};
exports.deleteItem = (doc, items) => {
    const i = findIndexOfDocument(doc, items);
    items.splice(i, 1);
};
exports.addItem = (doc, items) => {
    const i = findIndexOfDocument(doc, items);
    if (i === -1) {
        items.push(doc);
    }
};
