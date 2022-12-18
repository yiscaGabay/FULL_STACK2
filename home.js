

//const users=[];

addEventListener("onclick", createAccount);
addEventListener("mouseover", myFunction);
function createAccount(event){
    var idStr = event.target.id;
    if(idStr === "createAccount"){
        alert("createAccount");
        document.getElementById("createAccount").innerHTML = form2;
    }
}

function myFunction(event){
    var idStr = event.target.id;
    if(idStr === "createAccount"){
        document.getElementById("createAccount").innerHTML = form2;
        alert("myFunction");
    }
    //document.getElementById("createAccount").innerHTML = "red";
    //alert("myFunction");
}