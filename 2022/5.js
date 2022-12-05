import { LinkedList } from "./LinkedList.js";
import { Node } from "./Node.js";

import { getLines, readLines }  from "./fileutils.mjs"

async function part1() {

    let lines = await getLines('./input/5-1.txt')
    let lcount = lines.length;
    let total_stacks = lines[lcount - 1].split('   ').length;

    let stacks = [];

    let i = 0;
    while( i < total_stacks ) {
        stacks.push( new LinkedList() )
        i++
    }

    let j = lcount - 2;

    for( ; j >= 0 ; j--){
        let k=0;
        let s = 0;
        while( k < lines[j].length ) {

            let space = 0
            while ( lines[j][k] == ' ' ) {
                space++;
                k++;
            }

            if(space > 1) {
                if( space%5 !=0)
                    space++;
                s+= parseInt( (space-2)/3 );
                continue;
            }
            else if(space == 1) {
                continue;
            }
     
            if(lines[j][k] == '[' || lines[j][k] == ']' ) {
                k++
                continue
            }

            if( lines[j].charCodeAt(k) >= 65 && lines[j].charCodeAt(k) <= 90 ) {
                //console.log( lines[j][k]  + ' ' + s )
                stacks[s].prependNode(new Node(lines[j][k]))
                s++;
                k++;
                //console.log(stacks)
                continue;
            }
                
        }

    }



    const oprs = await readLines('./input/5-2.txt')

    console.log('\n\n')

    for await (let opr of oprs ) {

       let operands = opr.split(' ');

       //console.log( parseInt(operands[1]) , parseInt(operands[3]) , parseInt(operands[5]) )
       //part2
       stacks[ parseInt(operands[3])-1 ].movetoSameOrder( parseInt(operands[1]) , stacks[ parseInt(operands[5])-1 ] ) 
       // part1
       //stacks[ parseInt(operands[3])-1 ].moveto( parseInt(operands[1]) , stacks[ parseInt(operands[5])-1 ] ) 
    }

    let sum = '';
    stacks.forEach(element => {
        //element.print()
        sum += element.head.data ;
    });

    console.log(sum)
}

part1();