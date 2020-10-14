(function () {
    const burgerItem = document.querySelector(".burger");
    const menu = document.querySelector(".menu");
    const menuLinks = document.querySelectorAll("js-scroll");
    const menuCloseItem = document.querySelector(".header__nav-close");
    burgerItem.addEventListener("click", () => {
      menu.classList.add("nav-menu_active");
    });
  
    menuCloseItem.addEventListener("click", () => {
      menu.classList.remove("nav-menu_active");
    });
  
    if (window.innerWidth <= 767) {
      for (let i = 0; i < menuLinks.length; i++) {
        menuLinks[i].addEventListener("click", () => {
          menu.classList.remove("nav-menu_active");
        });
      }
    }
  })();