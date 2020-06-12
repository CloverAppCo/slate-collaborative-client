import { Editor } from 'slate'
import { AutomergeEditor } from './automerge-editor'

import withAutomerge, { AutomergeOptions } from './withAutomerge'
import withAutomergeHistory, { AutomergeHistoryOptions } from './withAutomergeHistory';
import withSocketIO, {
  WithSocketIOEditor,
  SocketIOPluginOptions
} from './withSocketIO'

/**
 * The `withIOCollaboration` plugin contains collaboration with SocketIO.
 */

const withIOCollaboration = <T extends Editor>(
  editor: T,
  options: AutomergeOptions & SocketIOPluginOptions & AutomergeHistoryOptions
): T & WithSocketIOEditor & AutomergeEditor =>
  withSocketIO(withAutomergeHistory(withAutomerge(editor, options), options), options)

export default withIOCollaboration
