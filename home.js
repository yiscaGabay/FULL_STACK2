const users = [];
let userName;
let password;

addEventListener("click", handleClick);
addEventListener("load", init);

function init() {
    let AmountOfUsers = 0;
    AmountOfUsers = localStorage.AmountOfUsers;
    if (localStorage.length == 0) {
        let maxScore = { snake: 0, memory: 0 };
        maxScore = JSON.stringify(maxScore);
        localStorage.setItem('maxScore', maxScore);

    }
    if (AmountOfUsers) {
        for (let i = 1; i <= AmountOfUsers; i++) {
            let user = JSON.parse(localStorage.getItem(`user#${i}`));
            users.push(user);
        }
    }
    console.log(AmountOfUsers);
    console.log(users);
}


//2 function to change between divs in same place. 
function switchVisible() {
    if (document.getElementById('containerLogIn')) {
        if (document.getElementById('containerLogIn').style.display == 'none') {
            document.getElementById('containerLogIn').style.display = 'block';
            document.getElementById('containerSignIn').style.display = 'none';
        }
        else {
            document.getElementById('containerLogIn').style.display = 'none';
            document.getElementById('containerSignIn').style.display = 'block';
        }
    }
}
function switchVisible1() {
    if (document.getElementById('containerLogIn')) {
        if (document.getElementById('containerLogIn').style.display == 'none') {
            document.getElementById('containerLogIn').style.display = 'block';
            document.getElementById('containerForgot').style.display = 'none';
        }
        else {
            document.getElementById('containerLogIn').style.display = 'none';
            document.getElementById('containerForgot').style.display = 'block';
        }
    }
}


function addUser(user, users) {
    users.push(user);
}

function handleClick(event) {
    if (event == undefined) {
        throw "Invalid Argument";
    }
    if (event.defaultPrevented) {
        throw "Event prevented";
    }
    var idStr = event.target.id;

    if (idStr == "newPassword") {
        switchVisible1();
    }

    if (idStr == "logIn") {
        //event.defaultPrevented();
        userName = document.getElementById('nameLogIn').value;
        password = document.getElementById('passwordLogIn').value;
        if (userName == '' || password == '') {
            document.getElementById("message").innerHTML = 'One or more of the fields are empty';
            setTimeout(function () {
                document.getElementById("message").innerHTML = "";
            }, 5000);
            return;
        }
        if (isExistUser(userName, password)) {
            open("games.html");
            window.top.close();
        }
        else {
            document.getElementById("message").innerHTML = "User name or password are not correct. Try log in aggain";
            setTimeout(function () {
                document.getElementById("message").innerHTML = "";
            }, 3000);
        }
    }

    if (idStr == "signIn") {
        var user = {};
        userName = document.getElementById('nameSignIn').value;
        password = document.getElementById('passwordSignIn').value;
        if (!checkIsValidInput(userName, password)) {
            switchVisible();
            return;
        }
        // add a new user only if he doesn't exist or there is no such username
        if (!isExistUserName(userName)) {
            user.userName = userName;
            user.password = password;
            user.achivment = { date: 0, maxSnake: 0, maxMemory: 0 };
            if (localStorage.AmountOfUsers) {
                localStorage.AmountOfUsers = Number(localStorage.AmountOfUsers) + 1;
            } else {
                localStorage.AmountOfUsers = 1;
            }
            AmountOfUsers = localStorage.AmountOfUsers;
            console.log("inSignin=" + AmountOfUsers);
            user = JSON.stringify(user);
            localStorage.setItem(`user#${AmountOfUsers}`, user);
            localStorage.currentUser = AmountOfUsers;
            users.push(user);
            console.log(users);
            alert(`Hi ${userName}. Welcome to Play It!!!`);
            open("games.html");
            window.top.close();
        }
        else {
            document.getElementById("message").innerHTML = `'${userName}' user name is already taken`;
            setTimeout(function () {
                document.getElementById("message").innerHTML = "";
            }, 3000);
        }
    }

    if (idStr == "update") {
        userName = document.getElementById('nameForgot').value;
        password = document.getElementById('passwordForgot').value;
        if (!checkIsValidInput(userName, password)) {
            //switchVisible();
            return;
        }
        if (isExistUserForUpdate(userName, password)) {
            ("Your password was updated successfully");
            open('games.html');
            window.top.close();
        }
        else {
            document.getElementById("message").innerHTML = "User name is incorrect";
            setTimeout(function () {
                document.getElementById("message").innerHTML = "";
            }, 3000);
        }
    }
}

function isExistUserName(name) {
    for (let i = 0; i < users.length; i++) {
        if (users[i].userName == name) {
            return true;
        }
    }
    return false;
}

function isExistUserForUpdate(name, pass) {
    for (let i = 0; i < users.length; i++) {
        console.log(users[i]);
        if (users[i].userName == name) {
            users[i].password = pass; // update users array
            localStorage.currentUser = i + 1;
            let user = JSON.parse(localStorage.getItem(`user#${i + 1}`));
            localStorage.removeItem(`user#${i + 1}`);
            user.password = pass;
            user = JSON.stringify(user);
            localStorage.setItem(`user#${i + 1}`, user);
            return true;
        }
    }
    return false;
}

function isExistUser(name, pass) {
    for (let i = 0; i < users.length; i++) {
        if (users[i].userName == name) {
            if (users[i].password == pass) {
                localStorage.currentUser = i + 1;
                return true;
            }
        }
    }
    return false;
}

function checkIsValidInput(user, pass) {
    if (user == '' || pass == '') {
        document.getElementById("message").innerHTML = 'One or more of the fields are empty';
        setTimeout(function () {
            document.getElementById("message").innerHTML = "";
        }, 5000);
        return false;
    }
    if (user.length > 10) {
        document.getElementById("message").innerHTML = 'User name is too long, it should be less than 10 characters.';
        setTimeout(function () {
            document.getElementById("message").innerHTML = "";
        }, 5000);
        return false;
    }
    // if (pass.length < 8) {
    //     document.getElementById("message").innerHTML = 'Password must contain 8-10 characters.';
    //     setTimeout(function () {
    //         document.getElementById("message").innerHTML = "";
    //     }, 5000);
    //     return false;
    // }
    var re = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,10}$/;
    if (!re.test(pass)) {
        document.getElementById("message").innerHTML = 'The password must contain 8-10 chracters in this format: <br/>lowercase letters, uppercase letters, numbers and a special character';
        setTimeout(function () {
            document.getElementById("message").innerHTML = "";
        }, 5000);
        return false;
    }
    return true;
}

/////////////// for eye icon
/*const togglePassword = document.querySelector("#togglePassword");
const password1 = document.querySelector("#passwordSignIn");

togglePassword.addEventListener("click", function () {
    // toggle the type attribute
    const type = password.getAttribute("type") === "password" ? "text" : "password";
    password.setAttribute("type", type);

    // toggle the icon
    this.classList.toggle("bi-eye");
});*/
/////////////// for eye icon