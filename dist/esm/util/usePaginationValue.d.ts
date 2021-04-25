import { firestore } from "firebase";
declare type ReducerState = {
    hasMore: boolean;
    value: firestore.QueryDocumentSnapshot[];
    after: firestore.QueryDocumentSnapshot | null;
    lastLoaded: firestore.QueryDocumentSnapshot | null;
    loadingMore: boolean;
    limit: number;
    loaded: boolean;
    error?: Error;
};
export declare type PaginationValue = ReducerState & {
    loadMore: () => void;
    reest: () => void;
    setError: (error: Error) => void;
    setValue: (limit: number) => (value: firestore.QuerySnapshot) => void;
};
export declare type PaginationHook<T> = [T[], {
    loaded: boolean;
    hasMore: boolean;
    loadingMore: boolean;
    loadMore: () => void;
}, Error | undefined];
declare type LoadMoreAction = {
    type: "loadMore";
};
declare type ErrorAction = {
    type: "error";
    error: Error;
};
declare type ResetAction = {
    type: "reset";
};
declare type LoadedAction = {
    type: "loaded";
    value: firestore.QuerySnapshot;
    limit: number;
};
export declare type ActionType = LoadMoreAction | ErrorAction | ResetAction | LoadedAction;
declare const usePaginationValue: () => PaginationValue;
export default usePaginationValue;
