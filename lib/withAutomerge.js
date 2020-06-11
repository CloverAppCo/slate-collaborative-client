"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _automerge = _interopRequireDefault(require("automerge"));

var _automergeEditor = require("./automerge-editor");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * The `withAutomerge` plugin contains core collaboration logic.
 */
var withAutomerge = function withAutomerge(editor, options) {
  var e = editor;
  var onChange = e.onChange;

  var _ref = options || {},
      docId = _ref.docId,
      cursorData = _ref.cursorData;

  e.docSet = new _automerge["default"].DocSet();

  var createConnection = function createConnection() {
    if (e.connection) e.connection.close();
    e.connection = _automergeEditor.AutomergeEditor.createConnection(e, function (data) {
      return (//@ts-ignore
        e.send(data)
      );
    });
    e.connection.open();
  };

  createConnection();
  /**
   * Open Automerge Connection
   */

  e.openConnection = function () {
    e.connection.open();
  };
  /**
   * Close Automerge Connection
   */


  e.closeConnection = function () {
    e.connection.close();
  };
  /**
   * Clear cursor data
   */


  e.gabageCursor = function () {
    _automergeEditor.AutomergeEditor.garbageCursor(e, docId);
  };
  /**
   * Editor onChange
   */


  e.onChange = function () {
    var operations = e.operations;

    if (!e.isRemote) {
      _automergeEditor.AutomergeEditor.applySlateOps(e, docId, operations, cursorData);
    }

    onChange(); // console.log('e', e.children)
  };
  /**
   * Receive document value
   */


  e.receiveDocument = function (data) {
    _automergeEditor.AutomergeEditor.receiveDocument(e, docId, data);

    createConnection();
  };
  /**
   * Receive Automerge sync operations
   */


  e.receiveOperation = function (data) {
    if (docId !== data.docId) return;

    _automergeEditor.AutomergeEditor.applyOperation(e, docId, data);
  };

  return e;
};

