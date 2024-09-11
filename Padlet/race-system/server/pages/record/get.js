const mysql = require("../../mysql")

module.exports = function (data) {
    return new Promise((resolve, reject) => {
        let command

        console.log(data)

        if (data.type !== "all" && data.value === "")
            resolve([])

        if (data.type === "all")
            command = "select * from record"
        else if (data.type === "date")
            command = `select * from record where record_date between '${data.value} 00:00:00' and '${data.value} 23:59:59'`
        else if (data.type === "range")
            command = `select * from record where record_date between '${data.value[0]}' and '${data.value[1]}'`
        else reject({
            error: "Unknown operation",
            code: 400
        })
        console.log("all");
        mysql.exec(command).then(e => {
            resolve(e)
        }).catch(err => reject({
            error: "Database error: " + err,
            code: 500
        }))
    })
}