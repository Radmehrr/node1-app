
const fs = require('fs')
const chalk = require('chalk')
const { title, argv } = require('process')
const { createBrotliCompress } = require('zlib')

const addNotes = (title,body) => {
    const notes = loadNotes()
    const dublicatenotes = notes.find((note) => note.title === title)
    if(!dublicatenotes){
        
        notes.push({
            title : title,
            body : body 
        })
        
        savenotes(notes)
        console.log(chalk.green.inverse('new notes added'))
    }else{
        console.log(chalk.red.inverse('note title taken!'))
    }
}
const savenotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json' , dataJSON)
}
const loadNotes = () => {
    
    try{
        const databuffer = fs.readFileSync('notes.json')
        const dataJSON = databuffer.toString()
        return JSON.parse(dataJSON)
    }catch(e){
        return []
    }
}

const removeNotes = (title) => {
    const notes = loadNotes()
    const notesToKeep = notes.filter((note) => note.title !== title)
    if(notes.length > notesToKeep){
        console.log(chalk.green.inverse('note removed!'))
        savenotes(notesToKeep)
    }else{
        console.log(chalk.red.inverse('No Note Found'))
    }
}

const listNotes = () =>{
    const notes = loadNotes()
    console.log(chalk.blue.inverse('your notes '))

    notes.forEach((note) => {
        console.log( 'title is : ' + note.title)
        console.log('body is : ' + note.body)
    })
}

const readNodes = (title) => {
    const notes = loadNotes()
    const note = notes.find((note) => note.title === title)
    if(note){
        console.log(chalk.inverse(note.title))
        console.log(note.body)
    }else{
        console.log(chalk.red.inverse('Note Not Found!'))
    }
}

module.exports = {
    addNotes,
    removeNotes,
    readNodes,
    listNotes
}