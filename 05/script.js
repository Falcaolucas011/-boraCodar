//Var
const OpSelect = document.querySelector('#last-calc');
const UsedSelect = document.querySelector('#result span');
const buttons = document.querySelectorAll('#keyboard button');

//Function | Object
class Calculator {
  constructor(OpSelect, UsedSelect) {
    this.OpSelect = OpSelect;
    this.UsedSelect = UsedSelect;
    this.currentUse = '';
  }
  //Number to calculator screen
  addDigit(digit) {
    //check current operation
    if (digit === '.' && this.UsedSelect.innerText.includes('.')) {
      return;
    }

    this.currentUse = digit;
    this.updateScreen();
  }

  //All operation
  processOp(operation) {
    if (this.UsedSelect.innerText === '' && operation !== 'C') {
      //Change operation
      if (this.OpSelect.innerText !== '') {
        this.changeOp(operation);
      }
      return;
    }

    //Get current value
    let opValue;
    let previous = +this.OpSelect.innerText.split(' ')[0];
    let current = +this.UsedSelect.innerText;

    switch (operation) {
      case '+':
        opValue = previous + current;
        this.updateScreen(opValue, operation, current, previous);
        break;
      case '-':
        opValue = previous - current;
        this.updateScreen(opValue, operation, current, previous);
        break;
      case '/':
        opValue = previous / current;
        this.updateScreen(opValue, operation, current, previous);
        break;
      case 'x':
        opValue = previous * current;
        this.updateScreen(opValue, operation, current, previous);
        break;
      case '%':
        opValue = (previous * current) / 100;
        this.updateScreen(opValue, operation, current, previous);
        break;
      case 'CE':
        this.processClearOp();
        break;
      case 'C':
        this.processClearAll();
        break;
      case 'equals':
        this.processEquals();
        break;
      default:
        return;
    }
  }

  //Another value
  updateScreen(
    opValue = null,
    operation = null,
    current = null,
    previous = null
  ) {
    if (opValue === null) {
      this.UsedSelect.innerText += this.currentUse;
    } else {
      if (previous === 0) {
        opValue = current;
      }
      if (current !== opValue) {
        this.OpSelect.innerText = `${previous} ${operation} ${current}`;
        this.UsedSelect.innerText = `${opValue}`;
      } else {
        this.OpSelect.innerText = `${opValue} ${operation}`;
        this.UsedSelect.innerText = '';
      }
    }
  }

  //Change math operation
  changeOp(operation) {
    const mathOperations = ['+', '-', '/', 'x', '%'];

    if (!mathOperations.includes(operation)) {
      return;
    }

    this.OpSelect.innerText = this.OpSelect.innerText.slice(0, -1) + operation;
  }

  //Clear current value
  processClearOp() {
    var lastNumber =
      this.OpSelect.innerText[this.OpSelect.innerText.length - 1];
    if (lastNumber >= 0) {
      this.UsedSelect.innerText = '';
      this.OpSelect.innerText = '';
    } else {
      this.UsedSelect.innerText = '';
    }
  }

  //Clear all
  processClearAll() {
    this.UsedSelect.innerText = '';
    this.OpSelect.innerText = '';
  }

  //Equals
  processEquals() {
    let operation = this.OpSelect.innerText.split(' ')[1];
    this.processOp(operation);
  }
}

const calc = new Calculator(OpSelect, UsedSelect);

//Event
buttons.forEach(btn => {
  btn.addEventListener('click', e => {
    const ref = e.target.value;
    if (+ref >= 0 || ref === '.') {
      calc.addDigit(ref);
    } else {
      calc.processOp(ref);
    }
  });
});
