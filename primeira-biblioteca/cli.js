import chalk from "chalk";
import * as data from "./index.js";
import validateURL from "./http-validation.js"

const Argv = process.argv;
const Orange = chalk.hex('#FFA500');

async function processFile(path, validate) {
    const result = await data.getArchiveData(path)

    if (result.length > 0) {
        console.log(chalk.bold.bgGreen("Links encontrados:"))
        for (let index = 0; index < result.length; index++) {
            for (let i in result[index]) {
                console.log(`${ Orange(`[${i}]`) }: ${ chalk.blueBright(`${ result[index][i] }`) }` + " " + (validate && await validateURL(result[index][i]) === true ? chalk.green("[Link válido]") : chalk.red("[Link inválido]") || ""))
                if (validate == "validate-infos") {
                    console.log(`${chalk.gray("[Validação de link]")}: ${validateURL(result[index][i]) === true ? chalk.green(result[index][i] + " [Link válido]") : chalk.red(result[index][i] + " [Link inválido]")}`)
                }
            }
        }
    } else {
        console.log(chalk.bold.red("O texto não possui nenhum link."))
    }
}

async function processFolder(path, validate) {
    const result = await data.getFolderArchivesData(path)
    
    if (result.length > 0) {
        console.log(chalk.bold.bgGreen("Links encontrados:"))
        
        result.forEach((v, i) => {
            console.log(chalk.bold.bgBlue("Lendo arquivo " + i + ":"))

            for (let index in result[i]) {
                for (let data in result[i][index]) {
                    console.log(`${ Orange(`[${data}]`) }: ${ chalk.blueBright(`${ result[i][index][data] }`) }`)
                }
            }
        })
    } else {
        console.log(chalk.bold.red("O texto não possui nenhum link."))
    }
}

//console.log(getArchiveData(path[2]))

if (Argv[2] == "folder") {
    processFolder(Argv[3], Argv[4] || false)
} else if (Argv[2] == "file") {
    processFile(Argv[3], Argv[4] || false)
} else {
    console.log(Orange("O primeiro argumento deve ser o tipo de leitura. 'folder' ou 'file'"))
    console.log(Orange("[ARGS] type [folder / file] -v [validate true / false]"))
}