module.exports = {
  cors(res) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,HEAD,OPTIONS,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    return res;
  },
};
