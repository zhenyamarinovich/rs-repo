import GameController from './GameController';
import Model from './Models/model';
import CardList from './Views/CardList';


const cardList = new CardList();
const gameController = new GameController();
export default {
    MenuRoute(){
        const menu = Model.getСategories();
        cardList.render(menu);
    },
    ActionARoute(){
        const actionsA = Model.getActionA();
        console.log("ActionsA",actionsA);
        cardList.render(actionsA);
        gameController.playSoundCard();
        gameController.rotateCard();
    },
    ActionBRoute(){
        const actionsB = Model.getActionB();
        console.log("ActionsB",actionsB);
        cardList.render(actionsB);
        gameController.playSoundCard();
    },
    AnimalARoute(){
        const animalsA = Model.getAnimalA();
        console.log("AnimalA",animalsA);
        cardList.render(animalsA);
        gameController.playSoundCard();
    },
    AnimalBRoute(){
        const animalsB = Model.getAnimalB();
        console.log("AnimalB", animalsB);
        cardList.render(animalsB);
        gameController.playSoundCard();
    },
    ClothesRoute(){
        const clothers = Model.getClothes();
        console.log("Clothers", clothers);
        cardList.render(clothers);
        gameController.playSoundCard();
    },
    EmotionsRoute(){
        const emotions = Model.getEmotions();
        console.log("Emotions", emotions);
        cardList.render(emotions);
        gameController.playSoundCard();
    },
    FoodRoute(){
        const food = Model.getFood();
        console.log("Food", food);
        cardList.render(food);
        gameController.playSoundCard();
    },
    HouseRoute(){
        const house = Model.getHouse();
        console.log("House", house);
        cardList.render(house);
        gameController.playSoundCard();
    },    

}