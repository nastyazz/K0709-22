// 1

function counter() {
    let count = 0

    return function() {
        count++
        return count
    }
}

const count = counter()
console.log(count())
console.log(count())


// 2
function countWords(str) {
    const words = str.trim().split(/\s+/)
    if (words[0] != '') {
        return words.length
    } else {
        return 0
    }
  }
  
console.log(countWords(`Привет, как дела?`))
console.log(countWords('привет'))
console.log(countWords(''))