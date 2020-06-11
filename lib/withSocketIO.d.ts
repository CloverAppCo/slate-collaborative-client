/// <reference types="socket.io-client" />
import { AutomergeEditor } from './automerge-editor';
import { CollabAction } from '@slate-collaborative/bridge';
export interface SocketIOPluginOptions {
    url: string;
    connectOpts: SocketIOClient.ConnectOpts;
    autoConnect?: boolean;
    onConnect?: () => void;
    onDisconnect?: () => void;
    onError?: (msg: string) => void;
}
export interface WithSocketIOEditor {
    socket: SocketIOClient.Socket;
    connect: () => void;
    disconnect: () => void;
    send: (op: CollabAction) => void;
    receive: (op: CollabAction) => void;
    destroy: () => void;
}
/**
 * The `withSocketIO` plugin contains SocketIO layer logic.
 */
declare const withSocketIO: <T extends AutomergeEditor>(editor: T, options: SocketIOPluginOptions) => T & WithSocketIOEditor;
export default withSocketIO;
//# sourceMappingURL=withSocketIO.d.ts.map