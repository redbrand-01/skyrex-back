const axios = require('axios')
const sql = require('../mysql/init')
const MySql = sql.sqlInit()

module.exports.get = () => {
    const sqlGetUrl  = `
        SELECT * FROM url
    `
    setInterval(() => {
        MySql.query(sqlGetUrl, function (err, sqlResults) {
            if (err) {
                console.log("url не получен")
            } else {
                console.log("url -------> " + sqlResults[0].url)

                const url = sqlResults[0].url
               
                axios.get(url + 'api/userget')
                .then(() => {
                    console.log("Обновление запросов хероку")
                })
                .catch(() => {
                    console.log('Ошибка обновления запроса хероку')
                })
            }
        });
    }, 5000)
}