var _default = withAutomerge;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy93aXRoQXV0b21lcmdlLnRzIl0sIm5hbWVzIjpbIndpdGhBdXRvbWVyZ2UiLCJlZGl0b3IiLCJvcHRpb25zIiwiZSIsIm9uQ2hhbmdlIiwiZG9jSWQiLCJjdXJzb3JEYXRhIiwiZG9jU2V0IiwiQXV0b21lcmdlIiwiRG9jU2V0IiwiY3JlYXRlQ29ubmVjdGlvbiIsImNvbm5lY3Rpb24iLCJjbG9zZSIsIkF1dG9tZXJnZUVkaXRvciIsImRhdGEiLCJzZW5kIiwib3BlbiIsIm9wZW5Db25uZWN0aW9uIiwiY2xvc2VDb25uZWN0aW9uIiwiZ2FiYWdlQ3Vyc29yIiwiZ2FyYmFnZUN1cnNvciIsIm9wZXJhdGlvbnMiLCJpc1JlbW90ZSIsImFwcGx5U2xhdGVPcHMiLCJyZWNlaXZlRG9jdW1lbnQiLCJyZWNlaXZlT3BlcmF0aW9uIiwiYXBwbHlPcGVyYXRpb24iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFJQTs7OztBQVNBOzs7QUFJQSxJQUFNQSxhQUFhLEdBQUcsU0FBaEJBLGFBQWdCLENBQ3BCQyxNQURvQixFQUVwQkMsT0FGb0IsRUFHakI7QUFDSCxNQUFNQyxDQUFDLEdBQUdGLE1BQVY7QUFERyxNQUdLRyxRQUhMLEdBR2tCRCxDQUhsQixDQUdLQyxRQUhMOztBQUFBLGFBSzJCRixPQUFPLElBQUksRUFMdEM7QUFBQSxNQUtLRyxLQUxMLFFBS0tBLEtBTEw7QUFBQSxNQUtZQyxVQUxaLFFBS1lBLFVBTFo7O0FBT0hILEVBQUFBLENBQUMsQ0FBQ0ksTUFBRixHQUFXLElBQUlDLHNCQUFVQyxNQUFkLEVBQVg7O0FBRUEsTUFBTUMsZ0JBQWdCLEdBQUcsU0FBbkJBLGdCQUFtQixHQUFNO0FBQzdCLFFBQUlQLENBQUMsQ0FBQ1EsVUFBTixFQUFrQlIsQ0FBQyxDQUFDUSxVQUFGLENBQWFDLEtBQWI7QUFFbEJULElBQUFBLENBQUMsQ0FBQ1EsVUFBRixHQUFlRSxpQ0FBZ0JILGdCQUFoQixDQUFpQ1AsQ0FBakMsRUFBb0MsVUFBQ1csSUFBRDtBQUFBLGFBQ2pEO0FBQ0FYLFFBQUFBLENBQUMsQ0FBQ1ksSUFBRixDQUFPRCxJQUFQO0FBRmlEO0FBQUEsS0FBcEMsQ0FBZjtBQUtBWCxJQUFBQSxDQUFDLENBQUNRLFVBQUYsQ0FBYUssSUFBYjtBQUNELEdBVEQ7O0FBV0FOLEVBQUFBLGdCQUFnQjtBQUVoQjs7OztBQUlBUCxFQUFBQSxDQUFDLENBQUNjLGNBQUYsR0FBbUIsWUFBTTtBQUN2QmQsSUFBQUEsQ0FBQyxDQUFDUSxVQUFGLENBQWFLLElBQWI7QUFDRCxHQUZEO0FBSUE7Ozs7O0FBSUFiLEVBQUFBLENBQUMsQ0FBQ2UsZUFBRixHQUFvQixZQUFNO0FBQ3hCZixJQUFBQSxDQUFDLENBQUNRLFVBQUYsQ0FBYUMsS0FBYjtBQUNELEdBRkQ7QUFJQTs7Ozs7QUFJQVQsRUFBQUEsQ0FBQyxDQUFDZ0IsWUFBRixHQUFpQixZQUFNO0FBQ3JCTixxQ0FBZ0JPLGFBQWhCLENBQThCakIsQ0FBOUIsRUFBaUNFLEtBQWpDO0FBQ0QsR0FGRDtBQUlBOzs7OztBQUlBRixFQUFBQSxDQUFDLENBQUNDLFFBQUYsR0FBYSxZQUFNO0FBQ2pCLFFBQU1pQixVQUFlLEdBQUdsQixDQUFDLENBQUNrQixVQUExQjs7QUFFQSxRQUFJLENBQUNsQixDQUFDLENBQUNtQixRQUFQLEVBQWlCO0FBQ2ZULHVDQUFnQlUsYUFBaEIsQ0FBOEJwQixDQUE5QixFQUFpQ0UsS0FBakMsRUFBd0NnQixVQUF4QyxFQUFvRGYsVUFBcEQ7QUFDRDs7QUFFREYsSUFBQUEsUUFBUSxHQVBTLENBU2pCO0FBQ0QsR0FWRDtBQVlBOzs7OztBQUlBRCxFQUFBQSxDQUFDLENBQUNxQixlQUFGLEdBQW9CLFVBQUFWLElBQUksRUFBSTtBQUMxQkQscUNBQWdCVyxlQUFoQixDQUFnQ3JCLENBQWhDLEVBQW1DRSxLQUFuQyxFQUEwQ1MsSUFBMUM7O0FBRUFKLElBQUFBLGdCQUFnQjtBQUNqQixHQUpEO0FBTUE7Ozs7O0FBSUFQLEVBQUFBLENBQUMsQ0FBQ3NCLGdCQUFGLEdBQXFCLFVBQUFYLElBQUksRUFBSTtBQUMzQixRQUFJVCxLQUFLLEtBQUtTLElBQUksQ0FBQ1QsS0FBbkIsRUFBMEI7O0FBRTFCUSxxQ0FBZ0JhLGNBQWhCLENBQStCdkIsQ0FBL0IsRUFBa0NFLEtBQWxDLEVBQXlDUyxJQUF6QztBQUNELEdBSkQ7O0FBTUEsU0FBT1gsQ0FBUDtBQUNELENBdEZEOztlQXdGZUgsYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBBdXRvbWVyZ2UgZnJvbSAnYXV0b21lcmdlJ1xuXG5pbXBvcnQgeyBFZGl0b3IgfSBmcm9tICdzbGF0ZSdcblxuaW1wb3J0IHsgQXV0b21lcmdlRWRpdG9yIH0gZnJvbSAnLi9hdXRvbWVyZ2UtZWRpdG9yJ1xuXG5pbXBvcnQgeyBDdXJzb3JEYXRhLCBDb2xsYWJBY3Rpb24gfSBmcm9tICdAc2xhdGUtY29sbGFib3JhdGl2ZS9icmlkZ2UnXG5cbmV4cG9ydCBpbnRlcmZhY2UgQXV0b21lcmdlT3B0aW9ucyB7XG4gIGRvY0lkOiBzdHJpbmdcbiAgY3Vyc29yRGF0YT86IEN1cnNvckRhdGFcbn1cblxuLyoqXG4gKiBUaGUgYHdpdGhBdXRvbWVyZ2VgIHBsdWdpbiBjb250YWlucyBjb3JlIGNvbGxhYm9yYXRpb24gbG9naWMuXG4gKi9cblxuY29uc3Qgd2l0aEF1dG9tZXJnZSA9IDxUIGV4dGVuZHMgRWRpdG9yPihcbiAgZWRpdG9yOiBULFxuICBvcHRpb25zOiBBdXRvbWVyZ2VPcHRpb25zXG4pID0+IHtcbiAgY29uc3QgZSA9IGVkaXRvciBhcyBUICYgQXV0b21lcmdlRWRpdG9yXG5cbiAgY29uc3QgeyBvbkNoYW5nZSB9ID0gZVxuXG4gIGNvbnN0IHsgZG9jSWQsIGN1cnNvckRhdGEgfSA9IG9wdGlvbnMgfHwge31cblxuICBlLmRvY1NldCA9IG5ldyBBdXRvbWVyZ2UuRG9jU2V0KClcblxuICBjb25zdCBjcmVhdGVDb25uZWN0aW9uID0gKCkgPT4ge1xuICAgIGlmIChlLmNvbm5lY3Rpb24pIGUuY29ubmVjdGlvbi5jbG9zZSgpXG5cbiAgICBlLmNvbm5lY3Rpb24gPSBBdXRvbWVyZ2VFZGl0b3IuY3JlYXRlQ29ubmVjdGlvbihlLCAoZGF0YTogQ29sbGFiQWN0aW9uKSA9PlxuICAgICAgLy9AdHMtaWdub3JlXG4gICAgICBlLnNlbmQoZGF0YSlcbiAgICApXG5cbiAgICBlLmNvbm5lY3Rpb24ub3BlbigpXG4gIH1cblxuICBjcmVhdGVDb25uZWN0aW9uKClcblxuICAvKipcbiAgICogT3BlbiBBdXRvbWVyZ2UgQ29ubmVjdGlvblxuICAgKi9cblxuICBlLm9wZW5Db25uZWN0aW9uID0gKCkgPT4ge1xuICAgIGUuY29ubmVjdGlvbi5vcGVuKClcbiAgfVxuXG4gIC8qKlxuICAgKiBDbG9zZSBBdXRvbWVyZ2UgQ29ubmVjdGlvblxuICAgKi9cblxuICBlLmNsb3NlQ29ubmVjdGlvbiA9ICgpID0+IHtcbiAgICBlLmNvbm5lY3Rpb24uY2xvc2UoKVxuICB9XG5cbiAgLyoqXG4gICAqIENsZWFyIGN1cnNvciBkYXRhXG4gICAqL1xuXG4gIGUuZ2FiYWdlQ3Vyc29yID0gKCkgPT4ge1xuICAgIEF1dG9tZXJnZUVkaXRvci5nYXJiYWdlQ3Vyc29yKGUsIGRvY0lkKVxuICB9XG5cbiAgLyoqXG4gICAqIEVkaXRvciBvbkNoYW5nZVxuICAgKi9cblxuICBlLm9uQ2hhbmdlID0gKCkgPT4ge1xuICAgIGNvbnN0IG9wZXJhdGlvbnM6IGFueSA9IGUub3BlcmF0aW9uc1xuXG4gICAgaWYgKCFlLmlzUmVtb3RlKSB7XG4gICAgICBBdXRvbWVyZ2VFZGl0b3IuYXBwbHlTbGF0ZU9wcyhlLCBkb2NJZCwgb3BlcmF0aW9ucywgY3Vyc29yRGF0YSlcbiAgICB9XG5cbiAgICBvbkNoYW5nZSgpXG5cbiAgICAvLyBjb25zb2xlLmxvZygnZScsIGUuY2hpbGRyZW4pXG4gIH1cblxuICAvKipcbiAgICogUmVjZWl2ZSBkb2N1bWVudCB2YWx1ZVxuICAgKi9cblxuICBlLnJlY2VpdmVEb2N1bWVudCA9IGRhdGEgPT4ge1xuICAgIEF1dG9tZXJnZUVkaXRvci5yZWNlaXZlRG9jdW1lbnQoZSwgZG9jSWQsIGRhdGEpXG5cbiAgICBjcmVhdGVDb25uZWN0aW9uKClcbiAgfVxuXG4gIC8qKlxuICAgKiBSZWNlaXZlIEF1dG9tZXJnZSBzeW5jIG9wZXJhdGlvbnNcbiAgICovXG5cbiAgZS5yZWNlaXZlT3BlcmF0aW9uID0gZGF0YSA9PiB7XG4gICAgaWYgKGRvY0lkICE9PSBkYXRhLmRvY0lkKSByZXR1cm5cblxuICAgIEF1dG9tZXJnZUVkaXRvci5hcHBseU9wZXJhdGlvbihlLCBkb2NJZCwgZGF0YSlcbiAgfVxuXG4gIHJldHVybiBlXG59XG5cbmV4cG9ydCBkZWZhdWx0IHdpdGhBdXRvbWVyZ2VcbiJdfQ==