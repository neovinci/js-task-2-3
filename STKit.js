/**
 * Created by Sergei Astapenko on 26.05.2016.
 */
var STKit = (function () {

    var isObjectLikeArray = function (obj) {
        return !!(obj && typeof obj === 'object' && isFinite(obj.length) && obj.length >= 0 &&
        obj.length === Math.floor(obj.length) && obj.length < 4294967296);
    };

    var debehaviorizer = function (obj, key) {
        if (key === true) {
            var methods = [];
            for (var prop1 in obj) {
                if (typeof obj[prop1] === 'function') {
                    try {
                        methods.push(obj[prop1]);
                        delete obj[prop1];
                    } catch (e) {
                        console.log('Warning: ' + e);
                    }
                }
            }
            return methods;
        } else {
            var newObj = {};
            for (var prop2 in obj) {
                if (typeof obj[prop2] !== 'function') {
                    newObj[prop2] = obj[prop2];
                }
            }
            return newObj;
        }
    };

    var memoize = function (f) {
        var cache = {};
        return function () {
            var key = arguments.length + Array.prototype.join.call(arguments, ',');
            if (key in cache) {
                return cache[key];
            } else {
                cache[key] = f.apply(this, arguments);
                return cache[key];
            }
        };
    };

    var semiColonSON = function (str) {
        var obj = {};
        var temp = str.substring(0);

        //Regular expressions
        var patternArray = /([a-zA-Z]+\d*:)([a-zA-Z]+\d*,[a-zA-Z]+\d*;)+/g;
        var patternMethodOne = /[a-zA-Z]+\d*,\|return (\S+\s*\S*)+\|/g;
        var patternMethodTwo = /[a-zA-Z]+\d*,\|function \(\w*(,\s*\w*)*\) { return (\S+\s*\S*)+; }\|/g;
        var patternValues = /[a-zA-Z]+\d*,[a-zA-Z]+\d*/g;
        var parameterMethodTypeTwo = /[a-zA-Z]+\d*/g;

        //Parse elements
        var arrays = temp.match(patternArray);
        temp = (arrays) ? temp.replace(patternArray, '') : temp;
        var methodsTypeOne = temp.match(patternMethodOne);
        temp = (methodsTypeOne) ? temp.replace(patternMethodOne, '') : temp;
        var methodsTypeTwo = temp.match(patternMethodTwo);
        var values = temp.match(patternValues);

        //Add values to object
        if (values) {
            for (var i = 0; i < values.length; i++) {
                obj[values[i].split(',')[0]] = values[i].split(',')[1];
            }
        }

        //Add arrays to object
        (function () {
            if(arrays) {
                for (var k = 0; k < arrays.length; k++) {
                    var arraySplit = arrays[k].split(':');
                    obj[arraySplit[0]] = arraySplit[1].match(patternValues);
                }
            }
        })();

        //Add methods type one to object
        (function () {
            if (methodsTypeOne) {
                for (var j = 0; j < methodsTypeOne.length; j++) {
                    var methodTypeOneSplit = methodsTypeOne[j].split(',|');
                    var methodName = methodTypeOneSplit[0];
                    var methodTypeOneExpressions =  methodTypeOneSplit[1].substring(0, methodTypeOneSplit[1].indexOf('|'));
                    obj[methodName] = new Function(methodTypeOneExpressions);
                }
            }

        })();


        //Add methods type two to object
        (function () {
            if (methodsTypeTwo) {
                for (var x = 0; x < methodsTypeTwo.length; x++) {
                    var methodNameTwo = methodsTypeTwo[x].substring(0, methodsTypeTwo[x].indexOf(',|'));
                    var methodTypeTwoExpressions =  methodsTypeTwo[x].substring(methodsTypeTwo[x].indexOf('{') + 1,
                        methodsTypeTwo[x].indexOf('}')).trim();
                    var methodParameters = methodsTypeTwo[x].substring(methodsTypeTwo[x].indexOf('(') + 1,
                        methodsTypeTwo[x].indexOf(')')).match(parameterMethodTypeTwo);

                    if (methodParameters) {
                        obj[methodNameTwo] = new Function(methodParameters, methodTypeTwoExpressions);
                    } else {
                        obj[methodNameTwo] = new Function(methodTypeTwoExpressions);
                    }
                }
            }
        })();
        return obj;
    };

    return {
        isObjectLikeArray: isObjectLikeArray,
        debehaviorizer: debehaviorizer,
        memoize: memoize,
        semiColonSON: semiColonSON
    };
})();
module.exports = STKit;