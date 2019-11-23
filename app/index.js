"use strict";

require("core-js/stable");

require("regenerator-runtime/runtime");

var _util = require("./helpers/util");

var _App = require("./constants/App");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var HomeCredit = function HomeCredit() {
  this.Cellphone = {
    /**
     * returns object with keys:
     *  result <number> => answer in PH pesos
     *  status <bool> => true - if the value's true positive, otherwise false
     *  max monthly duration to pay <number> => min. is 9 months, 18 months and max is 24 months
     */
    MAX_PRICE: 50000,
    MIN_PRICE: 3345,
    VALID_MONTHS: [9, 18, 24],
    validPrice: function validPrice(price) {
      if (price > this.MAX_PRICE || price < this.MIN_PRICE) return false;
      return true;
    },
    validMonth: function validMonth(month) {
      if (!this.VALID_MONTHS.includes(month)) return false;
      return true;
    },
    getMaxDPFromPrice: function () {
      var _getMaxDPFromPrice = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(param) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(typeof param !== 'number' || !this.validPrice(param))) {
                  _context.next = 2;
                  break;
                }

                return _context.abrupt("return", {
                  status: false,
                  result: 0
                });

              case 2:
                return _context.abrupt("return", {
                  status: true,
                  result: param - 2910
                });

              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getMaxDPFromPrice(_x) {
        return _getMaxDPFromPrice.apply(this, arguments);
      }

      return getMaxDPFromPrice;
    }(),
    getPriceFromMaxDP: function () {
      var _getPriceFromMaxDP = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(param) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!(typeof param !== 'number')) {
                  _context2.next = 2;
                  break;
                }

                return _context2.abrupt("return", {
                  status: false,
                  result: 0
                });

              case 2:
                return _context2.abrupt("return", {
                  status: true,
                  result: param + 2910
                });

              case 3:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function getPriceFromMaxDP(_x2) {
        return _getPriceFromMaxDP.apply(this, arguments);
      }

      return getPriceFromMaxDP;
    }(),
    getMinDPFromPrice: function () {
      var _getMinDPFromPrice = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(param) {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!(typeof param !== 'number' || !this.validPrice(param))) {
                  _context3.next = 2;
                  break;
                }

                return _context3.abrupt("return", {
                  status: false,
                  result: 0
                });

              case 2:
                return _context3.abrupt("return", {
                  status: true,
                  result: function () {
                    if (param >= 38500) {
                      // step is 500
                      return 20000 - (50000 - param);
                    } else if (param >= 8500 && param <= 38000) {
                      // first step is 140, followed by 110
                      if (param === 38000) return 8500 - 140;else return 8500 - (38500 - param) / 500 * 110 - 30;
                    } else if (param >= 3500 && param < 8500) {
                      if (param === 8000) return 1040;else return 1040 - (8500 - param) / 500 * 65;
                    } else if (param === 3345) return 435;
                  }()
                });

              case 3:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function getMinDPFromPrice(_x3) {
        return _getMinDPFromPrice.apply(this, arguments);
      }

      return getMinDPFromPrice;
    }(),
    getMonthRangeFromPrice: function getMonthRangeFromPrice(param) {
      var arr = [9];
      if (param >= 8500) arr.push(18);
      if (param >= 19500) arr.push(24);
      return arr;
    },
    getMonthly: function getMonthly(price, dp, month, maxDP, minDP) {
      console.log("getMonthly parameters \n price - ".concat(price, " \n dp - ").concat(dp, " \n month - ").concat(month, " \n maxDP - ").concat(maxDP, " \n minDP - ").concat(minDP));
      if (!this.validMonth(month) || typeof price !== 'number' || typeof dp !== 'number' || !this.validPrice(price) || dp > maxDP || dp < minDP) return {
        status: false,
        result: 0
      };

      var interest = _App.INTERESTS[String(month)];

      var basicPerMonth = (price - dp) / month;
      return {
        status: true,
        result: Math.floor(basicPerMonth + basicPerMonth * interest)
      };
    }
  };
};

var sampleFunction =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee4() {
    var HC1, price, dpOffset, maxDP, minDP, availMonth;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            HC1 = new HomeCredit();
            price = 25000; // in pesos unit

            dpOffset = 2000; // in pesos unit

            _context4.next = 5;
            return HC1.Cellphone.getMaxDPFromPrice(price);

          case 5:
            maxDP = _context4.sent;
            _context4.next = 8;
            return HC1.Cellphone.getMinDPFromPrice(price);

          case 8:
            minDP = _context4.sent;
            availMonth = HC1.Cellphone.getMonthRangeFromPrice(price);
            console.log(" Monthly in Pesos - ".concat(HC1.Cellphone.getMonthly(price, minDP.result + dpOffset, availMonth[availMonth.length - 1], maxDP.result, minDP.result)));

          case 11:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function sampleFunction() {
    return _ref.apply(this, arguments);
  };
}();

module.exports = {
  HC: new HomeCredit(),
  sample: sampleFunction
};