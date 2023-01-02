addEventListener("load", init);

function init() {

    //To get the name of the current user
    var currentUs = JSON.parse(localStorage.getItem(`user#${localStorage.currentUser}`));
    var currentUserName = currentUs.userName;
    document.getElementById("message").innerHTML = "Hello " + currentUserName;


    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hour = date.getHours();
    var minute = date.getMinutes();
    var fullDate = `${day}/${month}/${year} ${hour}:${minute}`;

    var currentDate = currentUs.achivment.date;
    if (currentDate == 0) {
        document.getElementById("date").innerHTML = "You are visiting this page for the first time.";
    }
    else {
        document.getElementById("date").innerHTML = "You last visited this page on: " + currentDate;
    }
    currentUs.achivment.date = fullDate;
    localStorage.setItem(`user#${localStorage.currentUser}`, JSON.stringify(currentUs));

    var snakeScore = currentUs.achivment.maxSnake;
    document.getElementById("snakeScore").innerHTML = "snake: " + snakeScore;

    var memoryScore = currentUs.achivment.maxMemory;
    document.getElementById("memoryScore").innerHTML = "memory: " + memoryScore;

    var generalScore = JSON.parse(localStorage.getItem("maxScore"));
    maxScoreSnake = generalScore.snake;
    document.getElementById("maxScoreSnake").innerHTML = "The max score in snake game is:  " + maxScoreSnake;

    maxScoreMemory = generalScore.memory;
    document.getElementById("maxScoreMemory").innerHTML = "The max score in memory game is:  " + maxScoreMemory;
}