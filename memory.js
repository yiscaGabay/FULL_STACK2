//App initialization
"use strict";
var gs = {}; //Global namespace
window.addEventListener('load', init);

function init() {
    //App constants
    gs.score = 0;
    gs.NbOfPixelsToArrangeLayout = 800;
    gs.pathToImgsStr = "images/";

    gs.totalNbOfCards = 16;
    gs.beginningOfGridItemIdStr = 'grid-item-';
    //The game board has a background hidden image that will change every new game
    initGameBgs();

    //Set app variables, game controls and console to pre-game
    setPreGame();

    document.getElementsByTagName("body")[0].addEventListener("click", clickFn);
}



//Game States
//Set game variables
function initGameVariables() {
    gs.cardSelected1 = null;
    gs.cardSelected2 = null;

    gs.nbOfCardsOnBoard = gs.totalNbOfCards;

    gs.AreCardsSelectable = false;
    gs.isGameStarted = false;

    gs.isPlayControlEnabled = true;
    gs.isStopControlEnabled = false;
    gs.isPlayAgainControlEnabled = false;
}

function setPreGame() {
    //Reset all app variables 
    initGameVariables();

    //Init cards in card array
    initCardArray();

    //Set controls and game console
    enableControl("play");
    disableControl("stop");
    disableControl("playagain");
}

function setToGame() {
    //Reset all app variables 
    initGameVariables();

    //Randomly assign game images to grid items of the board grid and display top images
    setGameImgsAndInitCardFields();

    //Set hidden background image behind cards
    setGameBg();

    //Set controls and game console
    disableControl("play");
    enableControl("stop");
    enableControl("playagain");

    //Make cards selectable for Game
    gs.AreCardsSelectable = true;
    gs.isGameStarted = true;
}

function setToNewGame() {
    incrementGameBgNb();
    setToGame();
}

function setToStopGame() {
    removeAllCards();
    disableControl("play");
    disableControl("stop");
    enableControl("playagain");
    gs.AreCardsSelectable = false;
    gs.isGameStarted = false;
}

function setToGameWon() {
    setToStopGame();
    // Give score of 5 points for every winner
    gs.score += 5;
    let index = localStorage.currentUser;
    var user = JSON.parse(localStorage.getItem(`user#${index}`));
    let achiv = user.achivment;
    if (gs.score > achiv.maxMemory) {
        user.achivment.maxMemory = gs.score;
        localStorage.setItem(`user#${index}`, JSON.stringify(user));
    }

    var achivAll = JSON.parse(localStorage.getItem("maxScore"));
    if (gs.score > achivAll.memory) {
        alert("You've gone over the top");
        achivAll.memory = gs.score;
        localStorage.setItem("maxScore", JSON.stringify(achivAll));
    }
}



//Event handlers
//Function called when mouse click in window
function clickFn(event) {
    if (event == undefined) {
        throw "Invalid Argument";
    }
    if (event.defaultPrevented) {
        throw "Event prevented";
    }

    var idStr = event.target.id;
    //For PLAY button
    if (idStr === "play" && gs.isPlayControlEnabled) {
        setToGame();
    }

    //For PLAY AGAIN button
    else if (idStr === "playagain" && gs.isPlayAgainControlEnabled) {
        setToNewGame();
    }

    //For STOP button
    else if (idStr === "stop" && gs.isStopControlEnabled) {
        setToStopGame();
    }

    //For game cards clicked through the images within grid items with tags [1,16]
    else if (isIdNumberStrValid(idStr)) {
        cardSelectedHandler(idStr);
    }

    //For game cards clicked through grid items with tags [grid-item-1, grid-item-16]
    else if (isGridItemIdValid(idStr)) {
        cardSelectedHandler(idStr.charAt(gs.beginningOfGridItemIdStr.length));
    }
}



