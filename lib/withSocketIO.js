"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _socket = _interopRequireDefault(require("socket.io-client"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * The `withSocketIO` plugin contains SocketIO layer logic.
 */
var withSocketIO = function withSocketIO(editor, options) {
  var e = editor;
  var onConnect = options.onConnect,
      onDisconnect = options.onDisconnect,
      onError = options.onError,
      connectOpts = options.connectOpts,
      url = options.url,
      autoConnect = options.autoConnect;
  /**
   * Connect to Socket.
   */

  e.connect = function () {
    if (!e.socket) {
      e.socket = (0, _socket["default"])(url, _objectSpread({}, connectOpts));
      e.socket.on('connect', function () {
        e.clientId = e.socket.id;
        e.openConnection();
        onConnect && onConnect();
      });
    }

    e.socket.on('error', function (msg) {
      onError && onError(msg);
    });
    e.socket.on('msg', function (data) {
      e.receive(data);
    });
    e.socket.on('disconnect', function () {
      e.gabageCursor();
      onDisconnect && onDisconnect();
    });
    e.socket.connect();
    return e;
  };
  /**
   * Disconnect from Socket.
   */


  e.disconnect = function () {
    e.socket.removeListener('msg');
    e.socket.close();
    e.closeConnection();
    return e;
  };
  /**
   * Receive transport msg.
   */


  e.receive = function (msg) {
    switch (msg.type) {
      case 'operation':
        return e.receiveOperation(msg.payload);

      case 'document':
        return e.receiveDocument(msg.payload);
    }
  };
  /**
   * Send message to socket.
   */


  e.send = function (msg) {
    e.socket.emit('msg', msg);
  };
  /**
   * Close socket and connection.
   */


  e.destroy = function () {
    e.socket.close();
    e.closeConnection();
  };

  autoConnect && e.connect();
  return e;
};

