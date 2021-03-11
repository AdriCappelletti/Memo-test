// Crear x cantidad de divs para cada una de las imagenes
//
/* 
  determinar que la cantidad de cartas a comparar son 2
  al hacer click en una carta guardar su valor en un Array
  y lo mismo con la siguiente. 
  Al array ser igual a 2 se determina que el array esta completo y se comparan sus valores
  si sus valores son iguales se eliminan ambas cartas y se suma 1 punto
  al llegar a 6 puntos termina el juego
  */

const $playBtn = document.querySelector("#start-game");
const cardsFront = document.querySelectorAll(".card-front");
const cardsBody = document.querySelectorAll(".card-body");
const cardsBack = document.querySelectorAll(".card-back");
const image1 = "img/angular.png";
const image2 = "img/css.png";
const image3 = "img/html.png";
const image4 = "img/JS.png";
const image5 = "img/node.png";
const image6 = "img/react.png";

const images = [image1, image2, image3, image4, image5, image6];
let comparedCards = []
let comparedImages = []


$playBtn.onclick = function () {
  const newArray = reorderArray(images);
  imgAssignement(newArray);
  roundHandler();
  
};

function roundHandler() {
  comparedCards = []
  comparedImages = []
  enableFlip();
  catchCards();
}

function reorderArray(a) {
  duplicateArrayValues(images);
  const newArray = a.sort(function () {
    return Math.random() - 0.5;
  });
  return newArray;
}

function duplicateArrayValues(arr) {
  arr.forEach((i, a, c) => {
    images.push(i);
  });
}

function enableFlip() {
  cardsBody.forEach((card) => {
    card.addEventListener("click", function () {
      card.classList.toggle("flipped");
    });
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
    }
  }
  roundHandler ()
}


function catchCards() {
  cardsBody.forEach((card, i) => {
    card.addEventListener("click", function () {
      comparedCards.push(card);
      comparedImages.push(cardsBack[i].style.backgroundImage);
      console.log(comparedImages);
      if (comparedImages.length === 2) {
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
  comparedCards = []
  comparedImages = []
}
