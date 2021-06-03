// ZeroDevideException
class Stack {
    constructor() {
        this.__a = [];
    }
    push(a) {
        this.__a.push(a);
    }
    pop() {
        return this.__a.pop();
    }
    size() {
        return this.__a.length;
    }
    all() {
        return this.__a;
    }
    last() {
        return this.__a[this.__a.length - 1];
    }
}

// canPush = {"number": `bool`, "operator": `bool`}
class canPush {
    canPushNum() {
        let result = Boolean;
        let last = stack.last();
        if (last == 0) {
            document.getElementById('input').value = '';
            document.getElementById('input').value += n;
        } else if (last === undefined) {
            if (!isNaN(n)) {
                document.getElementById('input').value += n;
                stack.push(parseIng(document.getElementById('input').value));
            }
            console.log('isNaN(last)', stack.all());
        } else if (typeof(last) == 'number') {
            document.getElementById('input').value += n;
            stack.pop();
            stack.push(parseIng(document.getElementById('input').value));
            console.log('number', stack.all());
        } else if (typeof(last) == 'string') {
            if (last == '=') {
                stack = new Stack;
            }
            document.getElementById('input').value = '';
            document.getElementById('input').value += n;
            stack.push(parseIng(document.getElementById('input').value));
            console.log('string', stack.all());
        }
    
    }
    canPushOpe() {
        let result = Boolean;
    }
    canPush() {
        let result = {};
        // push result of canPushNum function to this.result
        // push result of canPushOpe function to this.result
        return result
    }
}

class Calc {
    calc() {
        let v2 = stack.pop();
        let o = stack.pop();
        let v1 = stack.pop();
        if (o == '+') {
            this.__add(v1, v2);
        } else if(o == '-') {
            this.__sub(v1, v2);
        } else if(o == '*') {
            this.__mul(v1, v2);
        } else if(o == '/') {
            this.__div(v1, v2);
        }
    }
    __add(v1, v2) {
        stack.push(v1 + v2);
    }
    __sub(v1, v2) {
        stack.push(v1 - v2);
    }
    __mul(v1, v2) {
        stack.push(v1 * v2);
    }
    __div(v1, v2) {
        if (v2 == 0) {
            throw new ZeroDevideException("Devided zero");
        }
        stack.push(v1 / v2);
    }
}

class ZeroDevideException extends Error {
    constructor(message) {
        super(message);
        this.name = 'ZeroDevideException';
    }
}

stack = new Stack;
calc = new Calc;

function onPushNum(n) {
    let last = stack.last();
    if (last == 0) {
        document.getElementById('input').value = '';
        document.getElementById('input').value += n;
    } else if (last === undefined) {
        if (!isNaN(n)) {
            document.getElementById('input').value += n;
            stack.push(parseInt(document.getElementById('input').value));
        }
        console.log('isNaN(last)', stack.all());
    } else if (typeof(last) == 'number') {
        document.getElementById('input').value += n;
        stack.pop();
        stack.push(parseInt(document.getElementById('input').value));
        console.log('number', stack.all());
    } else if (typeof(last) == 'string') {
        if (last == '=') {
            stack = new Stack;
        }
        document.getElementById('input').value = '';
        document.getElementById('input').value += n;
        stack.push(parseInt(document.getElementById('input').value));
        console.log('string', stack.all());
    }
}

function onPushOperator(o) {
    let s = stack.all();
    let last = stack.last();
    if (stack.size() == 0) {
        return
    } else if (typeof(last) == 'string') {
        stack.pop();
        stack.push(o);
    } else if (s.length == 1 && typeof(last) == 'number') {
        stack.push(o);
    } else if (stack.size() == 3) {
        calc.calc();
        let result = stack.last();
        document.getElementById('input').value = result;
        stack.push(o);
    }
    console.log('onPushOperator', stack.all());
}

function onPushClear() {
    stack = new Stack;
    document.getElementById('input').value = '';
}