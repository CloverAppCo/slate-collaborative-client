import Automerge from 'automerge'

import { Editor } from 'slate'

import { AutomergeEditor } from './automerge-editor'

import { CursorData, CollabAction } from '@slate-collaborative/bridge'

export interface HistoryEditor extends Editor {
  undo: () => void
  redo: () => void
}

export interface AutomergeHistoryOptions {
  docId: string
}

/**
 * The `withAutomergeHistory` plugin adds history to collaborative documents
 */

const withAutomergeHistory = <T extends Editor>(
  editor: T,
  options: AutomergeHistoryOptions
) => {
  console.log('history applied')

  const e = editor as T & AutomergeEditor & HistoryEditor

  const { docId } = options || {}

  e.undo = () => {
    AutomergeEditor.undo(e, docId);
  }

  e.redo = () => {
    AutomergeEditor.redo(e, docId);
  }

  return e;
}

export default withAutomergeHistory
