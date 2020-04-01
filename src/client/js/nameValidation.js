function checkForName(inputText) {
    var expression = /[-a-zA-Z]+$/;
    var regex = new RegExp(expression);

    if (inputText.match(regex)) {
        return true;
    } else {
        return false;
    }
}

export { checkForName };