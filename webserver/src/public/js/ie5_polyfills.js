if (!String.prototype.includes) {
  String.prototype.includes = function (search, start) {
      'use strict';
      if (typeof start !== 'number') {
          start = 0;
      }

      if (start + search.length > this.length) {
          return false;
      } else {
          return this.indexOf(search, start) !== -1;
      }
  };
}

if (!Array.prototype.forEach) {
  Array.prototype.forEach = function (callback, thisArg) {
      'use strict';
      var T, k;

      if (this == null) {
          throw new TypeError('this is null or not defined');
      }

      var O = Object(this);
      var len = O.length >>> 0;

      if (typeof callback !== 'function') {
          throw new TypeError(callback + ' is not a function');
      }

      if (arguments.length > 1) {
          T = thisArg;
      }

      for (var k = 0; k < len; k++) {
          var kValue;
          if (k in O) {
              kValue = O[k];
              callback.call(T, kValue, k, O);
          }
      }
  };
}