addEventListener("load", init);

function init() {
    var currentUs =localStorage.getItem(`user#${localStorage.currentUser}`); 
    console.log(currentUs);
    //document.getElementById("tBox").value = localStorage.getItem(`user#${1}`);//[13]
    //document.getElementById("tBox").value = JSON.stringify(localStorage.getItem(`user#${1}`));
}