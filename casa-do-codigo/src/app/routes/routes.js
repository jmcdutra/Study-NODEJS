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

    app.get('/livros', (_, response) => {
        const books = new BookDataAccessObject(db);
        books.list().then(_books => response.marko(require("../views/livros/lista/lista.marko"), { livros: _books })).catch(err => {throw new Error(err)})
    })

    app.get('/livros/form', (_, response) => {
        response.marko(require("../views/livros/form/form.marko"), { livro: {} })
    })

    app.post("/livros", (request, response) => {
        const books = new BookDataAccessObject(db);

        books.add(request.body).then(response.redirect("/livros")).catch(err => console.log(err))
    })

    app.put("/livros", (request, response) => {
        const books = new BookDataAccessObject(db);

        books.update(request.body).then(response.redirect("/livros")).catch(err => console.log(err))
    })

    app.delete("/livros/:id", (request, response) => {
        const id = request.params.id;
        const books = new BookDataAccessObject(db);

        books.remove(id).then(() => response.status(200).end()).catch(err => console.log(err))
    })

    app.get("/livros/form/:id", (request, response) => {
        const id = request.params.id;
        const books = new BookDataAccessObject(db);

        console.log(id)

        books.searchByID(id).then(book => response.marko(require("../views/livros/form/form.marko"), {livro: book})).catch(err => console.log(err))
    })
} 