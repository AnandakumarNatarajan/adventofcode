import { getLines, readLines }  from "./fileutils.mjs"

class TNode {
    visible = 4
    constructor( height ) {
        this.height = height;
    }
}

const counter = function() {
    let count = 0

    return {
        inc() {
            count++
        },
        dec() {
            count--
        },
        get(){
            return count
        }
    }
}

const gridtree = function(r,c,ctr){

    let grid = Array.from(Array(r), () => new Array(c));
    let head = 0;
    let tail = 0;

    function addToGrid( treeHeight ) {
        grid[head][tail] = new TNode( treeHeight )
        ctr.inc()
        tail++;
        if( tail == c ) {
            tail = 0
            head++
        }
    }

    function check(i,j,h) {
        if( grid[i][j].height > h ) {
            h = grid[i][j].height
        } else {
            grid[i][j].visible--
            if( grid[i][j].visible <= 0 )
                ctr.dec()
        }
        return h
    }

    function findVisible(){

        for(let i = 0 ; i < r; i++ ) {
            let h = -1;
            for( let j = 0; j < c ; j++) {
                h = check(i,j,h)
            }
        }

        for(let i = 0 ; i < r; i++ ) {
            let h = -1;
            for( let j = c -1; j >= 0 ; j--) {
                h = check(i,j,h)
            }
        }

        for(let i = 0 ; i < r; i++ ) {
            let h = -1;
            for( let j = 0; j < c ; j++) {
                h = check(j,i,h)
            }
        }

        for(let i = r -1 ; i >= 0; i-- ) {
            let h = -1;
            for( let j = c-1; j >=0 ; j--) {
                h = check(j,i,h)
            }
        }

        // for(let i = 0; i < r; i++ ) {
        //     let row = ''
        //     for( let j = 0; j<c;j++) {
        //      //   gt.add(parseInt( lines[i][j] ))
        //      row += grid[i][j].visible == 0 ? 0 : 1
        //     }
        //     console.log(row)
        // }
    }

    function countvisible(i,j,h) {
        let v = 1;
        let t = 1;

        t=0
        for( let k = i-1; k >= 0 ; k-- ) {
            //console.log(grid[k][j].height)
            if( grid[k][j].height >= h ){
                t++;
                break;
            } 

            t++     
       }
        //console.log(`:${t}\n`)
        v*=t
        t=0
        for( let k = j-1; k >= 0 ; k-- ) {
            //console.log(grid[i][k].height)
            if( grid[i][k].height >= h ){
                t++
                break;
            }
            t++
        }
        //console.log(`:${t}\n`)

        v*=t
        t=0
        for( let k = j+1; k < c ; k++ ) {
            //console.log(grid[i][k].height)
            if( grid[i][k].height >= h ){
                t++
                break;
            } 
            t++        
        }
        //console.log(`:${t}\n`)

        v*=t
        t=0;
        for( let k = i+1; k < r ; k++ ) {
            //console.log(grid[k][j].height)
            if( grid[k][j].height >= h ){
                t++
                break;
            }
            t++
        }
//        console.log(`:${t}\n`)
        v*=t

        return v
    }

    function bestspot() {
        let max = 0;
        for(let i = 0 ; i < r; i++ ) {
            for( let j = 0; j < c ; j++) {
                let t = countvisible(i,j,grid[i][j].height);
                //console.log(`${i} ${j} : ${t}`)
                if( max < t ) {
                    max = t
                }
            }
        }
        return max
    }



    return {
        add( treeHeight ){
            addToGrid( treeHeight )
        },
        find() {
            findVisible()
            console.log( ctr.get() )
            //console.log( bestspot() )
            console.log( bestspot() )
        },
    }

}

async function part(  ) {
    const lines = await getLines('./input/8.txt')

    const r = lines.length
    const c = lines[lines.length-1].length;
    console.log( `${r} x ${c}` )

    const ctr = counter()
    const gt = gridtree(r,c,ctr)

    for(let i = 0 ; i < r; i++ ) {
        for( let j = 0; j<c;j++) {
            gt.add(parseInt( lines[i][j] ))
        }
    }

    gt.find()
    
}

await part()
