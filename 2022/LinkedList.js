export class LinkedList {

    constructor(head = null) {
        this.head = head
    }

    appendNode( newNode ) {
        let node = this.head;
        if( node == null ) {
            this.head = newNode;
            return
        }
        while(node.next) {
            node = node.next
        }
        node.next = newNode;
    }

    prependNode( newNode ) {
        newNode.next = this.head;
        this.head = newNode;
    }

    prependNodeList( newHead, newNode ) {
        newNode.next = this.head;
        this.head = newHead;
    }

    print() {
        let node = this.head;
        while( node ) {
            console.log(node.data + '->' )
            node = node.next;
        }
        console.log( null )
    }

    moveto( count, targetList ) {
        //console.log( 'count : ' + count + '\n' )
        //targetList.print()
        let node = this.head;
        let prev = null;
        while(count>0){
            let tem = node.next

            if( node == null )
            this.head = null
            else
            this.head = node.next
            
            targetList.prependNode(node)

            node = tem;
            count--;
        }
    }

    movetoSameOrder( count, targetList ) {
        let node = this.head;
        let prev = null;
        while(count>0){
            prev = node;
            node = node.next;
            count--;
        }

        targetList.prependNodeList(this.head, prev)

        this.head = node;
    }
}
