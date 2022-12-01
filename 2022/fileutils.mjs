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
