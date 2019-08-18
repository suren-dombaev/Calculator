let expression = prompt("Enter the expression", '');
alert(expression+'='+evaluate(expression));


function isValid(expression) {
    let validChars = "0123456789+-*/()";
    for (let c of expression) {
        if (validChars.indexOf(c) === -1) {
            return false
        }
        ;
    }
    return isBalancedParantheses(expression) && checkMathOperators(expression);
}

function isBalancedParantheses(expression) {
    let stack = [];
    for (let c of expression) {
        if (c === "(") {
            stack.push(c);
        } else if (c === ")") {
            if (stack.length === 0) return false;
            stack.pop();
        }
    }
    return stack.length === 0;
}


function checkMathOperators(expression) {
    let isValid = true;
    if ("+-*/".indexOf(expression[expression.length - 1]) !== -1) {
        isValid = false;
    }
    if ("*/".indexOf(expression[0]) !== -1) {
        isValid = false;
    }
    let withoutParanthesis = expression.replace(/[()]/g, '');
    for (let i = 0; i < withoutParanthesis.length; i++) {
        if (isNaN(+withoutParanthesis[i]) && isNaN(+withoutParanthesis[i + 1])) {
            isValid = false;
            break;
        }
    }
    return isValid;
}


function formatUserInput(input) {
    let expression = input.replace(/ /g, '').split("");
    for (let i = 0; i < expression.length; i++) {
        if (expression[i] === ")" && expression[i + 1] === "(") {
            expression.splice(i + 1, 0, "*");
        }
    }
    return expression.join("");
}


function calculate(expression) {
    if (!isNaN(+expression)) return +expression;
    let start, end;
    end = expression.indexOf(")")
    for (let i = end - 1; i >= 0; i--) {
        if (expression[i] === "(") {
            start = i;
            break;
        }
    }

    if (start != undefined && end != undefined) {
        let startPart = expression.substring(0, start);
        let calculatedPart = calculate(expression.substring(start + 1, end));
        let endPart = expression.substring(end + 1, expression.length);
        return calculate(startPart + calculatedPart + endPart);
    } else {
        return calcSimpleExpression(expression)
    }
}

function calcSimpleExpression(expression) {
    let arr = expression.split(/([-+/*])/g);

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === "*" || arr[i] === "/") {
            let result = arr[i] === "*" ? arr[i - 1] * arr[i + 1] : arr[i - 1] / arr[i + 1];
            arr.splice(i - 1, 3, result);
            i--;
        }
    }
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === "+" || arr[i] === "-") {
            let result = arr[i] === "+" ? +arr[i - 1] + +arr[i + 1] : arr[i - 1] - arr[i + 1];
            arr.splice(i - 1, 3, result);
            i--;
        }
    }
    return arr[0];
}

function evaluate(input) {
    let expression = formatUserInput(input)
    if (isValid(expression)) {
        return calculate(expression);
    } else {
        alert("Input is invalid");
    }
}
