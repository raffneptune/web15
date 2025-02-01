const btns = document.querySelectorAll(".btn");
const mainVal = document.querySelector("#main-val");
const subValDisplay = document.querySelector("#sub-Val");

//add event listener to all buttons
btns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const val = e.target.textContent;
    if (calculator.equals) {
      calculator.clearAll();
      calculator.addMainVal("0");
    }
    if (val === "AC") {
      calculator.clearAll();
      calculator.addMainVal("0");
    } else if (val === "⌫") {
      calculator.clearOne();
    } else if (val === "=") {
      calculator.calculate();
    } else if (val === "+" || val === "-" || val === "*" || val === "/") {
      calculator.addOperator(val);
    } else if (val === ".") {
      calculator.addDot();
    } else {
      calculator.addMainVal(val);
    }
  });
});

const calculator = {
  mainVal: "",
  subVal: "",
  subValDisplay: "",
  operator: "",
  equals: false,

  addMainVal: function (val) {
    if (this.mainVal.length > 10) {
      return;
    }
    if (this.mainVal === "0") {
      this.mainVal = val;
    } else {
      this.mainVal += val;
    }
    mainVal.value = this.mainVal;
  },
  addSubVal: function (val) {
    this.subVal += val;
  },
  addsubValDisplay: function (val) {
    this.subValDisplay += val;
    subValDisplay.innerHTML = this.subValDisplay;
  },
  clearMainVal: function () {
    this.mainVal = "";
    mainVal.value = this.mainVal;
  },
  clearSubVal: function () {
    this.subVal = "";
  },
  clearSubValDisplay: function () {
    this.subValDisplay = "";
    subValDisplay.innerHTML = this.subValDisplay;
  },
  clearOne: function () {
    this.mainVal = this.mainVal.slice(0, -1);
    if (this.mainVal === "") {
      this.mainVal = "0";
    }
    mainVal.value = this.mainVal;
  },
  clearAll: function () {
    this.clearMainVal();
    this.clearSubVal();
    this.clearSubValDisplay();
    this.operator = "";
    this.equals = false;
  },
  addOperator: function (val) {
    if (this.mainVal === "" || this.mainVal === "0") {
      return;
    }
    if (this.operator) {
      this.updateOperator(val);
      return;
    }
    this.operator = val;
    this.addSubVal(this.mainVal);
    this.addsubValDisplay(this.mainVal);
    this.addsubValDisplay(`<span class="operator">${val}</span>`);

    this.clearMainVal();
  },
  updateOperator: function (val) {
    subValDisplay.innerHTML = subValDisplay.innerHTML.replace(
      /<span class="operator">.*<\/span>/,
      `<span class="operator">${val}</span>`
    );
  },
  addDot: function () {
    if (this.mainVal.includes(".")) return;
    this.addMainVal(".");
  },
  calculate: function () {
    if (this.mainVal === "" || this.subVal === "") {
      return;
    }
    let result = 0;
    const num1 = parseFloat(this.subVal);
    const num2 = parseFloat(this.mainVal);
    const operator = this.operator;
    switch (operator) {
      case "+":
        result = num1 + num2;
        break;
      case "-":
        result = num1 - num2;
        break;
      case "*":
        result = num1 * num2;
        break;
      case "/":
        result = num1 / num2;
        break;
      default:
        result = "error";
    }
    if (result.toString().length > 10) {
      result = result.toPrecision(2);
    }
    this.addSubVal(this.mainVal);
    this.addsubValDisplay(this.mainVal);
    this.addsubValDisplay(`<span class="operator">=</span>`);
    this.clearMainVal();
    this.addMainVal(result);
    this.equals = true;
  },
};
