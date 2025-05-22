// Изначально рисовать пустую виселицу
// - 1 добавляется голова
// - 1 добавляется тело
// - 1 добавляется левая рука
// - 1 добавляется правая рука
// - 1 добавляется левая нога
// - 1 добавляется правая нога
// - 1 game over

const canvas = document.getElementsByTagName('canvas')[0];
const canvasContext = canvas.getContext('2d');
canvas.width = 500;
canvas.height = 220;

function drawPerson(errorsCount) {
  canvasContext.clearRect(0, 0, 100, canvas.height);
  canvasContext.fillRect(5, 140, 80, 10);
  canvasContext.fillRect(7, 10, 5, 130);
  canvasContext.lineWidth = 3;

  canvasContext.beginPath();
  canvasContext.strokeStyle = 'black';
  if (errorsCount > 0) {
    // стойка
    canvasContext.fillRect(10, 15, 40, 3);
    canvasContext.fillRect(40, 15, 2, 10);
  }

  if (errorsCount > 1) {
    // голова
    canvasContext.arc(41, 40, 15, 0, 360);

    canvasContext.moveTo(35, 33);
    canvasContext.arc(35, 35, 1, 0, 360);

    canvasContext.moveTo(47, 33);
    canvasContext.arc(47, 35, 1, 0, 360);

    canvasContext.moveTo(49, 50);
    canvasContext.arc(
      41,
      55,
      10,
      -(Math.PI * 0.2),
      Math.PI + Math.PI * 0.2,
      true
    );
  }

  if (errorsCount > 2) {
    // тело
    canvasContext.moveTo(41, 55);
    canvasContext.lineTo(41, 95);
  }

  if (errorsCount > 3) {
    // левая рука
    canvasContext.moveTo(41, 60);
    canvasContext.lineTo(30, 80);
  }

  if (errorsCount > 4) {
    // правая рука
    canvasContext.moveTo(41, 60);
    canvasContext.lineTo(52, 80);
  }

  if (errorsCount > 5) {
    // левая нога
    canvasContext.moveTo(41, 95);
    canvasContext.lineTo(30, 120);
  }

  if (errorsCount > 6) {
    // правая нога
    canvasContext.moveTo(41, 95);
    canvasContext.lineTo(52, 120);
  }
  canvasContext.stroke();
}

function drawBoard(lettersState) {
  canvasContext.font = '35px serif';
  const leftPadding = 120;
  const lettersInLine = 8;
  canvasContext.lineWidth = 2;
  canvasContext.clearRect(
    leftPadding - 10,
    0,
    canvas.width - leftPadding,
    canvas.height - 60
  );

  for (let i = 0; i < lettersState.length; i++) {
    const currentLetter = lettersState[i];
    const yPosition = 35 * Math.floor(i / lettersInLine + 1);
    const xPosition = leftPadding + (i % lettersInLine) * 35;
    canvasContext.fillText(currentLetter.char, xPosition, yPosition);

    if (currentLetter.success) {
      canvasContext.beginPath();
      canvasContext.strokeStyle = 'green';
      canvasContext.moveTo(xPosition + 25, yPosition - 10);
      canvasContext.arc(xPosition + 10, yPosition - 8, 15, 0, 360);
      canvasContext.stroke();
    }

    if (currentLetter.error) {
      canvasContext.beginPath();
      canvasContext.strokeStyle = 'red';
      canvasContext.moveTo(xPosition, yPosition - 15);
      canvasContext.lineTo(xPosition + 15, yPosition);
      canvasContext.moveTo(xPosition + 15, yPosition - 15);
      canvasContext.lineTo(xPosition, yPosition);
      canvasContext.stroke();
    }
  }
}

function getDefaultKeyboard() {
  return JSON.parse(JSON.stringify(defaultKeyboard));
}

function drawAnswerState(answerState) {
  const xPosition = 100;
  const yPosition = 180;
  canvasContext.clearRect(
    xPosition,
    yPosition - 30,
    canvas.width - xPosition,
    40
  );
  canvasContext.font = '40px serif';
  canvasContext.fillText(answerState, xPosition, yPosition);
}

function winGame() {
  setTimeout(() => {
    alert('Победа 🎉');
    startGame();
  });
}

document.addEventListener('keydown', (e) => {
  const key = e.key.toLocaleLowerCase();
  if (lettersState.map((key) => key.char).includes(key)) {
    onKeyClick(key);
  }

  if (['escape', 'enter'].includes(key)) {
    startGame();
  }
});
