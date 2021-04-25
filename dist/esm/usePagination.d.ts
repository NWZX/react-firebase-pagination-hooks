import { firestore } from "firebase";
import { PaginationHook } from "./util/usePaginationValue";
export declare const usePagination: (query?: firestore.Query<firestore.DocumentData> | null | undefined, options?: {
    snapshotListenOptions?: firestore.SnapshotListenOptions | undefined;
    limit?: number | undefined;
} | undefined) => PaginationHook<firestore.DocumentSnapshot<firestore.DocumentData>>;
export declare const usePaginationData: <T>(query?: firestore.Query<firestore.DocumentData> | null | undefined, options?: {
    idField?: string | undefined;
    refField?: string | undefined;
    limit?: number | undefined;
    snapshotListenOptions?: firestore.SnapshotListenOptions | undefined;
} | undefined) => PaginationHook<T>;
