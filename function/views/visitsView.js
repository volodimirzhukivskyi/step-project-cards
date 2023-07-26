import {cardObjEdit} from "../../clasess/modules/sendDataFormOnServer";
import {visitLayout} from "../filters/filters";
import {arrayVisitsView} from "../../scripts";
import {Select} from "../../clasess/models/Select";
import {Input} from "../../clasess/models/Input";

function visitOneView(visit) {
    //? перевірка обєкта на пустоту
    if (Object.keys(visit).length == 0) {
        return;
    }
    let visitHTML = document.querySelector(".visits__item-wrapper");
    //? передається об'єкт і визивається метод рендера для нього.
    visitHTML.append(visit.renderCard(visit));
}

function visitsView(visitsArray) {
    let visitHTML = document.querySelector(".visits__item-wrapper");
    visitHTML.innerHTML = "";

    if (!visitsArray.length) {
        visitHTML.insertAdjacentHTML("afterbegin", `<h2>No items have been added</h2>`,);
    } else {
        visitsArray.forEach((visit) => {
            visitOneView(visit);
        });
    }

//? покращив метод замість навішування слухачів навісив onclick
    const items = document.querySelectorAll(".button__more");
    items.forEach((item) => (item.onclick = () => shoowInput(item)));

    function shoowInput(button) {
        const visitCard = button.closest(".visit__item");
        const visitOption = visitCard.querySelector(".visit__option");

        visitOption.classList.toggle("visible");
        button.value = button.value === "Скрыть" ? "Показать больше" : "Скрыть";
    }
}
function renderInput (arr,...rest) {
    const [date,title,description,fullName]=rest
    const renderArr = [{type: "date", name: "date", label: "Введите дату визита", value: date}, {
        type: "text", name: "title", label: "Введите цель визита", value: title,
    }, {
        type: "text", name: "description", label: "Введите краткое описание визита", value: description,
    }, {
        type: "text", name: "fullName", label: "Введите Фамилию Имя Отчество", value: fullName,
    },...arr]
   return  renderArr.map(({
                       type,
                       name,
                       label,
                       value
                   }) => new Input(type, "form-control clear", name, label, value).render()).join("")
}

function renderForm(arg, editID) {
    const elem = document.getElementById(`${editID}`);
    const form = document.getElementById(`test${editID}`);
    elem.style.display = "none";
    if (arg.doctor === "Стоматолог") {
        const {
            doctor, id, urgency, date, title, description, dateOfLastVisit, fullName,
        } = arg;
        const inputData = [ {
            type: "date", name: "dateOfLastVisit", label: "Введите дату последнего посещения", value: dateOfLastVisit,
        }]


        form.insertAdjacentHTML("beforebegin", `
                            <h4>Визит к ${doctor}у</h4>
                            <form id="form__edit_${id}">
                            <select id="selectDoctors"  class="form-select"  style="display: none" name="doctor" aria-label="Default select example">
                              <option value="Стоматолог" selected>Стоматолог</option>
                            </select>
                            ${new Select("form-select clear", "urgency", "Срочность,Обычная,Приоритетная,Неотложная",urgency).render()}
                           ${renderInput(inputData,date,title,description,fullName)}
                          
                          </form>
                         <button  class="button__edit">Сохранить изменения</button>
                         <button  class="button__undo">Отмена</button>
                        `,);
    }
    if (arg.doctor === "Кардиолог") {
        const {
            age, id, bodyMass, date, description, disease, doctor, fullName, pressure, title, urgency,
        } = arg;
       const inputData =  [{
           type: "text", name: "pressure", label: "Введите давление в формате XXX/XX", value: pressure,
       },{
           type: "text", name: "bodyMass", label: "Введите массу тела", value: bodyMass,
       },{
           type: "text", name: "disease", label: "Введите перенесенные заболевания сердечно-сосудистой системы", value: disease,
       },{
           type: "text", name: "age", label: "Введите возраст пациента", value: age,
       }]
        form.insertAdjacentHTML("afterend", `
                             <h4>Визит к ${doctor}у</h4>
                            <form id="form__edit_${id}">
                            <select id="selectDoctors"  class="form-select" style="display: none" name="doctor" aria-label="Default select example">
                              <option value="Кардиолог" selected>Кардиолог</option>
                            </select>
                            ${new Select("form-select clear", "urgency", "Срочность,Обычная,Приоритетная,Неотложная",urgency).render()}
                           ${renderInput(inputData,date,title,description,fullName)}
                            
                            </form>
                        <button  class="button__edit">Сохранить изменения</button>
                        <button  class="button__undo">Отмена</button>
                        `,);
    }
    if (arg.doctor === "Терапевт") {
        const {age, id, date, description, doctor, fullName, title, urgency} = arg;
const inputData  = [{
    type: "text", name: "age", label: "Введите возраст пациента", value: age,
}]
        form.insertAdjacentHTML("afterend", `
                              <h4>Визит к ${doctor}у</h4>
                            <form id="form__edit_${id}">
                            <select id="selectDoctors"  class="form-select" style="display: none" name="doctor" aria-label="Default select example">
                              <option value="Терапевт" selected>Терапевт</option>
                            </select>
                            ${new Select("form-select clear", "urgency", "Срочность,Обычная,Приоритетная,Неотложная", urgency).render()}
                             ${renderInput(inputData, date, title, description, fullName)}
                            </form>
                      <button  class="button__edit">Сохранить изменения</button>
                      <button  class="button__undo">Отмена</button>
                        `,);
    }
    form.parentElement
        .querySelector(".button__edit")
        .addEventListener(`click`, () => {
            cardObjEdit(editID);
        });

    form.parentElement
        .querySelector(".button__undo")
        .addEventListener(`click`, () => {
            visitLayout(arrayVisitsView);
        });
}


export {visitsView};
export {visitOneView};
export {renderForm};
