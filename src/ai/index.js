const Model = function() {
  /**
   * 1 Score point === 300 PHP
   */
  this.PHtoPoint = 300;
  this.setPHtoPointEq = function(num) {
    this.PHtoPoint = num;
  };
  this.getCredsEquivalent = function(money) {
    if (typeof money !== 'number') return { status: false, result: 0 };
    return { status: true, result: Number(money / this.PHtoPoint).toFixed(4) };
  };

  this.getScoreFromMonthlySalary = async function(sal) {
    if (typeof sal !== 'number') return { status: false, result: 0 };
    const equiv = Math.ceil(0.2 * sal) + 210;
    const score = this.getCredsEquivalent(equiv);
    return { status: score.status, result: score.result };
  };

  this.getScoreFromMonthlyIncome = async function(inc) {
    if (typeof inc !== 'number') return { status: false, result: 0 };
    const equiv = Math.ceil(0.1 * inc);
    const score = this.getCredsEquivalent(equiv);
    return { status: score.status, result: score.result };
  };

  this.getScoreWithHistory = async function(arr) {
    if (!Array.isArray(arr)) return { status: false, result: 0 };
    let finalScore = 0;
    let factor = 0.003;
    for (let index = 0; index < arr.length; index++) {
      const itm = arr[index];
      factor *= 1.05;
      const equiv = Math.ceil(factor * itm);
      const score = this.getCredsEquivalent(equiv);

      if (index === arr.length - 1) finalScore = score.result;
    }

    return { status: true, result: finalScore };
  };
};

const AIsample = async () => {
  const AI1 = new Model();
  const scoreFromMonthlySal = await AI1.getScoreFromMonthlySalary(25000);
  const scoreFromMonthlyInc = await AI1.getScoreFromMonthlyIncome(25000);
  const scoreWithHistory = await AI1.getScoreWithHistory([
    2000,
    1000,
    1000,
    2000,
    2000,
    2000,
    2000,
    2000,
    2000,
  ]);

  console.log(`scoreFromMonthlySal - ${scoreFromMonthlySal.result} \n scoreFromMonthlyInc - ${scoreFromMonthlyInc.result} \n scoreWithHistory - ${scoreWithHistory.result} \n
  `);
};

module.exports = {
  Model,
  AIsample,
};
