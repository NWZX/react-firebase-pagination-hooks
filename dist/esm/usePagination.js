import * as React from "react";
import { snapshotToData } from "./helper";
import useIsEqualRef from "./util/useIsEqualRef";
import usePaginationValue from "./util/usePaginationValue";
const { useEffect, useMemo } = React;
const DEFAULT_LIMIT = 20;
export const usePagination = (query, options) => {
    const { loaded, loadingMore, limit, error, setError, setValue, reest, value, after, loadMore, hasMore, } = usePaginationValue();
    const ref = useIsEqualRef(query, reest);
    useEffect(() => {
        if (!ref.current) {
            return;
        }
        const stepLimit = (options === null || options === void 0 ? void 0 : options.limit) || DEFAULT_LIMIT;
        const queryLimited = ref.current.limit(limit || stepLimit);
        const snapshotOption = options === null || options === void 0 ? void 0 : options.snapshotListenOptions;
        const listener = snapshotOption
            ? queryLimited.onSnapshot(snapshotOption, setValue(stepLimit), setError)
            : queryLimited.onSnapshot(setValue(stepLimit), setError);
        return () => listener();
    }, [ref.current, after]);
    return [
        value,
        {
            loaded,
            loadingMore,
            hasMore,
            loadMore,
        },
        error,
    ];
};
export const usePaginationData = (query, options) => {
    const idField = options ? options.idField : undefined;
    const refField = options ? options.refField : undefined;
    const [snapshot, fields, error] = usePagination(query, {
        snapshotListenOptions: options === null || options === void 0 ? void 0 : options.snapshotListenOptions,
        limit: options === null || options === void 0 ? void 0 : options.limit,
    });
    const values = useMemo(() => (snapshot
        ? snapshot.map((doc) => snapshotToData(doc, idField, refField))
        : undefined), [snapshot, idField, refField]);
    return [values, fields, error];
};
