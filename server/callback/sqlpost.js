const sql = require('../mysql/init')
const MySql = sql.sqlInit()

const { v4: uuidv4 } = require('uuid');

module.exports.userPost = (req, res) => {
    const { exchange, name, pagelink, googlelink } = req.body

    const query = `
        INSERT INTO users 
            ( uuid, exchange, name, pagelink, googlelink)
            values( '${uuidv4()}', '${exchange}' , '${name}', '${pagelink}' ,'${googlelink}')
    `

    MySql.query(query, function (err) {
        if (err) {
            res.status(400).json("err");
        } else {
            const getUsers = `
                SELECT id, exchange, name, pagelink, googlelink
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
    });
}