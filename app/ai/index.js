"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var Model = function Model() {
  this.getCredsEquivalent = function (money) {
    /**
     * 1 Score point === 300 PHP
     */
    if (typeof money !== 'number') return {
      status: false,
      result: 0
    };
    return {
      status: true,
      result: Number(money / 300).toFixed(4)
    };
  };

  this.getScoreFromMonthlySalary =
  /*#__PURE__*/
  function () {
    var _ref = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(sal) {
      var equiv, score;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!(typeof sal !== 'number')) {
                _context.next = 2;
                break;
              }

              return _context.abrupt("return", {
                status: false,
                result: 0
              });

            case 2:
              equiv = Math.ceil(0.2 * sal) + 210;
              score = this.getCredsEquivalent(equiv);
              return _context.abrupt("return", {
                status: score.status,
                result: score.result
              });

            case 5:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }();

  this.getScoreFromMonthlyIncome =
  /*#__PURE__*/
  function () {
    var _ref2 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2(inc) {
      var equiv, score;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (!(typeof inc !== 'number')) {
                _context2.next = 2;
                break;
              }

              return _context2.abrupt("return", {
                status: false,
                result: 0
              });

            case 2:
              equiv = Math.ceil(0.1 * inc);
              score = this.getCredsEquivalent(equiv);
              return _context2.abrupt("return", {
                status: score.status,
                result: score.result
              });

            case 5:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    return function (_x2) {
      return _ref2.apply(this, arguments);
    };
  }();

  this.getScoreWithHistory =
  /*#__PURE__*/
  function () {
    var _ref3 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee3(arr) {
      var finalScore, factor, index, itm, equiv, score;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              if (Array.isArray(arr)) {
                _context3.next = 2;
                break;
              }

              return _context3.abrupt("return", {
                status: false,
                result: 0
              });

            case 2:
              finalScore = 0;
              factor = 0.003;

              for (index = 0; index < arr.length; index++) {
                itm = arr[index];
                factor *= 1.05;
                equiv = Math.ceil(factor * itm);
                score = this.getCredsEquivalent(equiv);
                if (index === arr.length - 1) finalScore = score.result;
              }

              return _context3.abrupt("return", {
                status: true,
                result: finalScore
              });

            case 6:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    return function (_x3) {
      return _ref3.apply(this, arguments);
    };
  }();
};

var AIsample =
/*#__PURE__*/
function () {
  var _ref4 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee4() {
    var AI1, scoreFromMonthlySal, scoreFromMonthlyInc, scoreWithHistory;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            AI1 = new Model();
            _context4.next = 3;
            return AI1.getScoreFromMonthlySalary(25000);

          case 3:
            scoreFromMonthlySal = _context4.sent;
            _context4.next = 6;
            return AI1.getScoreFromMonthlyIncome(25000);

          case 6:
            scoreFromMonthlyInc = _context4.sent;
            _context4.next = 9;
            return AI1.getScoreWithHistory([2000, 1000, 1000, 2000, 2000, 2000, 2000, 2000, 2000]);

          case 9:
            scoreWithHistory = _context4.sent;
            console.log("scoreFromMonthlySal - ".concat(scoreFromMonthlySal.result, " \n scoreFromMonthlyInc - ").concat(scoreFromMonthlyInc.result, " \n scoreWithHistory - ").concat(scoreWithHistory.result, " \n\n  "));

          case 11:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function AIsample() {
    return _ref4.apply(this, arguments);
  };
}();

module.exports = {
  Model: Model,
  AIsample: AIsample
};