class BookDataAccessObject {
    constructor(db) {
        this._db = db
    }

    searchByID(ID) {
        return new Promise((resolve, reject) => {
            this._db.get("SELECT * FROM livros WHERE id = ?", [ID], (err, book) => {
                if (err) return reject("Não foi possível encontrar o livro com o ID " + ID)

                return resolve(book)
            })
        })
    }

    update(book) {
        return new Promise((resolve, reject) => {
            this._db.run("UPDATE livros SET titulo = ?, preco = ?, descricao = ? WHERE id = ?", [book.titulo, book.preco, book.descricao, book.id], (err) => {
                if (err) return reject("Não foi possível atualizar o livro!")

                resolve();
            })
        })
    }

    remove(id) {
        return new Promise((resolve, reject) => {
            this._db.run("DELETE FROM livros WHERE id = ?", [id], (err) => {
                if (err) return reject("Não foi possível deletar o livro!")

                resolve()
            })
        })
    }

    add(book) {
        return new Promise((resolve, reject) => {
            this._db.run("INSERT INTO livros (titulo, preco, descricao) values (?, ?, ?)", [book.titulo, book.preco, book.descricao], (err) => {
                if (err) console.log(err); return reject("Não foi possível adicionar o livro.")
                resolve();
            })
        })
    }


    list() {
        return new Promise((resolve, reject) => {
            this._db.all("SELECT * FROM livros", (error, result) => { if (error) reject("Não foi possível listar os livros!"); return resolve(result) })
        })
    }
}

module.exports = BookDataAccessObject;