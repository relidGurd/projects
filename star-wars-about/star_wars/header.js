// Модуль с навбар, функция получает url на изображение
export function headerWars() {
  const mainNav = document.createElement("nav");
  const navCard = document.createElement("div");
  const navLink = document.createElement("a");
  const navImg = document.createElement("img");

  mainNav.classList.add("navbar", "navbar-light", "my-nav-style", "fixed-top");
  navCard.classList.add("container");
  navCard.style.display = "block";
  navLink.classList.add("navbar-brand", "my-link-position");
  navImg.classList.add("my-link-position");

  navImg.src = "./img/Star-Wars-logo.png";
  navImg.width = "110";
  navImg.height = "50";

  mainNav.append(navCard);
  navCard.append(navLink);
  navLink.append(navImg);

  return mainNav;
}
