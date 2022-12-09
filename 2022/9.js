import { readLines } from "./fileutils.mjs";


const bridge = function() {

    let map = new Map()
    let count = 0
    let i=0,j=0
    let ti=0, tj=0

    function moveable() {
        return Math.abs( i-ti ) > 1 || Math.abs( j-tj ) > 1
    }

    function movehandt( d ) {
        switch( d ) {
            case 'U' :
                i++
                break
            case 'D' :
                i--
                break
            case 'R' :
                j++
                break
            case 'L' :
                j--
                break
        }
        console.log(moveable())
        if( moveable() ) {
            if( i == ti ) {
                if( j > tj ) {
                    tj++
                } else {
                    tj--
                }
            } else if ( j == tj ) {
                if( i > ti )
                    ti++
                else
                    ti--
            } else {
                if( i > ti && j > tj ) {
                    ti++
                    tj++
                } else if ( i > ti && j < tj ) {
                    ti++
                    tj--
                } else if ( i < ti && j < tj ) {
                    ti--
                    tj--
                } else {
                    ti--
                    tj++
                }
            }

            if( !map.has(`${ti}:${tj}`) )
                count++
            else    
                map.set(`${ti}:${tj}`,true)

        }
        console.log(`${i} ${j} : ${ti} ${tj}` )

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


async function part() {

    const lines = await readLines('./input/9.txt')

    const b = bridge()

    for await ( let line of lines ) {
        //console.log( line )
        let m = line.split(' ')
        let s = parseInt( m[1] )
        
        while(s) {
            b.move(m[0])
            s--
        }
    }

    console.log(b.get())

}

await part();

// const ropebride = function() {
  
//     let hi = 0
//     let hj = 0
//     let ti = 0
//     let tj = 0
//     let map = new Map() 
//     let prev = null
//     let count =0;

//     function setmap( key ) {
//         if(!map.has( key )) {
//             map.set( key, true )
//             count++
//         }
//     }

//     function movetail(dir, step) {
//         switch( dir ){
//             case 'U' : 
//                 for( let i=ti; i < ti+step; i++ )
//                     setmap(`${i}.${tj}`)
//                 ti+=step
//                 break
//             case 'D' :
//                 for( let i=ti; i < ti-step; i-- )
//                     setmap(`${i}.${tj}`)
//                 ti-=step
//                 break
//             case 'R' : 
//                 for( let j=tj; j < tj+step; j++ )
//                     setmap(`${ti}.${j}`)
//                 tj+=step
//                 break
//             case 'L' : 
//                 for( let j=tj; j < tj-step; j++ )
//                     setmap(`${ti}.${j}`)
//                 tj-=step
//                 break
//         }
//     }

//     function moveHead( dir, step ) {
//         if( !prev ) {
//             switch( dir ){
//                 case 'U' : 
//                     hi+=step
//                     break
//                 case 'D' :
//                     hi-=step
//                     break
//                 case 'R' : 
//                     hj-=step
//                     break
//                 case 'L' : 
//                     hj+=step
//                     break
//             }
//             movetail(dir,step-1)
//             prev = dir
//         }

//         if( prev == dir ) {
//             movetail(dir,step-1)
//         } else if( ( prev == 'R' && dir == 'L') || ( prev == 'L' && dir == 'R' ) ) {
//             movetail(dir,step-2)
//         } else if( ( prev == 'U' && dir == 'D') || ( prev == 'D' && dir == 'U' ) ) {
//             movetail(dir,step-2)       
//         } else {
//             switch( dir ){
//                 case 'U' : 
//                     hi+=step
//                     break
//                 case 'D' :
//                     hi-=step
//                     break
//                 case 'R' : 
//                     hj-=step
//                     break
//                 case 'L' : 
//                     hj+=step
//                     break
//             }
//         }
//     }
    
//     return {
//          move(dir, step){
//             moveHead(dir,step)
//          }
//     }
// }

// async function part(  ) {
//     const lines = await readLines ('./input/9.txt')

//     let count = 0
//     let prev

//     const bridge = readLines()
//     for await (let line of lines) {

//         let move = line.split(' ')
//         bridge.move(move[0], parseInt( move[1] ) )

//     }
// }

// await part()