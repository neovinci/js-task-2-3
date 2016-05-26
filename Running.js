/**
 * Created by Sergei Astapenko on 26.05.2016.
 */
var STKit = require('./STKit');

var f = function(a, b) {
    return a + b;
};

var some = STKit.memoize(f);
console.log(some(1, 2));
console.log(some(1, 2));
console.log(some(2, 2));