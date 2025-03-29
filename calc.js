const display = document.querySelector("#display");

function appendToDisplay(keyinputs){
    display.value += keyinputs;
}

function clearDisplay(){
    display.value = "";
}

function calculate(){
    try{
        display.value = eval(display.value);
    }catch(error){
        display.value = "Error";
    } 
}