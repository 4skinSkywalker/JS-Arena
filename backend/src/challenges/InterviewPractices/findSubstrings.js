function solution({words, parts}) {
    words = [...words];
    class TrieNode {
        constructor() {
            this.children = {};
            this.is_end = false;
        }
    }

    function add_word(root, word) {
        let node = root;
        for (let letter of word) {
            if (!(letter in node.children)) {
                node.children[letter] = new TrieNode();
            }
            node = node.children[letter];
        }
        node.is_end = true;
    }

    function find_part(word, root) {
        let node = root;
        let length = 0;
        for (let i = 0; i < word.length; i++) {
            let letter = word[i];
            if (!(letter in node.children)) {
                return length;
            }
            node = node.children[letter];
            if (node.is_end) {
                length = i + 1;
            }
        }
        return length;
    }

    let root = new TrieNode();
    for (let part of parts) {
        add_word(root, part);
    }

    for (let i = 0; i < words.length; i++) {
        let word = words[i];
        let max_length = 0;
        let max_part = '';
        for (let j = 0; j < word.length; j++) {
            let part_length = find_part(word.substring(j), root);
            if (part_length > max_length) {
                max_length = part_length;
                max_part = word.substring(j, j + max_length);
            }
        }
        if (max_part) {
            words[i] = word.replace(max_part, '[' + max_part + ']', 1);
        }
    }
    return words;
}

module.exports = solution;