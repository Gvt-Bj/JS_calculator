const display = document.querySelector("#display");

function appendToDisplay(keyinputs) {
    display.value += keyinputs;
}

function clearDisplay() {
    display.value = "";
}

function calculate() {
    try {
        display.value = eval(display.value);
    } catch (error) {
        display.value = "Error";
    }
}

// Key event listener
document.addEventListener("keydown", function (event) {
    if (/[\d+\-*/.]/.test(event.key)) {
        appendToDisplay(event.key);
    } else if (event.key === "Enter") {
        calculate();
    } else if (event.key === "Backspace") {
        display.value = display.value.slice(0, -1);
    } else if (event.key === "Escape" || event.key === "Delete") {
        clearDisplay();
    }
});
