let attempts = document.querySelector("#intentos");
const $playBtn = document.querySelector("#start-game");
const $resetBtn = document.querySelector("#reset");
const $playAgainBtn = document.querySelector("#play-again");
const cardsBody = document.querySelectorAll(".card-body");
const cardsFront = document.querySelectorAll(".card-front");
const cardsBack = document.querySelectorAll(".card-back");
// Images
const image1 = "img/angular.png";
const image2 = "img/css.png";
const image3 = "img/html.png";
const image4 = "img/JS.png";
const image5 = "img/node.png";
const image6 = "img/react.png";
const images = [image1, image2, image3, image4, image5, image6];

let comparedCards = [];
let comparedImages = [];

let attemptsCounter = 0;
let points = 0;
$playBtn.onclick = function () {
  $playBtn.disabled = "true";
  $playBtn.classList.replace("btn-success", "btn-dark");
  $resetBtn.classList.replace("btn-dark", "btn-success");
  const newArray = reorderArray(images);
  imgAssignement(newArray);
  catchCards();
  roundHandler();
};
$resetBtn.onclick = function () {
  location.reload();
};

function roundHandler() {
  if (points === 6) {
    gameEnd();
  }

  enableFlip(cardsBody);

  comparedCards = [];
  comparedImages = [];
}

function reorderArray(a) {
  duplicateArrayValues(images);
  const newArray = a.sort(function () {
    return Math.random() - 0.5;
  });
  return newArray;
}

function duplicateArrayValues(arr) {
  arr.forEach((i) => {
    images.push(i);
  });
}

function enableFlip(cards) {
  cards.forEach((card) => {
    card.addEventListener("click", function () {
      card.classList.toggle("flipped");
    });
  });
}

function unflipCards(cards) {
  cards.forEach((card) => {
    card.classList.remove("flipped");
  });
}

function imgAssignement(newArray) {
  let counter = 0;
  newArray.forEach((img) => {
    let cardBack = cardsBack[counter];
    cardBack.style.cssText += `background-image:url(${img})`;
    counter++;
  });
}

function compareCards(arr) {
  for (let i = 0; i < 1; i++) {
    const firstCard = arr[i];
    const secondCard = arr[i + 1];
    console.log(firstCard === secondCard);
    if (firstCard === secondCard) {
      deleteCards(comparedCards);
      ++points;
      console.log(points);
    } else {
      unflipCards(comparedCards);
      attempts.textContent = ++attemptsCounter;
    }
  }

  removeOverlay();
  roundHandler();
}

function catchCards() {
  cardsBody.forEach((card, i) => {
    card.addEventListener("click", function () {
      comparedCards.push(card);
      comparedImages.push(cardsBack[i].style.backgroundImage);
      console.log(comparedImages);
      if (comparedCards.length === 1) {
        disableUserClick(comparedCards);
      }
      if (comparedImages.length === 2) {
        createOverlay();
        setTimeout(() => {
          compareCards(comparedImages);
        }, 500);
      }
    });
  });
}

function deleteCards(cards) {
  cards.forEach((card) => {
    card.style.visibility = "hidden";
  });
}

function gameEnd() {
  const main = document.querySelector("main");
  const winSection = document.querySelector("#win");
  main.classList.replace("d-flex", "d-none");
  winSection.classList.replace("d-none", "d-flex");
  $resetBtn.disabled = "true";

  $playAgainBtn.addEventListener("click", function () {
    location.reload();
  });
}

function createOverlay() {
  const overlay = document.createElement("div");
  overlay.className = "overlay";
  overlay.style.position = "absolute";
  overlay.style.top = "0";
  overlay.style.height = "100%";
  overlay.style.width = "100%";
  document.querySelector("body").appendChild(overlay);
}

function removeOverlay() {
  const overlay = document.querySelector(".overlay");
  overlay.remove();

  roundHandler();
}

function catchCards() {
  cardsBody.forEach((card, i) => {
    card.addEventListener("click", function () {
      comparedCards.push(card);
      comparedImages.push(cardsBack[i].style.backgroundImage);
      console.log(comparedImages);
      if (comparedImages.length === 2) {
        createOverlay()
        setTimeout(() => {
          compareCards(comparedImages);
        }, 500);
      }
    });
  });
}

function deleteCards(cards) {
  cards.forEach((card) => {
    card.style.visibility = "hidden";
  });
}

function gameEnd() {
  const main = document.querySelector("main");
  const winSection = document.querySelector("#win");
  main.classList.replace("d-flex", "d-none");
  winSection.classList.replace("d-none", "d-flex");
  $resetBtn.disabled = "true";

  $playAgainBtn.addEventListener("click", function () {
    location.reload();
  });
}
