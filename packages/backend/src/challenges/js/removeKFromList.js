function solution({l, k}) {
    let head = l;
    let prev = null;
    let curr = l;
    
   while (curr) {
       if (curr.value === k) {
           if (prev == null) {
               head = curr.next;
           } else {
               prev.next = curr.next;
           }
       } else {
           prev = curr;
       }
       
        curr = curr.next;
   }
   
   return head;
}

module.exports = solution;