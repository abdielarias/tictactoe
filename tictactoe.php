<?php include 'header.php'; ?>

<body id="tictactoe-Page">


  <h1>Beachside Tic Tac Toe</h1>

  <p id="currentPlayer"></p>

  <div id="tictactoe-map">
    <div id="0"></div>
    <div id="1"></div>
    <div id="2"></div>

    <div id="3"></div>
    <div id="4"></div>
    <div id="5"></div>

    <div id="6"></div>
    <div id="7"></div>
    <div id="8"></div>
  </div>

  <p id="winner"></p>
  <br>

  <button onclick="tictactoeAIReset()">Reset Single Player Game</button>
  <button onclick="tictactoeReset()">Reset Two Player Game</button>

  <audio id="heroPing" src="sounds/heroPing.mp3" type="audio/mpeg"></audio>
  <audio id="antagonistPing" src="sounds/antagonistPing.mp3" type="audio/mpeg"></audio>
  <audio id="winPing" src="sounds/gameWin2.mp3" type="audio/mpeg"></audio>
  <audio id="newGame" src="sounds/newGame.mp3" type="audio/mpeg"></audio>
  <audio id="defeat" src="sounds/defeat.mp3" type="audio/mpeg"></audio>

  <script src="tictactoe.js"></script>
</body>

<?php include 'footer.php'; ?>
