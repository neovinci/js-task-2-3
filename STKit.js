/**
 * Created by Sergei Astapenko on 26.05.2016.
 */
var STKit = (function () {

    var isObjectLikeArray = function (obj) {
        if (obj && typeof obj === 'object' && isFinite(obj.length) && obj.length >= 0 &&
            obj.length === Math.floor(obj.length) && obj.length < 4294967296) {
            return true;
        }
        else {
            return false;
        }
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
                if (typeof obj[prop2] === 'function') {
                    continue;
                }
                newObj[prop2] = obj[prop2];
            }
            return newObj;
        }
    };

    return {
        isObjectLikeArray: isObjectLikeArray,
        debehaviorizer: debehaviorizer
    };
})();
module.exports = STKit;