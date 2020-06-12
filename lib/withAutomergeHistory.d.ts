import { Editor } from 'slate';
import { AutomergeEditor } from './automerge-editor';
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
declare const withAutomergeHistory: <T extends Editor>(editor: T, options: AutomergeHistoryOptions) => T & AutomergeEditor & HistoryEditor;
export default withAutomergeHistory;
//# sourceMappingURL=withAutomergeHistory.d.ts.map