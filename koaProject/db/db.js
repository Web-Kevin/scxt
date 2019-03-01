const mysql = require('mysql');
//不建议使用createConnection 容易报错
const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '123',
    database: 'mydb'
});
//获取默认30内数据
let getData = function () {
    return new Promise((resolve, reject) => {

            pool.query('select * from scrb order by id desc limit 30', function (error, results, fields) {
                if (error) throw error;
                resolve(results)
            });
        }

    )
}
//获取用户选择期间数据
let getDataByDate = function (date1, date2, jh) {

    return new Promise((resolve, reject) => {
            pool.query('select * from scrb where jh=\'' +
                jh + '\' and rq between \'' + date1 + '\' and \'' + date2 + '\'',
                function (error, results, fields) {
                    if (error) throw error;
                    resolve(results)
                });
        }

    )
    // connection.end()
}
//获取备注
let getBzByDate = function (jh) {
    return new Promise((resolve, reject) => {
            pool.query('select rq,bz from scrb where jh=\'' +
                jh + '\' order by id desc limit 365',
                function (error, results, fields) {
                    if (error) throw error;
                    resolve(results)
                });
        }

    )
}
module.exports = {
    getData,
    getDataByDate,
    getBzByDate
}