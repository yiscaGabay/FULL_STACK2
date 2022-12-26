addEventListener("load", init);

function init() {

    //To get the name of the current user
    var currentUs = console.log("Current user is:" + (localStorage.getItem(`user#${localStorage.currentUser}`)).split(/"/)[3]);
}