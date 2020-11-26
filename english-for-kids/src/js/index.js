import '../css/style.css';
import '../css/style.scss';
import Header from './Views/Header';
import CardList from './Views/CardList';
import MenuController from './MenuController';
import Model from './Models/model';


const body = document.querySelector("body");
const header = new Header();
const cardList = new CardList();
const model = new Model();
body.appendChild(header.getHeaderBLock());
body.appendChild(cardList.getCardList());

const menu = model.getСategories();
header.renderMenu(menu);
cardList.render(menu);

//const menuController = new MenuController();
