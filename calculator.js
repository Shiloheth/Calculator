let buffer = "0";
let runningtotal = 0;
const screen = document.querySelector(".screen");
let previousoperator = null;

function clicked(value) {
  if (!isNaN(parseInt(value))) {
    number(value);
  } else {
    symbol(value);
  }
  reRender();
}

function number(number) {
  if (buffer === "0") {
    buffer = number;
  } else {
    buffer += number;
  }
}

function flushOperation(intBuffer) {
  if (previousoperator == "+") {
    runningtotal += intBuffer;
  } else if (previousoperator == "x") {
    runningtotal *= intBuffer;
  } else if (previousoperator == "/") {
    runningtotal /= intBuffer;
  } else if (previousoperator == "-") {
    runningtotal -= intBuffer;
  }
}

function operation(s) {
  if (buffer == "0") {
    return;
  }

  const intBuffer = parseInt(buffer);
  if (runningtotal === 0) {
    runningtotal = intBuffer;
  } else {
    flushOperation(intBuffer);
  }
  previousoperator = s;
  buffer = "";
}

function symbol(s) {
  switch (s) {
    case "AC":
      buffer = "0";
      break;
    case "DEL":
      if (buffer.length == "1") {
        buffer = "0";
      } else {
        buffer = buffer.substring(0, buffer.length - 1);
      }
      break;
    case "=":
      if (previousoperator === null) {
        return buffer;
      }
      flushOperation(parseInt(buffer));
      buffer = "" + runningtotal;
      runningtotal = 0;
      previousoperator = null;
      break;
    case "+":
    case "/":
    case "-":
    case "x":
      operation(s);
  }
}

function init() {
  document.querySelector(".but").addEventListener("click", function a(event) {
    clicked(event.target.textContent);
  });
  reRender();
}

function reRender() {
  screen.textContent = buffer;
}

init();
