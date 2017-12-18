/* Constants */
var player = {
    playerOne: 'one',
    playerTwo: 'two',
 };

/* Variables */
var board, turn, gems, playerOneScore, playerTwoScore

/* Cached Elements*/
// scoreCountEl --- want to access it when score increases for each player

//~~~~~ displayEl is for displaying # of gems in each hole during the game
var displayEl = document.getElementsByClassName('display');


function initialize () {
    board = [4, 4, 4, 4, 4, 4, 0, 4, 4, 4, 4, 4, 4, 0];
    turn = 1;
    playerOneScore = 0;
    playerTwoScore = 0;
}

initialize()

// Event Listeners 
//-- will need an event handle click for when player clicks on a hole.
//

// ~~~~~~~~~ Event listener isn't console logging anything, gameboard div may be overlapping other elements ~~~~~~~
// document.querySelector('div').addEventListener('click', function(evt) {
//     console.log('event clicking')
// });

//~~~~Works when using entire body and adding event listener
// document.querySelector('body').addEventListener('click', function(evt) {
// 	if(event.target.id === "blank6" || event.target.id === "blank13") return console.log("you aren't suppoesd to click me")
//     console.log('event clicking', event.target.id)
// });

document.querySelector('body').addEventListener('click', handleClick);

function handleClick(evt) {
    var idx = event.target.id
    while (event.target.id === "blank6" || event.target.id === "blank13") {
        return console.log("you aren't suppoesd to click me")
    }
        if (turn === 1) {
            turn = 0;
            board[idx[5]] = 'one';
        alert('playertwo turn');
    }
        else {
            turn = 1;
            board[idx >= [7] && idx <= [12]] = 'two';
            alert('playertwo turn');
        }
}
//-- will need an event listener when player resets game
document.querySelector('button')
    .addEventListener('click', function(){
        initialize();
        render();
    });



// function handleClick(event){
//     console.log("the id is: ");
// }


/* Functions 
-- while loop when distributing gems into holes (will allow player to add gem
    to their own mancala and skip over opponents mancala)
--- display count will increase or decrease for each hole as gems are dropped in
    or taken out of a hole during each turn
--- a 'snatch' function -- if person drops gem in an empty hole on THEIR side and there
    are gems across from that hole on their opponents side they snatch the gems in both
    holes and gems are dropped into their mancala
--- players score will increase as gems are dropped into the respective mancalas.
--- game is over when either side no longer has any gems left in either 6 holes.
*/




/* 
Rules of Mancala

1. each hole starts off with 4 gems -- 24 gems on each side
2. player one can click on hole 0-5 to begin the game
3. first move - 4 gems will be dropped into each hole moving counter-clockwise
4. each player will drop a gem in their own mancala if they pass by it. each player 
   will AVOID their opponents mancala.
5. player one's mancala is idx 6
6. player two's mancala is idx 13
7. If player one's last gem is dropped in their own mancala they go again 
8. If player one's last gem is dropped in hole 7-12 (on player two's side) their
   turn is over and it is player two's turn
9. Player two goes
10. If player two's last gem is dropped in their own mancala they go again 
11. If player two's last gem is dropped in hole 0-5  (on player one's side) their
   turn is over and it is player one's turn
12. repeat steps 7-11
13. if players last gem lands in an empty hole on THEIR SIDE and there are gems in
   the hole across from their hole on opponents side they snatch the gems in both respective
   holes and the gems are added to that players mancala -- increasing their gem count
13. every time a gem is dropped in a players mancala the gem count increases 
14. game is over when either holes 0-5 or 7-12 no longer contain any gems. 
15. whoever has the most gems in their mancala at the end of the game wins.
*/
