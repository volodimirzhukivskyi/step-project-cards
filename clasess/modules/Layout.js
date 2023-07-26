import API from "../../function/api/API";
import { checkFetchData } from "../../function/api/checkFetchData";
import { formLogin } from "../models/Input";
import { Select } from "../models/Select";
import { Modal } from "./ClassModal";
import { Form, FormCardiologist, FormDentist, FormTherapist } from "./Form";
import { getVisits } from "./getVisitsFromServer";
import { cardObjCreate } from "./sendDataFormOnServer";

export const init = () => {
  const buttonEnter = document.querySelector("#button-enter");
  if (localStorage.getItem("token")) {
    buttonEnter.remove();

    newForm();
    getVisits();
  } else {
    document
      .querySelector(".visits__item-wrapper")
      .insertAdjacentHTML("afterbegin", `<h2>No items have been added</h2>`);
    renderModalform();
    responseEnter();
  }
};

//форма авторизации
export function renderModalform() {
  const modalLogin = new Modal("Войти", formLogin(), ".header");
  modalLogin.renderModal();
}

// отправка запроса авторизации
export function responseEnter() {
  const submit = document.getElementById("submit");
  const modal = document.querySelector(".btn-close");
  const email = document.querySelector('[name="email"]');
  const password = document.querySelector('[name="password"]');
  submit.addEventListener("click", () => {
    API.auth({
      email: email.value,
      password: password.value,
    })
      .then((res) => {
        return checkFetchData(res);
      })
      .then((token) => {
        console.log(token);
        localStorage.setItem("token", `${token}`);
        modal.click();
        init();
      })
      .catch((e) => checkFetchData(e));
  });
}

// создаем форму в модальном окне и выводим туда список выбора докторов
export function newForm() {
  const buttonCreateVisit = document.querySelector(".header");
  const btnExit = document.querySelector(".btn-exit");

  const selectDoctor = new Select(
    "form-select ",
    "doctor",
    "Выбор Врача,Кардиолог,Стоматолог,Терапевт",
  );

  new Modal("Создать Визит", selectDoctor.render(), ".header").renderModal();

  if (!btnExit) {
    buttonCreateVisit.insertAdjacentHTML(
      "beforeend",
      "<button type='button' id='button-enter' class='btn btn-primary' data-bs-toggle='modal' data-bs-target='#exampleModal'>Создать визит</button><input class='btn-exit' type='button' value='Выйти'/>",
    );
  }
  exit();
  let selector = document.querySelector('[name="doctor"]');
  selector.addEventListener(
    "change",
    function (e) {
      additionalForm(this.value);
    },
    false,
  );
  cardObjCreate();
}

//    Функция генерации дополнительныъ полей ввода в модальном окне после выбора доктора
export function additionalForm(value) {
  const enterAdd = document.querySelector('[name="doctor"]');

  let renderForm = "";
  const elementsArr = document.querySelectorAll(".clear");

  elementsArr.forEach((elem) => {
    elem.remove();
  });

  if (value === "Кардиолог") {
    renderForm = new FormCardiologist();
  } else if (value === "Стоматолог") {
    renderForm = new FormDentist();
  } else if (value === "Терапевт") {
    renderForm = new FormTherapist();
  }
  const SiblingsInput = new Form();
  enterAdd.insertAdjacentHTML(
    "afterend",
    `${SiblingsInput.render()}${renderForm.render()}`,
  );
  Form.formValid();
}

export function exit() {
  const btnExit = document.querySelector(".btn-exit");

  btnExit.addEventListener("click", () => {
    localStorage.removeItem("token");
    location.reload();
  });
}
