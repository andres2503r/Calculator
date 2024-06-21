const calculator = document.querySelector('.calculator');
const keys = calculator.querySelector('.calculator__keys');
const display = calculator.querySelector('.calculator__display');

function calculate(n1, operator, n2) {
  const execute = {
    add: () => parseFloat(n1) + parseFloat(n2),
    subtract: () => parseFloat(n1) - parseFloat(n2),
    multiply: () => parseFloat(n1) * parseFloat(n2),
    divide: () => parseFloat(n1) / parseFloat(n2)
  }

  const result = execute[operator]();

  return result;
}

keys.addEventListener('click', e => {
  if (!e.target.matches('button')) return;

  const key = e.target;
  const action = key.dataset.action;
  const keyContent = key.textContent;
  const displayedNum = display.textContent;
  const previousKeyType = calculator.dataset.previousKeyType;

  const actions = ['add', 'subtract', 'multiply', 'divide']
  const operations = ['decimal', 'clear', 'calculate']

  if (!action) {
    if (displayedNum === '0' || previousKeyType === 'operator') {
      display.textContent = keyContent;
    } else {
      display.textContent = displayedNum + keyContent;
    }
    
    calculator.dataset.previousKeyType = 'number';
  }

  const operation = {
    decimal: () => {
      if (!displayedNum.includes('.')) {
        display.textContent = displayedNum + '.';
      } else if (previousKeyType === 'operator') {
        display.textContent = '0.';
      }

      calculator.dataset.previousKeyType = 'decimal';
    },
    clear: () => {
      display.textContent = '0';
      calculator.dataset.previousKeyType = 'clear';
    },
    calculate: () => {
      let firstValue = calculator.dataset.firstValue;
      const operator = calculator.dataset.operator;
      let secondValue = displayedNum;

      if (firstValue) {
        if(previousKeyType === 'calculate') {
          firstValue = displayedNum
          secondValue = calculator.dataset.modValue
        }

        display.textContent = calculate(firstValue, operator, secondValue);
      }

      calculator.dataset.modValue = secondValue
      calculator.dataset.previousKeyType = 'calculate';
      calculator.dataset.firstValue = display.textContent
    }
  }

  if (operations.includes(action)) {
    operation[action]()
  }

  
  if (
    actions.includes(action)
  ) {
    if (calculator.dataset.firstValue && calculator.dataset.operator && previousKeyType !== 'operator' && previousKeyType !== 'calculate') {
      display.textContent = calculate(calculator.dataset.firstValue, calculator.dataset.operator, displayedNum);
      calculator.dataset.firstValue = display.textContent;
    } else {
      calculator.dataset.firstValue = displayedNum;
    }

    calculator.dataset.operator = action;
    calculator.dataset.previousKeyType = 'operator';
  }

});


