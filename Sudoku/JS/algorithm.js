//finds an empty cell in a 2-dimensional grid
function findEmpty(grid) {
    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            if (grid[i][j] == 0)
                return [i, j];
        }
    }
    return 0;
}

//decides if a value 'num' is allowed at a given position in a grid
function admissible(row, col, num, grid) {
    for (var i = 0; i < 9; i++) {
			if(i != col && grid[row][i] == num)
				return 0;
            if(i != row && grid[i][col] == num)
				return 0;
			var r = Math.floor(row / 3) * 3 + Math.floor(i / 3);
			var c = Math.floor(col / 3) * 3 + (i % 3); //sub-grid co-ordinates
            if(!(row == r && col == c) &&  grid[r][c] == num)
                return 0;
        }
    return 1;
}

//recursive function to solve the sudoku
function solve_sudoku(grid) {
    var arr = findEmpty(grid);
    if (arr == 0) //sudoku solved
        return 1;
    var row = arr[0];
    var col = arr[1]; //position of an empty cell in the grid

    for (var i = 1; i < 10; i++) {
        if (admissible(row, col, i, grid)) {
            grid[row][col] = i; //places a value 'i'
            if (solve_sudoku(grid))
                return 1; //sudoku solved
            grid[row][col] = 0;
        }
    }
    return 0;
}