function cardSelectedHandler(idLetStr) {
    if (idLetStr == undefined || !isIdNumberStrValid(idLetStr)) {
        throw "Invalid Argument";
    }
    if (!gs.AreCardsSelectable && !gs.isGameStarted) {
        alert("Press PLAY to start a game !");
    } else {
        var card = getCardWithNumberIdx(idLetStr);
        if (card.isOnBoardBool && !card.isTurnedBool && gs.AreCardsSelectable) {
            //If it's the 1st selected card
            if (gs.cardSelected1 == null) {
                gs.cardSelected1 = card;
                card.showGameImg();
            }

            //If it's the second selected card
            else {
                gs.cardSelected2 = card;
                card.showGameImg();
                gs.AreCardsSelectable = false;
                //If cards match
                if (card.gameImageStr === gs.cardSelected1.gameImageStr) {
                    window.setTimeout(removeSelectedCards, 1000);
                }
                //If cards don't match
                else {
                    card.showGameImg();
                    disableControl("playagain");
                    disableControl("stop");
                    window.setTimeout(hideSelectedCards, 1500); //reenables control
                }
            }
        }
    }
}


//Game Board Display
//Initialize card sin card array and set top image of cards in Game Board
function initCardArray() {
    gs.cardArray = [];

    var number = '1';
    for (var i = 0; i < gs.totalNbOfCards; i++) {
        gs.cardArray[i] = new Card(number);

        //Second, set top image on game board in web page
        gs.cardArray[i].showTopImg();

        number = String(++number); //increment number 

    }
}

//Set game images of cards in Game Board
function setGameImgsAndInitCardFields() {
    var imgSrcArray = ['img1.jpg', 'img2.jpg', 'img3.jpg', 'img4.jpg',
        'img5.jpg', 'img6.jpg', 'img7.jpg', 'img8.jpg',
        'img1.jpg', 'img2.jpg', 'img3.jpg', 'img4.jpg',
        'img5.jpg', 'img6.jpg', 'img7.jpg', 'img8.jpg'
    ];
    var randomIdx = 0;
    for (var i = 0; i < gs.totalNbOfCards; i++) {
        //First assign random game image

        do {
            randomIdx = Math.floor(Math.random() * imgSrcArray.length); //gives a random index for the imgSrcArray
        } while (imgSrcArray[randomIdx] == undefined);

        gs.cardArray[i].setGameImg(imgSrcArray[randomIdx]);
        delete imgSrcArray[randomIdx]; //changes it to undefined once image assigned

        //Second, set top image on game board in web page
        gs.cardArray[i].initCardFields();
        gs.cardArray[i].showTopImg();
    }
}

function hideSelectedCards() {
    disableControl("playagain");
    disableControl("stop");

    gs.cardSelected1.showTopImg();
    gs.cardSelected2.showTopImg();
    gs.cardSelected1 = null;
    gs.cardSelected2 = null;
    gs.AreCardsSelectable = true;

    enableControl("playagain");
    enableControl("stop");
}

function removeSelectedCards() {
    gs.cardSelected1.removeFromBoard();
    gs.cardSelected2.removeFromBoard();
    gs.cardSelected1 = null;
    gs.cardSelected2 = null;
    gs.AreCardsSelectable = true;
    gs.nbOfCardsOnBoard = gs.nbOfCardsOnBoard - 2;
    if (gs.nbOfCardsOnBoard == 0) {
        setToGameWon();
    }
}

function removeAllCards() {
    for (var i = 0; i < gs.cardArray.length; i++) {
        if (gs.cardArray[i] == undefined) {
            throw 'Unexpected undefined element in cards array';
        }
        gs.cardArray[i].removeFromBoard();
    }
}


//Game Board Background Display
function initGameBgs() {
    gs.gameBgSrcArray = ['memory1.jpg', 'memory2.webp', 'memory3.jpg', 'memory4.webp', 'memory5.webp'];
    gs.gameBgNb = 0;
}

function incrementGameBgNb() {
    gs.gameBgNb = (gs.gameBgNb + 1) % 5;
}

function setGameBg() {
    document.getElementById('grid-container').style.backgroundImage = "url('" + gs.pathToImgsStr + gs.gameBgSrcArray[gs.gameBgNb] + "')";
}


