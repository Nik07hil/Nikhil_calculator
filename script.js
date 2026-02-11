const expressionEl = document.getElementById("expression");
const resultEl = document.getElementById("result");
const buttons = document.querySelectorAll("button");

let expression = "";
let lastValidResult = "0";

buttons.forEach(button => {
  button.addEventListener("click", () => {
    const value = button.dataset.value;
    handleInput(value);
  });
});

function handleInput(value){
  if(!value) return;

  if(value === "C"){
    expression = "";
    lastValidResult = "0";
    expressionEl.textContent = "";
    resultEl.textContent = lastValidResult;
  } else if(value === "DEL"){
    expression = expression.slice(0,-1);
    expressionEl.textContent = expression;
    calculateResult();
  } else if(value === "="){
    // On pressing '=', expression replaced with result
    expression = lastValidResult;
    expressionEl.textContent = expression;
    resultEl.textContent = lastValidResult;
  } else {
    expression += value;
    expressionEl.textContent = expression;
    calculateResult();
  }
}

function calculateResult(){
  try {
    if(expression === "") {
      lastValidResult = "0";
    } else {
      const finalExp = expression.replace(/×/g,"*").replace(/÷/g,"/");
      const result = eval(finalExp);
      if(result !== undefined) lastValidResult = result.toString();
    }
    resultEl.textContent = lastValidResult;
  } catch {
    // keep last valid result
    resultEl.textContent = lastValidResult;
  }
}

// Keyboard Support
document.addEventListener("keydown", e => {
  if(/[0-9+\-*/.%]/.test(e.key)) handleInput(e.key);
  if(e.key === "Enter") handleInput("=");
  if(e.key === "Backspace") handleInput("DEL");
  if(e.key === "Escape") handleInput("C");
});
