import { firestore } from "firebase";
export declare const snapshotToData: (snapshot: firestore.DocumentSnapshot, idField?: string | undefined, refField?: string | undefined) => {
    [x: string]: any;
} | undefined;
