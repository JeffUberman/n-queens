/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

window.findNRooksSolution = function(n) {
  var solution = new Board({'n':n});
  var results = [];

  solution.togglePiece(0,0);
  results.push(solution.get(0));

  for (var rowIndex = 1; rowIndex < n; rowIndex++) {
    for (var colIndex = 0; colIndex < n; colIndex++) {
      solution.togglePiece(rowIndex, colIndex);
      if (solution.hasAnyRooksConflicts()) {
        solution.togglePiece(rowIndex, colIndex);
      }
      else {
        results.push(solution.get(rowIndex));
        break;
      }
    }
  }

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return results;
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 1; //fixme

  if(findNRooksSolution(n).length < n) {
    return 0;
  }

  var solution = new Board(findNRooksSolution(n));

  var recurse = function(currentBoard, currentRow) {

    for (var colIndex = 0; colIndex < n; colIndex++) {
      if (currentBoard.get(currentRow)[colIndex] === 1) {
        currentBoard.togglePiece(currentRow, colIndex);
        break;
      }
    }


  };

  recurse(solution, solution.get(n-1));

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var testBoard = new Board({'n':n});

  var recurse = function(board, row) {
    // iterate through columns of current row
      // toggle piece at (row, column)
      // if no Conflicts
        // if last Row
          // increment counter OR return board
        // if not last Row
          // recurse (board, row+1)
      // if Conflicts
        // untoggle piece at (row, column)
        // allow for loop to continue

  };

  var solution = recurse(testBoard, 0);
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};

window.countNQueensBitwise = function(n){
  var solutionCount = 0;

  console.log('Bitwise: Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};


