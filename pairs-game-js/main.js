(() => {
  function gameForm() {
    const form = document.createElement("form");
    const input = document.createElement("input");
    const buttonWrapper = document.createElement("div");
    const button = document.createElement("button");

    form.classList.add("input-group", "mb-3");
    form.style.marginTop = "30px";
    input.classList.add("form-control");
    input.type = "number";
    input.placeholder = "Кол-во карточек по вертикали/горизонтали";
    button.classList.add("btn");
    buttonWrapper.classList.add("input-group-append");
    button.textContent = "Начать игру";

    buttonWrapper.append(button);
    form.append(input);
    form.append(buttonWrapper);

    return {
      form,
      input,
      button,
    };
  }

  function fieldz() {
    const GAMEFIELD = document.createElement("div");

    GAMEFIELD.classList.add("game-field");

    return {
      GAMEFIELD,
    };
  }

  function createCard() {
    const card = document.createElement("div");
    const cardFront = document.createElement("div");
    const cardBack = document.createElement("div");

    card.classList.add("memory-card");
    cardFront.classList.add("front-face");
    cardFront.classList.add("cardText");
    cardBack.classList.add("back-face");

    card.append(cardFront);
    card.append(cardBack);

    return {
      card,
      cardFront,
      cardBack,
    };
  }

  function newGameBtn() {
    const btnArrea = document.createElement("div");
    const newGameBtn = document.createElement("button");

    btnArrea.append(newGameBtn);

    btnArrea.classList.add("re");
    btnArrea.classList.add("btn-area");

    newGameBtn.classList.add("btn-style");

    newGameBtn.textContent = "НОВАЯ ИГРА";

    return {
      btnArrea,
      newGameBtn,
    };
  }

  function createShuffleMassive(testMassiveInput) {
    const arr = [];
    let rundomnumber;
    for (let i = 0; i <= 100; i++) {
      rundomnumber = Math.floor(Math.random() * 100);
      if (
        arr.indexOf(rundomnumber) == -1 &&
        arr.length < (testMassiveInput * testMassiveInput) / 2
      ) {
        arr.push(rundomnumber);
      }
    }
    const krr = arr;
    const para = arr.concat(krr);
    for (let i = para.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [para[i], para[j]] = [para[j], para[i]];
    }
    return {
      para,
    };
  }

  function count() {
    const countArea = document.createElement("div");
    const countNumber = document.createElement("div");
    const countText = document.createElement("div");

    countArea.classList.add("count-area-style");
    countNumber.classList.add("count-number-style");
    countText.classList.add("count-text-style");

    countText.textContent = "Оставшееся время: ";
    countNumber.textContent = 60;

    countArea.append(countText);
    countArea.append(countNumber);

    return {
      countArea,
      countText,
      countNumber,
    };
  }

  document.addEventListener("DOMContentLoaded", function () {
    const container = document.getElementById("game");
    const gameFiel = fieldz();
    const form = gameForm();
    const newGame = newGameBtn();
    const COUNT = count();
    const mas = createShuffleMassive();

    stopCount = false;
    form.button.disabled = "disabled";
    form.input.addEventListener("input", function () {
      if (form.input.value != "") {
        return (form.button.disabled = "");
      }
      if (form.input.value === "") {
        return (form.button.disabled = "disabled");
      }
    });

    function createGame(massiveTest, gameFiel, newGame) {
      let cardEventFlag = false;
      let cardCheck = false;
      let firstCard, secCard;
      for (let card of massiveTest.para) {
        let carta = createCard(card.name);
        carta.cardFront.textContent = card;
        if (massiveTest.para.length == 36) {
          carta.card.classList.add("six-cards");
        }

        if (massiveTest.para.length == 64) {
          carta.card.classList.add("eight-cards");
        }

        if (massiveTest.para.length == 100) {
          carta.card.classList.add("ten-cards");
        }

        carta.card.addEventListener("click", function () {
          if (!cardEventFlag) {
            carta.card.classList.add("flip");
            if (!cardCheck) {
              cardCheck = true;
              firstCard = this;
              return;
            } else {
              cardCheck = false;
              secCard = this;
            }

            cardEventFlag = true;

            setTimeout(() => {
              if (firstCard.textContent !== secCard.textContent) {
                firstCard.classList.remove("flip");
                secCard.classList.remove("flip");
              }
              cardEventFlag = false;
            }, 1000);

            if (
              gameFiel.GAMEFIELD.querySelectorAll(".flip").length ==
              massiveTest.para.length
            ) {
              newGame.btnArrea.classList.remove("re");
            }
          }
        });
        gameFiel.GAMEFIELD.append(carta.card);
      }

      newGame.newGameBtn.addEventListener("click", function () {
        console.log("l");
        let getInputStorage = JSON.parse(localStorage.getItem("input"));
        let newMassive = createShuffleMassive(getInputStorage);
        localStorage.setItem("myGame", JSON.stringify(newMassive));
        location.reload();
      });
    }

    form.form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.input.value) {
        return;
      }

      if (
        form.input.value > 10 ||
        form.input.value % 2 != 0 ||
        form.input.value == 2
      ) {
        form.input.value = 4;
      }

      localStorage.setItem("input", JSON.stringify(form.input.value));
      let testMassiveInput = createShuffleMassive(form.input.value);

      createGame(testMassiveInput, gameFiel, newGame);

      let rop = 60;
      function gameTime() {
        rop--;
        COUNT.countNumber.textContent = rop;
        if (rop === 0) {
          alert("The end");
          location.reload();
        }
      }
      setInterval(gameTime, 1000);
      form.button.disabled = "disabled";
      form.input.value = "";
      container.append(gameFiel.GAMEFIELD);
      container.append(newGame.btnArrea);
    });

    container.append(COUNT.countArea);
    container.append(form.form);

    if (localStorage.getItem("myGame")) {
      let parseNewMassive = JSON.parse(localStorage.getItem("myGame"));
      let rop = 60;

      function gameTime() {
        --rop;
        COUNT.countNumber.textContent = rop;
        if (rop === 0) {
          alert("Время вышло!");
          location.reload();
        }
      }
      setInterval(gameTime, 1000);

      createGame(parseNewMassive, gameFiel, newGame);
      localStorage.removeItem("myGame");
      container.append(gameFiel.GAMEFIELD);
      container.append(newGame.btnArrea);
    }
  });
})();
