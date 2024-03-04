let boxes = document.querySelectorAll(".box");
let restartBtn = document.querySelector("#restart-btn");
let msgPara = document.querySelector("p");
let winMsg = document.querySelector(".win-msg");

let turnO = true;
let count = 0;

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];


const restartGame = () => {
  turnO = true;
  count = 0;
  enableBoxes();
  msgPara.classList.add("hide");
};


boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO) {
        //Player O
      box.innerText = "O";
      turnO = false;
    } else {
        //Player X
      box.innerText = "X";
      turnO = true;
    }
    box.disabled = true;
    count++;

    let isWinner = checkWinner();

    if (count === 9 && !isWinner) {
      gameDraw();
    }
  });
});


const checkWinner = () => {
  for (let pattern of winPatterns) {
    let valPos1 = boxes[pattern[0]].innerText;
    let valPos2 = boxes[pattern[1]].innerText;
    let valPos3 = boxes[pattern[2]].innerText;

    if (valPos1 != "" && valPos2 != "" && valPos3 != "") {
      if (valPos1 === valPos2 && valPos2 === valPos3) {
        showWinner(valPos1);
        return true;
      }
    }
  }
};


const showWinner = (winner) => {
  winMsg.innerText = `Congratulations, Winner is ${winner}`;
  msgPara.classList.remove("hide");
  disableBoxes();
};


const gameDraw = () => {
  winMsg.innerText = `Game Draw`;
  msgPara.classList.remove("hide");
  disableBoxes();
};


const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};


const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};


restartBtn.addEventListener("click", restartGame);
