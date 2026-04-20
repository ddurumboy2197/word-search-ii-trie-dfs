class TrieNode {
    constructor() {
        this.children = {};
        this.word = null;
    }
}

class Trie {
    constructor() {
        this.root = new TrieNode();
    }

    insert(word) {
        let node = this.root;
        for (let char of word) {
            if (!node.children[char]) {
                node.children[char] = new TrieNode();
            }
            node = node.children[char];
        }
        node.word = word;
    }

    search(word) {
        let node = this.root;
        for (let char of word) {
            if (!node.children[char]) {
                return false;
            }
            node = node.children[char];
        }
        return node.word !== null;
    }
}

function findWords(board, words) {
    let trie = new Trie();
    for (let word of words) {
        trie.insert(word);
    }

    let rows = board.length;
    let cols = board[0].length;
    let directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
    let visited = new Array(rows).fill(false).map(() => new Array(cols).fill(false));

    function dfs(i, j, node, word) {
        if (node.word !== null && node.word === word) {
            return true;
        }
        if (node.word !== null) {
            return false;
        }
        visited[i][j] = true;
        for (let [dx, dy] of directions) {
            let x = i + dx;
            let y = j + dy;
            if (x >= 0 && x < rows && y >= 0 && y < cols && !visited[x][y] && board[x][y] === word[word.length - 1]) {
                if (dfs(x, y, node.children[board[x][y]], word + board[x][y])) {
                    return true;
                }
            }
        }
        visited[i][j] = false;
        return false;
    }

    let result = [];
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            let node = trie.root;
            for (let char of board[i]) {
                if (!node.children[char]) {
                    break;
                }
                node = node.children[char];
            }
            if (node.word !== null) {
                result.push(node.word);
            } else {
                if (dfs(i, j, trie.root, board[i][j])) {
                    result.push(board[i][j]);
                }
            }
        }
    }
    return result;
}
```

Kodda, `TrieNode` klassi so'zlar ro'yxatini saqlash uchun ishlatiladi. Har bir nodda, so'zlar uchun qo'shimcha ma'lumotlar saqlanadi. `Trie` klassi so'zlar ro'yxatini saqlash uchun ishlatiladi. Har bir so'z ro'yxatiga qo'shiladi. `findWords` funksiyasi gridda so'zlar ro'yxatini topish uchun ishlatiladi. Funksiya gridning har bir nuqtasidan boshlab, DFS algoritmini ishlatib, so'zlar ro'yxatini topadi.
