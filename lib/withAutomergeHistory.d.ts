import { Editor } from 'slate';
export interface HistoryEditor extends Editor {
    undo: () => void;
    redo: () => void;
}
export interface AutomergeHistoryOptions {
    docId: string;
}
/**
 * The `withAutomergeHistory` plugin adds history to collaborative documents
 */
declare const withAutomergeHistory: <T extends Editor>(editor: T, options: AutomergeHistoryOptions) => void;
export default withAutomergeHistory;
//# sourceMappingURL=withAutomergeHistory.d.ts.map