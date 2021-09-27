const fs = require('fs')
// const book = {
//     title : "Ego is the Enemy",
//     author : "Ryan Holiday"
// }

// const bookJSON = JSON.stringify(book)
// const JSONobj = JSON.parse(bookJSON)
// console.log(bookJSON)
// console.log(JSONobj)

// fs.writeFileSync('01-json.json',bookJSON)

// const dataBuffer = fs.readFileSync('01-json.json')
// const dataJSON = dataBuffer.toString();
// const dataObj = JSON.parse(dataJSON)

// console.log(dataObj)
// console.log(dataObj.title)

const dataBuffer2 = fs.readFileSync('01-json.json')
const dataJSON = dataBuffer2.toString()
const dataOBJ = JSON.parse(dataJSON)

console.log(dataOBJ)

dataOBJ.name = "Keshav Tangri";
dataOBJ.age = 22

console.log(dataOBJ)

dataUpdatedJSON = JSON.stringify(dataOBJ)

fs.writeFileSync("01-json.json",dataUpdatedJSON)