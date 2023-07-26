import API from "../../function/api/API";
import { visitLayout } from "../../function/filters/filters";
import { arrayVisitsView } from "../../scripts";
import { VisitCardiologist, VisitDentist, VisitTherapist } from "./visitsModel";

function getVisits() {
  API.getCards().then((responses) => {
    responses.forEach((response) => {
      createVisitForView(response);
    });
    visitLayout(arrayVisitsView);
  });
}

function createVisitForView(object) {
  //создает обьект согласно нужного класса. Добавялет обьект в массив для отображения

  const findDoctor  =(object)=>{
    console.log(object)
    switch (object.doctor) {
      case "Стоматолог":return new VisitDentist(object);
      case "Кардиолог":return new VisitCardiologist(object);
      case "Терапевт":return new VisitTherapist(object);
    }
    return {}
  }

  arrayVisitsView.push(findDoctor(object));
}

export { getVisits };
export { createVisitForView };
