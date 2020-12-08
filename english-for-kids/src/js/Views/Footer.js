export default class Footer {
    constructor(model){
        this.init();
    }

    init() {
        this.createFooter();
        this.createContent();
    }

    createFooter() {
        this.element = document.createElement("footer");
        this.element.classList.add("footer");  
    }

    createContent(){
        const author = document.createElement("a");
        const logo = document.createElement("a");
        const year = document.createElement("span");
        year.innerText="2020";
        author.href = `https://github.com/zhenyamarinovich`;
        logo.href = `https://rs.school/js/`;
        author.innerText = "My github account"
        this.element.appendChild(author);
        let img = new Image(170,50);
        img.src = 'assets/images/rs_school_js.svg';
        logo.appendChild(img);
        this.element.appendChild(logo);
        this.element.appendChild(year);
    }

    getFooterBLock() {
        return this.element;
    }

}