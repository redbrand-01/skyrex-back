const { GoogleSpreadsheet } = require('google-spreadsheet')
const moment = require('moment')

const creds = require('./keys.json')

const sql = require('../mysql/init')
const MySql = sql.sqlInit()

const table = require('./table')

module.exports.update = (req, res) => {
    const uuid = req.body.uuid
    const getUsers = `
        SELECT id, googlelink
        FROM users
        WHERE uuid="${uuid}"
    `
    MySql.query(getUsers, async (err, sqlResults) => {
        if (err) {
            res.status(400).json(err)
        } else {

            if(sqlResults.length === 0){
                res.status(200).json(false)
            } else {
                const trade = table.TableShema()
                const link = sqlResults[0].googlelink
                        
                const doc = new GoogleSpreadsheet(link);
                        
                await doc.useServiceAccountAuth({
                    client_email: creds.client_email,
                    private_key: creds.private_key,
                });
                await doc.loadInfo()

                const sheet = doc.sheetsByIndex[0]
                const tableRow = await sheet.getRows()
                        
                let i = 0
                tableRow.forEach(v => {
                    const cell = {
                        id: i,
                        trade: v['Trade №'],
                        pair: v['Pair'],
                        startDate: v['Start Date'],
                        endDate: v['End Date'],
                        dur: v['Duration (Hours)'],
                        safeties: v['Safeties'],
                        profit: v['Profit, USDT'],
                        total: v['Accumulated profit, Total'],
                    }
                    trade.cell.push(cell)
                    i = i + 1
                })

                const balance = {
                    start: tableRow[0]["Start balance"],
                    current: tableRow[0]["Current balance"]
                }

                getTable(req, res, trade, balance)
            }
        }
    });
}

const getTable = (req, res, table, balane) => {
    let dateNow = req.body?.dateNow ? req.body.dateNow.split(".") : false
    let datePast = req.body?.datePast ? req.body.datePast.split(".") : false

    if(dateNow == false && dateNow === false) {
        const d = (table.cell[table.cell.length - 1].startDate).split(".")
        const date = new Date(d[2], d[1] - 1, d[0])

        const dp = (table.cell[0].startDate).split(".")
        const datePst = new Date(dp[2], dp[1] - 1, dp[0])
        
        const now = moment(date).format("DD.MM.YYYY")
        const pst = moment(datePst).format("DD.MM.YYYY")
        
        dateNow = now.split(".")
        datePast = pst.split(".")
    }
    
    const st = new Date(datePast[2], datePast[1] - 1, datePast[0]).getTime()
    const end = new Date(dateNow[2], dateNow[1] - 1, dateNow[0]).getTime()
 
    const tableResult = {
        label: table.label,
        cell: []
    }

    for(let i = 0; i < table.cell.length; i++) {
        const date = table.cell[i].startDate
        const split = date.split(".")
        
        const newDate = new Date(split[2], split[1] - 1, split[0]).getTime()

        if(newDate >= st && newDate <= end) {
          
            tableResult.cell.push(table.cell[i])
        }
    }

    res.status(200).json({table: tableResult, balance: balane, pastData: table.cell[0].startDate })
}