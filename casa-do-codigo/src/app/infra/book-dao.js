class BookDataAccessObject {
    constructor(db) {
        this._db = db
    }

    list() {
        return new Promise((resolve, reject) => {
            this._db.all("SELECT * FROM livros", (error, result) => {
                if (error) reject("Não foi possível listar os livros!");

                return resolve(result);
            })
        })
    }
}

module.exports = BookDataAccessObject;