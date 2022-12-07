import { readLines }  from "./fileutils.mjs"

class DirNode {
    
    size = 0;

    constructor( name, parent ,isdir) {
        this.name = name
        this.parent = parent
        this.isdir = isdir

        if( this.isdir )
            this.children = []

    }

    updatesize( extra ) {
        this.size += extra;
        if( this.parent )
            this.parent.updatesize(extra)
    }

    setsize(size) {
        this.size = size
        if( this.parent )
            this.parent.updatesize(size)
    }

    getsize() {
        return this.size
    }

    addchild( child ) {
        this.children.push(child)
    }

}

const processcmd = function() {

    let root = null;
    let currDir = null;
    
    function process( line ) {

        if( line[0] == '$' ) {
            let cmds = line.split(' ')
            
            if( cmds[1] == 'cd' )  {

                if(cmds[2] == '/') {
                    if( root == null ) { 
                        root = new DirNode('/',null,true);
                    }
                    currDir = root;    
                } else if ( cmds[2].match('^[a-zA-Z0-9_]*$') ) {
                    currDir.children.forEach( child => {
                        if( child.name == cmds[2] )
                            currDir = child
                    });
                }
                else /*cd ..*/{
                    currDir = currDir.parent;
                }
            } 
            return;
        }

        let item = line.split(' ')

        if( item[0] == 'dir' ) {
            currDir.addchild( new DirNode(item[1],currDir,true) )
        } else {
            let newFile = new DirNode(item[1],currDir,false)
            newFile.setsize(parseInt(item[0]))
            currDir.addchild(newFile)
        }
    }

    function sum(size,node) {
        let s = 0;
        if( node.isdir && node.size <= size ) {
            s+=node.size
        }
        if( node.isdir )
        node.children.forEach(child => {
            s += sum(size,child)
        }); 
        return s;
    }

    const findDirToDelete = function(x) {
        let size = Infinity;
        function find( limit, node ) {
            if( node.size > limit ) {
                if(size > node.size)
                    size = node.size
            } 
            node.children.forEach(child => {
                if(child.isdir) {
                    find(limit,child)
                }
            })
            return size
        }
        return find(x,root)
    }


    return {
        process( line ) {
            process(line)
        },        
        getsum(size){
            return sum(size,root)
        },
        find(total, minreq) {            
            return findDirToDelete( minreq - ( total - root.size ) )
        } 
    }
};

async function part( ) {
    const lines = await readLines('./input/7.txt')
    
    let pcmd = processcmd()

    for await (let line of lines ) {
        pcmd.process(line)
    }

    console.log(pcmd.getsum(100000))
    console.log(pcmd.find(70000000,30000000))
}

await part();