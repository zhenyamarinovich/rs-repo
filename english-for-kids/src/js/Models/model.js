import cardsInfo from '../Data/CardsInfo';
export default class  Model{
    construct(){
        this.data = cardsInfo;
    }

    getСategories(){
        return cardsInfo[0];
    }
};