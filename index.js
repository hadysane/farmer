// const hello = "Hello world";

// console.log(hello)

const fs = require('fs'); //importer le module "fs"



/**
 * 1) Path file
 * 2) Encoding type: 'utf-8'
 */

// const textIn = fs.readFileSync('./txt/input.txt', 'utf-8')

// console.log(textIn);

//WRIITE FILE

/**
 * 1) Path where the file should be writen
 * 2) What should be written 
 */


// const textOut = `This is what we know about the avocado: ${textIn}`
    
// fs.writeFileSync('./txt/output.txt', textOut); 

// callback rappel quand une tache est executer 

//non-blocking, Asynchrone 
fs.readFile('./txt/input.txt', 'utf-8', function (err, data) { // la function callback sera executer lorsque la function readFile execute
    // console.log(data)
})

// callback hell nodeJs c'est faire des triangles asynchrone
fs.readFile('./txt/start.txt', 'utf-8', function (err, data1) {
    fs.readFile(`./txt/${data1}.txt`, 'utf-8', function (err, data2) { 
        fs.readFile(`./txt/append.txt`, 'utf-8', function (err, data3) {
            fs.writeFile(`./txt/final.txt`, `${data2}\n${data3}`, function (err, data4) {
                console.log('Your file has been writen successfully')
            })
        })
    })
})