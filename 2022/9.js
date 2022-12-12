import { readLines } from "./fileutils.mjs";


const bridgewithnknots = function( num ) {

    let map = new Map()
    let count=0
    
    let arrti = new Array(num)
    let arrtj = new Array(num)

    arrti.fill(0)
    arrtj.fill(0)

    function moveable( a,b,x,y ) {
        return Math.abs( a-x ) > 1 || Math.abs( b-y ) > 1
    }

    function movehandt( d ) {
        switch( d ) {
            case 'U' :
                arrti[0]++
                break
            case 'D' :
                arrti[0]--
                break
            case 'R' :
                arrtj[0]++
                break
            case 'L' :
                arrtj[0]--
                break
        }
        let n = 1;
        
        while( num > n ) {
            //console.log(moveable( arrti[n],arrtj[n], arrti[n-1],arrtj[n-1] ))
     
            if( moveable( arrti[n],arrtj[n], arrti[n-1],arrtj[n-1] ) ) {
                if( arrti[n-1] == arrti[n] ) {
                    if( arrtj[n-1] > arrtj[n] ) {
                        arrtj[n]++
                    } else {
                        arrtj[n]--
                    }
                } else if ( arrtj[n-1] == arrtj[n] ) { 
                    if( arrti[n-1] > arrti[n] )
                    arrti[n]++
                    else
                    arrti[n]--
                } else {
                    if( arrti[n-1] > arrti[n] && arrtj[n-1] > arrtj[n] ) {
                        arrti[n]++
                        arrtj[n]++
                    } else if ( arrti[n-1] > arrti[n] && arrtj[n-1] < arrtj[n] ) {
                        arrti[n]++
                        arrtj[n]--
                    } else if ( arrti[n-1] < arrti[n] && arrtj[n-1] < arrtj[n] ) {
                        arrti[n]--
                        arrtj[n]--
                    } else {
                        arrti[n]--
                        arrtj[n]++
                    }
                }

                if( n == num -1 && !map.has(`${arrti[n]}:${arrtj[n]}`) ){
                    count++
                    map.set(`${arrti[n]}:${arrtj[n]}`,true)
                }    
            }
            n++
        }

    } 

    return {
        move( d ) {
            movehandt(d)
        },
        get(){
            return count
        }
    }
    
}


async function part1() {
    const lines = await readLines('./input/9.txt')
    const b = bridgewithnknots(1+1 /*1 head + 1 tail*/)

    for await ( let line of lines ) {
        //console.log( line )
        let m = line.split(' ')
        let s = parseInt( m[1] )
        
        while(s) {
            b.move(m[0])
            s--
        }
    }
    console.log(b.get() + 1 )
}

async function part2() {
    const lines = await readLines('./input/9.txt')
    const b = bridgewithnknots(1+9 /*1head 9 tails*/)

    for await ( let line of lines ) {
        //console.log( line )
        let m = line.split(' ')
        let s = parseInt( m[1] )
        
        while(s) {
            b.move(m[0])
            s--
        }
    }
    console.log(b.get() + 1 )
}



await part1();
await part2();