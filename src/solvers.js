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
  var testBoard = new Board({'n':n});
  var result = [];

  var recurse = function(board, rowIndex) {
    // iterate through columns of current row
    for (var colIndex = 0; colIndex < n; colIndex++){
      // toggle piece at (row, column)
      board.togglePiece(rowIndex, colIndex);
      // if no Conflicts
      if(!board.hasAnyRooksConflicts()){
        // if last Row
        if(rowIndex === n - 1){
          // increment counter OR return board
          return board;
        }
        // if not last Row
        else{
          // recurse (board, row+1)
          var recurseResult = recurse(board, rowIndex + 1);
          if(recurseResult === null) {
            board.togglePiece(rowIndex, colIndex);
          }
          else {
            return recurseResult;
          }
        }
      }
      // if Conflicts
      else{
        // untoggle piece at (row, column)
      board.togglePiece(rowIndex, colIndex);
        // allow for loop to continue
      }
    }
    return null;

  };

  var solution = recurse(testBoard, 0);

  if (solution === null) {
    return [];
  }

  for (var rowIndex = 0; rowIndex < n; rowIndex++) {
    result.push(solution.get(rowIndex));
  }
  return result;
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var testBoard = new Board({'n':n});
  var counter = 0;
  debugger;

  if (n === 0) {
    return 1;
  }


  var recurse = function(board, rowIndex) {
    // iterate through columns of current row
    for (var colIndex = 0; colIndex < n; colIndex++){
      // toggle piece at (row, column)
      board.togglePiece(rowIndex, colIndex);
      // if no Conflicts
      if(!board.hasAnyRooksConflicts()){
        // if last Row
        if(rowIndex === n - 1){
          // increment counter OR return board
          counter++;
          board.togglePiece(rowIndex, colIndex);
        }
        // if not last Row
        else{
          // recurse (board, row+1)
          var recurseResult = recurse(board, rowIndex + 1);
          if(recurseResult === null) {
            board.togglePiece(rowIndex, colIndex);
          }
          else {
            return recurseResult;
          }
        }
      }
      // if Conflicts
      else{
        // untoggle piece at (row, column)
      board.togglePiece(rowIndex, colIndex);
        // allow for loop to continue
      }
    }
    return null;

  };

  recurse(testBoard, 0);

  return counter;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var testBoard = new Board({'n':n});
  var result = [];

  if (n === 2) {
    return [[0,0],[0,0]];
  }

  if (n === 3) {
    return [[0,0,0],[0,0,0],[0,0,0]];
  }

  var recurse = function(board, rowIndex) {
    // iterate through columns of current row
    for (var colIndex = 0; colIndex < n; colIndex++){
      // toggle piece at (row, column)
      board.togglePiece(rowIndex, colIndex);
      // if no Conflicts
      if(!board.hasAnyQueensConflicts()){
        // if last Row
        if(rowIndex === n - 1){
          // increment counter OR return board
          return board;
        }
        // if not last Row
        else{
          // recurse (board, row+1)
          var recurseResult = recurse(board, rowIndex + 1);
          if(recurseResult === null) {
            board.togglePiece(rowIndex, colIndex);
          }
          else {
            return recurseResult;
          }
        }
      }
      // if Conflicts
      else{
        // untoggle piece at (row, column)
      board.togglePiece(rowIndex, colIndex);
        // allow for loop to continue
      }
    }
    return null;

  };

  var solution = recurse(testBoard, 0);

  if (solution === null) {
    return [];
  }

  for (var rowIndex = 0; rowIndex < n; rowIndex++) {
    result.push(solution.get(rowIndex));
  }
  return result;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var testBoard = new Board({'n':n});
  var counter = 0;

  if (n === 0) {
    return 1;
  }


  var recurse = function(board, rowIndex) {
    // iterate through columns of current row
    for (var colIndex = 0; colIndex < n; colIndex++){
      // toggle piece at (row, column)
      board.togglePiece(rowIndex, colIndex);
      // if no Conflicts
      if(!board.hasAnyQueensConflicts()){
        // if last Row
        if(rowIndex === n - 1){
          // increment counter OR return board
          counter++;
          board.togglePiece(rowIndex, colIndex);
        }
        // if not last Row
        else{
          // recurse (board, row+1)
          var recurseResult = recurse(board, rowIndex + 1);
          if(recurseResult === null) {
            board.togglePiece(rowIndex, colIndex);
          }
          else {
            return recurseResult;
          }
        }
      }
      // if Conflicts
      else{
        // untoggle piece at (row, column)
      board.togglePiece(rowIndex, colIndex);
        // allow for loop to continue
      }
    }
    return null;

  };

  recurse(testBoard, 0);

  return counter;
};

window.countNQueensBitwise = function(n){
  var solutionCount = 0;

  console.log('Bitwise: Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};


