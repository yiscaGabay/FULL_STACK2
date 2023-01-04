addEventListener("load", init);

function init() {

    //Get the name of the current user
    var currentUs = JSON.parse(localStorage.getItem(`user#${localStorage.currentUser}`));
    var currentUserName = currentUs.userName;
    document.getElementById("message").innerHTML = "Hello " + currentUserName;

    //Check if this is first visit or a repeat visit
    var currentDate = currentUs.achivment.date;
    if (currentDate == 0) {
        document.getElementById("date").innerHTML = "You are visiting this page for the first time.";
    }
    else {
        document.getElementById("date").innerHTML = "Your last visited this page on: " + currentDate;
    }

    //Display the last date of user on the site
    var date = new Date();
    var fullDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
    currentUs.achivment.date = fullDate;
    localStorage.setItem(`user#${localStorage.currentUser}`, JSON.stringify(currentUs));

    //Display max score in snake game 
    var snakeScore = currentUs.achivment.maxSnake;
    document.getElementById("snakeScore").innerHTML = "snake: " + snakeScore;

    //Display max score in memory game
    var memoryScore = currentUs.achivment.maxMemory;
    document.getElementById("memoryScore").innerHTML = "memory: " + memoryScore;


    var generalScore = JSON.parse(localStorage.getItem("maxScore"));
    //Display general score in snake game
    maxScoreSnake = generalScore.snake;
    document.getElementById("maxScoreSnake").innerHTML = "The max score in snake game is:  " + maxScoreSnake;

    //Display general score in memory game
    maxScoreMemory = generalScore.memory;
    document.getElementById("maxScoreMemory").innerHTML = "The max score in memory game is:  " + maxScoreMemory;
}