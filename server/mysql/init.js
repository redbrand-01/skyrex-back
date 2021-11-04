const mysql = require("mysql")

module.exports.sqlInit = () => {
    const mysqlConnection = mysql.createConnection({
        host: "77.222.60.196",
        user: "admin-t",
        password: "18364123Zz",
        database: "table",
    })
    return mysqlConnection
}