var _default = withSocketIO;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy93aXRoU29ja2V0SU8udHMiXSwibmFtZXMiOlsid2l0aFNvY2tldElPIiwiZWRpdG9yIiwib3B0aW9ucyIsImUiLCJvbkNvbm5lY3QiLCJvbkRpc2Nvbm5lY3QiLCJvbkVycm9yIiwiY29ubmVjdE9wdHMiLCJ1cmwiLCJhdXRvQ29ubmVjdCIsImNvbm5lY3QiLCJzb2NrZXQiLCJvbiIsImNsaWVudElkIiwiaWQiLCJvcGVuQ29ubmVjdGlvbiIsIm1zZyIsImRhdGEiLCJyZWNlaXZlIiwiZ2FiYWdlQ3Vyc29yIiwiZGlzY29ubmVjdCIsInJlbW92ZUxpc3RlbmVyIiwiY2xvc2UiLCJjbG9zZUNvbm5lY3Rpb24iLCJ0eXBlIiwicmVjZWl2ZU9wZXJhdGlvbiIsInBheWxvYWQiLCJyZWNlaXZlRG9jdW1lbnQiLCJzZW5kIiwiZW1pdCIsImRlc3Ryb3kiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7Ozs7Ozs7OztBQTZCQTs7O0FBSUEsSUFBTUEsWUFBWSxHQUFHLFNBQWZBLFlBQWUsQ0FDbkJDLE1BRG1CLEVBRW5CQyxPQUZtQixFQUdoQjtBQUNILE1BQU1DLENBQUMsR0FBR0YsTUFBVjtBQURHLE1BSURHLFNBSkMsR0FVQ0YsT0FWRCxDQUlERSxTQUpDO0FBQUEsTUFLREMsWUFMQyxHQVVDSCxPQVZELENBS0RHLFlBTEM7QUFBQSxNQU1EQyxPQU5DLEdBVUNKLE9BVkQsQ0FNREksT0FOQztBQUFBLE1BT0RDLFdBUEMsR0FVQ0wsT0FWRCxDQU9ESyxXQVBDO0FBQUEsTUFRREMsR0FSQyxHQVVDTixPQVZELENBUURNLEdBUkM7QUFBQSxNQVNEQyxXQVRDLEdBVUNQLE9BVkQsQ0FTRE8sV0FUQztBQVlIOzs7O0FBSUFOLEVBQUFBLENBQUMsQ0FBQ08sT0FBRixHQUFZLFlBQU07QUFDaEIsUUFBSSxDQUFDUCxDQUFDLENBQUNRLE1BQVAsRUFBZTtBQUNiUixNQUFBQSxDQUFDLENBQUNRLE1BQUYsR0FBVyx3QkFBR0gsR0FBSCxvQkFBYUQsV0FBYixFQUFYO0FBRUFKLE1BQUFBLENBQUMsQ0FBQ1EsTUFBRixDQUFTQyxFQUFULENBQVksU0FBWixFQUF1QixZQUFNO0FBQzNCVCxRQUFBQSxDQUFDLENBQUNVLFFBQUYsR0FBYVYsQ0FBQyxDQUFDUSxNQUFGLENBQVNHLEVBQXRCO0FBRUFYLFFBQUFBLENBQUMsQ0FBQ1ksY0FBRjtBQUVBWCxRQUFBQSxTQUFTLElBQUlBLFNBQVMsRUFBdEI7QUFDRCxPQU5EO0FBT0Q7O0FBRURELElBQUFBLENBQUMsQ0FBQ1EsTUFBRixDQUFTQyxFQUFULENBQVksT0FBWixFQUFxQixVQUFDSSxHQUFELEVBQWlCO0FBQ3BDVixNQUFBQSxPQUFPLElBQUlBLE9BQU8sQ0FBQ1UsR0FBRCxDQUFsQjtBQUNELEtBRkQ7QUFJQWIsSUFBQUEsQ0FBQyxDQUFDUSxNQUFGLENBQVNDLEVBQVQsQ0FBWSxLQUFaLEVBQW1CLFVBQUNLLElBQUQsRUFBd0I7QUFDekNkLE1BQUFBLENBQUMsQ0FBQ2UsT0FBRixDQUFVRCxJQUFWO0FBQ0QsS0FGRDtBQUlBZCxJQUFBQSxDQUFDLENBQUNRLE1BQUYsQ0FBU0MsRUFBVCxDQUFZLFlBQVosRUFBMEIsWUFBTTtBQUM5QlQsTUFBQUEsQ0FBQyxDQUFDZ0IsWUFBRjtBQUVBZCxNQUFBQSxZQUFZLElBQUlBLFlBQVksRUFBNUI7QUFDRCxLQUpEO0FBTUFGLElBQUFBLENBQUMsQ0FBQ1EsTUFBRixDQUFTRCxPQUFUO0FBRUEsV0FBT1AsQ0FBUDtBQUNELEdBOUJEO0FBZ0NBOzs7OztBQUlBQSxFQUFBQSxDQUFDLENBQUNpQixVQUFGLEdBQWUsWUFBTTtBQUNuQmpCLElBQUFBLENBQUMsQ0FBQ1EsTUFBRixDQUFTVSxjQUFULENBQXdCLEtBQXhCO0FBRUFsQixJQUFBQSxDQUFDLENBQUNRLE1BQUYsQ0FBU1csS0FBVDtBQUVBbkIsSUFBQUEsQ0FBQyxDQUFDb0IsZUFBRjtBQUVBLFdBQU9wQixDQUFQO0FBQ0QsR0FSRDtBQVVBOzs7OztBQUlBQSxFQUFBQSxDQUFDLENBQUNlLE9BQUYsR0FBWSxVQUFDRixHQUFELEVBQXVCO0FBQ2pDLFlBQVFBLEdBQUcsQ0FBQ1EsSUFBWjtBQUNFLFdBQUssV0FBTDtBQUNFLGVBQU9yQixDQUFDLENBQUNzQixnQkFBRixDQUFtQlQsR0FBRyxDQUFDVSxPQUF2QixDQUFQOztBQUNGLFdBQUssVUFBTDtBQUNFLGVBQU92QixDQUFDLENBQUN3QixlQUFGLENBQWtCWCxHQUFHLENBQUNVLE9BQXRCLENBQVA7QUFKSjtBQU1ELEdBUEQ7QUFTQTs7Ozs7QUFJQXZCLEVBQUFBLENBQUMsQ0FBQ3lCLElBQUYsR0FBUyxVQUFDWixHQUFELEVBQXVCO0FBQzlCYixJQUFBQSxDQUFDLENBQUNRLE1BQUYsQ0FBU2tCLElBQVQsQ0FBYyxLQUFkLEVBQXFCYixHQUFyQjtBQUNELEdBRkQ7QUFJQTs7Ozs7QUFJQWIsRUFBQUEsQ0FBQyxDQUFDMkIsT0FBRixHQUFZLFlBQU07QUFDaEIzQixJQUFBQSxDQUFDLENBQUNRLE1BQUYsQ0FBU1csS0FBVDtBQUVBbkIsSUFBQUEsQ0FBQyxDQUFDb0IsZUFBRjtBQUNELEdBSkQ7O0FBTUFkLEVBQUFBLFdBQVcsSUFBSU4sQ0FBQyxDQUFDTyxPQUFGLEVBQWY7QUFFQSxTQUFPUCxDQUFQO0FBQ0QsQ0FuR0Q7O2VBcUdlSCxZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGlvIGZyb20gJ3NvY2tldC5pby1jbGllbnQnXG5cbmltcG9ydCB7IEF1dG9tZXJnZUVkaXRvciB9IGZyb20gJy4vYXV0b21lcmdlLWVkaXRvcidcblxuaW1wb3J0IHsgQ29sbGFiQWN0aW9uIH0gZnJvbSAnQHNsYXRlLWNvbGxhYm9yYXRpdmUvYnJpZGdlJ1xuXG5leHBvcnQgaW50ZXJmYWNlIFNvY2tldElPUGx1Z2luT3B0aW9ucyB7XG4gIHVybDogc3RyaW5nXG4gIGNvbm5lY3RPcHRzOiBTb2NrZXRJT0NsaWVudC5Db25uZWN0T3B0c1xuICBhdXRvQ29ubmVjdD86IGJvb2xlYW5cblxuICBvbkNvbm5lY3Q/OiAoKSA9PiB2b2lkXG4gIG9uRGlzY29ubmVjdD86ICgpID0+IHZvaWRcblxuICBvbkVycm9yPzogKG1zZzogc3RyaW5nKSA9PiB2b2lkXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgV2l0aFNvY2tldElPRWRpdG9yIHtcbiAgc29ja2V0OiBTb2NrZXRJT0NsaWVudC5Tb2NrZXRcblxuICBjb25uZWN0OiAoKSA9PiB2b2lkXG4gIGRpc2Nvbm5lY3Q6ICgpID0+IHZvaWRcblxuICBzZW5kOiAob3A6IENvbGxhYkFjdGlvbikgPT4gdm9pZFxuICByZWNlaXZlOiAob3A6IENvbGxhYkFjdGlvbikgPT4gdm9pZFxuXG4gIGRlc3Ryb3k6ICgpID0+IHZvaWRcbn1cblxuLyoqXG4gKiBUaGUgYHdpdGhTb2NrZXRJT2AgcGx1Z2luIGNvbnRhaW5zIFNvY2tldElPIGxheWVyIGxvZ2ljLlxuICovXG5cbmNvbnN0IHdpdGhTb2NrZXRJTyA9IDxUIGV4dGVuZHMgQXV0b21lcmdlRWRpdG9yPihcbiAgZWRpdG9yOiBULFxuICBvcHRpb25zOiBTb2NrZXRJT1BsdWdpbk9wdGlvbnNcbikgPT4ge1xuICBjb25zdCBlID0gZWRpdG9yIGFzIFQgJiBXaXRoU29ja2V0SU9FZGl0b3JcblxuICBjb25zdCB7XG4gICAgb25Db25uZWN0LFxuICAgIG9uRGlzY29ubmVjdCxcbiAgICBvbkVycm9yLFxuICAgIGNvbm5lY3RPcHRzLFxuICAgIHVybCxcbiAgICBhdXRvQ29ubmVjdFxuICB9ID0gb3B0aW9uc1xuXG4gIC8qKlxuICAgKiBDb25uZWN0IHRvIFNvY2tldC5cbiAgICovXG5cbiAgZS5jb25uZWN0ID0gKCkgPT4ge1xuICAgIGlmICghZS5zb2NrZXQpIHtcbiAgICAgIGUuc29ja2V0ID0gaW8odXJsLCB7IC4uLmNvbm5lY3RPcHRzIH0pXG5cbiAgICAgIGUuc29ja2V0Lm9uKCdjb25uZWN0JywgKCkgPT4ge1xuICAgICAgICBlLmNsaWVudElkID0gZS5zb2NrZXQuaWRcblxuICAgICAgICBlLm9wZW5Db25uZWN0aW9uKClcblxuICAgICAgICBvbkNvbm5lY3QgJiYgb25Db25uZWN0KClcbiAgICAgIH0pXG4gICAgfVxuXG4gICAgZS5zb2NrZXQub24oJ2Vycm9yJywgKG1zZzogc3RyaW5nKSA9PiB7XG4gICAgICBvbkVycm9yICYmIG9uRXJyb3IobXNnKVxuICAgIH0pXG5cbiAgICBlLnNvY2tldC5vbignbXNnJywgKGRhdGE6IENvbGxhYkFjdGlvbikgPT4ge1xuICAgICAgZS5yZWNlaXZlKGRhdGEpXG4gICAgfSlcblxuICAgIGUuc29ja2V0Lm9uKCdkaXNjb25uZWN0JywgKCkgPT4ge1xuICAgICAgZS5nYWJhZ2VDdXJzb3IoKVxuXG4gICAgICBvbkRpc2Nvbm5lY3QgJiYgb25EaXNjb25uZWN0KClcbiAgICB9KVxuXG4gICAgZS5zb2NrZXQuY29ubmVjdCgpXG5cbiAgICByZXR1cm4gZVxuICB9XG5cbiAgLyoqXG4gICAqIERpc2Nvbm5lY3QgZnJvbSBTb2NrZXQuXG4gICAqL1xuXG4gIGUuZGlzY29ubmVjdCA9ICgpID0+IHtcbiAgICBlLnNvY2tldC5yZW1vdmVMaXN0ZW5lcignbXNnJylcblxuICAgIGUuc29ja2V0LmNsb3NlKClcblxuICAgIGUuY2xvc2VDb25uZWN0aW9uKClcblxuICAgIHJldHVybiBlXG4gIH1cblxuICAvKipcbiAgICogUmVjZWl2ZSB0cmFuc3BvcnQgbXNnLlxuICAgKi9cblxuICBlLnJlY2VpdmUgPSAobXNnOiBDb2xsYWJBY3Rpb24pID0+IHtcbiAgICBzd2l0Y2ggKG1zZy50eXBlKSB7XG4gICAgICBjYXNlICdvcGVyYXRpb24nOlxuICAgICAgICByZXR1cm4gZS5yZWNlaXZlT3BlcmF0aW9uKG1zZy5wYXlsb2FkKVxuICAgICAgY2FzZSAnZG9jdW1lbnQnOlxuICAgICAgICByZXR1cm4gZS5yZWNlaXZlRG9jdW1lbnQobXNnLnBheWxvYWQpXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFNlbmQgbWVzc2FnZSB0byBzb2NrZXQuXG4gICAqL1xuXG4gIGUuc2VuZCA9IChtc2c6IENvbGxhYkFjdGlvbikgPT4ge1xuICAgIGUuc29ja2V0LmVtaXQoJ21zZycsIG1zZylcbiAgfVxuXG4gIC8qKlxuICAgKiBDbG9zZSBzb2NrZXQgYW5kIGNvbm5lY3Rpb24uXG4gICAqL1xuXG4gIGUuZGVzdHJveSA9ICgpID0+IHtcbiAgICBlLnNvY2tldC5jbG9zZSgpXG5cbiAgICBlLmNsb3NlQ29ubmVjdGlvbigpXG4gIH1cblxuICBhdXRvQ29ubmVjdCAmJiBlLmNvbm5lY3QoKVxuXG4gIHJldHVybiBlXG59XG5cbmV4cG9ydCBkZWZhdWx0IHdpdGhTb2NrZXRJT1xuIl19