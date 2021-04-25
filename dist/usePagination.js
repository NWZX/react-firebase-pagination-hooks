"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usePaginationData = exports.usePagination = void 0;
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const helper_1 = require("./helper");
const useIsEqualRef_1 = tslib_1.__importDefault(require("./util/useIsEqualRef"));
const usePaginationValue_1 = tslib_1.__importDefault(require("./util/usePaginationValue"));
const { useEffect, useMemo } = React;
const DEFAULT_LIMIT = 20;
exports.usePagination = (query, options) => {
    const { loaded, loadingMore, limit, error, setError, setValue, reest, value, after, loadMore, hasMore, } = usePaginationValue_1.default();
    const ref = useIsEqualRef_1.default(query, reest);
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
exports.usePaginationData = (query, options) => {
    const idField = options ? options.idField : undefined;
    const refField = options ? options.refField : undefined;
    const [snapshot, fields, error] = exports.usePagination(query, {
        snapshotListenOptions: options === null || options === void 0 ? void 0 : options.snapshotListenOptions,
        limit: options === null || options === void 0 ? void 0 : options.limit,
    });
    const values = useMemo(() => (snapshot
        ? snapshot.map((doc) => helper_1.snapshotToData(doc, idField, refField))
        : undefined), [snapshot, idField, refField]);
    return [values, fields, error];
};
