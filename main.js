class Stack {
    constructor() {
        this._a = [];
    }
    push(a) {
        // NaN or undefinedで例外
        try {
            if ((!(a === a)) || (a === void 0)) {
                throw new InvalidInputException();
            }
            this._a.push(a);
        } catch (e) {
            if (e instanceof InvalidInputException) {
                console.log(e);
            } else {
                console.log('other error');
            }
        }
    }
    pop() {
        return this._a.pop();
    }
    size() {
        return this._a.length;
    }
    last() {
        return this._a[this._a.length - 1];
    }
    all() {
        return this._a.join();
    }
}

class Calc {
    calc() {
        let v2 = stack.pop();
        let o = stack.pop();
        let v1 = stack.pop();
        if (o == '+') {
            this._add(v1, v2);
        } else if(o == '-') {
            this._sub(v1, v2);
        } else if(o == '*') {
            this._mul(v1, v2);
        } else if(o == '/') {
            this._div(v1, v2);
        }
    }
    _add(v1, v2) {
        stack.push(v1 + v2);
    }
    _sub(v1, v2) {
        stack.push(v1 - v2);
    }
    _mul(v1, v2) {
        stack.push(v1 * v2);
    }
    _div(v1, v2) {
        try {
            if (v2 == 0) {
                throw new ZeroDevideException();
            }
            stack.push(v1 / v2);
        } catch (e) {
            if (e instanceof ZeroDevideException) {
                console.log(e);
            } else {
                console.log('other error');
            }
        }
    }
}

class ZeroDevideException extends Error {
    constructor(...params) {
        super(...params);
        Object.defineProperty(this, 'name', {
            value: this.constructor.name,
        });
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, ZeroDevideException);
        }
    }
}

class InvalidInputException extends Error {
    constructor(...params) {
        super(...params);
        Object.defineProperty(this, 'name', {
            configurable: true,
            enumerable: false,
            value: this.constructor.name,
            writable: true,
        });
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, InvalidInputException);
        }
    }
}


stack = new Stack;
calc = new Calc;

function onPushNum(n) {
    let last = stack.last();
    if ((last === 0) || (last === void 0)) {
        document.getElementById('input').value = '';
    }
    if (typeof(last) === 'number') {
        stack.pop();
    } else if (typeof(last) === 'string') {
        document.getElementById('input').value = '';
    }
    document.getElementById('input').value += n;
    stack.push(parseInt(document.getElementById('input').value));
}

function onPushOperator(o) {
    let last = stack.last();
    if (stack.size() === 0) {
        return
    } else if (typeof(last) == 'string') {
        stack.pop();
    } else if (stack.size() == 3) {
        calc.calc();
        let result = stack.last();
        document.getElementById('input').value = result;
    }
    stack.push(o);
}

function onPushEqual() {
    calc.calc()
    let result = stack.last();
    document.getElementById('input').value = result;
    stack = new Stack;
}

function onPushClear() {
    document.getElementById('input').value = '';
    stack = new Stack;
}