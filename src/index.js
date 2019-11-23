import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { INTERESTS } from './constants/App';
import { Model, AIsample } from './ai/index';

const HomeCredit = function() {
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
    validPrice: function(price) {
      if (price > this.MAX_PRICE || price < this.MIN_PRICE) return false;
      return true;
    },

    validMonth: function(month) {
      if (!this.VALID_MONTHS.includes(month)) return false;
      return true;
    },

    getMaxDPFromPrice: async function(param) {
      if (typeof param !== 'number' || !this.validPrice(param))
        return { status: false, result: 0 };
      return { status: true, result: param - 2910 };
    },

    getPriceFromMaxDP: async function(param) {
      if (typeof param !== 'number') return { status: false, result: 0 };
      return { status: true, result: param + 2910 };
    },

    getMinDPFromPrice: async function(param) {
      if (typeof param !== 'number' || !this.validPrice(param))
        return { status: false, result: 0 };
      return {
        status: true,
        result: (() => {
          if (param >= 38500) {
            // step is 500
            return 20000 - (50000 - param);
          } else if (param >= 8500 && param <= 38000) {
            // first step is 140, followed by 110
            if (param === 38000) return 8500 - 140;
            else return 8500 - ((38500 - param) / 500) * 110 - 30;
          } else if (param >= 3500 && param < 8500) {
            if (param === 8000) return 1040;
            else return 1040 - ((8500 - param) / 500) * 65;
          } else if (param === 3345) return 435;
        })(),
      };
    },

    getMonthRangeFromPrice: function(param) {
      const arr = [9];
      if (param >= 8500) arr.push(18);
      if (param >= 19500) arr.push(24);
      return arr;
    },

    getMonthly: function(price, dp, month, maxDP, minDP) {
      console.log(
        `getMonthly parameters \n price - ${price} \n dp - ${dp} \n month - ${month} \n maxDP - ${maxDP} \n minDP - ${minDP}`
      );
      if (
        !this.validMonth(month) ||
        typeof price !== 'number' ||
        typeof dp !== 'number' ||
        !this.validPrice(price) ||
        dp > maxDP ||
        dp < minDP
      )
        return { status: false, result: 0 };
      const interest = INTERESTS[String(month)];

      const basicPerMonth = (price - dp) / month;
      return {
        status: true,
        result: Math.floor(basicPerMonth + basicPerMonth * interest),
      };
    },
  };
};

const sampleFunction = async amt => {
  const HC1 = new HomeCredit();
  const price = amt; // in pesos unit
  const dpOffset = 2000; // in pesos unit
  const maxDP = await HC1.Cellphone.getMaxDPFromPrice(price);
  const minDP = await HC1.Cellphone.getMinDPFromPrice(price);
  const availMonth = HC1.Cellphone.getMonthRangeFromPrice(price);

  console.log(
    ` Monthly in Pesos - ${JSON.stringify(
      HC1.Cellphone.getMonthly(
        price,
        minDP.result + dpOffset,
        availMonth[availMonth.length - 1],
        maxDP.result,
        minDP.result
      )
    )}`
  );
};

AIsample();

module.exports = {
  HC: new HomeCredit(),
  HCsample: sampleFunction,
  AIsample,
  AI: new Model(),
};
