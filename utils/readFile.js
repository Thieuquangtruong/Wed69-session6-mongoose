const fs = require('fs')
const readFile = (url) => {
    const data = fs.readFileSync('user.json')
    const result = JSON.parse(data)
    
    return result
}

module.exports = readFile