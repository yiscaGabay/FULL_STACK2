

addEventListener("click", handleClick);

function handleClick(event) {
    if (event == undefined) {
        throw "Invalid Argument";
    }
    if (event.defaultPrevented) {
        throw "Event prevented";
    }
    var idStr = event.target.id;

    if (idStr == "exit") {
        window.top.close();
    }
}
