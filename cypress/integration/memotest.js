const NUMERO_CUADROS = 12;
context("memotest", () => {
  const URL = "192.168.0.12:8080";

  before(() => {
    cy.visit(URL);
  });

  it("revisa que haya un contenedor con cartas", () => {
    cy.get(".container")
      .find(".card-body")
      .should("have.length", NUMERO_CUADROS);
  });

  it("revisa que las imagenes se ordenen aleatoreamente", () => {
    cy.get("#start-game").click();

    let cartasOriginales = [];
    cy.get(".card-back").then((cartas) => {
      cartas.each(function (i, carta) {
        cartasOriginales.push(carta.style.backgroundImage);
      });
    });

    cy.visit(URL);

    let cartasNuevas = [];
    cy.get(".card-back").then((cartas) => {
      cartas.each(function (i, carta) {
        cartasNuevas.push(carta.style.backgroundImage);
      });
    });
    cy.wrap(cartasOriginales).should("not.deep.equal", cartasNuevas);
  });
});

describe("Resuelve el juego", () => {
  let mapaDePares, listaDePares;
  it("Elige una combinación erronea", () => {
    cy.get("#start-game").click();
    cy.get(".card-body").then((cartas) => {
      mapaDePares = obtenerParesDeCartas(cartas);
      console.log(mapaDePares);
      listaDePares = Object.values(mapaDePares);
      console.log(listaDePares);
      listaDePares[0][0].click();
      cy.wait(2000)
      listaDePares[1][0].click();
      cy.get(".card-body").should("have.length", NUMERO_CUADROS);
    });
  });
  it("Finaliza el juego", () => {
    listaDePares.forEach((par) => {
      par[0].click();
      par[1].click();
    });
    cy.get(".card-back").should("have.length", 0);
  });
});

function obtenerParesDeCartas(cartas) {
  const pares = {};
  cartas.each((i, carta) => {
    const imagenCarta = carta.childNodes[3].style.backgroundImage;
    if (pares[imagenCarta]) {
      pares[imagenCarta].push(carta);
    } else {
      pares[imagenCarta] = [carta];
    }
  });
  console.log(pares);
  return pares;
}
