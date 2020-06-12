import { Editor } from 'slate';
import { AutomergeEditor } from './automerge-editor';
import { AutomergeOptions } from './withAutomerge';
import { AutomergeHistoryOptions } from './withAutomergeHistory';
import { WithSocketIOEditor, SocketIOPluginOptions } from './withSocketIO';
/**
 * The `withIOCollaboration` plugin contains collaboration with SocketIO.
 */
declare const withIOCollaboration: <T extends Editor>(editor: T, options: AutomergeOptions & SocketIOPluginOptions & AutomergeHistoryOptions) => T & WithSocketIOEditor & AutomergeEditor;
export default withIOCollaboration;
//# sourceMappingURL=withIOCollaboration.d.ts.map