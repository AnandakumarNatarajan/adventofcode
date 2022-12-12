import { readLines }  from "./fileutils.mjs"

async function part1() {
    const lines = await readLines('./input/10.txt')

    let x = 1
    let cycle = 1
    let total = 0

    for await (let line of lines ) {
        let ins = line.split(' ');
        let n = ins[0] == 'noop' ? 1 : 2
        while(n) {
             //signal strength
            if( [20,60,100,140,180,220].includes( cycle ) ) {
                total+= cycle * x
            }
            n--
            cycle++
        }

        if( ins.length > 1 )
            x += parseInt(ins[1])

    }

    console.log(total)
}


async function part2() {
    const lines = await readLines('./input/10.txt')

    let x = 1
    let cycle = 1
    let total = 0

    let screen = Array.from(new Array(6),()=> new Array(40).fill('.'))
    let screenrow = 0;
    let screencol = 0;

    for await (let line of lines ) {
        let ins = line.split(' ');
        let n = ins[0] == 'noop' ? 1 : 2
        while(n) {

            if( screencol == x || screencol == x+1 || screencol == x-1) 
                screen[screenrow][screencol] = '#'
            //signal strength
            if( [40,80,120,160,200,240].includes( cycle ) ) {
                total+= cycle * x
                screenrow++
                screencol=-1
            }

            if(screenrow >= 6)
                break
            n--
            cycle++
            screencol++
        }

        if( ins.length > 1 ) {
            x += parseInt(ins[1])
            //screencol = x-1
        }

    }

    for(let  i=0; i<6;i++) {
        let row = ''
        for(let j=0 ;j<40;j++) 
            row+= `${screen[i][j]}`
        console.log(row)
    }
}

await part1()
await part2()