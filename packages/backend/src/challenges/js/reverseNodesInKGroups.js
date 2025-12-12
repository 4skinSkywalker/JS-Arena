function ListNode(value = 0, next = null) {
    this.value = value;
    this.next = next;
}

function solution({l, k}) {
    // Helper function to reverse a linked list
    var reverseLinkedList = function(start, end) {
        var prev = null;
        var curr = start;
        while (curr != end) {
            var nextNode = curr.next;
            curr.next = prev;
            prev = curr;
            curr = nextNode;
        }
        return prev;
    }

    var dummy = new ListNode(0);
    dummy.next = l;
    var prevGroupEnd = dummy;
    while (true) {
        // Find the start and end of the next group
        var groupStart = prevGroupEnd.next;
        var groupEnd = groupStart;
        for (var i = 0; i < k - 1; i++) {
            if (groupEnd === null) {
                return dummy.next;  // End of the list, no more groups to reverse
            }
            groupEnd = groupEnd.next;
        }

        if (groupEnd === null) {
            return dummy.next;  // End of the list, no more groups to reverse
        }

        // Reverse the current group and connect it with the previous group
        var nextGroupStart = groupEnd.next;
        var newGroupStart = reverseLinkedList(groupStart, nextGroupStart);
        prevGroupEnd.next = newGroupStart;
        groupStart.next = nextGroupStart;

        // Move prevGroupEnd to the end of the current group
        prevGroupEnd = groupStart;
    }

    return dummy.next;
}

module.exports = solution;