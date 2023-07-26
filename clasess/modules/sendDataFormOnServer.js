import { createVisitForView } from "./getVisitsFromServer";
import { newForm } from "./Layout";

import { visitLayout } from "../../function/filters/filters";
import { arrayVisitsView, elementDeleteINArray } from "../../scripts";
import API from "../../function/api/API";

//Функция формирования обьекта запроса
//Функция отправки запроса на создание визита на серевере + получение ответа сервера

function cardObjCreate() {
  const modal = document.querySelector(".btn-close");
  const form = document.querySelector("#form");
  const card = {};
  form.addEventListener("submit", (e) => {
    const formData = new FormData(form);
    for (let [key, value] of formData.entries()) {
      card[key] = value;
      if (value === "") {
        return false;
      }
    }
    API.addCard(card).then((res) => {
      form.reset();
      createVisitForView(JSON.parse(res));
      visitLayout(arrayVisitsView);
    });
    modal.click();
  });
}

function cardObjEdit(id) {
  const form = document.getElementById(`form__edit_${id}`);
  let cardObj = {};
  const formData = new FormData(form);

  for (let [key, value] of formData.entries()) {
    cardObj[key] = value;
    if (value === "") {
      return false;
    }
  }

  API.changeCard(id, cardObj)
    .then((response) => {
      return JSON.parse(response);
    })
    .then((res) => {
      elementDeleteINArray(arrayVisitsView, res.id);
      createVisitForView(res);
      visitLayout(arrayVisitsView);
    });
}

export { cardObjCreate };
export { cardObjEdit };
