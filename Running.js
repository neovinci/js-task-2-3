/**
 * Created by Sergei Astapenko on 26.05.2016.
 */
var STKit = require('./STKit');

//Memoizer
function factorial(n) {
    var res = 1;
    while(n !== 1) {
        res *= n--;
    }
    return res;
}

function square(a, b) {
    return a * b;
}
var factorialMemo = STKit.memoize(factorial);
console.log('Memoize => ' + factorialMemo(3));
var squareMemo = STKit.memoize(square);
console.log('Memoize => ' + squareMemo(3, 3));

//Is Array Like object checker.
var obj = {};
obj[1]  = 'qwerty';
obj.length = 1;
console.log('Is Array Like object => ' + STKit.isObjectLikeArray(obj));

//Object Debehaviorizer.
var veryComplicatedObject = {};
veryComplicatedObject.a = 1;
veryComplicatedObject.b = factorial;
veryComplicatedObject.c = square;
console.log('Object Debehaviorizer =>');
console.log(veryComplicatedObject);
var stateObj = STKit.debehaviorizer(veryComplicatedObject);
console.log(STKit.debehaviorizer(veryComplicatedObject, true));
console.log(veryComplicatedObject);
console.log(stateObj);

//SemiColonSON Evolved
console.log('SemiColonSON Evolved =>')
console.log(STKit.semiColonSON(';key,value;methodName2,|function (a) { return a + 1; }|;methodName,' +
    '|return true|;arrayHere:k1,v1;k2,v2;k3,v3;'));

