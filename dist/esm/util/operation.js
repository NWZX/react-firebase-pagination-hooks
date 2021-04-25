const findIndexOfDocument = (doc, items) => items.findIndex((item) => {
    return item.id === doc.id;
});
export const updateItem = (doc, items) => {
    const i = findIndexOfDocument(doc, items);
    items[i] = doc;
};
export const deleteItem = (doc, items) => {
    const i = findIndexOfDocument(doc, items);
    items.splice(i, 1);
};
export const addItem = (doc, items) => {
    const i = findIndexOfDocument(doc, items);
    if (i === -1) {
        items.push(doc);
    }
};
