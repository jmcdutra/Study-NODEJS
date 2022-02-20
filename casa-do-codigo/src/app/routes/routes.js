const BookDataAccessObject = require("../infra/book-dao.js")
const db = require("../../config/database.js")

module.exports = (app) => {
    app.get('/', (request, response) => {
        response.send(`<!DOCTYPE html>
        <html lang="pt-br">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <title>Casa do código</title>
        </head>
        <body>
            <h1>Casa do código</h1>
        </body>
        </html>`)
    })

    app.get('/livros', (request, response) => {

        const books = new BookDataAccessObject(db);
        books.list().then(_books => response.marko(require("../views/livros/lista/lista.marko"), { livros: _books })).catch(err => {throw new Error(err)})

    })
} 