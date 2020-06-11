import { Editor } from 'slate';
import { AutomergeEditor } from './automerge-editor';
import { CursorData } from '@slate-collaborative/bridge';
export interface AutomergeOptions {
    docId: string;
    cursorData?: CursorData;
}
/**
 * The `withAutomerge` plugin contains core collaboration logic.
 */
declare const withAutomerge: <T extends Editor>(editor: T, options: AutomergeOptions) => T & AutomergeEditor;
export default withAutomerge;
//# sourceMappingURL=withAutomerge.d.ts.map