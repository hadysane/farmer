const fs  = require('fs');
const http = require('http')
const url = require('url');
const replaceTemplate = require('./modules/replaceTemplate')


//READ TEMPLATE 
const tempOverview = fs.readFileSync(`${__dirname}/templates/overview.html`, 'utf-8')
const tempCard = fs.readFileSync(`${__dirname}/templates/card.html`, 'utf-8')
const tempProduct = fs.readFileSync(`${__dirname}/templates/product.html`, 'utf-8')

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8')
const dataObject = JSON.parse(data) // convertir le string json en object json 


const server = http.createServer(function (req, res) {
    const { pathname, query } = url.parse(req.url, true); 

    //overview
    if (pathname === '/') {
        const cardsHtml = dataObject.map((el) => replaceTemplate(tempCard, el)).join('')
        // console.log(cardsHtml)

        const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml)

        res.writeHead(200, { 'Content-Type': 'text/html' })
        
        return res.end(output)

        // Product
    } else if (pathname === '/product') {
        const product = dataObject[query.id]
        const output = replaceTemplate(tempProduct, product)

        res.writeHead(200, { 'Content-Type': 'text/html' })

        return res.end(output)
        
      //API
    } else if (pathname === '/api') {
      
        res.writeHead(200, { 'Content-Type': 'application/json' })
        return res.end(data)
    
    }

    //__direname : ou se trouve le ficher qu'on fait appel 
    
    //Not found
    res.writeHead(404, {'Content-Type': 'text/html'})
    res.end('<h1>Page not found</h1>')


    // res.end('Hello from the server !')
})

server.listen(8000, '127.0.0.1', function () {
    console.log('Server listening...');
})
