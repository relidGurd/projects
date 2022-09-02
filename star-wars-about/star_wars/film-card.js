// Карточка фильма, в качестве аргумента я получаю массив списка карточек

// <div class="card text-white text-center w-auto p-3"">
//   <div class="card-body" style="padding: 60px;">
//     <h1 class="card-title display-1">Special title treatment</h1>
//     <p class="card-text lead">
//       With supporting text below as a natural lead-in to additional content.
//     </p>
//     <a href="#" class="btn btn-lg btn-dark">
//       Go somewhere
//     </a>
//   </div>
// </div>;

export function renderInfo(data) {
  const filmsContainer = document.createElement("div");
  filmsContainer.style.marginTop = "100px";
  data.result.sort(function (a, b) {
    if (a.properties.episode_id > b.properties.episode_id) {
      return 1;
    }
    if (a.properties.episode_id < b.properties.episode_id) {
      return -1;
    }
    // a должно быть равным b
    return 0;
  });

  for (const films of data.result) {
    const episodeCard = document.createElement("div");
    const episodeCardBody = document.createElement("div");
    const episodeTitle = document.createElement("h1");
    const episodeNumber = document.createElement("p");
    const episodeDetailsButton = document.createElement("a");
    episodeCard.classList.add(
      "card",
      "text-white",
      "text-center",
      "w-auto",
      "p-3",
      "my-card-styles",
      "test"
    );

    filmsContainer.id = "js-after-reload";
    episodeCardBody.classList.add("card-body");
    episodeTitle.classList.add("card-title", "display-1");
    episodeNumber.classList.add("card-text", "lead");
    episodeDetailsButton.classList.add("btn", "btn-lg", "btn-outline-light");

    episodeCard.style.backgroundImage = `url(./img/episode${films.properties.episode_id}.jpg)`;
    episodeCard.style.border = `3px solid rgb(129, 127, 127)`;
    episodeCard.style.borderRadius = `50px`;
    episodeCardBody.style.padding = "60px";
    episodeNumber.style.fontSize = "60px";

    episodeTitle.textContent = films.properties.title;
    episodeNumber.textContent = films.properties.episode_id;
    episodeDetailsButton.textContent = "Подробнее";
    episodeDetailsButton.href = `?postId=${films.uid}`;

    episodeDetailsButton.addEventListener("click", (e) => {
      e.preventDefault();
      filmsContainer
        .querySelectorAll(".card")
        .forEach((el) => (el.style.display = "none"));
      history.pushState(null, "", `?postId=${films.uid}`);
      import("./film-details.js").then((test) =>
        filmsContainer.append(test.renderInfo(films))
      );
    });

    episodeCard.append(episodeCardBody);
    episodeCardBody.append(episodeTitle);
    episodeCardBody.append(episodeNumber);
    episodeCardBody.append(episodeDetailsButton);

    filmsContainer.append(episodeCard);
  }
  window.addEventListener("popstate", (e) => {
    import("./film-details.js").then((test) =>
      filmsContainer.append(test.renderInfo(films))
    );
  });
  return filmsContainer;
}
