
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

const WordEnum = {
    CORRECT: 1,
    ALMOST: 2,
    CORRECT: 3
}

// USER WORD
let WORD = []
// GLOBAL VARIABLES 
let ActualGuess = 0;
//-----------------

function isWord(word, dictionaryWord){
    // Simple Search
   let value = null
   for(let i = 0; i < dictionaryWord.length; i++){
        if(dictionaryWord[i].toLocaleLowerCase() == word.join('')){
            value = dictionaryWord[i].toLocaleLowerCase()
            break
        }
   }
   return value
}


function checkingWords(array, word_guess){



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

let maps = [
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
    

    // ADD NEW LETTER
    if((count >= 0 && count <= 4) && (e.keyCode >= 65 && e.keyCode <= 90)){
        arrayChar[count] = e.key
        collection[0].children[wordCol].children[count].innerText = arrayChar[count].toLocaleUpperCase()
        collection[0].children[wordCol].children[count].classList.add('new-border')
        count !== 4? count++ : null
    }
   
    // REMOVE LETTER
    if((count != -1) && e.keyCode === 08){
        arrayChar[count] = ''
        collection[0].children[wordCol].children[count].classList.remove('new-border')
        collection[0].children[wordCol].children[count].innerText = arrayChar[count].toLocaleUpperCase()
        count != 0 ? count-- : count = 0
       
    }
    console.log(maps)
    
    // SEND LETTER AND DO ALL CHECKS
    if(e.keyCode == 13 && NUMBER_WORDS === count ){
        WORD = arrayChar

        // check if is the correct word
        if(matchWord(WORD, DICTIONARY_WORD, WORD_GUESS) === MatchResult.GUESSED_WORD){
            const { CORRECT } = WordEnum
            
            maps.push = [CORRECT ,CORRECT,CORRECT,CORRECT, CORRECT]
            for(let i = 0; i < 5; i++){
                collection[0].children[wordCol].children[i].classList.remove('new-border')
                collection[0].children[wordCol].children[i].classList.add('correct')
            }
            
        }

        // check if is in the dictionary and check every word
        if(matchWord(WORD, DICTIONARY_WORD, WORD_GUESS) === MatchResult.IS_IN_DICTIONARY){
            console.log('Proced to do all the checking stuff')
        }
        // is not in the dictionary and show some messege
        if(matchWord(WORD, DICTIONARY_WORD, WORD_GUESS) === MatchResult.IS_NOT_IN_DICTIONARY){
            console.log('show messege')
        }

        wordCol != 7 ? wordCol++ : null
        count = 0
    }
    
    
})
