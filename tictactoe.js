
//INITIALIZE MAP ARRAY AND VARIABLES, e means empty square
var map = ["e","e","e","e","e","e","e","e","e"];
var currentPlayer = "X";
var aiPlayer = "O";
var gameOn = true;
var singlePlayer = true;
$("#currentPlayer").html("Current player: "+ currentPlayer+" (Your Turn)");

//ADD EVENT LISTENER to clickable tiles
$("#tictactoe-map div").click((e)=>{ makeMove(e)});

function makeMove(event){

  if(gameOn){

    //get the index of the div in the grid, check if it's empty
    if(map[event.target.id] == "e"){

      map[event.target.id] = currentPlayer;
      event.target.innerHTML = currentPlayer;

      //check if this player has three in a row:

      //horizontal wins
      if(map[0]  == currentPlayer && map[1]  == currentPlayer && map[2]  == currentPlayer){
        animateWins(0, 1, 2);
        tictactoeGameOver(currentPlayer);
      }
      else if(map[3]  == currentPlayer && map[4]  == currentPlayer && map[5] == currentPlayer){
        animateWins(3, 4, 5);
        tictactoeGameOver(currentPlayer);
      }
      else if(map[6]  == currentPlayer && map[7]  == currentPlayer && map[8] == currentPlayer){
        animateWins(6, 7, 8);
        tictactoeGameOver(currentPlayer);
      } //vertical wins
      else if(map[0] == currentPlayer && map[3]  == currentPlayer && map[6] == currentPlayer){
        animateWins(0, 3, 6);
        tictactoeGameOver(currentPlayer);
      }
      else if(map[1]  == currentPlayer && map[4]  == currentPlayer && map[7]  == currentPlayer){
        animateWins(1, 4, 7);
        tictactoeGameOver(currentPlayer);
      }
      else if(map[2]  == currentPlayer && map[5]  == currentPlayer && map[8]  == currentPlayer){
        animateWins(2, 5, 8);
        tictactoeGameOver(currentPlayer);
      } //diagonal wins
      else if(map[0]  == currentPlayer && map[4]  == currentPlayer && map[8]  == currentPlayer){
        animateWins(0, 4, 8);
        tictactoeGameOver(currentPlayer);
      }
      else if(map[2]  == currentPlayer && map[4]  == currentPlayer && map[6]  == currentPlayer){
        animateWins(2, 4, 6);
        tictactoeGameOver(currentPlayer);
      } //check stalemate
      else if(!map.includes("e")){
        tictactoeStale();
      }
      else {
        //simply animate and switch players
        $(event.target).animate({opacity: '0.5',}, "fast").animate({opacity: '1',}, "fast");
        //make victory or defeat sound
        if(currentPlayer != aiPlayer){document.querySelector("#heroPing").play();}else{document.querySelector("#antagonistPing").play();}
        //switch turns
        switchPlayers();
      }
    }
    else {
      //make a tile-not-clickable denial noise

    }
  }

}

function switchPlayers(){
  if(singlePlayer){
    //switch player turn
    currentPlayer = (currentPlayer == "X")? "O" : "X";

    //update notification of current player & make a move
    if(currentPlayer == aiPlayer){
      $("#currentPlayer").html("Current player: "+ currentPlayer+" (NPC)");
      //ai makes a move
      aiMakeMove(currentPlayer);
    } else {
      $("#currentPlayer").html("Current player: "+ currentPlayer+" (Your Turn)");
    }
  }
  else{
    //switch players in a two player match
    currentPlayer = (currentPlayer == "X")? "O" : "X";
    $("#currentPlayer").html("Current player: "+ currentPlayer);
  }
}

function tictactoeGameOver(winner){
  gameOn = false;
  $("#winner").html("Player "+winner+" wins!");
  if(singlePlayer){
    if(winner != aiPlayer){
      document.querySelector("#winPing").play();
    } else {
      document.querySelector("#defeat").play();
    }
  }
  else {
    //if its two-player, we always play a victory sound
    document.querySelector("#winPing").play();
  }
}

function tictactoeStale(){
  document.querySelector("#defeat").play();
  gameOn = false;
  $("#winner").html("Stalemate! No winner. Press Reset to start a new game.");
}

function tictactoeReset(){
  document.querySelector("#newGame").play();
  // switch players
  currentPlayer = (currentPlayer == "X")? "O" : "X";
  $("#currentPlayer").html("Current player: "+ currentPlayer);
  map = ["e","e","e","e","e","e","e","e","e"];
  $("#tictactoe-map div").html("").css("background-color", "transparent");
  $("#winner").html("");
  gameOn = true;
  singlePlayer = false;
}

