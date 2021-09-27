const fs = require('fs')
const chalk = require('chalk');
const getNotes = () => {return "Your Notes !"}

const addNotes = (title, body) => {
    const notes = loadNotes()
    const duplicateNotes = notes.filter((note)=> note.title === title)
    // const duplicateNotes = notes.filter(function(note){
    //     return note.title === title
    // })

    if(duplicateNotes.length === 0){

        const note_obj = {
            title : title,
            body : body
        }
        notes.push(note_obj)
        saveNotes(notes)
        console.log("Note Added!")
    
    }else{
        console.log("Note title taken!")
    }

}

const removeNote = (title) => {
    const notes = loadNotes()
    const notesToKeep = notes.filter((note) => note.title !== title)
    // const notesToKeep = notes.filter(function(note){
    //     return note.title !== title
    // })
    
    if(notesToKeep.length === notes.length){
        console.log(chalk.red.inverse.bold("No Note Removed!"))
    }else{
        saveNotes(notesToKeep)
        console.log(chalk.green.inverse.bold("Note Removed!"))
    }
    // for( i = 0 ; i < notes.length ; i++){
    //     if(notes[i].title == title){
    //         notes.splice(i,1)
    //         console.log('Note removed!')
    //         saveNotes(notes)
    //         return
    //     }
    // }
    // console.log("No Note exists with the title : "+title)
}

const listNote = () => {
    const notes = loadNotes();
    notes.forEach(element => {
        console.log(chalk.bold.white.inverse(element.title))
        // console.log(chalk.bold.green.inverse(element.body))
    });
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json',dataJSON)
}

const loadNotes = () => {
    try{
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    }catch(e){
        return []
    }
    
}

module.exports = {
    getNotes,
    addNotes,
    removeNote,
    listNote
};