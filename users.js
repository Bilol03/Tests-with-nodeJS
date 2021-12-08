const { table } = require('console')
let fs = require('fs')

let users = fs.readFileSync('users.json', 'UTF-8')

users = JSON.parse(users)
// console.table(users)
for(let i of users){
    console.table(i)
}