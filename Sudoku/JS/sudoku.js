var board = []; //list of inputs

//converts a given list into a 2-dimensional array
function listToMatrix(list, sub) {
    var matrix = [],
        i, k; //'i' cycles through the values in the list, and 'k' is the sub-array position.
    for (i = 0, k = -1; i < list.length; i++) {
        if (i % sub === 0) {
            k++;
            matrix[k] = [];
        }
        if (typeof list[i].value == undefined) matrix[k].push(0);
        else matrix[k].push(Number(list[i].value));
    }
    return matrix;
}

//draws the grid
function draw() {
    var h, v;
    for (var row = 0; row < 9; row++) {
        document.write('<tr>'); //table row
        h = row % 3 ? "" : "border-top: 3px solid #000;"; //horzontal borders
        for (var col = 0; col < 9; col++) {
            v = col % 3 ? "" : "border-left: 3px solid #000;"; //vertical borders
            document.write('<td style="' + h + v + '">');
            document.write('<input class = "numbers" type="text" size="1" maxlength="1" /></td>'); //inputs a single character
        }
        document.write('</tr>'); //table row
    }
}

var badInput = []; //array of invalid input

var solve = function() {
    board = document.getElementsByTagName("input"); //lis of input
	//selects all inputs, which are of the class '.numbers'.
    var nums = document.querySelectorAll(".numbers");

    var grid = listToMatrix(board, 9); //converts the board to a 2-dimensional matrix

	var errors = false; //turns true if invalid input is found

    for(var i = 0; i < badInput.length; i++) {
        if(board[badInput[i]].value != 0)
            nums[badInput[i]].style.color = "black";
    }

	for(var i = 0; i < grid.length; i++) {
		for(var j = 0; j < grid.length; j++) {
			if(board[i * 9 + j].value != 0) {
				if(admissible(i, j, grid[i][j], grid) == 0 ||
                    !(grid[i][j] >= 0 && grid[i][j] <= 9)) {

                    nums[i * 9 + j].style.color = "red"; //highlights invalid input in red.
					badInput.push(Number(i * 9 + j));
					errors = true;

				}
			}
		}
	}

	if(errors) {
		alert("Errors detected.");
	}
	else {
		for(var i = 0; i < badInput.length; i++) {
			if(board[badInput[i]].value != 0)
				nums[badInput[i]].style.color = "black";
		}
		badInput = [];

		for(var i = 0; i < board.length; i++)
			if(board[i].value == 0)
				nums[i].style.color = "yellowgreen";
		var startDate = Number(new Date()); //time at which the solver starts solving
        solve_sudoku(grid);
		var endDate = Number(new Date()); //time at which the solver stops solving

        //displays the sudoku
		for (var i = 0; i < grid.length; i++) {
			for (var j = 0; j < grid[i].length; j++) {
						board[i * 9 + j].value = grid[i][j];
			}
		}

		var time = endDate - startDate; //time in which the sudoku was solved.\
		alert("Su-do-ku solved in " + time + " milliseconds.");
	}
}