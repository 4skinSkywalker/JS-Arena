**Challenge Description**

When writing data to a storage system, any way to minimize the physical space used will increase the virtual space available. One powerful strategy to minimize physical space usage is through Inline Data Deduplication. When a write comes into a storage system with data that is identical to data previously written, the new write can be deduped to the old write by recording that the new write occurred but without needing to write the duplicate data to physical space again.

In this simplified design of a storage system, we’ll represent physical space as a sequential array, and a dedupe lookaside map as a hashmap. The system exposes three methods:

- `write()`, which takes data as input, determines whether the same data is stored in some location and, if found, returns the address of that location. Otherwise the data is stored in the next free space and returns the physical address of it;
- `read()`, which takes a physical address and returns the data stored at the address if valid;
- `delete()`, which takes a physical address and deletes one virtual copy of potentially deduped data at the address if valid.

Your task is to implement these methods. Given `operations`, a list of commands (of the three types described above), return an array of outputs corresponding to each of the commands.

**Example**

For `operations = ["WRITE Hello", "WRITE World", "READ 0", "READ 1", "DELETE 0", "WRITE World", "READ 0", "READ 1", "READ 2"]`, the output should be
`solution(operations) = ["0", "1", "Hello", "World", "Hello", "1", "None", "World", "None"]`.

- After the first two operations, the words Hello and World are stored at the addresses 0 and 1 respectively as they are the first empty addresses in the storage system.
- The next `READ 0` and `READ 1` methods return the words written at the addresses 0 and 1 (Hello, World).
- The `DELETE` method deletes the data written at the address 0 and returns that data (Hello).
- As we have the word World already at the physical address 1, the command `WRITE World` doesn't store the data at the next free space, instead just adds one virtual copy of the data to the address 1. So the method returns 1.
- The last 3 operations are `READ` operations and the results of these commands are the data at the addresses 0, 1, 2.