// const fs = require('fs');
// // fs.writeFileSync("notes.txt", "This file was edited by Node JS");


// fs.appendFileSync('notes.txt', "\nMy Name is Keshav Tangri !");
// const {name, add, mul} = require('./utils.js'); // have to give relative path !

// console.log(name);
// console.log(add(5, 7));
// console.log(mul(5, 7));

// const validator = require('validator')
// console.log(validator.isEmail('tangri57@gmail.com'))

const chalk = require('chalk');

console.log(chalk.blue.bgRed.bold('Hello world!'));
console.log(chalk.blue('Hello', 'World!', 'Foo', 'bar', 'biz', 'baz'));
console.log(chalk.blue.bgRed.inverse.bold('Hello world!'));