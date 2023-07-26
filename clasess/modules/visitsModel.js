import API from "../../function/api/API";
import {arrayVisitsView, elementDeleteINArray} from "../../scripts";
import {visitLayout} from "../../function/filters/filters";
import {renderForm} from "../../function/views/visitsView";

class Visit {
    constructor({id, doctor, date, title, description, urgency, fullName}) {
        this.id = id;
        this.doctor = doctor;
        this.date = date;
        this.title = title;
        this.description = description;
        this.urgency = urgency;
        this.fullName = fullName;
    }

    deleteVisit(visit, parent) {
        const deleteIcon = parent.querySelector(".fa-trash-alt");
        deleteIcon.addEventListener("click", (elem) => {
            elem.preventDefault();
            const deleteID = visit.id;
            API.delCards(deleteID).then((res) => {
                if (res.ok) {
                    elem.target.closest(".visit__item").remove();
                }
            });
            elementDeleteINArray(arrayVisitsView, deleteID);
            visitLayout(arrayVisitsView);
        });
    }

    editVisit(visit, parent) {
        const editIcon = parent.querySelector(".fa-edit");
        editIcon.addEventListener("click", (elem) => {
            elem.preventDefault();

            const editID = visit.id;
            renderForm(this, editID);
        });
    }

    addEvents(visit, parent) {
        this.deleteVisit(visit, parent)
        this.editVisit(visit, parent)
    }

    renderCard(visit) {
        const parentCard = document.createElement("div");
        parentCard.classList.add("visit__item");
        parentCard.insertAdjacentHTML("afterbegin", `
                       <div id="${visit.id}">
    <ul class="visit__base">
        <div class="visit__item-title">
            <div class="visit__base--title" name="${
            visit.id
        }">Visit Cards
            </div>
            <div class="edit__button">
                <i class="fas fa-edit"></i>
                <i class="fas fa-trash-alt"></i>
            </div>
        </div>
        <li class="visit__fullName"><span class="span">ФИО:</span>
            <p>${
            visit.fullName
        }</p></li>
        <li class="visit__doctor"><span class="span">Доктор:</span>
            <p>${
            visit.doctor
        }</p></li>
    </ul>
    <input type="button" value="Показать больше" class="button__more"></div>
<ul class="visit__option">
    <li class="visit__title"><span class="span">Цель визита: </span>
        <p>${
            visit.title
        }</p></li>
    <li class="visit__description"><span class="span">Описание визита: </span>
        <p>${
            visit.description
        }</p></li>
    <li class="visit__urgency"><span class="span">Срочность: </span>
        <p>${
            visit.urgency
        }</p></li>
    <li class="visit__date"><p>${
            visit.date
                ? `<span class="span">Дата визита: </span>${visit.date}`
                : ""
        }</p></li>
</ul>`)
        this.deleteVisit(visit, parentCard)
        this.editVisit(visit, parentCard)

        const visitOption = parentCard.querySelector(".visit__option");
        visitOption.insertAdjacentHTML("afterend", `<div  id="test${visit.id}"></div>`);
        return visitOption;
    }
}

class VisitCardiologist extends Visit {
    constructor({
                    id,
                    doctor,
                    date,
                    title,
                    description,
                    urgency,
                    fullName,
                    pressure,
                    bodyMass,
                    disease,
                    age,
                }) {
        super({id, doctor, date, title, description, urgency, fullName});
        this.pressure = pressure;
        this.bodyMass = bodyMass;
        this.disease = disease;
        this.age = age;
    }

    renderCard(visit) {
        const visitOption = super.renderCard(visit)
        visitOption.insertAdjacentHTML("afterbegin", `<li class="visit__pressure"><p>${
            visit.pressure
                ? `<span class="span">Давление: </span> ${visit.pressure}`
                : ""
        }</p></li>
<li class="visit__weight"><p>${
            visit.weight
                ? `<span class="span">Вес: </span>${visit.weight}`
                : ""
        }</p></li>
<li class="visit__disease"><p>${
            visit.disease
                ? `<span class="span">Перенесенные заболевания: </span>${visit.disease}`
                : ""
        }</p></li>
<li class="visit__age"><p>${
            visit.age
                ? `<span class="span">Возраст: </span>${visit.age}`
                : ``
        }</p></li>`);

        return visitOption.closest(".visit__item");

    }
}

class VisitDentist extends Visit {
    constructor({
                    id,
                    doctor,
                    date,
                    title,
                    description,
                    urgency,
                    fullName,
                    dateOfLastVisit,
                }) {
        super({id, doctor, date, title, description, urgency, fullName});
        this.dateOfLastVisit = dateOfLastVisit;
    }

    renderCard(visit) {
        const visitOption = super.renderCard(visit)
        visitOption.insertAdjacentHTML("afterbegin", `<li className="visit__date"><p>${
            visit.dateOfLastVisit
                ? `<span class="span">Последний визит: </span>${visit.dateOfLastVisit}`
                : ""
        }</p></li>`);

        return visitOption.closest(".visit__item");;

    }

}

class VisitTherapist extends Visit {
    constructor({
                    id,
                    doctor,
                    date,
                    title,
                    description,
                    urgency,
                    fullName,
                    age,
                }) {
        super({id, doctor, date, title, description, urgency, fullName});
        this.age = age;
    }
    renderCard(visit) {
        const visitOption = super.renderCard(visit)
        visitOption.insertAdjacentHTML("afterbegin", `   <li class="visit__age"><p>${
            visit.age
                ? `<span class="span">Возраст: </span>${visit.age}`
                : ``
        }</p></li>`);

        return visitOption.closest(".visit__item");;

    }
}

export {Visit};
export {VisitCardiologist};
export {VisitDentist};
export {VisitTherapist};
