import { readLines }  from "./fileutils.mjs"

async function part1() {
    const lines = await readLines('./input/4.txt')

    let count = 0;
    for await (let line of lines ) {

        let pairs = line.split(',')
        
        let elf1 = pairs[0].split('-')
        let elf2 = pairs[1].split('-')
        
        if( parseInt( elf1[0] ) <= parseInt( elf2[0]) && parseInt( elf1[1] ) >= parseInt( elf2[1] ) || 
                parseInt( elf1[0] ) >= parseInt( elf2[0]) && parseInt( elf1[1] ) <= parseInt( elf2[1] ) )   
                count++;

    }

    console.log(count)
}

async function part2() {
    const lines = await readLines('./input/4.txt')
    let count = 0;
    for await (let line of lines ) {

        let pairs = line.split(',')
        
        let elf1 = pairs[0].split('-')
        let elf2 = pairs[1].split('-')
        
        if( parseInt(elf1[0]) <= parseInt(elf2[0]) && parseInt(elf1[1]) >= parseInt(elf2[0]) ||     
                parseInt(elf1[0]) <= parseInt(elf2[1]) && parseInt(elf1[1]) >= parseInt(elf2[1]) ||
                parseInt(elf2[0]) <= parseInt(elf1[0]) && parseInt(elf2[1]) >= parseInt(elf1[0]) ||
                parseInt(elf2[0]) <= parseInt(elf1[1]) && parseInt(elf2[1]) >= parseInt(elf1[1]) )   
                count++;

    }
    console.log(count)
}


await part1()
await part2()