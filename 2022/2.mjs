import { readLines }  from "./fileutils.mjs"

async function part1() {
    const lines = await readLines('./input/2.txt')
    let sum = 0;
    for await ( const line of lines ) {
        let roundresult = 0;
        let play = line.split(' ')
        let p1 = (play[0].charCodeAt(0) - 64)
        let p2 = (play[1].charCodeAt(0) - 87)
        if( p1 - p2  == 0 ) {
            roundresult = p2 + 3;
        }
        else if( p1 - p2 == -1 || p1 - p2 == 2) {
            roundresult = p2 + 6;
        } else {
            roundresult = p2 + 0;
        }
        sum+=roundresult;
    }
    console.log(sum)
}

async function part2() {
    const lines = await readLines('./input/2.txt')
    let sum = 0;
    for await ( const line of lines ) {
        let roundresult = 0;
        let play = line.split(' ')
        let p1 = (play[0].charCodeAt(0) - 64)
        let p2 = (play[1].charCodeAt(0) - 87)
        if( p2 == 1 ) {
            p2 = p1-1;
            if(p2 < 1) p2 = 3;
            roundresult = p2 + 0;
        } else if( p2 == 2) {
            p2 = p1;
            roundresult = p2 + 3;
        } else {
            p2 = p1+1;
            if(p2 > 3) p2 = 1;
            roundresult = p2 + 6;
        }
        sum+=roundresult;
    }
    console.log(sum)
}

await part1()
await part2()