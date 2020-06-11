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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9hdXRvbWVyZ2UtZWRpdG9yLnRzIl0sIm5hbWVzIjpbIkF1dG9tZXJnZUVkaXRvciIsImNyZWF0ZUNvbm5lY3Rpb24iLCJlIiwiZW1pdCIsIkF1dG9tZXJnZSIsIkNvbm5lY3Rpb24iLCJkb2NTZXQiLCJhcHBseVNsYXRlT3BzIiwiZG9jSWQiLCJvcGVyYXRpb25zIiwiY3Vyc29yRGF0YSIsImRvYyIsImdldERvYyIsIlR5cGVFcnJvciIsIm9wIiwiY2hhbmdlZCIsImNoYW5nZSIsImQiLCJjaGlsZHJlbiIsImNsaWVudElkIiwic2VsZWN0aW9uIiwic2V0RG9jIiwiY29uc29sZSIsImVycm9yIiwicmVjZWl2ZURvY3VtZW50IiwiZGF0YSIsImN1cnJlbnREb2MiLCJleHRlcm5hbERvYyIsImxvYWQiLCJtZXJnZWREb2MiLCJtZXJnZSIsImluaXQiLCJFZGl0b3IiLCJ3aXRob3V0Tm9ybWFsaXppbmciLCJvbkNoYW5nZSIsImFwcGx5T3BlcmF0aW9uIiwiY3VycmVudCIsInVwZGF0ZWQiLCJjb25uZWN0aW9uIiwicmVjZWl2ZU1zZyIsImRpZmYiLCJsZW5ndGgiLCJzbGF0ZU9wcyIsImlzUmVtb3RlIiwiZm9yRWFjaCIsIm8iLCJhcHBseSIsIm9uQ3Vyc29yIiwiY3Vyc29ycyIsIlByb21pc2UiLCJyZXNvbHZlIiwidGhlbiIsIl8iLCJnYXJiYWdlQ3Vyc29yIiwiY3Vzb3JzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7O0FBRUE7O0FBRUE7Ozs7Ozs7Ozs7QUFnQ0E7OztBQUlPLElBQU1BLGVBQWUsR0FBRztBQUM3Qjs7O0FBSUFDLEVBQUFBLGdCQUFnQixFQUFFLDBCQUFDQyxDQUFELEVBQXFCQyxJQUFyQjtBQUFBLFdBQ2hCLElBQUlDLHNCQUFVQyxVQUFkLENBQXlCSCxDQUFDLENBQUNJLE1BQTNCLEVBQW1DLDRCQUFlLFdBQWYsRUFBNEJILElBQTVCLENBQW5DLENBRGdCO0FBQUEsR0FMVzs7QUFRN0I7OztBQUlBSSxFQUFBQSxhQUFh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TCxHQUExQixFQUErQixVQUFDTSxDQUFELEVBQVk7QUFDekQsYUFBT0EsQ0FBQyxDQUFDcUMsTUFBVDtBQUNELEtBRmUsQ0FBaEI7O0FBSUFwRCxJQUFBQSxDQUFDLENBQUM2QyxRQUFGLElBQWM3QyxDQUFDLENBQUM2QyxRQUFGLENBQVcsSUFBWCxDQUFkO0FBRUE3QyxJQUFBQSxDQUFDLENBQUNJLE1BQUYsQ0FBU2UsTUFBVCxDQUFnQmIsS0FBaEIsRUFBdUJPLE9BQXZCO0FBRUFiLElBQUFBLENBQUMsQ0FBQ2dDLFFBQUY7QUFDRDtBQXRINEIsQ0FBeEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQXV0b21lcmdlIGZyb20gJ2F1dG9tZXJnZSdcblxuaW1wb3J0IHsgRWRpdG9yLCBPcGVyYXRpb24gfSBmcm9tICdzbGF0ZSdcblxuaW1wb3J0IHtcbiAgdG9KUyxcbiAgU3luY0RvYyxcbiAgQ29sbGFiQWN0aW9uLFxuICB0b0NvbGxhYkFjdGlvbixcbiAgYXBwbHlPcGVyYXRpb24sXG4gIHNldEN1cnNvcixcbiAgdG9TbGF0ZU9wLFxuICBDdXJzb3JEYXRhXG59IGZyb20gJ0BzbGF0ZS1jb2xsYWJvcmF0aXZlL2JyaWRnZSdcblxuZXhwb3J0IGludGVyZmFjZSBBdXRvbWVyZ2VFZGl0b3IgZXh0ZW5kcyBFZGl0b3Ige1xuICBjbGllbnRJZDogc3RyaW5nXG5cbiAgaXNSZW1vdGU6IGJvb2xlYW5cblxuICBkb2NTZXQ6IEF1dG9tZXJnZS5Eb2NTZXQ8U3luY0RvYz5cbiAgY29ubmVjdGlvbjogQXV0b21lcmdlLkNvbm5lY3Rpb248U3luY0RvYz5cblxuICBvbkNvbm5lY3Rpb25Nc2c6IChtc2c6IEF1dG9tZXJnZS5NZXNzYWdlKSA9PiB2b2lkXG5cbiAgb3BlbkNvbm5lY3Rpb246ICgpID0+IHZvaWRcbiAgY2xvc2VDb25uZWN0aW9uOiAoKSA9PiB2b2lkXG5cbiAgcmVjZWl2ZURvY3VtZW50OiAoZGF0YTogc3RyaW5nKSA9PiB2b2lkXG4gIHJlY2VpdmVPcGVyYXRpb246IChkYXRhOiBBdXRvbWVyZ2UuTWVzc2FnZSkgPT4gdm9pZFxuXG4gIGdhYmFnZUN1cnNvcjogKCkgPT4gdm9pZFxuXG4gIG9uQ3Vyc29yOiAoZGF0YTogYW55KSA9PiB2b2lkXG59XG5cbi8qKlxuICogYEF1dG9tZXJnZUVkaXRvcmAgY29udGFpbnMgbWV0aG9kcyBmb3IgY29sbGFib3JhdGlvbi1lbmFibGVkIGVkaXRvcnMuXG4gKi9cblxuZXhwb3J0IGNvbnN0IEF1dG9tZXJnZUVkaXRvciA9IHtcbiAgLyoqXG4gICAqIENyZWF0ZSBBdXRvbWVyZ2UgY29ubmVjdGlvblxuICAgKi9cblxuICBjcmVhdGVDb25uZWN0aW9uOiAoZTogQXV0b21lcmdlRWRpdG9yLCBlbWl0OiAoZGF0YTogQ29sbGFiQWN0aW9uKSA9PiB2b2lkKSA9PlxuICAgIG5ldyBBdXRvbWVyZ2UuQ29ubmVjdGlvbihlLmRvY1NldCwgdG9Db2xsYWJBY3Rpb24oJ29wZXJhdGlvbicsIGVtaXQpKSxcblxuICAvKipcbiAgICogQXBwbHkgU2xhdGUgb3BlcmF0aW9ucyB0byBBdXRvbWVyZ2VcbiAgICovXG5cbiAgYXBwbHlTbGF0ZU9wczogYXN5bmMgKFxuICAgIGU6IEF1dG9tZXJnZUVkaXRvcixcbiAgICBkb2NJZDogc3RyaW5nLFxuICAgIG9wZXJhdGlvbnM6IE9wZXJhdGlvbltdLFxuICAgIGN1cnNvckRhdGE/OiBDdXJzb3JEYXRhXG4gICkgPT4ge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBkb2MgPSBlLmRvY1NldC5nZXREb2MoZG9jSWQpXG5cbiAgICAgIGlmICghZG9jKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYFVua25vd24gZG9jSWQ6ICR7ZG9jSWR9IWApXG4gICAgICB9XG5cbiAgICAgIGxldCBjaGFuZ2VkXG5cbiAgICAgIGZvciBhd2FpdCAobGV0IG9wIG9mIG9wZXJhdGlvbnMpIHtcbiAgICAgICAgY2hhbmdlZCA9IEF1dG9tZXJnZS5jaGFuZ2U8U3luY0RvYz4oY2hhbmdlZCB8fCBkb2MsIGQgPT5cbiAgICAgICAgICBhcHBseU9wZXJhdGlvbihkLmNoaWxkcmVuLCBvcClcbiAgICAgICAgKVxuICAgICAgfVxuXG4gICAgICBjaGFuZ2VkID0gQXV0b21lcmdlLmNoYW5nZShjaGFuZ2VkIHx8IGRvYywgZCA9PiB7XG4gICAgICAgIHNldEN1cnNvcihlLmNsaWVudElkLCBlLnNlbGVjdGlvbiwgZCwgb3BlcmF0aW9ucywgY3Vyc29yRGF0YSB8fCB7fSlcbiAgICAgIH0pXG5cbiAgICAgIGUuZG9jU2V0LnNldERvYyhkb2NJZCwgY2hhbmdlZCBhcyBhbnkpXG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgY29uc29sZS5lcnJvcihlKVxuICAgIH1cbiAgfSxcblxuICAvKipcbiAgICogUmVjZWl2ZSBhbmQgYXBwbHkgZG9jdW1lbnQgdG8gQXV0b21lcmdlIGRvY1NldFxuICAgKi9cblxuICByZWNlaXZlRG9jdW1lbnQ6IChlOiBBdXRvbWVyZ2VFZGl0b3IsIGRvY0lkOiBzdHJpbmcsIGRhdGE6IHN0cmluZykgPT4ge1xuICAgIGNvbnN0IGN1cnJlbnREb2MgPSBlLmRvY1NldC5nZXREb2MoZG9jSWQpXG5cbiAgICBjb25zdCBleHRlcm5hbERvYyA9IEF1dG9tZXJnZS5sb2FkPFN5bmNEb2M+KGRhdGEpXG5cbiAgICBjb25zdCBtZXJnZWREb2MgPSBBdXRvbWVyZ2UubWVyZ2U8U3luY0RvYz4oXG4gICAgICBleHRlcm5hbERvYyxcbiAgICAgIGN1cnJlbnREb2MgfHwgQXV0b21lcmdlLmluaXQoKVxuICAgIClcblxuICAgIGUuZG9jU2V0LnNldERvYyhkb2NJZCwgbWVyZ2VkRG9jKVxuXG4gICAgRWRpdG9yLndpdGhvdXROb3JtYWxpemluZyhlLCAoKSA9PiB7XG4gICAgICBlLmNoaWxkcmVuID0gdG9KUyhtZXJnZWREb2MpLmNoaWxkcmVuXG5cbiAgICAgIGUub25DaGFuZ2UoKVxuICAgIH0pXG4gIH0sXG5cbiAgLyoqXG4gICAqIEdlbmVyYXRlIGF1dG9tZXJnZSBkaWZmLCBjb252ZXJ0IGFuZCBhcHBseSBvcGVyYXRpb25zIHRvIEVkaXRvclxuICAgKi9cblxuICBhcHBseU9wZXJhdGlvbjogKFxuICAgIGU6IEF1dG9tZXJnZUVkaXRvcixcbiAgICBkb2NJZDogc3RyaW5nLFxuICAgIGRhdGE6IEF1dG9tZXJnZS5NZXNzYWdlXG4gICkgPT4ge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBjdXJyZW50OiBhbnkgPSBlLmRvY1NldC5nZXREb2MoZG9jSWQpXG5cbiAgICAgIGNvbnN0IHVwZGF0ZWQgPSBlLmNvbm5lY3Rpb24ucmVjZWl2ZU1zZyhkYXRhKVxuXG4gICAgICBjb25zdCBvcGVyYXRpb25zID0gQXV0b21lcmdlLmRpZmYoY3VycmVudCwgdXBkYXRlZClcblxuICAgICAgaWYgKG9wZXJhdGlvbnMubGVuZ3RoKSB7XG4gICAgICAgIGNvbnN0IHNsYXRlT3BzID0gdG9TbGF0ZU9wKG9wZXJhdGlvbnMsIGN1cnJlbnQpXG5cbiAgICAgICAgZS5pc1JlbW90ZSA9IHRydWVcblxuICAgICAgICBFZGl0b3Iud2l0aG91dE5vcm1hbGl6aW5nKGUsICgpID0+IHtcbiAgICAgICAgICBzbGF0ZU9wcy5mb3JFYWNoKChvOiBPcGVyYXRpb24pID0+IHtcbiAgICAgICAgICAgIGUuYXBwbHkobylcbiAgICAgICAgICB9KVxuICAgICAgICB9KVxuXG4gICAgICAgIGUub25DdXJzb3IgJiYgZS5vbkN1cnNvcih1cGRhdGVkLmN1cnNvcnMpXG5cbiAgICAgICAgUHJvbWlzZS5yZXNvbHZlKCkudGhlbihfID0+IChlLmlzUmVtb3RlID0gZmFsc2UpKVxuICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoZSlcbiAgICB9XG4gIH0sXG5cbiAgZ2FyYmFnZUN1cnNvcjogKGU6IEF1dG9tZXJnZUVkaXRvciwgZG9jSWQ6IHN0cmluZykgPT4ge1xuICAgIGNvbnN0IGRvYyA9IGUuZG9jU2V0LmdldERvYyhkb2NJZClcblxuICAgIGlmICghZG9jKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgY2hhbmdlZCA9IEF1dG9tZXJnZS5jaGFuZ2U8U3luY0RvYz4oZG9jLCAoZDogYW55KSA9PiB7XG4gICAgICBkZWxldGUgZC5jdXNvcnNcbiAgICB9KVxuXG4gICAgZS5vbkN1cnNvciAmJiBlLm9uQ3Vyc29yKG51bGwpXG5cbiAgICBlLmRvY1NldC5zZXREb2MoZG9jSWQsIGNoYW5nZWQpXG5cbiAgICBlLm9uQ2hhbmdlKClcbiAgfVxufVxuIl19