// Crear x cantidad de divs para cada una de las imagenes
//
const cardsBody = document.querySelectorAll(".card-body");
const cardsBack = document.querySelectorAll(".card-back");
const image1 = "/img/angular.png";
const image2 = "/img/css.png";
const image3 = "/img/html.png";
const image4 = "/img/JS.png";
const image5 = "/img/node.png";
const image6 = "/img/react.png";

const images = [image1,image2,image3,image4,image5,image6];

// let arr = [1, 2, 3, 4, 5, 6, 7, 8];
// function reorderArray(a) {
//   a.sort(function () {
//     return Math.random() - 0.5;
//   });
//   console.log(a);
// }
// console.log(reorderArray(arr))

// reorderArray(arr);

  function flip() {
    cardsBody.forEach(card => {
      card.addEventListener('click', function () {
        card.classList.toggle('flipped')
      })
    });
  }

function imgAssignement(){
  let counter = 0
images.forEach(img => {
  console.log(img)
  let cardBack = cardsBack[counter]
  cardBack.style.cssText+=`background-image:url(${img})`
  counter++
  console.log(counter)
  });
}

imgAssignement()
flip()