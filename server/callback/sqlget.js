const sql = require('../mysql/init')
const MySql = sql.sqlInit()

module.exports.userget = (req, res) => {
    const getUsers = `
        SELECT id, uuid, exchange, name, pagelink, googlelink
        FROM users
    `
    MySql.query(getUsers, function (err, sqlResults) {
        if (err) {
            res.status(400).json("err");
        } else {
            res.status(200).json(sqlResults);
        }
    });
}

module.exports.herokuget = (req, res) => {
    res.status(200).json(true)
}