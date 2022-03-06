
// GLOBAL CONSTANTS
const NUMBER_GUESS = 6
const NUMBER_WORDS = 4 // BASE ON INDEX 0 
const DICTIONARY_WORD = ["casas","autos", "arbol", 'casos', 'lazer', 'mirar']
const WORD_GUESS = "mirar"
//----------

const MatchResult = {
    GUESSED_WORD: 1,
    IS_NOT_IN_DICTIONARY: 2,
    WORD_NOT_EXIST: 3
}

const WordEnum = {
    CORRECT: 1,
    ALMOST: 2,
    INCORRECT: 3
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
        if(dictionaryWord[i] == word.join('')){
            value = dictionaryWord[i].toLowerCase()
            break
        }
   }
   return value
}


function checkLetter(array, word_guess){
    let {CORRECT, ALMOST, INCORRECT} = WordEnum
    let guess = word_guess
    let arrIndex = 0
    let arr = [...array]
    let map = [INCORRECT, INCORRECT, INCORRECT, INCORRECT, INCORRECT];
    do{
        for(let i = 0; i <= 5; i++){
            if(guess[arrIndex] === arr[i]){
                if(arrIndex === i){
                    arr[i] = ''
                    map[i] = CORRECT
                    continue
                }
                else{
                    map[i] = ALMOST
                    continue
                }
            }
        }
        arrIndex++
    }while(arrIndex <= 4)
    

    return map

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

//

function virtual_keyboard_press(e){
    let data = {
        keyCode: '',
        key: ''
    }

    data.keyCode = e.target.innerHTML.charCodeAt()
    data.key = (String.fromCharCode(e.target.innerHTML.charCodeAt())).toLowerCase()
    render(data)    
}

//

function render(e){
        // ADD NEW LETTER
        if((e.key === null ? false : true ) && (count >= 0 && count <= 4) && (e.keyCode >= 65 && e.keyCode <= 90)){
            arrayChar[count] = e.key
            collection[0].children[wordCol].children[count].innerText = String(arrayChar[count]).toUpperCase()
            collection[0].children[wordCol].children[count].classList.add('new-border')
            count !== 4? count++ : null
        }
       
        // REMOVE LETTER
        if((count != -1) && e.keyCode === 08){
            
            collection[0].children[wordCol].children[count].classList.remove('new-border')
            collection[0].children[wordCol].children[count].textContent = arrayChar[count]          
            count != 0 ? count-- : count = 0
           
        }
        
        // SEND LETTER AND DO ALL CHECKS
        if(e.keyCode == 13 && NUMBER_WORDS === count ){
            WORD = arrayChar
            console.log(WORD)
            // check if is the correct word
            if(matchWord(WORD, DICTIONARY_WORD, WORD_GUESS) === MatchResult.GUESSED_WORD){
                const { CORRECT } = WordEnum
                
                maps.push = [CORRECT ,CORRECT,CORRECT,CORRECT, CORRECT]
                for(let i = 0; i < 5; i++){
                    collection[0].children[wordCol].children[i].classList.remove('new-border')
                    collection[0].children[wordCol].children[i].classList.add('correct')
                }
                messege.innerHTML = `<p class=" text-xs text-green-600 text-center messeges p-0.5 border w-28 mx-auto rounded shadow m-5">Ganaste!</p>`
                
                wordCol = 7
                count = 0
            }
    
            // check if is in the dictionary and check every word
            if(matchWord(WORD, DICTIONARY_WORD, WORD_GUESS) === MatchResult.IS_IN_DICTIONARY){
                console.log('MATCH')
                let {CORRECT, ALMOST, INCORRECT} = WordEnum
                let result = checkLetter(WORD, WORD_GUESS)
                result.forEach((value,index)=>{
                    if(value === CORRECT){
                        collection[0].children[wordCol].children[index].classList.remove('new-border')
                        collection[0].children[wordCol].children[index].classList.add('correct')
                    }
                    if(value === ALMOST){
                        collection[0].children[wordCol].children[index].classList.remove('new-border')
                        collection[0].children[wordCol].children[index].classList.add('almostCorrect')
                    }
                    if(value === INCORRECT){
                        collection[0].children[wordCol].children[index].classList.remove('new-border')
                        collection[0].children[wordCol].children[index].classList.add('incorrect')
                    }
                    
                })
                wordCol != 7 ? wordCol++ : null
                count = 0
            }
            
            // is not in the dictionary and show some messege
            if(matchWord(WORD, DICTIONARY_WORD, WORD_GUESS) === MatchResult.IS_NOT_IN_DICTIONARY){
                messege.innerHTML = `<p class=" text-xs text-red-600 text-center messeges p-0.5 border w-28 mx-auto rounded shadow m-5">Palabra no encontrada</p>`
                setTimeout(()=>{
                    messege.innerHTML = ``
    
                }, 3000)
                console.log('show messege')
            }
    
            
        }
}

//----------
let maps = []


// HTML ELEMENTS

const collection = document.querySelectorAll('#collection-row')
const messege = document.querySelector('.messege')
const virtual_keyboard = document.querySelector('.virtual-keyboard')
// Global variable

let arrayChar = ["", "", "", "",""]
let count = 0
let wordCol = 0

// EVENT


window.addEventListener('keydown', e =>{
    
    virtual_keyboard_press(e)

    render(e)
    
})





// virtual keyabord


// Top Part
virtual_keyboard.children[0].addEventListener('click', e =>{
    virtual_keyboard_press(e)
})
// Middle Part
virtual_keyboard.children[1].addEventListener('click', e =>{
    virtual_keyboard_press(e)
})
// Bottom part
virtual_keyboard.children[2].addEventListener('click', e =>{
    let data = {
        keyCode: '',
        key: ''
    }
   
    if(e.target.innerHTML === 'ENVIAR'){
        data.keyCode = 13
        data.key = null
        render(data)
    }
    if(e.target.innerHTML === '⌫'){
        data.keyCode = 08
        data.key = false
        render(data)
    }
    if(e.target.innerHTML != 'ENVIAR' && e.target.innerHTML != '⌫'){
        virtual_keyboard_press(e)
    }
})