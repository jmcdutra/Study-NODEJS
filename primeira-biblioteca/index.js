import chalk from "chalk";
import * as fs from 'fs';
import path from "path";

const log = msg => { console.log(chalk.green(msg)) } 
const error = msg => { throw new Error(chalk.bold.red(msg))};
const warning = msg => { console.log(chalk.hex('#FFA500')(msg)) };

function getMarkdownLinks(text) {
    const regex = /\[([^\]]*)\]\(((?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[A-Z0-9+&@#\/%=~_|$]))\)/gim;
    const arrayResults = [];
    let temp;

    while ( (temp = regex.exec(text)) !== null ) {
        arrayResults.push({ [temp[1]]: temp[2] })
    }
    
    return arrayResults;
}

export async function getArchiveData(file) { // Função assíncrona (async await)
    try {
        const data = await fs.promises.readFile(file, "utf-8")

        return getMarkdownLinks(data);
    } catch (err) {
        error(err)
    } finally {
        log("Operação concluida!")
    }
}

export async function getFolderArchivesData(folder) { // Função assíncrona (async await)
    try {
        const pathAbsolute = path.join(path.dirname(folder), '.', folder)
        const archives = await fs.promises.readdir(pathAbsolute, { encoding: "utf-8" })
        const result = await Promise.all(archives.map(async (file) => {
            const localFile = `${pathAbsolute}${file}`
            const data = await fs.promises.readFile(localFile, "utf-8")
            return getMarkdownLinks(data)
        }));
        return result;
    } catch (err) {
        error(err)
    } finally {
        log("Operação concluida!")
    }
}

// getFolderArchivesData("./archives/")

/* Função assíncrona (Promise)
function getArchiveData(file) {
    fs.promises.readFile(file, "utf-8")
    .then((data) => log(data))
    .catch((err) => error(err)) 
}
/*

/* Função síncrona
function getArchiveData(file) {
    fs.readFile(file, "utf-8", function(msgError, data) {
        if (msgError) {
            return error(msgError)
        }
        log(data)
    })
}
*/

// getArchiveData("./archives/texto1.md")
