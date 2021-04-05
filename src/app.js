const $attempts = document.querySelector("#intentos");
const $playBtn = document.querySelector("#start-game");
const $resetBtn = document.querySelector("#reset");
const $playAgainBtn = document.querySelector("#play-again");
const $cardsBody = document.querySelectorAll(".card-body");
const $cardsBack = document.querySelectorAll(".card-back");
const $cardsContainer = document.querySelector(".container");
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
  assignImages(newArray);

  roundHandler();
};

function roundHandler() {
  console.log("rhandlerrr");
  if (points === 6) {
    endGame();
  }
  comparedCards = [];
  comparedImages = [];
  $cardsContainer.onclick = function (e) {
    console.log("container click");
    const $selectedCardParent = e.target;
    const $selectedCard = e.target.childNodes[3];
    if ($selectedCard.classList.contains("card-back")) {
      handleUserClick($selectedCard);
      enableFlip($selectedCardParent);
    }
  };
}

function handleUserMovements() {
  const cardsComparation = compareCards(comparedImages);
  if (cardsComparation) {
    hideCards(comparedCards);
    ++points;
  } else {
    unflipCards(comparedCards);
    $attempts.textContent = ++attemptsCounter;
  }
  roundHandler();
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

function enableFlip(card) {
  card.classList.toggle("flipped");
}

function unflipCards(cards) {
  cards.forEach((card) => {
    card.parentNode.classList.remove("flipped");
  });
}

function assignImages(newArray) {
  let counter = 0;
  newArray.forEach((img) => {
    let cardBack = $cardsBack[counter];
    cardBack.style.cssText += `background-image:url(${img})`;
    counter++;
  });
}

function compareCards(arr) {
  for (let i = 0; i < 1; i++) {
    const firstCard = arr[i];
    const secondCard = arr[i + 1];
    if (comparedCards[0] === comparedCards[1]) {
      return roundHandler();
    }
    return firstCard === secondCard;
  }
}

function handleUserClick(card) {
  comparedCards.push(card);
  comparedImages.push(card.style.backgroundImage);
  if (comparedCards.length === 2) {
    // $cardsContainer.onclick = function () {}
    setTimeout(() => {
      handleUserMovements();
    }, 600);
  }
}

function endGame() {
  const main = document.querySelector("main");
  const $winSection = document.querySelector("#win");
  main.classList.replace("d-flex", "d-none");
  $winSection.classList.replace("d-none", "d-flex");
  $resetBtn.disabled = "true";

  $playAgainBtn.addEventListener("click", function () {
    location.reload();
  });
}

function hideCards(cards) {
  cards.forEach((card) => {
    card.parentNode.style.visibility = "hidden"; 
    card.remove()
  });
}

$resetBtn.onclick = function () {
  location.reload();
};
