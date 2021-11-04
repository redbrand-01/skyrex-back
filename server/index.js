const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const path = require('path')

const sql = require('./mysql/init')

//const heroku = require("./heroku/get")

const routes = require('./routes')
const sqlInit = sql.sqlInit()

sqlInit.connect((err) => {
    if (!err) {
      console.log("База подключена");
    } else {
      console.log("Ошибка подключение базы: " + err.message);
    }
})

//heroku.get()
const app = express()
app.use(express.json({ extended: false }));
app.use(morgan("dev"));
app.use(cors());

const root = path.resolve("build");
app.use(express.static(root));

app.use('/api', routes)

app.get("*", (req, res) => {
    res.sendFile("index.html", { root });
});

const PORT = 5000

app.listen(PORT, () => {
    console.log(`сервер запущен на порте: ${PORT}`)
})