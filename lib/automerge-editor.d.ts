import Automerge from 'automerge';
import { Editor, Operation } from 'slate';
import { SyncDoc, CollabAction, CursorData } from '@slate-collaborative/bridge';
export interface AutomergeEditor extends Editor {
    clientId: string;
    isRemote: boolean;
    docSet: Automerge.DocSet<SyncDoc>;
    connection: Automerge.Connection<SyncDoc>;
    onConnectionMsg: (msg: Automerge.Message) => void;
    openConnection: () => void;
    closeConnection: () => void;
    receiveDocument: (data: string) => void;
    receiveOperation: (data: Automerge.Message) => void;
    gabageCursor: () => void;
    onCursor: (data: any) => void;
}
/**
 * `AutomergeEditor` contains methods for collaboration-enabled editors.
 */
export declare const AutomergeEditor: {
    /**
     * Create Automerge connection
     */
    createConnection: (e: AutomergeEditor, emit: (data: CollabAction) => void) => Automerge.Connection<Automerge.FreezeObject<{
        children: import("../../bridge/lib").SyncValue;
        cursors: import("../../bridge/lib").Cursors;
    }>>;
    /**
     * Apply Slate operations to Automerge
     */
    applySlateOps: (e: AutomergeEditor, docId: string, operations: Operation[], cursorData?: CursorData | undefined) => Promise<void>;
    /**
     * Receive and apply document to Automerge docSet
     */
    receiveDocument: (e: AutomergeEditor, docId: string, data: string) => void;
    /**
     * Generate automerge diff, convert and apply operations to Editor
     */
    applyOperation: (e: AutomergeEditor, docId: string, data: Automerge.Message) => void;
    garbageCursor: (e: AutomergeEditor, docId: string) => void;
};
//# sourceMappingURL=automerge-editor.d.ts.map