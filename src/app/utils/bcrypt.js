const bcrypt = require('bcrypt');
class Bcrypt {
    saltRound = 10;

    constructor() { }

    hash(password) {
        return bcrypt.hashSync(password, this.saltRound);
    }

    compare(password, rootPassword) {
        return bcrypt.compareSync(password, rootPassword);
    }
}

module.exports = new Bcrypt;