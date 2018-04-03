const mysql = require('mysql')



const insert = async (data) => {
    const connection = mysql.createConnection({
        host: '',
        user: '',
        port: '',
        password: '.',
        database: ''
    })
    connection.connect()
    return new Promise((resolve, reject) => {
        query = connection.query('INSERT INTO hnust_network_monitor SET ?', data, function (error, results, fields) {
            if (error) throw error
            connection.end()
            resolve(results)
        })
    })
}


module.exports = { insert }