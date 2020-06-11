"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = require("react");

var _slate = require("slate");

var _bridge = require("@slate-collaborative/bridge");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var useCursor = function useCursor(e) {
  var _useState = (0, _react.useState)([]),
      _useState2 = _slicedToArray(_useState, 2),
      cursorData = _useState2[0],
      setSursorData = _useState2[1];

  (0, _react.useEffect)(function () {
    e.onCursor = function (data) {
      var ranges = [];
      var cursors = (0, _bridge.toJS)(data);

      for (var cursor in cursors) {
        if (cursor !== e.clientId && cursors[cursor]) {
          ranges.push(JSON.parse(cursors[cursor]));
        }
      }

      setSursorData(ranges);
    };
  }, []);
  var cursors = (0, _react.useMemo)(function () {
    return cursorData;
  }, [cursorData]);
  var decorate = (0, _react.useCallback)(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        node = _ref2[0],
        path = _ref2[1];

    var ranges = [];

    if (_slate.Text.isText(node) && (cursors === null || cursors === void 0 ? void 0 : cursors.length)) {
      cursors.forEach(function (cursor) {
        if (_slate.Range.includes(cursor, path)) {
          var focus = cursor.focus,
              anchor = cursor.anchor,
              isForward = cursor.isForward;

          var isFocusNode = _slate.Path.equals(focus.path, path);

          var isAnchorNode = _slate.Path.equals(anchor.path, path);

          ranges.push(_objectSpread(_objectSpread({}, cursor), {}, {
            isCaret: isFocusNode,
            anchor: {
              path: path,
              offset: isAnchorNode ? anchor.offset : isForward ? 0 : node.text.length
            },
            focus: {
              path: path,
              offset: isFocusNode ? focus.offset : isForward ? node.text.length : 0
            }
          }));
        }
      });
    }

    return ranges;
  }, [cursors]);
  return {
    cursors: cursors,
    decorate: decorate
  };
};

