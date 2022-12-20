var users = {};
let userName;
let password;

let AmountOfUsers = 0;
addEventListener("click", handleClick);
function addUser(user, users) {
    users.push(user);
}

function handleClick(event) {
    var idStr = event.target.id;
    if (idStr == "createAccount") {
        document.getElementById('containerLogIn').style.visibility = 'hidden';
        document.getElementById('containerSignIn').style.display = "block";
    }


    if (idStr == "signIn") {
        var user = {};
        userName = document.getElementById('nameSignIn').value;
        password = document.getElementById('passwordSignIn').value;
        user.userName = userName;
        user.password = password;
        user.achivment = {};
        AmountOfUsers++;
        users[`user#${AmountOfUsers}`] = user;
        alert(window.users);
    }

    if (idStr == "logIn") {
        userName = document.getElementById('nameSignIn').value;
        password = document.getElementById('passwordSignIn').value;
    } else {


    }
}




//addEventListener('load',checkInput);
// function init(){
//     alert("init");
//     document.getElementById('signIn').disabled=true;
//     password=document.getElementById('passwordSignIn').value;
// }
// function checkInput(event){
//     var idStr = event.target.id;
//     if(idStr == "signIn"){
//         password=document.getElementById('passwordSignIn').value;
//     }
// }