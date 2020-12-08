
export default class MenuController{
    constructor() {
        this.status = false;
    }

    addClick(){
        const menuBtn = document.querySelector(".menu-btn");
        const navigation = document.querySelector("nav");
        menuBtn.addEventListener('click', () => {
            if(!this.status) {
                navigation.classList.remove("menu-btn__navigation-unvisible");
                navigation.classList.add("menu-btn__navigation-visible");
                menuBtn.classList.add('open');
                this.status = true;
            } else {
                navigation.classList.remove("menu-btn__navigation-visible");
                navigation.classList.add("menu-btn__navigation-unvisible");
                menuBtn.classList.remove('open');
                this.status = false;
            }
        });
        window.onclick = function(event){
            if(event.pageX > 320){
                navigation.classList.remove("menu-btn__navigation-visible");
                navigation.classList.add("menu-btn__navigation-unvisible");
                menuBtn.classList.remove('open');
                this.status = false;
            }
        }
    }
}




