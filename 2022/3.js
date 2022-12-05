import { readLines, getLines }  from "./fileutils.mjs"

const getPriority = function (elem) {
    return elem > 65 && elem <= 90 ? elem - 65 + 27  : elem - 96
}

async function part1() {

    const lines = await readLines('./input/3.out')

    let total = 0;
    for await (const line of lines) {
        let lmap = new Map();
        let i = 0, j = line.length/2;
        let sum = 0;
        while( i < line.length/2 ){ 
            lmap.set(line[i], true);
            i++;
        }

        while( j < line.length ) {
            if( lmap.has(line[j]) ){
                let priority = getPriority(line.charCodeAt(j))
                sum += priority
                break;                
            }
            j++;
        }
       total+=sum;
    }
    console.log(total)
}

async function part2() {
    const lines = await  getLines('./input/3.out')


    let total = 0;

    for(let j=0;j<lines.length;j=j+3) {
    
        let set1  = new Set();
        let set2  = new Set();
        let set3  = new Set();
        let i = 0;
        while( lines[j].length > i || lines[j+1].length > i || lines[j+2].length > i ) {
            if( lines[j].length > i )
                set1.add(lines[j][i])
            if( lines[j+1].length > i )
                set2.add(lines[j+1][i])
            if( lines[j+2].length > i )
                set3.add(lines[j+2][i])
            i++;
        }

        //console.log( new Set( [...set1].filter( x => set2.has(x) && set3.has(x) ) ).values())
        let commonelem = new Set( [...set1].filter( x => set2.has(x) && set3.has(x) ) ).values().next().value;
        //console.log(commonelem)
        total += getPriority( commonelem.charCodeAt(0) )
    }
    console.log(total)
}

await part1()
await part2()