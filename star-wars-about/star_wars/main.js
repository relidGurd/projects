// сюда я импортирую все модули и файлы после чего рендерю

const cssPromises = {};

function loadResource(src) {
  if (src.endsWith(".js")) {
    return import(src);
  }
  if (src.endsWith(".css")) {
    if (!cssPromises[src]) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = src;
      cssPromises[src] = new Promise((resolve) => {
        link.addEventListener("load", () => resolve());
      });
      document.head.append(link);
    }
    return cssPromises[src];
  }
  return fetch(src).then((res) => res.json());
}

const container = document.getElementById("wars-app");

const searchParams = new URLSearchParams(location.search);
const postId = searchParams.get("postId");

function renderPage(myAppPage) {
  Promise.all(Object.values(myAppPage).map((src) => loadResource(src))).then(
    ([header, currentPage, data]) => {
      container.innerHTML = "";
      container.append(header.headerWars());
      container.append(currentPage.renderInfo(data));
    }
  );
}
if (!postId) {
  renderPage({
    header: "./header.js",
    appPage: "./film-card.js",
    api: "https://www.swapi.tech/api/films",
    myStyles: "./my.css",
    css: "https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css",
  });
} else {
  renderPage({
    header: `./header.js`,
    appPage: `./film-details.js`,
    api: `https://www.swapi.tech/api/films/${postId}`,
    myStyles: "./my.css",
    css: "https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css",
  });
}

// function renderPage() {
//   new Promise((resolve) => {
//     resolve(import(`./film-card.js`));
//   }).then((test) => {
//     console.log(test);
//     container.append(test.createMainFilmCard());
//   });
// }

// renderPage();

// function getFilmsList() {
//   return fetch(`https://www.swapi.tech/api/films`)
//     .then((test) => test.json())
//     .then((testList) => console.log(testList));
// }

// api: `https://www.swapi.tech/api/films/${postId}`,
