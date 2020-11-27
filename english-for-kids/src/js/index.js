import '../css/style.css';
import '../css/style.scss';
import Header from './Views/Header';
import CardList from './Views/CardList';
import MenuController from './MenuController';
import Model from './Models/model';

/*var req = require.context("../assets/images/", false, /\.(png|jpe?g|svg)$/);
let images = req.keys().forEach(function(key){
    req(key);
});*/
function importAll(r) {
    return r.keys().map(r);
  }
  
const images = importAll(require.context('../assets/images/', false, /\.(png|jpe?g|svg)$/));


const body = document.querySelector("body");
const header = new Header();
const cardList = new CardList();
const model = new Model();
console.log(images);
body.appendChild(header.getHeaderBLock());
body.appendChild(cardList.getCardList());

const menu = model.getСategories();
header.renderMenu(menu);
cardList.render(menu);


//const menuController = new MenuController();
