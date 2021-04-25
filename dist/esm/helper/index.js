export const snapshotToData = (snapshot, idField, refField) => {
    if (!snapshot.exists) {
        return undefined;
    }
    return Object.assign(Object.assign(Object.assign({}, snapshot.data()), (idField ? { [idField]: snapshot.id } : null)), (refField ? { [refField]: snapshot.ref } : null));
};