function tictactoeAIReset(){

  //play new game sound effect
  document.querySelector("#newGame").play();

  //swap symbol of the ai
  aiPlayer = (aiPlayer == "X")? "O" : "X";
  //make the current player the opposite symbol of whomever made the last move
  currentPlayer = (currentPlayer == "X")? "O" : "X";

  //update the notification of who's turn it is
  if(currentPlayer == aiPlayer){
    $("#currentPlayer").html("Current player: "+ currentPlayer+" (NPC)");
  } else {
    $("#currentPlayer").html("Current player: "+ currentPlayer+" (Your Turn)");
  }
  //reset map
  map = ["e","e","e","e","e","e","e","e","e"];
  $("#tictactoe-map div").html("").css("background-color", "transparent");
  $("#winner").html("");
  gameOn = true;
  singlePlayer = true;

  //this gets the AI to move, if it's its turn, else it's your turn
  switchPlayers();
}

function aiMakeMove(currentPlayer){
  //get random spot on the map that is still an "e" and call the click event on a random div object
  var searching = true;
  let chosenTile;
  let opponent = (currentPlayer == "X")? "O" : "X";

  //disable human user and trigger click on corresponding div
  gameOn = false;
  // $("#tictactoe-map div").off("click");

  //scan map and check for possible hot moves, from either self or opponent. There are 24 possible winning moves in this game, check them all:
  //check for wins first:
  //top row wins
  if(map[0]  == currentPlayer && map[1]  == "e" && map[2]  == currentPlayer){
    chosenTile = 1;
  }
  else if(map[0]  == "e" && map[1]  == currentPlayer && map[2]  == currentPlayer){
    chosenTile = 0;
  }
  else if(map[0]  == currentPlayer && map[1]  == currentPlayer && map[2]  == "e"){
    chosenTile = 2;
  }
  //mid row wins:
  else if(map[3]  == currentPlayer && map[4]  == currentPlayer && map[5]  == "e"){
    chosenTile = 5;
  }
  else if(map[3]  == "e" && map[4]  == currentPlayer && map[5]  == currentPlayer){
    chosenTile = 3;
  }
  else if(map[3]  == currentPlayer && map[4]  == "e" && map[5]  == currentPlayer){
    chosenTile = 4;
  }
  //bottom row wins:
  else if(map[6]  == currentPlayer && map[7]  == "e" && map[8]  == currentPlayer){
    chosenTile = 7;
  }
  else if(map[6]  == currentPlayer && map[7]  == currentPlayer && map[8]  == "e"){
    chosenTile = 8;
  }
  else if(map[6]  == "e" && map[7]  == currentPlayer && map[8]  == currentPlayer){
    chosenTile = 6;
  }
  //left column wins:
  else if(map[0]  == "e" && map[3]  == currentPlayer && map[6]  == currentPlayer){
    chosenTile = 0;
  }
  else if(map[0]  == currentPlayer && map[3]  == "e" && map[6]  == currentPlayer){
    chosenTile = 3;
  }
  else if(map[0]  == currentPlayer && map[3]  == currentPlayer && map[6]  == "e"){
    chosenTile = 6;
  }
  //middle column wins:
  else if(map[1]  == "e" && map[4]  == currentPlayer && map[7]  == currentPlayer){
    chosenTile = 1;
  }
  else if(map[1]  == currentPlayer && map[4]  == "e" && map[7]  == currentPlayer){
    chosenTile = 4;
  }
  else if(map[1]  == currentPlayer && map[4]  == currentPlayer && map[7]  == "e"){
    chosenTile = 7;
  }
  //right column
  else if(map[2]  == "e" && map[5]  == currentPlayer && map[8]  == currentPlayer){
    chosenTile = 2;
  }
  else if(map[2]  == currentPlayer && map[5]  == "e" && map[8]  == currentPlayer){
    chosenTile = 5;
  }
  else if(map[2]  == currentPlayer && map[5]  == currentPlayer && map[8]  == "e"){
    chosenTile = 8;
  }
  //diagonal bottom left to top right
  else if(map[2]  == "e" && map[4]  == currentPlayer && map[6]  == currentPlayer){
    chosenTile = 2;
  }
  else if(map[2]  == currentPlayer && map[4]  == "e" && map[6]  == currentPlayer){
    chosenTile = 4;
  }
  else if(map[2]  == currentPlayer && map[4]  == currentPlayer && map[6]  == "e"){
    chosenTile = 6;
  }
  //diagonal bottom right to top left
  else if(map[0]  == "e" && map[4]  == currentPlayer && map[8]  == currentPlayer){
    chosenTile = 0;
  }
  else if(map[0]  == currentPlayer && map[4]  == "e" && map[8]  == currentPlayer){
    chosenTile = 4;
  }
  else if(map[0]  == currentPlayer && map[4]  == currentPlayer && map[8]  == "e"){
    chosenTile = 8;
  }
//---------------NOW check for possible takedowns, since no wins are possible
  //top rows:
  else if(map[0]  == opponent && map[1]  == "e" && map[2]  == opponent){
    chosenTile = 1;
  }
  else if(map[0]  == "e" && map[1]  == opponent && map[2]  == opponent){
    chosenTile = 0;
  }
  else if(map[0]  == opponent && map[1]  == opponent && map[2]  == "e"){
    chosenTile = 2;
  }
  //mid row wins:
  else if(map[3]  == opponent && map[4]  == opponent && map[5]  == "e"){
    chosenTile = 5;
  }
  else if(map[3]  == "e" && map[4]  == opponent && map[5]  == opponent){
    chosenTile = 3;
  }
  else if(map[3]  == opponent && map[4]  == "e" && map[5]  == opponent){
    chosenTile = 4;
  }
  //bottom row wins:
  else if(map[6]  == opponent && map[7]  == "e" && map[8]  == opponent){
    chosenTile = 7;
  }
  else if(map[6]  == opponent && map[7]  == opponent && map[8]  == "e"){
    chosenTile = 8;
  }
  else if(map[6]  == "e" && map[7]  == opponent && map[8]  == opponent){
    chosenTile = 6;
  }
  //left column wins:
  else if(map[0]  == "e" && map[3]  == opponent && map[6]  == opponent){
    chosenTile = 0;
  }
  else if(map[0]  == opponent && map[3]  == "e" && map[6]  == opponent){
    chosenTile = 3;
  }
  else if(map[0]  == opponent && map[3]  == opponent && map[6]  == "e"){
    chosenTile = 6;
  }
  //middle column wins:
  else if(map[1]  == "e" && map[4]  == opponent && map[7]  == opponent){
    chosenTile = 1;
  }
  else if(map[1]  == opponent && map[4]  == "e" && map[7]  == opponent){
    chosenTile = 4;
  }
  else if(map[1]  == opponent && map[4]  == opponent && map[7]  == "e"){
    chosenTile = 7;
  }
  //right column
  else if(map[2]  == "e" && map[5]  == opponent && map[8]  == opponent){
    chosenTile = 2;
  }
  else if(map[2]  == opponent && map[5]  == "e" && map[8]  == opponent){
    chosenTile = 5;
  }
  else if(map[2]  == opponent && map[5]  == opponent && map[8]  == "e"){
    chosenTile = 8;
  }
  //diagonal bottom left to top right
  else if(map[2]  == "e" && map[4]  == opponent && map[6]  == opponent){
    chosenTile = 2;
  }
  else if(map[2]  == opponent && map[4]  == "e" && map[6]  == opponent){
    chosenTile = 4;
  }
  else if(map[2]  == opponent && map[4]  == opponent && map[6]  == "e"){
    chosenTile = 6;
  }
  //diagonal bottom right to top left
  else if(map[0]  == "e" && map[4]  == opponent && map[8]  == opponent){
    chosenTile = 0;
  }
  else if(map[0]  == opponent && map[4]  == "e" && map[8]  == opponent){
    chosenTile = 4;
  }
  else if(map[0]  == opponent && map[4]  == opponent && map[8]  == "e"){
    chosenTile = 8;
  }
  //After checking for possible wins and possible take-downs, if there are none, just pick a randomly available tile:
  else {

    //try different random spots to see which one is empty
    var searching = true;
    while(searching){
      //get random number between 0 and 8 to randomly pick a square
      chosenTile = Math.floor(Math.random() * 9);

      //check if game tile is empty on the map
      if(map[chosenTile]=="e"){
        //break out of this loop
        searching = false;
      }
    }
  }

  //simulate thinking by giving it a one second pause
  setTimeout(()=>{

    //re-enable makeMove
    gameOn = true;
    // $("#tictactoe-map div").click((e)=>{ makeMove(e) });
    //AI makes a move
    $("#"+chosenTile).click();

  } , 1000);

}

function animateWins(tile1, tile2, tile3){
  //this function takes in three tile names that correspond to their map location, and colors them red or green
  if(singlePlayer && currentPlayer == aiPlayer){
    $("#"+tile1+","+" #"+tile2+", "+"#"+tile3).css("background-color", "#b30000").animate({opacity: '0.5'}, "fast").animate({opacity: '1'}, "fast");
  }
  else {
    $("#"+tile1+","+" #"+tile2+", "+"#"+tile3).css("background-color", "green").animate({opacity: '0.5'}, "fast").animate({opacity: '1'}, "fast");
  }
}
