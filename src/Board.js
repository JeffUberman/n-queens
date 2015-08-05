// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;','color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;','color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      var counter = this.get(rowIndex).reduce(function(accumulator, square) { return accumulator + square});

      if (counter > 1) return true;
      return false; // fixme
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      var n = this.get('n');

      for (var rowIndex = 0; rowIndex < n; rowIndex++) {
        if (this.hasRowConflictAt(rowIndex)) return true;
      }
      return false; // fixme
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    getColumn: function(colIndex) {
      var n = this.get('n');
      var columnArray = [];

      for (var rowIndex=0; rowIndex < n; rowIndex++) {
        columnArray.push(this.get(rowIndex)[colIndex]);
      }

      return columnArray;
    },

    hasColConflictAt: function(colIndex) {
      columnArray = this.getColumn(colIndex);

      var counter = columnArray.reduce(function(accumulator, square) { return accumulator + square});

      if (counter > 1) return true;
      return false; // fixme
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      var n = this.get('n');

      for (var colIndex = 0; colIndex < n; colIndex++) {
        if (this.hasColConflictAt(colIndex)) return true;
      }
      return false; // fixme
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    getMajorDiagonal: function(majorDiagonalColumnIndexAtFirstRow) {
      var n = this.get('n');
      var majorDiagonalArray = [];
      var colIndex = majorDiagonalColumnIndexAtFirstRow;

      for (var rowIndex = 0; rowIndex < n; rowIndex++) {
        if (colIndex >= 0 && colIndex < n) {
          majorDiagonalArray.push(this.get(rowIndex)[colIndex]);
        }
        colIndex++;
      }

      return majorDiagonalArray;
    },


    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      var diagonalArray = this.getMajorDiagonal(majorDiagonalColumnIndexAtFirstRow);

      var counter = diagonalArray.reduce(function(accumulator, square) { return accumulator + square; });

      if (counter > 1) return true;
      return false; // fixme
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      var n = this.get('n');
      var diagonalIndex = -n + 1;

      for (diagonalIndex; diagonalIndex < n; diagonalIndex++) {
        if (this.hasMajorDiagonalConflictAt(diagonalIndex)) return true;
      }
      return false; // fixme
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    getMinorDiagonal: function(minorDiagonalColumnIndexAtFirstRow) {
      var n = this.get('n');
      var minorDiagonalArray = [];
      var colIndex = minorDiagonalColumnIndexAtFirstRow;

      for (var rowIndex = 0; rowIndex < n; rowIndex++) {
        if (colIndex < n && colIndex >= 0) {
          minorDiagonalArray.push(this.get(rowIndex)[colIndex]);
        }
        colIndex--;
      }

      return minorDiagonalArray;
    },

    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      var diagonalArray = this.getMinorDiagonal(minorDiagonalColumnIndexAtFirstRow);

      var counter = diagonalArray.reduce(function(accumulator, square) { return accumulator + square; });

      if (counter > 1) return true;
      return false; // fixme
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      var n = this.get('n');
      var diagonalIndex = n + (n-2);

      for (diagonalIndex; diagonalIndex > 0; diagonalIndex--) {
        if (this.hasMinorDiagonalConflictAt(diagonalIndex)) return true;
      }
      return false; // fixme
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
