import fs from 'fs'
import readline from 'readline'

export async function readLines( path ) {

        const filestream = fs.createReadStream(path);

        const lines = readline.createInterface({
                input:filestream,
                crlfDelay: Infinity
        });

              
        return lines;
}

export async function getLines( path ) {

        const filestream = fs.createReadStream(path);

        const rlines = readline.createInterface({
                input:filestream,
                crlfDelay: Infinity
        });

        let lines = [];

        for await (let line of rlines)
                lines.push(line)
              
        return lines;
}
