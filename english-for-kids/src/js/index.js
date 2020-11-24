import '../css/style.css';
import '../css/style.scss';
import Header from './Header';
import CardList from './CardList';
import MenuController from './MenuController';


const body = document.querySelector("body");
const header = new Header();
const cardList = new CardList();
body.appendChild(header.getHeaderBLock());
body.appendChild(cardList.getCardList());

const menuController = new MenuController();
