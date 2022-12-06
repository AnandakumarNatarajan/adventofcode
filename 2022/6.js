import { getLines, readLines }  from "./fileutils.mjs"

async function part( windowsize ) {
    const lines = await readLines('./input/6.txt')

    let total = 0;
    for await (let line of lines ) {
        let win = windowsize;
        while(1) {
            let i = win - windowsize;
            let j = win;
           
            let c = true;
            let k ;
            while( j >= i ) {

                k = j-1;
                
                while( k >= i &&  ( c = ( line[k] != line[j] ) ) ) {k--;}

                if( !c ) {
                    break
                }

                j--;
            }
            
            if(c) {
                total+= win + 1;
                break
            } else {
                win = win +  (k - i + 1);
            }
        }
    }
    console.log(total)
}

await part( 4 - 1 )
await part( 14 - 1 )

