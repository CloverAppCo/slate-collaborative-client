import { Range, NodeEntry } from 'slate';
import { Cursor } from '@slate-collaborative/bridge';
import { AutomergeEditor } from './automerge-editor';
declare const useCursor: (e: AutomergeEditor) => {
    decorate: (entry: NodeEntry<import("slate").Node>) => Range[];
    cursors: Cursor[];
};
export default useCursor;
//# sourceMappingURL=useCursor.d.ts.map