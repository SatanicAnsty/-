let answer = "";
let answerState = "";
let mistakesCount = 0;
let lettersState;

startGame();

function startGame() {
  mistakesCount = 0;
  lettersState = getDefaultKeyboard();
  drawPerson();
  drawBoard(lettersState);
  generateWord();
}

function generateWord(mistakesCount) {
  answer = dictionary[Math.trunc(Math.random() * dictionary.length)]; // получили "слово-загадку", ктр нужно будет угадывать.
  answerState = "*".repeat(answer.length);
  drawAnswerState(answerState);
}

function onKeyClick(letter) {
  if (mistakesCount === 7) {
    alert("Ты сыграл в ящик :( Я загадал: " + answer);
    startGame();
    return;
  }

  let letterFromState;
  for (let item of lettersState) {
    if (item.char === letter) {
      letterFromState = item;
      break;
    }
  }

  if (!answer.includes(letterFromState.char) && !letterFromState.error) {
    mistakesCount += 1;
    letterFromState.error = true;
  }

  if (answer.includes(letter) && !letterFromState.success) {
    letterFromState.success = true;

    let interResult = answerState.split("");
    for (let i = 0; i < answer.length; i++) {
      if (answer[i] === letterFromState.char) {
        interResult[i] = letterFromState.char;
      }
    }
    answerState = interResult.join("");
  }

  drawPerson(mistakesCount);
  drawBoard(lettersState);
  drawAnswerState(answerState);

  if (answerState === answer) {
    winGame();
  }
}
