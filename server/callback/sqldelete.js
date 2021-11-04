const sql = require('../mysql/init')
const MySql = sql.sqlInit()

module.exports.userdelete = (req, res) => {
    const deleteUsers = `
        DELETE FROM users
        WHERE id=${req.body.id}
    `
    const getUsers = `
        SELECT id, exchange, name, pagelink, googlelink
        FROM users
    `

    MySql.query(deleteUsers, function (err) {
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