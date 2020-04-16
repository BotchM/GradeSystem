
const crypto = require('crypto');
 
exports.getHash = (password) => {
    return crypto.createHash('md5').update(password).digest("hex");
}