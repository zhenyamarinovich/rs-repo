import Controller from './Controllers/controller'

function getRouteInfo() {
    const hash = location.hash ? location.hash.slice(1) : "";
    const links = document.querySelectorAll(".menu-list__link");
    links.forEach(item => {
        if(item.getAttribute("href") === location.hash){
            item.classList.add("active");
        } else{
            item.classList.remove("active");
        };
    })
    const name = hash;
    return name;
}

function handleHash(){
    let name = getRouteInfo();
    let value = "";
    if(name){
        if(name !== "Menu" && name !== "Statistic"){
            value = name;
            name = "Page";
        }
        const routeName = name + 'Route';
        const navigation = document.querySelector("nav");
        const menuBtn = document.querySelector(".menu-btn");
        navigation.classList.remove("menu-btn__navigation-visible");
        navigation.classList.add("menu-btn__navigation-unvisible");
        menuBtn.classList.remove('open');
        Controller[routeName](value);
    }
}

export default {
    init(){
        location.hash = "#Menu";
        addEventListener('hashchange', handleHash);
        handleHash();
    }
}