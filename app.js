//const validator = require('validator')
const chalk = require('chalk')
const notes = require('./notes')
const yargs = require('yargs')
const { argv } = require('process')
const { command } = require('yargs')
//const r = chalk.blue('world')
//console.log(r)
/*const command = process.argv[2]
if(command === 'add'){
    console.log('Adding notes!')
}else if(command === "remove"){
    console.log('removving notes!')
}*/

yargs.version('1.0.1')          
yargs.command({
    command : 'add',
    describe : 'add a new note',
    builder : {
        title : {
            discribe : 'note title',
            demandOption : true,
            type : 'string'
        },
        body : {
            discribe : 'note body',
            demandOption : true,
            type : 'string'
        }
    },
    handler(argv){
      notes.addNotes(argv.title,argv.body)
    }
})
yargs.command({
    command : 'list',
    discribe : 'note list',
    handler(argv){
        notes.listNotes(argv.title)
    }
})

yargs.command ({
    command : "remove",
    describe : "remove note",
    builder : {
        title : {
            discribe : "note title",
            demandOption : true,
            type : "string"
        }
    },
    handler(argv){
        notes.removeNotes(argv.title)
    }
})
yargs.command ({
    command : "read",
    discribe : "read note",
    builder : {
        title : {
            discribe : "note title",
            demandOption : true,
            type : "string"
        }
    },
    handler(argv){
        notes.readNodes(argv.title)
    }

})

yargs.parse()