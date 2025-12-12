function ListNode(x) {
    this.value = x;
    this.next = null;
}

function solution({l, k}) {
    let dummy = new ListNode(0);
    dummy.next = l;
    let current = dummy;

    while (current && current.next) {
        if (current.next.value == k) {
            current.next = current.next.next;
        } else {
            current = current.next;
        }
    }

    return dummy.next;
}

module.exports = solution;