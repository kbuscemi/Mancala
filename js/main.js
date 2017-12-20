/* Constants */
/* Variables */
var holes, currentPlayer, winner;

/* Cached Elements*/
var oneEl = document.getElementById('one');
var twoEl = document.getElementById('two');



// ~~~~Event Listeners ~~~~
document.querySelector('body').addEventListener('click', handleClick);

//~~~Functions~~~~
function initialize () {
    holes = [4, 4, 4, 4, 4, 4, 0, 4, 4, 4, 4, 4, 4, 0];
    currentPlayer = 'one';
    winner = null;
}

function handleClick(e){
    var idx = parseInt(e.target.id.replace('holes', ''));
    if (currentPlayer === 'one' && idx > 5) return;
    if (currentPlayer === 'two' && (idx <= 6 || idx === 13)) return;
    console.log('valid move');
  
    distStones();
    var lastHole = distStones(idx);
    // handle possible capture opposite
    switchTurns(lastHole, currentPlayer);
    winner = getWinner();

    render();
};

function distStones(holeIdx) {
    var numStones = holes[holeIdx];
    holes[holeIdx] = 0
    holeIdx += 1
    while (numStones > 0) {
        if (holeIdx > 13) {
            holeIdx = 0
        }

        if (currentPlayer === "one" && holeIdx === 6) {
            holes[holeIdx]++;
            numStones--;
        } else if (currentPlayer === "two" && holeIdx === 13) {
            holes[holeIdx]++;
            numStones--;
        } else {
            holes[holeIdx]++;
            numStones--;
        }
        holeIdx++;
    }
    return holeIdx-=1;
  }
//-- will need an event listener when player resets game

function switchTurns(lastStoneIdx, playerTurn){
     if (playerTurn === 'one' && lastStoneIdx === 6){
        currentPlayer = 'one';
        return;
    } 
    if (playerTurn === 'two' && lastStoneIdx === 13){
        currentPlayer = 'two';
        return;
    }
    playerTurn === 'one' ? currentPlayer = 'two' : currentPlayer = 'one';
  }; 

function winner() {
    if (holes[0] === 0 && holes[1]=== 0 && holes[2]=== 0 && holes[3]=== 0 && holes[4]=== 0 && holes[5]=== 0) {
        getWinner();
    } else if (holes[7] === 0 && holes[8]=== 0 && holes[9]=== 0 && holes[10]=== 0 && holes[11]=== 0 && holes[12]=== 0){
        getWinner();
    }
}

function getWinner(){
    // temp during development
    return null;
    holes[6] >= holes[13] ? alert('player one wins') : alert('player two wins');
}

function render() {
    // render board (xfer holes array to dom)
    holes.forEach(function(numStones, idx){
        var holeEl = document.getElementById('holes' + idx);
        holeEl.innerHTML = numStones;
    });
    if (winner) {

    } else {
        oneEl.style.border = currentPlayer === 'one' ? '2px dashed white' : '';
        twoEl.style.border = currentPlayer === 'two' ? '2px dashed white' : '';
    }
}



initialize();
render();

/* to do
-- console log knows when its next players turn but can still click on any hole
---  a 'snatch' function -- if person drops gem in an empty hole on THEIR side and there
    are gems across from that hole on their opponents side they snatch the gems in both
    holes and gems are dropped into their mancala
-- get pics of stones and put them in hole?
--- players score will increase as gems are dropped into the respective mancalas ?
-- display winner sign.
-- show user who's turn it is
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
