declare type RefHook<T> = {
    current: T;
};
interface HasIsEqual<T> {
    isEqual: (value: T) => boolean;
}
declare const useIsEqualRef: <T extends HasIsEqual<T>>(value: T | null | undefined, onChange?: (() => void) | undefined) => RefHook<T | null | undefined>;
export default useIsEqualRef;
