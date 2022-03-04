
// GLOBAL CONSTANTS
const NUMBER_GUESS = 6
const NUMBER_WORDS = 4 // BASE ON INDEX 0 
const DICTIONARY_WORD = ["casas","autos", "arbol"]
const WORD_GUESS = "casas"
//----------

const MatchResult = {
    GUESSED_WORD: 1,
    IS_NOT_IN_DICTIONARY: 2,
    WORD_NOT_EXIST: 3
}

// USER WORD
const WORD = "ARBOL".toLocaleLowerCase()
// GLOBAL VARIABLES 
let ActualGuess = 0;
//-----------------

function isWord(word, dictionaryWord){
    // Simple Search
   let value = null
   for(let i = 0; i < dictionaryWord.length; i++){
        if(dictionaryWord[i].toLocaleLowerCase() == word){
            value = dictionaryWord[i].toLocaleLowerCase()
            break
        }
   }
   return value
}

function matchWord(word, dictionary_word, word_guess){
    const wordExist = isWord(word, dictionary_word)

    if(wordExist === word_guess){
        return MatchResult.GUESSED_WORD
    }

    if(wordExist != word_guess && wordExist){
        return MatchResult.IS_IN_DICTIONARY  
    }

    if(!wordExist){
        return MatchResult.IS_NOT_IN_DICTIONARY
    }
}



function game(word, dictionary_word, word_guess){
    const { GUESSED_WORD, IS_IN_DICTIONARY, IS_NOT_IN_DICTIONARY } = MatchResult

    let result = matchWord(word, dictionary_word, word_guess)
    if(result === GUESSED_WORD) return
    if(result === IS_IN_DICTIONARY) return
    if(result === IS_NOT_IN_DICTIONARY) return
    
}


let map = [
    ["*","*","*","*",]
]


// HTML ELEMENTS

const collection = document.querySelectorAll('#collection-row')


// Global variable

let arrayChar = ["", "", "", "",""]
let count = 0
let wordCol = 0

// EVENT


window.addEventListener('keydown', e =>{
    
    if((count >= 0 && count <= 4) && (e.keyCode >= 65 && e.keyCode <= 90)){
        arrayChar[count] = e.key
        collection[0].children[wordCol].children[count].innerText = arrayChar[count].toLocaleUpperCase()
        collection[0].children[wordCol].children[count].classList.add('new-border')
        count !== 4? count++ : null
    }
   
    if((count != -1) && e.keyCode === 08){
        
        arrayChar[count] = ''
        console.log(arrayChar, count)
        collection[0].children[wordCol].children[count].innerText = arrayChar[count].toLocaleUpperCase()
        collection[0].children[wordCol].children[count].classList.remove('new-border')
        count != 0 ? count-- : count = 0
       
    }

    if(e.keyCode == 13 && NUMBER_WORDS === count ){ 
        wordCol != 7 ? wordCol++ : null
        count = 0
    }
    
    
})
