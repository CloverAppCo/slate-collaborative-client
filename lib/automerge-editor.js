"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AutomergeEditor = void 0;

var _automerge = _interopRequireDefault(require("automerge"));

var _slate = require("slate");

var _bridge = require("@slate-collaborative/bridge");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _asyncIterator(iterable) { var method; if (typeof Symbol !== "undefined") { if (Symbol.asyncIterator) { method = iterable[Symbol.asyncIterator]; if (method != null) return method.call(iterable); } if (Symbol.iterator) { method = iterable[Symbol.iterator]; if (method != null) return method.call(iterable); } } throw new TypeError("Object is not async iterable"); }

/**
 * `AutomergeEditor` contains methods for collaboration-enabled editors.
 */
var AutomergeEditor = {
  /**
   * Create Automerge connection
   */
  createConnection: function createConnection(e, emit) {
    return new _automerge["default"].Connection(e.docSet, (0, _bridge.toCollabAction)('operation', emit));
  },

  /**
   * Apply Slate operations to Automerge
   */
  applySlateOps: function () {
    var _applySlateOps = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(e, docId, operations, cursorData) {
      var doc, changed, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _loop, _iterator, _step, _value;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              doc = e.docSet.getDoc(docId);

              if (doc) {
                _context.next = 4;
                break;
              }

              throw new TypeError("Unknown docId: ".concat(docId, "!"));

            case 4:
              _iteratorNormalCompletion = true;
              _didIteratorError = false;
              _context.prev = 6;

              _loop = function _loop() {
                var op = _value;
                changed = _automerge["default"].change(changed || doc, function (d) {
                  return (0, _bridge.applyOperation)(d.children, op);
                });
              };

              _iterator = _asyncIterator(operations);

            case 9:
              _context.next = 11;
              return _iterator.next();

            case 11:
              _step = _context.sent;
              _iteratorNormalCompletion = _step.done;
              _context.next = 15;
              return _step.value;

            case 15:
              _value = _context.sent;

              if (_iteratorNormalCompletion) {
                _context.next = 21;
                break;
              }

              _loop();

            case 18:
              _iteratorNormalCompletion = true;
              _context.next = 9;
              break;

            case 21:
              _context.next = 27;
              break;

            case 23:
              _context.prev = 23;
              _context.t0 = _context["catch"](6);
              _didIteratorError = true;
              _iteratorError = _context.t0;

            case 27:
              _context.prev = 27;
              _context.prev = 28;

              if (!(!_iteratorNormalCompletion && _iterator["return"] != null)) {
                _context.next = 32;
                break;
              }

              _context.next = 32;
              return _iterator["return"]();

            case 32:
              _context.prev = 32;

              if (!_didIteratorError) {
                _context.next = 35;
                break;
              }

              throw _iteratorError;

            case 35:
              return _context.finish(32);

            case 36:
              return _context.finish(27);

            case 37:
              changed = _automerge["default"].change(changed || doc, function (d) {
                (0, _bridge.setCursor)(e.clientId, e.selection, d, operations, cursorData || {});
              });
              e.docSet.setDoc(docId, changed);
              _context.next = 44;
              break;

            case 41:
              _context.prev = 41;
              _context.t1 = _context["catch"](0);
              console.error(_context.t1);

            case 44:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 41], [6, 23, 27, 37], [28,, 32, 36]]);
    }));

    function applySlateOps(_x, _x2, _x3, _x4) {
      return _applySlateOps.apply(this, arguments);
    }

    return applySlateOps;
  }(),

  /**
   * Receive and apply document to Automerge docSet
   */
  receiveDocument: function receiveDocument(e, docId, data) {
    var currentDoc = e.docSet.getDoc(docId);

    var externalDoc = _automerge["default"].load(data);

    var mergedDoc = _automerge["default"].merge(externalDoc, currentDoc || _automerge["default"].init());

    e.docSet.setDoc(docId, mergedDoc);

    _slate.Editor.withoutNormalizing(e, function () {
      e.children = (0, _bridge.toJS)(mergedDoc).children;
      e.onChange();
    });
  },

  /**
   * Generate automerge diff, convert and apply operations to Editor
   */
  applyOperation: function applyOperation(e, docId, data) {
    try {
      var current = e.docSet.getDoc(docId);
      var updated = e.connection.receiveMsg(data);

      var operations = _automerge["default"].diff(current, updated);

      if (operations.length) {
        var slateOps = (0, _bridge.toSlateOp)(operations, current);
        e.isRemote = true;

        _slate.Editor.withoutNormalizing(e, function () {
          slateOps.forEach(function (o) {
            e.apply(o);
          });
        });

        e.onCursor && e.onCursor(updated.cursors);
        Promise.resolve().then(function (_) {
          return e.isRemote = false;
        });
      }
    } catch (e) {
      console.error(e);
    }
  },

  /**
   * Runs an undo if the local user can undo according to Automerge
   */
  undo: function undo(e, docId) {
    var doc = e.docSet.getDoc(docId);

    if (!doc) {
      return;
    }

    if (_automerge["default"].canUndo(doc)) {
      console.log(doc);
      console.log('undo something!!!!!');
    } else {
      console.log('no undo');
    }
  },

  /**
   * Runs a redo if the local user can undo according to Automerge
   */
  redo: function redo(e, docId) {
    var doc = e.docSet.getDoc(docId);

    if (!doc) {
      return;
    }

    if (_automerge["default"].canUndo(doc)) {
      console.log('redo something!!!!!');
    } else {
      console.log('no redo');
    }
  },
  garbageCursor: function garbageCursor(e, docId) {
    var doc = e.docSet.getDoc(docId);

    if (!doc) {
      return;
    }

    var changed = _automerge["default"].change(doc, function (d) {
      delete d.cusors;
    });

    e.onCursor && e.onCursor(null);
    e.docSet.setDoc(docId, changed);
    e.onChange();
  }
};
exports.AutomergeEditor = AutomergeEditor;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9hdXRvbWVyZ2UtZWRpdG9yLnRzIl0sIm5hbWVzIjpbIkF1dG9tZXJnZUVkaXRvciIsImNyZWF0ZUNvbm5lY3Rpb24iLCJlIiwiZW1pdCIsIkF1dG9tZXJnZSIsIkNvbm5lY3Rpb24iLCJkb2NTZXQiLCJhcHBseVNsYXRlT3BzIiwiZG9jSWQiLCJvcGVyYXRpb25zIiwiY3Vyc29yRGF0YSIsImRvYyIsImdldERvYyIsIlR5cGVFcnJvciIsIm9wIiwiY2hhbmdlZCIsImNoYW5nZSIsImQiLCJjaGlsZHJlbiIsImNsaWVudElkIiwic2VsZWN0aW9uIiwic2V0RG9jIiwiY29uc29sZSIsImVycm9yIiwicmVjZWl2ZURvY3VtZW50IiwiZGF0YSIsImN1cnJlbnREb2MiLCJleHRlcm5hbERvYyIsImxvYWQiLCJtZXJnZWREb2MiLCJtZXJnZSIsImluaXQiLCJFZGl0b3IiLCJ3aXRob3V0Tm9ybWFsaXppbmciLCJvbkNoYW5nZSIsImFwcGx5T3BlcmF0aW9uIiwiY3VycmVudCIsInVwZGF0ZWQiLCJjb25uZWN0aW9uIiwicmVjZWl2ZU1zZyIsImRpZmYiLCJsZW5ndGgiLCJzbGF0ZU9wcyIsImlzUmVtb3RlIiwiZm9yRWFjaCIsIm8iLCJhcHBseSIsIm9uQ3Vyc29yIiwiY3Vyc29ycyIsIlByb21pc2UiLCJyZXNvbHZlIiwidGhlbiIsIl8iLCJ1bmRvIiwiY2FuVW5kbyIsImxvZyIsInJlZG8iLCJnYXJiYWdlQ3Vyc29yIiwiY3Vzb3JzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7O0FBRUE7O0FBRUE7Ozs7Ozs7Ozs7QUFnQ0E7OztBQUlPLElBQU1BLGVBQWUsR0FBRztBQUM3Qjs7O0FBSUFDLEVBQUFBLGdCQUFnQixFQUFFLDBCQUFDQyxDQUFELEVBQXFCQyxJQUFyQjtBQUFBLFdBQ2hCLElBQUlDLHNCQUFVQyxVQUFkLENBQXlCSCxDQUFDLENBQUNJLE1BQTNCLEVBQW1DLDRCQUFlLFdBQWYsRUFBNEJILElBQTVCLENBQW5DLENBRGdCO0FBQUEs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SSxNQUFGLENBQVNlLE1BQVQsQ0FBZ0JiLEtBQWhCLEVBQXVCTyxPQUF2QjtBQUVBYixJQUFBQSxDQUFDLENBQUNnQyxRQUFGO0FBQ0Q7QUEzSjRCLENBQXhCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEF1dG9tZXJnZSBmcm9tICdhdXRvbWVyZ2UnXG5cbmltcG9ydCB7IEVkaXRvciwgT3BlcmF0aW9uIH0gZnJvbSAnc2xhdGUnXG5cbmltcG9ydCB7XG4gIHRvSlMsXG4gIFN5bmNEb2MsXG4gIENvbGxhYkFjdGlvbixcbiAgdG9Db2xsYWJBY3Rpb24sXG4gIGFwcGx5T3BlcmF0aW9uLFxuICBzZXRDdXJzb3IsXG4gIHRvU2xhdGVPcCxcbiAgQ3Vyc29yRGF0YVxufSBmcm9tICdAc2xhdGUtY29sbGFib3JhdGl2ZS9icmlkZ2UnXG5cbmV4cG9ydCBpbnRlcmZhY2UgQXV0b21lcmdlRWRpdG9yIGV4dGVuZHMgRWRpdG9yIHtcbiAgY2xpZW50SWQ6IHN0cmluZ1xuXG4gIGlzUmVtb3RlOiBib29sZWFuXG5cbiAgZG9jU2V0OiBBdXRvbWVyZ2UuRG9jU2V0PFN5bmNEb2M+XG4gIGNvbm5lY3Rpb246IEF1dG9tZXJnZS5Db25uZWN0aW9uPFN5bmNEb2M+XG5cbiAgb25Db25uZWN0aW9uTXNnOiAobXNnOiBBdXRvbWVyZ2UuTWVzc2FnZSkgPT4gdm9pZFxuXG4gIG9wZW5Db25uZWN0aW9uOiAoKSA9PiB2b2lkXG4gIGNsb3NlQ29ubmVjdGlvbjogKCkgPT4gdm9pZFxuXG4gIHJlY2VpdmVEb2N1bWVudDogKGRhdGE6IHN0cmluZykgPT4gdm9pZFxuICByZWNlaXZlT3BlcmF0aW9uOiAoZGF0YTogQXV0b21lcmdlLk1lc3NhZ2UpID0+IHZvaWRcblxuICBnYWJhZ2VDdXJzb3I6ICgpID0+IHZvaWRcblxuICBvbkN1cnNvcjogKGRhdGE6IGFueSkgPT4gdm9pZFxufVxuXG4vKipcbiAqIGBBdXRvbWVyZ2VFZGl0b3JgIGNvbnRhaW5zIG1ldGhvZHMgZm9yIGNvbGxhYm9yYXRpb24tZW5hYmxlZCBlZGl0b3JzLlxuICovXG5cbmV4cG9ydCBjb25zdCBBdXRvbWVyZ2VFZGl0b3IgPSB7XG4gIC8qKlxuICAgKiBDcmVhdGUgQXV0b21lcmdlIGNvbm5lY3Rpb25cbiAgICovXG5cbiAgY3JlYXRlQ29ubmVjdGlvbjogKGU6IEF1dG9tZXJnZUVkaXRvciwgZW1pdDogKGRhdGE6IENvbGxhYkFjdGlvbikgPT4gdm9pZCkgPT5cbiAgICBuZXcgQXV0b21lcmdlLkNvbm5lY3Rpb24oZS5kb2NTZXQsIHRvQ29sbGFiQWN0aW9uKCdvcGVyYXRpb24nLCBlbWl0KSksXG5cbiAgLyoqXG4gICAqIEFwcGx5IFNsYXRlIG9wZXJhdGlvbnMgdG8gQXV0b21lcmdlXG4gICAqL1xuXG4gIGFwcGx5U2xhdGVPcHM6IGFzeW5jIChcbiAgICBlOiBBdXRvbWVyZ2VFZGl0b3IsXG4gICAgZG9jSWQ6IHN0cmluZyxcbiAgICBvcGVyYXRpb25zOiBPcGVyYXRpb25bXSxcbiAgICBjdXJzb3JEYXRhPzogQ3Vyc29yRGF0YVxuICApID0+IHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgZG9jID0gZS5kb2NTZXQuZ2V0RG9jKGRvY0lkKVxuXG4gICAgICBpZiAoIWRvYykge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBVbmtub3duIGRvY0lkOiAke2RvY0lkfSFgKVxuICAgICAgfVxuXG4gICAgICBsZXQgY2hhbmdlZFxuXG4gICAgICBmb3IgYXdhaXQgKGxldCBvcCBvZiBvcGVyYXRpb25zKSB7XG4gICAgICAgIGNoYW5nZWQgPSBBdXRvbWVyZ2UuY2hhbmdlPFN5bmNEb2M+KGNoYW5nZWQgfHwgZG9jLCBkID0+XG4gICAgICAgICAgYXBwbHlPcGVyYXRpb24oZC5jaGlsZHJlbiwgb3ApXG4gICAgICAgIClcbiAgICAgIH1cblxuICAgICAgY2hhbmdlZCA9IEF1dG9tZXJnZS5jaGFuZ2UoY2hhbmdlZCB8fCBkb2MsIGQgPT4ge1xuICAgICAgICBzZXRDdXJzb3IoZS5jbGllbnRJZCwgZS5zZWxlY3Rpb24sIGQsIG9wZXJhdGlvbnMsIGN1cnNvckRhdGEgfHwge30pXG4gICAgICB9KVxuXG4gICAgICBlLmRvY1NldC5zZXREb2MoZG9jSWQsIGNoYW5nZWQgYXMgYW55KVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoZSlcbiAgICB9XG4gIH0sXG5cbiAgLyoqXG4gICAqIFJlY2VpdmUgYW5kIGFwcGx5IGRvY3VtZW50IHRvIEF1dG9tZXJnZSBkb2NTZXRcbiAgICovXG5cbiAgcmVjZWl2ZURvY3VtZW50OiAoZTogQXV0b21lcmdlRWRpdG9yLCBkb2NJZDogc3RyaW5nLCBkYXRhOiBzdHJpbmcpID0+IHtcbiAgICBjb25zdCBjdXJyZW50RG9jID0gZS5kb2NTZXQuZ2V0RG9jKGRvY0lkKVxuXG4gICAgY29uc3QgZXh0ZXJuYWxEb2MgPSBBdXRvbWVyZ2UubG9hZDxTeW5jRG9jPihkYXRhKVxuXG4gICAgY29uc3QgbWVyZ2VkRG9jID0gQXV0b21lcmdlLm1lcmdlPFN5bmNEb2M+KFxuICAgICAgZXh0ZXJuYWxEb2MsXG4gICAgICBjdXJyZW50RG9jIHx8IEF1dG9tZXJnZS5pbml0KClcbiAgICApXG5cbiAgICBlLmRvY1NldC5zZXREb2MoZG9jSWQsIG1lcmdlZERvYylcblxuICAgIEVkaXRvci53aXRob3V0Tm9ybWFsaXppbmcoZSwgKCkgPT4ge1xuICAgICAgZS5jaGlsZHJlbiA9IHRvSlMobWVyZ2VkRG9jKS5jaGlsZHJlblxuXG4gICAgICBlLm9uQ2hhbmdlKClcbiAgICB9KVxuICB9LFxuXG4gIC8qKlxuICAgKiBHZW5lcmF0ZSBhdXRvbWVyZ2UgZGlmZiwgY29udmVydCBhbmQgYXBwbHkgb3BlcmF0aW9ucyB0byBFZGl0b3JcbiAgICovXG5cbiAgYXBwbHlPcGVyYXRpb246IChcbiAgICBlOiBBdXRvbWVyZ2VFZGl0b3IsXG4gICAgZG9jSWQ6IHN0cmluZyxcbiAgICBkYXRhOiBBdXRvbWVyZ2UuTWVzc2FnZVxuICApID0+IHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgY3VycmVudDogYW55ID0gZS5kb2NTZXQuZ2V0RG9jKGRvY0lkKVxuXG4gICAgICBjb25zdCB1cGRhdGVkID0gZS5jb25uZWN0aW9uLnJlY2VpdmVNc2coZGF0YSlcblxuICAgICAgY29uc3Qgb3BlcmF0aW9ucyA9IEF1dG9tZXJnZS5kaWZmKGN1cnJlbnQsIHVwZGF0ZWQpXG5cbiAgICAgIGlmIChvcGVyYXRpb25zLmxlbmd0aCkge1xuICAgICAgICBjb25zdCBzbGF0ZU9wcyA9IHRvU2xhdGVPcChvcGVyYXRpb25zLCBjdXJyZW50KVxuXG4gICAgICAgIGUuaXNSZW1vdGUgPSB0cnVlXG5cbiAgICAgICAgRWRpdG9yLndpdGhvdXROb3JtYWxpemluZyhlLCAoKSA9PiB7XG4gICAgICAgICAgc2xhdGVPcHMuZm9yRWFjaCgobzogT3BlcmF0aW9uKSA9PiB7XG4gICAgICAgICAgICBlLmFwcGx5KG8pXG4gICAgICAgICAgfSlcbiAgICAgICAgfSlcblxuICAgICAgICBlLm9uQ3Vyc29yICYmIGUub25DdXJzb3IodXBkYXRlZC5jdXJzb3JzKVxuXG4gICAgICAgIFByb21pc2UucmVzb2x2ZSgpLnRoZW4oXyA9PiAoZS5pc1JlbW90ZSA9IGZhbHNlKSlcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBjb25zb2xlLmVycm9yKGUpXG4gICAgfVxuICB9LFxuXG4gIC8qKlxuICAgKiBSdW5zIGFuIHVuZG8gaWYgdGhlIGxvY2FsIHVzZXIgY2FuIHVuZG8gYWNjb3JkaW5nIHRvIEF1dG9tZXJnZVxuICAgKi9cblxuICB1bmRvOiAoZTogQXV0b21lcmdlRWRpdG9yLCBkb2NJZDogc3RyaW5nKSA9PiB7XG4gICAgY29uc3QgZG9jID0gZS5kb2NTZXQuZ2V0RG9jKGRvY0lkKVxuXG4gICAgaWYgKCFkb2MpIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGlmIChBdXRvbWVyZ2UuY2FuVW5kbyhkb2MpKSB7XG4gICAgICBjb25zb2xlLmxvZyhkb2MpO1xuICAgICAgY29uc29sZS5sb2coJ3VuZG8gc29tZXRoaW5nISEhISEnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc29sZS5sb2coJ25vIHVuZG8nKTtcbiAgICB9XG4gIH0sXG5cbiAgLyoqXG4gICAqIFJ1bnMgYSByZWRvIGlmIHRoZSBsb2NhbCB1c2VyIGNhbiB1bmRvIGFjY29yZGluZyB0byBBdXRvbWVyZ2VcbiAgICovXG5cbiAgcmVkbzogKGU6IEF1dG9tZXJnZUVkaXRvciwgZG9jSWQ6IHN0cmluZykgPT4ge1xuICAgIGNvbnN0IGRvYyA9IGUuZG9jU2V0LmdldERvYyhkb2NJZClcblxuICAgIGlmICghZG9jKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBpZiAoQXV0b21lcmdlLmNhblVuZG8oZG9jKSkge1xuICAgICAgY29uc29sZS5sb2coJ3JlZG8gc29tZXRoaW5nISEhISEnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc29sZS5sb2coJ25vIHJlZG8nKTtcbiAgICB9XG4gIH0sXG5cbiAgZ2FyYmFnZUN1cnNvcjogKGU6IEF1dG9tZXJnZUVkaXRvciwgZG9jSWQ6IHN0cmluZykgPT4ge1xuICAgIGNvbnN0IGRvYyA9IGUuZG9jU2V0LmdldERvYyhkb2NJZClcblxuICAgIGlmICghZG9jKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgY2hhbmdlZCA9IEF1dG9tZXJnZS5jaGFuZ2U8U3luY0RvYz4oZG9jLCAoZDogYW55KSA9PiB7XG4gICAgICBkZWxldGUgZC5jdXNvcnNcbiAgICB9KVxuXG4gICAgZS5vbkN1cnNvciAmJiBlLm9uQ3Vyc29yKG51bGwpXG5cbiAgICBlLmRvY1NldC5zZXREb2MoZG9jSWQsIGNoYW5nZWQpXG5cbiAgICBlLm9uQ2hhbmdlKClcbiAgfVxufVxuIl19