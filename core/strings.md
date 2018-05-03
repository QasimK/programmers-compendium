# String

## String Searching Algorithms

* Naive
* KMP 

### KMP \(Knuth-Morris-Pratt\)

When you're searching for "abad" and you fail a match at the last d, you already know an a \(the second one\) is matching so don't lose that information, just check for b next!

### Aho-Corasick 

Extends KMP to search for a dictionary of words inside another string.

It uses a trie with various internal links.

A trie = keyword tree = prefix tree is an implementation of a dictionary of strings that is efficient at construction and search.

## Reference Implementations

### Naive

```py
def naive(string, substring):
    for i in range(len(string)):
        for j in range(len(substring)):
            if string[i + j] != substring[j]:
                break
        else:
            return i
    return -1
```



