const sql = require('../mysql/init')
const MySql = sql.sqlInit()

module.exports.userupdate= (req, res) => {
    const { id, exchange, name, pagelink, googlelink } = req.body
    const updateUser = `
        UPDATE users
        SET exchange="${exchange}",
            name="${name}",
            pagelink="${pagelink}",
            googlelink="${googlelink}"
        WHERE id=${id}
    `
    const getUsers = `
        SELECT id, exchange, name, pagelink, googlelink
        FROM users
    `
    MySql.query(updateUser, function (err, sqlResults) {
        if (err) {
            res.status(400).json("err");
        } else {
            MySql.query(getUsers, function (err, sqlResults) {
                if (err) {
                    res.status(400).json("err");
                } else {
                    res.status(200).json(sqlResults);
                }
            });
        }
    });
}