var _default = useCursor;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy91c2VDdXJzb3IudHMiXSwibmFtZXMiOlsidXNlQ3Vyc29yIiwiZSIsImN1cnNvckRhdGEiLCJzZXRTdXJzb3JEYXRhIiwib25DdXJzb3IiLCJkYXRhIiwicmFuZ2VzIiwiY3Vyc29ycyIsImN1cnNvciIsImNsaWVudElkIiwicHVzaCIsIkpTT04iLCJwYXJzZSIsImRlY29yYXRlIiwibm9kZSIsInBhdGgiLCJUZXh0IiwiaXNUZXh0IiwibGVuZ3RoIiwiZm9yRWFjaCIsIlJhbmdlIiwiaW5jbHVkZXMiLCJmb2N1cyIsImFuY2hvciIsImlzRm9yd2FyZCIsImlzRm9jdXNOb2RlIiwiUGF0aCIsImVxdWFscyIsImlzQW5jaG9yTm9kZSIsImlzQ2FyZXQiLCJvZmZzZXQiLCJ0ZXh0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7O0FBRUE7O0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBSUEsSUFBTUEsU0FBUyxHQUFHLFNBQVpBLFNBQVksQ0FDaEJDLENBRGdCLEVBRW1EO0FBQUEsa0JBQy9CLHFCQUFtQixFQUFuQixDQUQrQjtBQUFBO0FBQUEsTUFDNURDLFVBRDREO0FBQUEsTUFDaERDLGFBRGdEOztBQUduRSx3QkFBVSxZQUFNO0FBQ2RGLElBQUFBLENBQUMsQ0FBQ0csUUFBRixHQUFhLFVBQUNDLElBQUQsRUFBbUI7QUFDOUIsVUFBTUMsTUFBZ0IsR0FBRyxFQUF6QjtBQUVBLFVBQU1DLE9BQU8sR0FBRyxrQkFBS0YsSUFBTCxDQUFoQjs7QUFFQSxXQUFLLElBQUlHLE1BQVQsSUFBbUJELE9BQW5CLEVBQTRCO0FBQzFCLFlBQUlDLE1BQU0sS0FBS1AsQ0FBQyxDQUFDUSxRQUFiLElBQXlCRixPQUFPLENBQUNDLE1BQUQsQ0FBcEMsRUFBOEM7QUFDNUNGLFVBQUFBLE1BQU0sQ0FBQ0ksSUFBUCxDQUFZQyxJQUFJLENBQUNDLEtBQUwsQ0FBV0wsT0FBTyxDQUFDQyxNQUFELENBQWxCLENBQVo7QUFDRDtBQUNGOztBQUVETCxNQUFBQSxhQUFhLENBQUNHLE1BQUQsQ0FBYjtBQUNELEtBWkQ7QUFhRCxHQWRELEVBY0csRUFkSDtBQWdCQSxNQUFNQyxPQUFPLEdBQUcsb0JBQWtCO0FBQUEsV0FBTUwsVUFBTjtBQUFBLEdBQWxCLEVBQW9DLENBQUNBLFVBQUQsQ0FBcEMsQ0FBaEI7QUFFQSxNQUFNVyxRQUFRLEdBQUcsd0JBQ2YsZ0JBQTZCO0FBQUE7QUFBQSxRQUEzQkMsSUFBMkI7QUFBQSxRQUFyQkMsSUFBcUI7O0FBQzNCLFFBQU1ULE1BQWUsR0FBRyxFQUF4Qjs7QUFFQSxRQUFJVSxZQUFLQyxNQUFMLENBQVlILElBQVosTUFBcUJQLE9BQXJCLGFBQXFCQSxPQUFyQix1QkFBcUJBLE9BQU8sQ0FBRVcsTUFBOUIsQ0FBSixFQUEwQztBQUN4Q1gsTUFBQUEsT0FBTyxDQUFDWSxPQUFSLENBQWdCLFVBQUFYLE1BQU0sRUFBSTtBQUN4QixZQUFJWSxhQUFNQyxRQUFOLENBQWViLE1BQWYsRUFBdUJPLElBQXZCLENBQUosRUFBa0M7QUFBQSxjQUN4Qk8sS0FEd0IsR0FDS2QsTUFETCxDQUN4QmMsS0FEd0I7QUFBQSxjQUNqQkMsTUFEaUIsR0FDS2YsTUFETCxDQUNqQmUsTUFEaUI7QUFBQSxjQUNUQyxTQURTLEdBQ0toQixNQURMLENBQ1RnQixTQURTOztBQUdoQyxjQUFNQyxXQUFXLEdBQUdDLFlBQUtDLE1BQUwsQ0FBWUwsS0FBSyxDQUFDUCxJQUFsQixFQUF3QkEsSUFBeEIsQ0FBcEI7O0FBQ0EsY0FBTWEsWUFBWSxHQUFHRixZQUFLQyxNQUFMLENBQVlKLE1BQU0sQ0FBQ1IsSUFBbkIsRUFBeUJBLElBQXpCLENBQXJCOztBQUVBVCxVQUFBQSxNQUFNLENBQUNJLElBQVAsaUNBQ0tGLE1BREw7QUFFRXFCLFlBQUFBLE9BQU8sRUFBRUosV0FGWDtBQUdFRixZQUFBQSxNQUFNLEVBQUU7QUFDTlIsY0FBQUEsSUFBSSxFQUFKQSxJQURNO0FBRU5lLGNBQUFBLE1BQU0sRUFBRUYsWUFBWSxHQUNoQkwsTUFBTSxDQUFDTyxNQURTLEdBRWhCTixTQUFTLEdBQ1QsQ0FEUyxHQUVUVixJQUFJLENBQUNpQixJQUFMLENBQVViO0FBTlIsYUFIVjtBQVdFSSxZQUFBQSxLQUFLLEVBQUU7QUFDTFAsY0FBQUEsSUFBSSxFQUFKQSxJQURLO0FBRUxlLGNBQUFBLE1BQU0sRUFBRUwsV0FBVyxHQUNmSCxLQUFLLENBQUNRLE1BRFMsR0FFZk4sU0FBUyxHQUNUVixJQUFJLENBQUNpQixJQUFMLENBQVViLE1BREQsR0FFVDtBQU5DO0FBWFQ7QUFvQkQ7QUFDRixPQTVCRDtBQTZCRDs7QUFFRCxXQUFPWixNQUFQO0FBQ0QsR0FyQ2MsRUFzQ2YsQ0FBQ0MsT0FBRCxDQXRDZSxDQUFqQjtBQXlDQSxTQUFPO0FBQ0xBLElBQUFBLE9BQU8sRUFBUEEsT0FESztBQUVMTSxJQUFBQSxRQUFRLEVBQVJBO0FBRkssR0FBUDtBQUlELENBcEVEOztlQXNFZWIsUyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHVzZVN0YXRlLCB1c2VDYWxsYmFjaywgdXNlRWZmZWN0LCB1c2VNZW1vIH0gZnJvbSAncmVhY3QnXG5cbmltcG9ydCB7IFRleHQsIFJhbmdlLCBQYXRoLCBOb2RlRW50cnkgfSBmcm9tICdzbGF0ZSdcblxuaW1wb3J0IHsgdG9KUywgQ3Vyc29yLCBDdXJzb3JzIH0gZnJvbSAnQHNsYXRlLWNvbGxhYm9yYXRpdmUvYnJpZGdlJ1xuXG5pbXBvcnQgeyBBdXRvbWVyZ2VFZGl0b3IgfSBmcm9tICcuL2F1dG9tZXJnZS1lZGl0b3InXG5cbmNvbnN0IHVzZUN1cnNvciA9IChcbiAgZTogQXV0b21lcmdlRWRpdG9yXG4pOiB7IGRlY29yYXRlOiAoZW50cnk6IE5vZGVFbnRyeSkgPT4gUmFuZ2VbXTsgY3Vyc29yczogQ3Vyc29yW10gfSA9PiB7XG4gIGNvbnN0IFtjdXJzb3JEYXRhLCBzZXRTdXJzb3JEYXRhXSA9IHVzZVN0YXRlPEN1cnNvcltdPihbXSlcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGUub25DdXJzb3IgPSAoZGF0YTogQ3Vyc29ycykgPT4ge1xuICAgICAgY29uc3QgcmFuZ2VzOiBDdXJzb3JbXSA9IFtdXG5cbiAgICAgIGNvbnN0IGN1cnNvcnMgPSB0b0pTKGRhdGEpXG5cbiAgICAgIGZvciAobGV0IGN1cnNvciBpbiBjdXJzb3JzKSB7XG4gICAgICAgIGlmIChjdXJzb3IgIT09IGUuY2xpZW50SWQgJiYgY3Vyc29yc1tjdXJzb3JdKSB7XG4gICAgICAgICAgcmFuZ2VzLnB1c2goSlNPTi5wYXJzZShjdXJzb3JzW2N1cnNvcl0pKVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHNldFN1cnNvckRhdGEocmFuZ2VzKVxuICAgIH1cbiAgfSwgW10pXG5cbiAgY29uc3QgY3Vyc29ycyA9IHVzZU1lbW88Q3Vyc29yW10+KCgpID0+IGN1cnNvckRhdGEsIFtjdXJzb3JEYXRhXSlcblxuICBjb25zdCBkZWNvcmF0ZSA9IHVzZUNhbGxiYWNrKFxuICAgIChbbm9kZSwgcGF0aF06IE5vZGVFbnRyeSkgPT4ge1xuICAgICAgY29uc3QgcmFuZ2VzOiBSYW5nZVtdID0gW11cblxuICAgICAgaWYgKFRleHQuaXNUZXh0KG5vZGUpICYmIGN1cnNvcnM/Lmxlbmd0aCkge1xuICAgICAgICBjdXJzb3JzLmZvckVhY2goY3Vyc29yID0+IHtcbiAgICAgICAgICBpZiAoUmFuZ2UuaW5jbHVkZXMoY3Vyc29yLCBwYXRoKSkge1xuICAgICAgICAgICAgY29uc3QgeyBmb2N1cywgYW5jaG9yLCBpc0ZvcndhcmQgfSA9IGN1cnNvclxuXG4gICAgICAgICAgICBjb25zdCBpc0ZvY3VzTm9kZSA9IFBhdGguZXF1YWxzKGZvY3VzLnBhdGgsIHBhdGgpXG4gICAgICAgICAgICBjb25zdCBpc0FuY2hvck5vZGUgPSBQYXRoLmVxdWFscyhhbmNob3IucGF0aCwgcGF0aClcblxuICAgICAgICAgICAgcmFuZ2VzLnB1c2goe1xuICAgICAgICAgICAgICAuLi5jdXJzb3IsXG4gICAgICAgICAgICAgIGlzQ2FyZXQ6IGlzRm9jdXNOb2RlLFxuICAgICAgICAgICAgICBhbmNob3I6IHtcbiAgICAgICAgICAgICAgICBwYXRoLFxuICAgICAgICAgICAgICAgIG9mZnNldDogaXNBbmNob3JOb2RlXG4gICAgICAgICAgICAgICAgICA/IGFuY2hvci5vZmZzZXRcbiAgICAgICAgICAgICAgICAgIDogaXNGb3J3YXJkXG4gICAgICAgICAgICAgICAgICA/IDBcbiAgICAgICAgICAgICAgICAgIDogbm9kZS50ZXh0Lmxlbmd0aFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBmb2N1czoge1xuICAgICAgICAgICAgICAgIHBhdGgsXG4gICAgICAgICAgICAgICAgb2Zmc2V0OiBpc0ZvY3VzTm9kZVxuICAgICAgICAgICAgICAgICAgPyBmb2N1cy5vZmZzZXRcbiAgICAgICAgICAgICAgICAgIDogaXNGb3J3YXJkXG4gICAgICAgICAgICAgICAgICA/IG5vZGUudGV4dC5sZW5ndGhcbiAgICAgICAgICAgICAgICAgIDogMFxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHJhbmdlc1xuICAgIH0sXG4gICAgW2N1cnNvcnNdXG4gIClcblxuICByZXR1cm4ge1xuICAgIGN1cnNvcnMsXG4gICAgZGVjb3JhdGVcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCB1c2VDdXJzb3JcbiJdfQ==