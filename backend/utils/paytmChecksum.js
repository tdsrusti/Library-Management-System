const crypto = require("crypto");

class PaytmChecksum {
  static generateSignature(params, key) {
    return new Promise((resolve, reject) => {
      let data = Object.keys(params).sort().map(k => k + params[k]).join("|");
      let salt = crypto.randomBytes(4).toString("hex");
      let hashString = data + "|" + salt;
      let hash = crypto.createHmac("sha256", key).update(hashString).digest("hex") + salt;
      resolve(hash);
    });
  }

  static verifySignature(params, key, checksum) {
    return new Promise((resolve, reject) => {
      let data = Object.keys(params).sort().map(k => k + params[k]).join("|");
      let salt = checksum.slice(-8);
      let hashString = data + "|" + salt;
      let hash = crypto.createHmac("sha256", key).update(hashString).digest("hex") + salt;
      resolve(hash === checksum);
    });
  }
}

module.exports = PaytmChecksum;