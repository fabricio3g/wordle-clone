
// GLOBAL CONSTANTS
const NUMBER_GUESS = 6
const NUMBER_WORDS = 5
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



// EVENT AND HTML ELEMENTS

