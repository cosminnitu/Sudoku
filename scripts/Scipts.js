values = [
    ["-","-","-",2,6,"-",7,"-",1],
    [6, 8,"-" ,"-" , 7,"-" ,"-" , 9,"-"],
    [1, 9,"-" ,"-" ,"-" , 4, 5,"-" ,"-"],
    [8, 2,"-" , 1,"-" ,"-" ,"-" ,4,"-" ],
    ["-", "-", 4, 6,"-", 2, 9,"-","-"],
    ["-", 5,"-" ,"-" ,"-" , 3,"-" , 2, 8],
    ["-","-" , 9, 3,"-" ,"-" ,"-" , 7, 4],
    ["-", 4,"-" ,"-" , 5,"-" ,"-" , 3, 6],
    [7,"-" , 3,"-" , 1, 8,"-" ,"-" ,"-"],

];


function startGame() {
    for(let i = 0; i < 9; i++) {
        for(let j = 0; j < 9; j++) {
           if(values[i][j] !== "-") {
               $("#cell_" + i + j).addClass("inner-grid");
               $("#cell_" + i + j).children().first().text(values[i][j]);
           }
           else {
               $("#cell_" + i + j).addClass("inner-grid-empty");
               $("#cell_" + i + j).children().first().text("");
           }
        }
    }
}

function checkWin() {

    validSudoku = [
        [4,3,5,2,6,9,7,8,1],
        [6,8,2,5,7,1,4,9,3],
        [1,9,7,8,3,4,5,6,2],
        [8,2,6,1,9,5,3,4,7],
        [3,7,4,6,8,2,9,1,5],
        [9,5,1,7,4,3,6,2,8],
        [5,1,9,3,2,6,8,7,4],
        [2,4,8,9,5,7,1,3,6],
        [7,6,3,4,1,8,2,5,9],
    ];
    bec = true;
    for(let i = 0; i < 9; i++) {
        for(let j = 0; j < 9; j++) {
            if(values[i][j] !== validSudoku[i][j]) {
                bec = false;
                break;
            }
        }
    }
    if(bec === false) {
        alert("Comme ci, comme ca!");
    }
    else{
        alert("You won the game");
    }

}


position = "";
document.addEventListener('DOMContentLoaded', function() {

    $('.inner-grid,.inner-grid-empty').mousedown(function enableCell() {

        $('.selected').removeClass('selected');
        $(this).children().first().addClass('selected');

    });

    $('.inner-square').keydown(function insertNumber(e) {

        aux = $('.selected').parent().attr('id');
        row = parseInt(aux.slice(5,6));
        column = parseInt(aux.slice(6,7));

        switch (e.keyCode) {
            case 8:
                values[row][column] = "-";
                $('#' + aux).children().first().text('');
                let i = 0;
                while(i < position.length) {
                    $("#cell_" + position[i] + position[i + 1]).removeClass("red");
                    i += 2;
                }
                position = "";
                break;
            case 97:
            case 98:
            case 99:
            case 100:
            case 101:
            case 102:
            case 103:
            case 104:
            case 105: {
                if ($('#' + aux).hasClass("inner-grid")) {
                    break;
                }

                values[row][column] = "-";
                $('#' + aux).children().first().text('');
                let i = 0;
                while(i < position.length) {
                    $("#cell_" + position[i] + position[i + 1]).removeClass("red");
                    i += 2;
                }
                position = "";


                values[row][column] = e.keyCode - 96;
                $('#' + aux).children().first().text(e.keyCode - 96);
                break;

            }

            case 37: {
                $('.selected').removeClass('selected');
                row = aux.slice(5, 6);
                column = aux.slice(6, 7);
                column = column * 1 - 1;
                if(column === -1) {
                    column = 8;
                }
                var cell = "";
                cell = "cell_" + row + column;
                console.log(cell);
                $('#' + cell).children().first().addClass("selected");
                break;
            }

            case 38: {
                $('.selected').removeClass('selected');
                row = aux.slice(5, 6);
                column = aux.slice(6, 7);
                cell = "";
                row = row * 1 - 1;
                if(row === -1) {
                    row = 8;
                }
                cell = "cell_" + row + column;
                console.log(cell);
                $('#' + cell).children().first().addClass("selected");
                break;
            }

            case 39: {
                $('.selected').removeClass('selected');
                row = aux.slice(5, 6);
                column = aux.slice(6, 7);
                cell = "";
                column = column * 1 + 1;
                if(column === 9) {
                    column = 0;
                }
                cell = "cell_" + row + column;
                console.log(cell);
                $('#' + cell).children().first().addClass("selected");
                break;
            }

            case 40: {
                $('.selected').removeClass('selected');
                row = aux.slice(5, 6);
                column = aux.slice(6, 7);
                cell = "";
                row = row * 1 + 1;
                if(row === 9) {
                    row = 0;
                }
                cell = "cell_" + row + column;
                console.log(cell);
                $('#' + cell).children().first().addClass("selected");
                break;
            }
        }

    });

    $('.inner-square').keydown(function verifyConditions() {

        var bec = true;
        aux = $('.selected').parent().attr('id');

        if (!testRow(aux)) {
            bec = false;
        }

        if (!testColumn(aux)) {
            bec = false;
        }

        if (!testSquare(aux)) {
            bec = false;
        }

        if(bec === false) {
            let i = 0;
            console.log(position);
            while(i < position.length) {
                $("#cell_" + position[i] + position[i + 1]).addClass("red");
                i += 2;
            }
        }


    });

    function testRow(aux) {

        row = parseInt(aux.slice(5, 6));
        column = parseInt(aux.slice(6, 7));

        for(let j = 0; j < 9; j++) {
                if(j !== column && values[row][column] !== '-') {
                    if (values[row][j] === values[row][column]) {
                        console.log(row + " " + j);
                        // position.concat(row + j);
                        position += "" + row + j;
                        return false;
                    }
                }
        }
    }

    function testColumn(aux) {

        row = parseInt(aux.slice(5, 6));
        column = parseInt(aux.slice(6, 7));

        for(let i = 0; i < 9; i++) {
            if(i !== row && values[row][column] !== '-') {
                if (values[i][column] === values[row][column]) {
                    console.log(i + " " + column);
                    position += "" + i + column;
                    return false;
                }
            }
        }

    }

    function testSquare(aux) {

        row = parseInt(aux.slice(5, 6));
        column = parseInt(aux.slice(6, 7));

        for(let i = ~~(row / 3) * 3; i < ~~(row / 3) * 3 + 3; i++) {
            for(let j = ~~(column / 3) * 3; j < ~~(column / 3) * 3 + 3; j++) {
                if(i !== row && j !== column && values[row][column] !== '-') {
                    if(values[i][j] === values[row][column]) {
                        console.log(i + " " + j);
                        position += "" + i + j;
                        return false;
                    }
                }
            }
        }

    }

});















