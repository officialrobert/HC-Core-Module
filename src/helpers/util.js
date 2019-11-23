const promiseTimeout = async (cb, t, params) => {
  return new Promise(resolve => {
    setTimeout(() => {
      cb(params && { ...params });
    }, t);
  });
};

module.exports = {
  promiseTimeout,
};
