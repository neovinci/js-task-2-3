/**
 * Created by Sergei Astapenko on 26.05.2016.
 */
var STKit = require('./STKit');
var obj = {};
obj.a = 1;
obj.b = function () {
    
};
var some = STKit.debehaviorizer(obj, true);
console.log(some);
console.log(obj);