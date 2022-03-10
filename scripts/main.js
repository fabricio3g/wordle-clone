import("./dictionary.js");
// GLOBAL CONSTANTS
const NUMBER_GUESS = 6;
const NUMBER_WORDS = 4; // BASE ON INDEX 0
const DICTIONARY_WORD = WORDS;
const WORD_GUESS =
  DICTIONARY_WORD[Math.round(Math.random() * DICTIONARY_WORD.length - 1)];
//----------
console.log(WORD_GUESS);

const MatchResult = {
  GUESSED_WORD: 1,
  IS_NOT_IN_DICTIONARY: 2,
  WORD_NOT_EXIST: 3,
};

const WordEnum = {
  CORRECT: 1,
  ALMOST: 2,
  INCORRECT: 3,
};

// HTML ELEMENTS

const collection = document.querySelectorAll("#collection-row");
const messege = document.querySelector(".messege");
const virtual_keyboard = document.querySelector(".virtual-keyboard");

// Global variable
let maps = [];
let arrayChar = ["", "", "", "", ""];
let count = 0;
let wordCol = 0;

let WORD = [];

let ActualGuess = 0;

//------------

//-----------------
function isWord(word, dictionaryWord) {
  /*
  * Simple Search
  * If the list is to big I would take forever to search 
  * something there, but for this case is fast enough
  */
  let value = null;
  for (let i = 0; i < dictionaryWord.length; i++) {
    if (dictionaryWord[i] == word.join("")) {
      value = dictionaryWord[i].toLowerCase();
      break;
    }
  }
  return value;
}

function checkLetter(array, word_guess) {
  let { CORRECT, ALMOST, INCORRECT } = WordEnum;
  let guess = word_guess;
  let arrIndex = 0;
  let arr = [...array];
  let map = [INCORRECT, INCORRECT, INCORRECT, INCORRECT, INCORRECT];
  do {
    for (let i = 0; i <= 5; i++) {
      if (guess[arrIndex] === arr[i]) {
        if (arrIndex === i) {
          arr[i] = "";
          map[i] = CORRECT;
          continue;
        } else {
          map[i] = ALMOST;
          continue;
        }
      }
    }
    arrIndex++;
  } while (arrIndex <= 4);

  return map;
}

function matchWord(word, dictionary_word, word_guess) {
  const wordExist = isWord(word, dictionary_word);

  if (wordExist === word_guess) {
    return MatchResult.GUESSED_WORD;
  }

  if (wordExist != word_guess && wordExist) {
    return MatchResult.IS_IN_DICTIONARY;
  }

  if (!wordExist) {
    return MatchResult.IS_NOT_IN_DICTIONARY;
  }
}

//

function virtual_keyboard_press(e) {
  let data = {
    keyCode: "",
    key: "",
  };

  data.keyCode = e.target.innerHTML.charCodeAt();
  data.key = String.fromCharCode(e.target.innerHTML.charCodeAt()).toLowerCase();
  render(data);
}

//

