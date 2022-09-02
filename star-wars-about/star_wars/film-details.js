// Детальная страница, получает массив с фильмами по айди
import { getFilmAtributes } from "./test.js";
export function renderInfo(data) {
  //// СОЗДАЮ ДОМ ЭЛЕМЕНТЫ
  const cardContainer = document.createElement("div");

  const backButton = document.createElement("button");

  const filmTitle = document.createElement("h1");

  const episodeNumber = document.createElement("p");

  const episodeDescription = document.createElement("p");

  const filmDeatails = document.createElement("div");
  const filmDeatailsLeft = document.createElement("div");
  const filmDeatailsRight = document.createElement("div");

  const filmPlanets = document.createElement("h2");
  const filmSpecies = document.createElement("h2");

  const listGroupLeft = document.createElement("ul");
  const listGroupRight = document.createElement("ul");

  // СТИЛИ
  cardContainer.style.marginTop = "100px";
  cardContainer.style.marginBottom = "100px";
  cardContainer.style.textAlign = "center";

  // КЛАССЫ
  backButton.classList.add("my-button");

  filmTitle.classList.add("display-1", "text-white", "text-center");
  episodeNumber.classList.add("display-1", "text-white", "text-center");
  episodeDescription.classList.add("lead", "text-white", "text-center");

  filmPlanets.classList.add("display-3", "text-white", "text-center");
  filmSpecies.classList.add("display-3", "text-white", "text-center");

  filmDeatails.classList.add("row");
  filmDeatailsLeft.classList.add("col");
  filmDeatailsRight.classList.add("col");

  listGroupLeft.classList.add("list-group");
  listGroupRight.classList.add("list-group");

  backButton.textContent = "BACK TO EPISODES";
  backButton.addEventListener("click", (e) => {
    if (!document.getElementById("js-after-reload")) {
      window.location.href = "./";
    } else {
      e.preventDefault();
      cardContainer.textContent = "";
      document
        .querySelectorAll(".card")
        .forEach((el) => (el.style.display = "block"));
      history.pushState(null, "", "./");
    }
  });

  window.addEventListener("popstate", (e) => {
    if (!document.getElementById("js-after-reload")) {
      window.location.href = "./";
    } else {
      e.preventDefault();
      cardContainer.textContent = "";
      document
        .querySelectorAll(".card")
        .forEach((el) => (el.style.display = "block"));
      history.pushState(null, "", "./");
    }
  });

  filmTitle.textContent = !data.result
    ? data.properties.title
    : data.result.properties.title;

  episodeNumber.textContent = !data.result
    ? data.properties.episode_id
    : data.result.properties.episode_id;

  episodeDescription.textContent = !data.result
    ? data.properties.opening_crawl
    : data.result.properties.opening_crawl;

  filmPlanets.textContent = "Planets";
  filmSpecies.textContent = "Species";

  function createItem(ob) {
    const planet = document.createElement("li");
    planet.classList.add(
      "text-white",
      "list-group-item",
      "display-6",
      "text-center"
    );
    planet.textContent = !ob.result
      ? ob.properties.name
      : ob.result.properties.name;
    planet.style.backgroundColor = "transparent";
    planet.style.border = "1px solid white";

    return planet;
  }
  getFilmAtributes(
    !data.result ? data.properties.planets : data.result.properties.planets,
    !data.result ? data.properties.species : data.result.properties.species
  ).then(([planets, species]) => {
    planets.map((test) =>
      test.then((x) => {
        listGroupLeft.append(createItem(x));
      })
    );
    species.map((test) =>
      test.then((x) => {
        listGroupRight.append(createItem(x));
      })
    );
  });

  // ДОБАВЛЕНИЕ ЭЛЕМЕНТОВ В КОНЕТЙНЕР

  cardContainer.append(backButton);

  cardContainer.append(filmTitle);
  cardContainer.append(episodeNumber);
  cardContainer.append(episodeDescription);
  cardContainer.append(filmDeatails);

  filmDeatails.append(filmDeatailsLeft);
  filmDeatails.append(filmDeatailsRight);

  filmDeatailsLeft.append(filmPlanets);
  filmDeatailsRight.append(filmSpecies);

  filmDeatailsLeft.append(listGroupLeft);
  filmDeatailsRight.append(listGroupRight);

  return cardContainer;
}
