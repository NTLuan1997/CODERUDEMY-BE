const bcrypt = require('bcrypt');
class Bcrypt {
    saltRound = 10;

    constructor() { }

    hash(password) {
        return bcrypt.hashSync(password, this.saltRound);
    }

    /**
     * 
     * @param {*} password need verify to root password.
     * @param {*} root-Password password save in database.
     * @returns status true - false.
     */
    compare(password, rootPassword) {
        return bcrypt.compareSync(password, rootPassword);
    }
}

module.exports = new Bcrypt;