function render(e) {
  // ADD NEW LETTER
  if (
    (e.key === null ? false : true) &&
    count >= 0 &&
    count <= 4 &&
    e.keyCode >= 65 &&
    e.keyCode <= 90
  ) {
    arrayChar[count] = e.key.toLowerCase();
    collection[0].children[wordCol].children[count].innerText = String(
      arrayChar[count]
    ).toUpperCase();
    collection[0].children[wordCol].children[count].classList.add("new-border");
    count !== 4 ? count++ : null;
  }

  // REMOVE LETTER
  if (count != -1 && e.keyCode === 08) {
    collection[0].children[wordCol].children[count].classList.remove(
      "new-border"
    );
    arrayChar[count] = '';
    collection[0].children[wordCol].children[count].textContent = arrayChar[count];
    count != 0 ? count-- : (count = 0);
  }

  // SEND LETTER AND DO ALL CHECKS
  console.log(arrayChar[4])
  if (e.keyCode == 13 && !(arrayChar[4] === '')){
    console.log(count)
    WORD = arrayChar;
    // check if is the correct word
    if (
      matchWord(WORD, DICTIONARY_WORD, WORD_GUESS) === MatchResult.GUESSED_WORD
    ) {
      const { CORRECT } = WordEnum;

      maps.push = [CORRECT, CORRECT, CORRECT, CORRECT, CORRECT];
      for (let i = 0; i < 5; i++) {
        collection[0].children[wordCol].children[i].classList.remove(
          "new-border"
        );
        collection[0].children[wordCol].children[i].classList.add("correct");
      }
      messege.innerHTML = `<p class="bg-black border border-green-600 w-80 rounded text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-lg text-center messeges p-5 shadow">
                You win <br/>
                <button  onclick=location.reload() class='bg-white text-green-600 hover:text-green-800 hover:bg-gray-200 py-2 px-2 m-0.5 rounded w-50 cursor-pointer'>Play again</button>
                </p>`;

      wordCol = 7;
      count = 0;
    }

    // check if is in the dictionary and check every word
    if (
      matchWord(WORD, DICTIONARY_WORD, WORD_GUESS) ===
      MatchResult.IS_IN_DICTIONARY
    ) {
      console.log("MATCH");
      let { CORRECT, ALMOST, INCORRECT } = WordEnum;
      let result = checkLetter(WORD, WORD_GUESS);
      result.forEach((value, index) => {
        if (value === CORRECT) {
          collection[0].children[wordCol].children[index].classList.remove(
            "new-border"
          );
          collection[0].children[wordCol].children[index].classList.add(
            "correct"
          );
        }
        if (value === ALMOST) {
          collection[0].children[wordCol].children[index].classList.remove(
            "new-border"
          );
          collection[0].children[wordCol].children[index].classList.add(
            "almostCorrect"
          );
        }
        if (value === INCORRECT) {
          collection[0].children[wordCol].children[index].classList.remove(
            "new-border"
          );
          collection[0].children[wordCol].children[index].classList.add(
            "incorrect"
          );
        }
      });
      arrayChar = ['', '', '', '', '']
      wordCol != 7 ? wordCol++ : null;
      count = 0;
    }

    // is not in the dictionary and show some messege
    if (
      matchWord(WORD, DICTIONARY_WORD, WORD_GUESS) ===
      MatchResult.IS_NOT_IN_DICTIONARY
    ) {
      console.log(arrayChar);
      messege.innerHTML = `<p class="bg-black border border-green-600 rounded text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-lg text-center messeges p-5 shadow">Palabra no encontrada</p>`;
      setTimeout(() => {
        messege.innerHTML = ``;
      }, 3000);
      console.log("show messege");
    }

    if (wordCol === 6) {
      messege.innerHTML = `<p class="bg-black border border-green-600 w-80 rounded text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-lg text-center messeges p-5 shadow">
                You lost <br/>
                <span class="text-white">WORD: <b>${WORD_GUESS.toUpperCase()}</b><span/><br/>
                <button onclick=location.reload() class='restar  bg-white text-green-600 hover:text-green-800 hover:bg-gray-200 py-2 px-2 m-0.5 rounded w-50 cursor-pointer'>Play again</button>
                </p>`;
    }
  }
  
}

// EVENT

window.addEventListener("keydown", (e) => {
  virtual_keyboard_press(e);

  render(e);
});

// virtual keyabord

// Top Part
virtual_keyboard.children[0].addEventListener("click", (e) => {
  virtual_keyboard_press(e);
});
// Middle Part
virtual_keyboard.children[1].addEventListener("click", (e) => {
  virtual_keyboard_press(e);
});
// Bottom part
virtual_keyboard.children[2].addEventListener("click", (e) => {
  let data = {
    keyCode: "",
    key: "",
  };

  if (e.target.innerHTML === "ENVIAR") {
    data.keyCode = 13;
    data.key = null;
    render(data);
  }
  if (e.target.innerHTML === "⌫") {
    data.keyCode = 08;
    data.key = false;
    render(data);
  }
  if (e.target.innerHTML != "ENVIAR" && e.target.innerHTML != "⌫") {
    virtual_keyboard_press(e);
  }
});
