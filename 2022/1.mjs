import { readLines }  from "./fileutils.mjs"

async function part1() {
    const lines = await readLines('./input/1.txt')
    let max = 0;
    let sum = 0;
    for await ( const line of lines ) {
        
        if( line.length == 0 ) {
            if( sum > max )
                max = sum;
            sum = 0;
            continue;
        }

        sum += parseInt( line );
    }

    if( sum > max )
        max = sum;

    console.log(max)
}

let calories = [];

function insert( val ) {

    let index = 0;
    for( ; index < calories.length && calories[index] > val ; index++ );

    calories.length++;

    for( let i = calories.length - 2; i >= index ; i-- )
        calories[i+1] = calories[i]; 

    calories[index] = val;

}

async function part2() {
    const lines = await readLines('./input/1.txt')
    let sum = 0;
    for await ( const line of lines ) {
        
        if( line.length == 0 ) {
            insert(sum)
            sum = 0;
            continue;
        }

        sum += parseInt( line );
    }

    insert(sum)
}

await part1();
await part2()

let count = 3;
let sum = 0;
for(let i=0;i<count;i++){
    sum+= parseInt( calories[i] )
}
console.log(sum)