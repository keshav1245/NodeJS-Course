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

// console.log(chalk.blue.bgRed.bold('Hello world!'));
// console.log(chalk.blue('Hello', 'World!', 'Foo', 'bar', 'biz', 'baz'));
// console.log(chalk.blue.bgRed.inverse.bold('Hello world!'));

const notesUtilities = require('./notes');

// const msg = getNotes()
// console.log(msg);

// const greenMsg = chalk.blue.inverse.bold('Sucess!');
// console.log(greenMsg)

// console.log(process.argv[2])

// const command =  process.argv[2];
// console.log(process.argv)

// if(command === 'add'){
//     console.log("Adding a Command!");
// }else if(command === 'remove'){
//     console.log("Removing a Command!")
// }

const yargs =  require('yargs');
// console.log(process.argv)
// console.log(yargs.argv)


// Create add command
yargs.command({
    command : 'add',
    describe : 'Add a new note',
    builder : { // for allowing flags for the add command
        title : {
            describe : "Title of a New Note",
            demandOption : true,
            type : 'string'
        },
        body : {
            describe : "Body of a New Note",
            demandOption : true,
            type : 'string'
        }
    },
    handler : function (argv){
        // console.log("Adding a new note !")
        // console.log(argv)
        // console.log("Title : "+argv.title)
        // console.log("Body : "+argv.body)

        notesUtilities.addNotes(argv.title, argv.body);

    }
})

// Create a remove command

yargs.command({
    command : 'remove',
    describe : 'Remove a note',
    builder :{
        title :{
            describe : "Note Title to be removed!",
            demandOption : true,
            type : 'string'
        }
    },
    handler : function(argv){
        console.log('Removing a note !')
        // console.log(argv.title)
        notesUtilities.removeNote(argv.title)
    }
})

// Listing notes
yargs.command({
    command : 'list',
    describe : "Listing the notes",
    handler : function () {
        console.log('Listing notes')
    }
})

// Reading notes
yargs.command({
    command : "read",
    describe : "Reading notes",
    handler : function() {
        console.log("Reading a note")
    }
})

yargs.parse()
// console.log(yargs.argv)