function disableControl(idStr) {
    if (idStr == undefined || !(idStr === "play" || idStr === "playagain" || idStr === "stop") || (typeof idStr != "string")) {
        throw "Invalid Argument";
    }
    document.getElementById(idStr).style.opacity = '0.3';
    document.getElementById(idStr).style.filter = 'alpha(opacity = 30)';
    if (idStr === "play") {
        gs.isPlayControlEnabled = false;
    } else if (idStr === "playagain") {
        gs.isPlayAgainControlEnabled = false;
    } else if (idStr === "stop") {
        gs.isStopControlEnabled = false;
    }
}

function enableControl(idStr) {
    if (idStr == undefined || !(idStr === "play" || idStr === "playagain" || idStr === "stop") || (typeof idStr != "string")) {
        throw "Invalid Argument";
    }
    document.getElementById(idStr).style.opacity = '1';
    document.getElementById(idStr).style.filter = '';
    if (idStr === "play") {
        gs.isPlayControlEnabled = true;
    } else if (idStr === "playagain") {
        gs.isPlayAgainControlEnabled = true;
    } else if (idStr === "stop") {
        gs.isStopControlEnabled = true;
    }
}


//Class "Card"

//Top of a card: Image of class "number" with a background (that is the same for all)
//Bottom of a card: Image of game
function Card(idNumberStr) {
    if (idNumberStr == undefined || !isIdNumberStrValid(idNumberStr)) {
        throw 'Invalid Argument for Card constructor';
    }
    this.idNumberStr = idNumberStr;
    this.gameImageStr = "";
    this.isTurnedBool = false;
    this.isOnBoardBool = true;

    this.setGameImg = function (gameImageStr) {
        if (gameImageStr == undefined) {
            throw 'Invalid Argument';
        }
        this.gameImageStr = gameImageStr;
    };
    this.getGridItemId = function () {
        return ('grid-item-' + this.idNumberStr);
    };
    this.initCardFields = function () {
        this.isTurnedBool = false;
        this.isOnBoardBool = true;
    };
    this.showGameImg = function () {
        if (this.isOnBoardBool === false) {
            throw "Error";
        }
        document.getElementById(this.getGridItemId()).innerHTML = '<img id=\"' + this.idNumberStr + '\" src=\"images/' + this.gameImageStr + '\"></img>';
        this.isTurnedBool = true;
    };

    this.showTopImg = function () {
        if (this.isOnBoardBool) {
            document.getElementById(this.getGridItemId()).innerHTML = '<img class=\"number\" id=\"' + this.idNumberStr + '\" src=\"images/' + this.idNumberStr + '.png\"></img>';
            document.getElementById(this.getGridItemId()).style.backgroundColor = "whitesmoke";
            this.isTurnedBool = false;
        }
    };

    this.removeFromBoard = function () {
        document.getElementById(this.getGridItemId()).innerHTML = "";
        document.getElementById(this.getGridItemId()).style.backgroundImage = "none";
        document.getElementById(this.getGridItemId()).style.backgroundColor = "transparent";
        this.isTurnedBool = null;
        this.isOnBoardBool = false;
    };
}

function isIdNumberStrValid(idNumberStr) {

    if (idNumberStr == undefined || (typeof idNumberStr != "string")) {
        throw "Error";
    }
    return (idNumberStr >= 1 && idNumberStr <= 16);
}

function getCardWithNumberIdx(idLetStr) {
    if (idLetStr == undefined || !isIdNumberStrValid(idLetStr)) {
        throw "Invalid Argument";
    }

    var idxOfCardInArray = Number(idLetStr) - 1;
    return gs.cardArray[idxOfCardInArray];
}

function isGridItemIdValid(idStr) {
    if (idStr == undefined || (typeof idStr != "string")) {
        throw "Error";
    }

    return (idStr.length == (gs.beginningOfGridItemIdStr + '1').length && idStr >= 1 && idStr <= 16);
}