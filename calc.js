const display = document.querySelector("#display");
const output = document.querySelector("#output");
const history = document.querySelector("#history");
const historyContainer = document.querySelector("#history-container");
let memory = 0;

function appendToDisplay(keyinputs) {
    // Prevent multiple decimal points in a number
    if (keyinputs === '.' && display.value.split(/[\+\-\*\/]/).pop().includes('.')) {
        return;
    }
    // Prevent multiple operators in sequence
    if (/[\+\-\*\/]/.test(keyinputs) && /[\+\-\*\/]$/.test(display.value)) {
        display.value = display.value.slice(0, -1);
    }
    display.value += keyinputs;
}

function clearAll() {
    display.value = "";
    output.value = "";
    history.innerHTML = "";
}

function backspace() {
    display.value = display.value.slice(0, -1);
}

function toggleHistory() {
    historyContainer.classList.toggle("hidden");
}

function calculate() {
    try {
        const expression = display.value;
        // Handle percentage calculations
        const processedExpression = expression.replace(/(\d+)%/g, (match, num) => {
            return `(${num}/100)`;
        });
        
        // Handle square root
        const sqrtExpression = processedExpression.replace(/√(\d+)/g, (match, num) => {
            return `Math.sqrt(${num})`;
        });
        
        // Handle power operations
        const powerExpression = sqrtExpression.replace(/(\d+)\^(\d+)/g, (match, base, exp) => {
            return `Math.pow(${base},${exp})`;
        });

        const result = eval(powerExpression);
        
        if (!isFinite(result)) {
            throw new Error("Invalid calculation");
        }
        
        // Add to history
        if (history) {
            const historyItem = document.createElement("div");
            historyItem.textContent = `${expression} = ${result}`;
            history.appendChild(historyItem);
        }
        
        output.value = result;
    } catch (error) {
        output.value = "Error";
    }
}

// Memory functions
function memoryAdd() {
    try {
        memory += parseFloat(output.value || display.value);
    } catch (error) {
        output.value = "Error";
    }
}

function memorySubtract() {
    try {
        memory -= parseFloat(output.value || display.value);
    } catch (error) {
        output.value = "Error";
    }
}

function memoryRecall() {
    display.value = memory;
}

function memoryClear() {
    memory = 0;
}

// Key event listener
document.addEventListener("keydown", function (event) {
    if (/[\d+\-*/.\^√()%]/.test(event.key)) {
        appendToDisplay(event.key);
    } else if (event.key === "Enter") {
        calculate();
    } else if (event.key === "Backspace") {
        backspace();
    } else if (event.key === "Escape" || event.key === "Delete") {
        clearAll();
    }
});
