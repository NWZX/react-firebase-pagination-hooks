import { firestore } from "firebase";
import * as React from "react";
import { snapshotToData } from "./helper";
import useIsEqualRef from "./util/useIsEqualRef";
import usePaginationValue, { PaginationHook } from "./util/usePaginationValue";

const { useEffect, useMemo } = React;

const DEFAULT_LIMIT = 20;

export const usePagination = (
  query?: firestore.Query | null,
  options?: {
    snapshotListenOptions?: firestore.SnapshotListenOptions;
    limit?: number;
  }
): PaginationHook<firestore.DocumentSnapshot> => {
  const {
    loaded,
    loadingMore,
    limit,
    error,
    setError,
    setValue,
    reest,
    value,
    after,
    loadMore,
    hasMore,
  } = usePaginationValue();

  const ref = useIsEqualRef(query, reest);

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    const stepLimit = options?.limit || DEFAULT_LIMIT;
    const queryLimited = ref.current.limit(limit || stepLimit);

    const snapshotOption = options?.snapshotListenOptions;
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

export const usePaginationData = <T>(
  query?: firestore.Query | null,
  options?: {
    idField?: string;
    refField?: string;
    limit?: number;
    snapshotListenOptions?: firestore.SnapshotListenOptions;
  }
): PaginationHook<T> => {
  const idField = options ? options.idField : undefined;
  const refField = options ? options.refField : undefined;

  const [snapshot, fields, error] = usePagination(query, {
    snapshotListenOptions: options?.snapshotListenOptions,
    limit: options?.limit,
  });
  const values = useMemo(
    () =>
      (snapshot
        ? snapshot.map((doc) => snapshotToData(doc, idField, refField))
        : undefined) as T[],
    [snapshot, idField, refField]
  );
  return [values, fields, error];
};
