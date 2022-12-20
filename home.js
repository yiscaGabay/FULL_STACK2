const users = [];
let userName;
let password;
//let AmountOfUsers;
addEventListener("click", handleClick);
addEventListener("load", init);

function init(){
    let AmountOfUsers=0;
    AmountOfUsers=localStorage.AmountOfUsers;
    if(AmountOfUsers){
        for(let i=1; i <= AmountOfUsers; i++){
            let user = JSON.parse(localStorage.getItem(`user#${i}`));
            users.push(user);
        }
    }
   
    console.log(AmountOfUsers);
    console.log(users);
} 

function addUser(user, users){
    users.push(user);
}

function handleClick(event){
    if (event == undefined) {
        throw "Invalid Argument";
    }
    if (event.defaultPrevented) {
        throw "Event prevented";
    }
    var idStr = event.target.id;

    if(idStr == "createAccount"){
        document.getElementById('containerLogIn').style.visibility='hidden';
        document.getElementById('containerSignIn').style.display="block";
    }

    if(idStr == "newPassword"){
        document.getElementById('containerLogIn').style.visibility='hidden';
        document.getElementById('containerForgot').style.display="block";
    }

    if(idStr == "logIn"){
        userName=document.getElementById('nameLogIn').value;
        password=document.getElementById('passwordLogIn').value;
        if(isExistUser(userName, password)){
            //document.getElementsByTagName('html').innerHTML=<link rel href="home.css"></link>
            //open('games.html');
            //location.replace("games.html");
            open("games.html");
        
            // top.close();
            //window.location.assign();
        }
        else{
            document.getElementById("message").innerHTML="User name or password are not correct. Try log in aggain";
        }
    }

    if(idStr == "signIn"){
            var user={};
            userName=document.getElementById('nameSignIn').value;
            password=document.getElementById('passwordSignIn').value;
            // add a new user only if he doesn't exist or there is no such username
            if(!isExistUserName(userName)){
                user.userName=userName;
                user.password=password;
                user.achivment={};
                if (localStorage.AmountOfUsers) {
                    localStorage.AmountOfUsers = Number(localStorage.AmountOfUsers) + 1;
                  } else {
                    localStorage.AmountOfUsers = 1;
                  }
                AmountOfUsers = localStorage.AmountOfUsers;
                user = JSON.stringify(user);
                localStorage.setItem(`user#${AmountOfUsers}`, user);
                users.push(user);
                console.log(users);
                alert(`Hi ${userName}. Welcome to Play It!!!`);
                open('games.html');
                //window.close('home.html');
                window.top.close();
                //document.ge
            }
            else{
                //alert(`'${userName}' user name is already taken`);
                //console.log("in else");
                //document.getElementById("message").innerHTML=`'${userName}' user name is already taken`;
                //confirm(`'${userName}' user name is already taken`);
                if(true){
                    document.getElementById("message").innerHTML=`'${userName}' user name is already taken`;
                }
            }
        }

        if(idStr == "update"){
            userName=document.getElementById('nameForgot').value;
            password=document.getElementById('passwordForgot').value;
            if(isExistUserForUpdate(userName, password)){
                alert("Your password was updated successfully");
                open('games.html');
                window.top.close();
            }
            else{
                document.getElementById("message").innerHTML="User name is incorrect";
            }
        }
}

function isExistUserName(name){
    for(let i=0; i < users.length; i++){
        console.log(users[i]);
        if(users[i].userName == name){
            return true;
        }
    }
    return false;
} 

function isExistUserForUpdate(name, pass){
    for(let i=0; i < users.length; i++){
        console.log(users[i]);
        if(users[i].userName == name){
            users[i].password=pass; // update users array
            let user=JSON.parse(localStorage.getItem(`user#${i+1}`));
            localStorage.removeItem(`user#${i+1}`);
            user.password=pass;
            user=JSON.stringify(user);
            localStorage.setItem(`user#${i+1}`, user);
            return true;
        }
    }
    return false;
} 

function isExistUser(name, pass){
    for(let i=0; i < users.length; i++){
        if(users[i].userName == name){
            if(users[i].password==pass){
                return true;
            }
        }
    }
    return false;
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