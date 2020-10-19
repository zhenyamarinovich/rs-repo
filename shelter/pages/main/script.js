const logo = document.getElementById('logo');
const menu = document.querySelector(".nav-menu");
const background = document.querySelector(".dark-background");
const menuCloseItem = document.querySelector(".header__nav-close");
const burgerItem = document.querySelector(".burger");
const body =document.querySelector('body');

(function () {
  burgerItem.addEventListener("click", () => {
    menu.classList.add("nav-menu_active");
    background.classList.add("dark-background_active");
    logo.style.visibility = "hidden";
    menuCloseItem.classList.add("header__nav-animation");

    });
  menuCloseItem.addEventListener("click", () => {
    removeInfo();
  });
  body.addEventListener("click", () => {
    if(document.documentElement.clientWidth - 320 > event.clientX){
      removeInfo();
    }
  })
})();

function removeInfo(){
  menu.classList.remove("nav-menu_active");
  background.classList.remove("dark-background_active");
  logo.style.visibility = "visible";
  menuCloseItem.classList.remove("header__nav-animation");
}

