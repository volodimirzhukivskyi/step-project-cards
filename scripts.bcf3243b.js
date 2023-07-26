// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"function/api/checkFetchData.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkFetchData = checkFetchData;
function checkFetchData(res) {
  if (res.ok) {
    return res.text();
  }
  return res.text().then(error => {
    const e = new Error("Упс  , что то пошло не так...");
    e.data = error;
    throw e;
  });
}
},{}],"function/api/API.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _checkFetchData = require("./checkFetchData");
const LINK = {
  cards: "https://ajax.test-danit.com/api/v2/cards",
  login: "https://ajax.test-danit.com/api/v2/cards/login"
};
function authorization() {
  return {
    "Content-type": "application/json",
    Authorization: localStorage.getItem("token") ? `Bearer ${localStorage.getItem("token")}` : undefined
  };
}
const auth = user => {
  return fetch(LINK.login, {
    method: "POST",
    headers: authorization(),
    body: JSON.stringify(user)
  });
};
const getCards = () => {
  return fetch(LINK.cards, {
    headers: authorization()
  }).then(r => r.json());
};
const getOneCards = ip => {
  return fetch(`${LINK.cards}/${ip}`, {
    method: "GET",
    headers: authorization()
  });
};
const addCard = cardObj => {
  return fetch(LINK.cards, {
    method: "POST",
    body: JSON.stringify(cardObj),
    headers: authorization()
  }).then(r => (0, _checkFetchData.checkFetchData)(r));
};
const delCards = ip => {
  return fetch(`${LINK.cards}/${ip}`, {
    method: "DELETE",
    headers: authorization()
  });
};
function changeCard(ip, changeObj) {
  return fetch(`${LINK.cards}/${ip}`, {
    method: "PUT",
    headers: authorization(),
    body: JSON.stringify(changeObj)
  }).then(res => res.text()).then(response => response);
}
var _default = {
  getOneCards,
  changeCard,
  delCards,
  auth,
  getCards,
  addCard,
  authorization
};
exports.default = _default;
},{"./checkFetchData":"function/api/checkFetchData.js"}],"clasess/models/Input.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formLogin = exports.Input = void 0;
class Input {
  constructor(type, styleCss, name, label, value) {
    this.type = type;
    this.classCss = styleCss;
    this.name = name;
    this.label = label;
    this.value = value || "";
  }
  render() {
    return `<label  class="form-label clear">${this.label}</label>
<input value="${this.value}" type=${this.type} class="clear ${this.classCss}" name=${this.name}>`;
  }
}
exports.Input = Input;
const formLogin = () => {
  const elem1 = new Input("email", "form-control", "email", "Емейл");
  const elem2 = new Input("password", "form-control", "password", "Пароль");
  return `<form>${elem1.render()} ${elem2.render()}</form>`;
};
exports.formLogin = formLogin;
},{}],"clasess/models/Select.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Select = void 0;
class Select {
  constructor(classCss, name, stringValues, urgency) {
    this.classSelect = classCss;
    this.name = name;
    this.stringValues = stringValues;
    this.urgency = urgency || "";
  }
  render() {
    const arrayString = this.stringValues.split(",");
    const resultStr = arrayString.reduce((prev, next) => {
      return prev + ` <option ${this.urgency !== next ? "" : "selected"} value="${next}">${next}</option>`;
    }, "");
    return `<select   class=" ${this.classSelect}" name=${this.name} >
            ${resultStr}
        </select>
`;
  }
}
exports.Select = Select;
},{}],"clasess/modules/ClassModal.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Modal = void 0;
class Modal {
  constructor(title, content, selector) {
    this.selector = selector;
    this.title = title;
    this.content = content;
  }
  renderModal() {
    const modal = document.querySelector(this.selector);
    modal.insertAdjacentHTML("afterbegin", `
            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">${this.title}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <form id="form"><div class="modal-body">
                  ${this.content}
                  </div>
                  <div class="modal-footer">
                    <button type="submit" id="submit" class="btn btn-primary">Отправить</button>
                  </div></form>
                </div>
              </div>
     </div>`);
  }
}
exports.Modal = Modal;
},{}],"clasess/models/Textarea.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Textarea = void 0;
class Textarea {
  constructor(rows, cols, name, label, classCss) {
    this.rows = rows;
    this.cols = cols;
    this.name = name;
    this.label = label;
    this.class = classCss;
  }
  render() {
    return `  <label  class="form-label clear ">${this.label}</label>
  <textarea class="form-control clear" rows=${this.rows} class=${this.class} cols=${this.cols} name=${this.name}></textarea>`;
  }
}
exports.Textarea = Textarea;
},{}],"clasess/modules/Form.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FormTherapist = exports.FormDentist = exports.FormCardiologist = exports.Form = void 0;
var _Input = require("../models/Input");
var _Select = require("../models/Select");
var _Textarea = require("../models/Textarea");
class Form {
  constructor() {}
  makeHtmlStr(arr) {
    let resultStr = "";
    arr.forEach(input => resultStr += input.render());
    return resultStr;
  }
  render() {
    const inputs = [new _Select.Select("form-select clear", "urgency", "Срочность,Обычная,Приоритетная,Неотложная"), new _Input.Input("text", "form-control", "title", "Введите цель визита"), new _Input.Input("text", "form-control", "fullName", "Введите Фамилию Имя Отчество"), new _Textarea.Textarea("5", "58", "description", "Краткое описание визита", "clear")];
    return `
<div> 
${this.makeHtmlStr(inputs)}
</div>
`;
  }
  static formValid() {
    const form = document.querySelector("#form");
    const formInputs = document.querySelectorAll(".form-control");
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      const errors = form.querySelectorAll(".error");
      errors.forEach(error => error.remove());
      formInputs.forEach(formInput => {
        if (!formInput.value) {
          console.log(formInput);
          const error = document.createElement("div");
          error.className = "error";
          error.innerHTML = `Не заповнене поле - ${formInput.name}`;
          formInput.parentElement.insertBefore(error, formInput);
        }
      });
    });
  }
}
exports.Form = Form;
class FormCardiologist extends Form {
  constructor() {
    super();
  }
  render() {
    const cardiologistInputs = [new _Input.Input("date", "form-control", "date", "Введите дату визита "), new _Input.Input("text", "form-control", "pressure", "Введите давление в формате XXX/XX"), new _Input.Input("text", "form-control", "bodyMass", "Введите массу тела"), new _Input.Input("text", "form-control", "disease", "Введите перенесенные заболевания сердечно-сосудистой системы"), new _Input.Input("text", "form-control", "age", "Введите возраст пациента")];
    return `
<div>
${this.makeHtmlStr(cardiologistInputs)}

</div>

`;
  }
}
exports.FormCardiologist = FormCardiologist;
class FormDentist extends Form {
  constructor() {
    super();
  }
  render() {
    const dentistInputs = [new _Input.Input("date", "form-control", "date", "Введите дату визита "), new _Input.Input("date", "form-control", "dateOfLastVisit", "Введите дату последнего визита ")];
    return `
    <div>
    ${this.makeHtmlStr(dentistInputs)}
    </div>
`;
  }
}
exports.FormDentist = FormDentist;
class FormTherapist extends Form {
  constructor() {
    super();
  }
  render() {
    const therapistInputs = [new _Input.Input("date", "form-control", "date", "Введите дату визита "), new _Input.Input("text", "form-control", "age", "Введите возраст пациента")];
    return `
${this.makeHtmlStr(therapistInputs)}
`;
  }
}
exports.FormTherapist = FormTherapist;
},{"../models/Input":"clasess/models/Input.js","../models/Select":"clasess/models/Select.js","../models/Textarea":"clasess/models/Textarea.js"}],"clasess/modules/sendDataFormOnServer.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cardObjCreate = cardObjCreate;
exports.cardObjEdit = cardObjEdit;
var _getVisitsFromServer = require("./getVisitsFromServer");
var _Layout = require("./Layout");
var _filters = require("../../function/filters/filters");
var _scripts = require("../../scripts");
var _API = _interopRequireDefault(require("../../function/api/API"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
//Функция формирования обьекта запроса
//Функция отправки запроса на создание визита на серевере + получение ответа сервера
function cardObjCreate() {
  const modal = document.querySelector(".btn-close");
  const form = document.querySelector("#form");
  const card = {};
  form.addEventListener("submit", e => {
    const formData = new FormData(form);
    for (let [key, value] of formData.entries()) {
      card[key] = value;
      if (value === "") {
        return false;
      }
    }
    _API.default.addCard(card).then(res => {
      form.reset();
      (0, _getVisitsFromServer.createVisitForView)(JSON.parse(res));
      (0, _filters.visitLayout)(_scripts.arrayVisitsView);
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
  _API.default.changeCard(id, cardObj).then(response => {
    return JSON.parse(response);
  }).then(res => {
    (0, _scripts.elementDeleteINArray)(_scripts.arrayVisitsView, res.id);
    (0, _getVisitsFromServer.createVisitForView)(res);
    (0, _filters.visitLayout)(_scripts.arrayVisitsView);
  });
}
},{"./getVisitsFromServer":"clasess/modules/getVisitsFromServer.js","./Layout":"clasess/modules/Layout.js","../../function/filters/filters":"function/filters/filters.js","../../scripts":"scripts/index.js","../../function/api/API":"function/api/API.js"}],"function/views/visitsView.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderForm = renderForm;
exports.visitOneView = visitOneView;
exports.visitsView = visitsView;
var _sendDataFormOnServer = require("../../clasess/modules/sendDataFormOnServer");
var _filters = require("../filters/filters");
var _scripts = require("../../scripts");
var _Select = require("../../clasess/models/Select");
var _Input = require("../../clasess/models/Input");
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
    visitHTML.insertAdjacentHTML("afterbegin", `<h2>No items have been added</h2>`);
  } else {
    visitsArray.forEach(visit => {
      visitOneView(visit);
    });
  }

  //? покращив метод замість навішування слухачів навісив onclick
  const items = document.querySelectorAll(".button__more");
  items.forEach(item => item.onclick = () => shoowInput(item));
  function shoowInput(button) {
    const visitCard = button.closest(".visit__item");
    const visitOption = visitCard.querySelector(".visit__option");
    visitOption.classList.toggle("visible");
    button.value = button.value === "Скрыть" ? "Показать больше" : "Скрыть";
  }
}
function renderInput(arr, ...rest) {
  const [date, title, description, fullName] = rest;
  const renderArr = [{
    type: "date",
    name: "date",
    label: "Введите дату визита",
    value: date
  }, {
    type: "text",
    name: "title",
    label: "Введите цель визита",
    value: title
  }, {
    type: "text",
    name: "description",
    label: "Введите краткое описание визита",
    value: description
  }, {
    type: "text",
    name: "fullName",
    label: "Введите Фамилию Имя Отчество",
    value: fullName
  }, ...arr];
  return renderArr.map(({
    type,
    name,
    label,
    value
  }) => new _Input.Input(type, "form-control clear", name, label, value).render()).join("");
}
function renderForm(arg, editID) {
  const elem = document.getElementById(`${editID}`);
  const form = document.getElementById(`test${editID}`);
  elem.style.display = "none";
  if (arg.doctor === "Стоматолог") {
    const {
      doctor,
      id,
      urgency,
      date,
      title,
      description,
      dateOfLastVisit,
      fullName
    } = arg;
    const inputData = [{
      type: "date",
      name: "dateOfLastVisit",
      label: "Введите дату последнего посещения",
      value: dateOfLastVisit
    }];
    form.insertAdjacentHTML("beforebegin", `
                            <h4>Визит к ${doctor}у</h4>
                            <form id="form__edit_${id}">
                            <select id="selectDoctors"  class="form-select"  style="display: none" name="doctor" aria-label="Default select example">
                              <option value="Стоматолог" selected>Стоматолог</option>
                            </select>
                            ${new _Select.Select("form-select clear", "urgency", "Срочность,Обычная,Приоритетная,Неотложная", urgency).render()}
                           ${renderInput(inputData, date, title, description, fullName)}
                          
                          </form>
                         <button  class="button__edit">Сохранить изменения</button>
                         <button  class="button__undo">Отмена</button>
                        `);
  }
  if (arg.doctor === "Кардиолог") {
    const {
      age,
      id,
      bodyMass,
      date,
      description,
      disease,
      doctor,
      fullName,
      pressure,
      title,
      urgency
    } = arg;
    const inputData = [{
      type: "text",
      name: "pressure",
      label: "Введите давление в формате XXX/XX",
      value: pressure
    }, {
      type: "text",
      name: "bodyMass",
      label: "Введите массу тела",
      value: bodyMass
    }, {
      type: "text",
      name: "disease",
      label: "Введите перенесенные заболевания сердечно-сосудистой системы",
      value: disease
    }, {
      type: "text",
      name: "age",
      label: "Введите возраст пациента",
      value: age
    }];
    form.insertAdjacentHTML("afterend", `
                             <h4>Визит к ${doctor}у</h4>
                            <form id="form__edit_${id}">
                            <select id="selectDoctors"  class="form-select" style="display: none" name="doctor" aria-label="Default select example">
                              <option value="Кардиолог" selected>Кардиолог</option>
                            </select>
                            ${new _Select.Select("form-select clear", "urgency", "Срочность,Обычная,Приоритетная,Неотложная", urgency).render()}
                           ${renderInput(inputData, date, title, description, fullName)}
                            
                            </form>
                        <button  class="button__edit">Сохранить изменения</button>
                        <button  class="button__undo">Отмена</button>
                        `);
  }
  if (arg.doctor === "Терапевт") {
    const {
      age,
      id,
      date,
      description,
      doctor,
      fullName,
      title,
      urgency
    } = arg;
    const inputData = [{
      type: "text",
      name: "age",
      label: "Введите возраст пациента",
      value: age
    }];
    form.insertAdjacentHTML("afterend", `
                              <h4>Визит к ${doctor}у</h4>
                            <form id="form__edit_${id}">
                            <select id="selectDoctors"  class="form-select" style="display: none" name="doctor" aria-label="Default select example">
                              <option value="Терапевт" selected>Терапевт</option>
                            </select>
                            ${new _Select.Select("form-select clear", "urgency", "Срочность,Обычная,Приоритетная,Неотложная", urgency).render()}
                             ${renderInput(inputData, date, title, description, fullName)}
                            </form>
                      <button  class="button__edit">Сохранить изменения</button>
                      <button  class="button__undo">Отмена</button>
                        `);
  }
  form.parentElement.querySelector(".button__edit").addEventListener(`click`, () => {
    (0, _sendDataFormOnServer.cardObjEdit)(editID);
  });
  form.parentElement.querySelector(".button__undo").addEventListener(`click`, () => {
    (0, _filters.visitLayout)(_scripts.arrayVisitsView);
  });
}
},{"../../clasess/modules/sendDataFormOnServer":"clasess/modules/sendDataFormOnServer.js","../filters/filters":"function/filters/filters.js","../../scripts":"scripts/index.js","../../clasess/models/Select":"clasess/models/Select.js","../../clasess/models/Input":"clasess/models/Input.js"}],"function/filters/filters.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.visitLayout = visitLayout;
var _visitsView = require("../views/visitsView");
const STATUS_FILTER = ["All", "open", "done"];
const PRIORITY_FILTER = ["All", "Неотложная", "Приоритетная", "Обычная"];

// Рендер страницы с формами и списком выбора фильтра
function visitLayout(filterArray) {
  function renderFilters() {
    // Рендер страницы с формами
    let html = '<div><div class="filters-header" id="filtersHeader">';
    html += `<div class="container"><div class="row">
                <div class="col-sm">
                    <label class="status-label">Status:</label>
                        <select class="form-select" id="status-filter">
                                    ${STATUS_FILTER.map(option => `
                            <option value="${option}">${option}</option>`)}
                        </select>
                </div>`;
    html += `<div class="col-sm">
                <label class="status-label">Priority:</label>
                <select class="form-select" id="priority-filter">
                           ${PRIORITY_FILTER.map(option => `
                    <option value="${option}">
                        ${option}
                    </option>`)}
                </select>
             </div>`;
    html += `<div class="search col-sm">
                <label for="session-search" class="form-label">Search:</label>
                <input class="search-input" id="cardsSearch" type="search" value="" />
             </div>`;
    html += "</div></div>";
    document.querySelector(".filters").innerHTML = html;
  }
  renderFilters();

  // Фильтр
  const filter = document.getElementById("filtersHeader");
  filter.addEventListener("input", statusGoods);
  outputGoods(filterArray); // запуск функции для начального отображения

  function statusGoods() {
    let status = document.getElementById("status-filter").value;
    let priority = document.getElementById("priority-filter").value;
    const search = document.getElementById("cardsSearch").value.toString().toLowerCase();

    // Проверка на наличие текста и если текст есть, то картинку не показывать
    if (search !== "") {
      document.getElementById("cardsSearch").style.background = "none";
    } else {
      document.getElementById("cardsSearch").style.background = "url(https://img.icons8.com/plasticine/30/000000/google-web-search.png) no-repeat";
    }
    let currentDate = new Date().getTime();
    outputGoods(filterArray.filter(n => (priority === "All" || n.urgency === priority) && (
    // фильтр по приоритету
    status === "All" ||
    // фильтр по статусу
    new Date(n.date).getTime() < currentDate && status === "done" || new Date(n.date).getTime() > currentDate && status === "open") && (
    // фильтр по вводу текста
    n.doctor.toLowerCase().includes(search) || n.description.toLowerCase().includes(search) || n.fullName.toLowerCase().includes(search))));
  }
  function outputGoods(goods) {
    (0, _visitsView.visitsView)(goods);
  }
}
},{"../views/visitsView":"function/views/visitsView.js"}],"clasess/modules/visitsModel.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VisitTherapist = exports.VisitDentist = exports.VisitCardiologist = exports.Visit = void 0;
var _API = _interopRequireDefault(require("../../function/api/API"));
var _scripts = require("../../scripts");
var _filters = require("../../function/filters/filters");
var _visitsView = require("../../function/views/visitsView");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class Visit {
  constructor({
    id,
    doctor,
    date,
    title,
    description,
    urgency,
    fullName
  }) {
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
    deleteIcon.addEventListener("click", elem => {
      elem.preventDefault();
      const deleteID = visit.id;
      _API.default.delCards(deleteID).then(res => {
        if (res.ok) {
          elem.target.closest(".visit__item").remove();
        }
      });
      (0, _scripts.elementDeleteINArray)(_scripts.arrayVisitsView, deleteID);
      (0, _filters.visitLayout)(_scripts.arrayVisitsView);
    });
  }
  editVisit(visit, parent) {
    const editIcon = parent.querySelector(".fa-edit");
    editIcon.addEventListener("click", elem => {
      elem.preventDefault();
      const editID = visit.id;
      (0, _visitsView.renderForm)(this, editID);
    });
  }
  addEvents(visit, parent) {
    this.deleteVisit(visit, parent);
    this.editVisit(visit, parent);
  }
  renderCard(visit) {
    const parentCard = document.createElement("div");
    parentCard.classList.add("visit__item");
    parentCard.insertAdjacentHTML("afterbegin", `
                       <div id="${visit.id}">
    <ul class="visit__base">
        <div class="visit__item-title">
            <div class="visit__base--title" name="${visit.id}">Visit Cards
            </div>
            <div class="edit__button">
                <i class="fas fa-edit"></i>
                <i class="fas fa-trash-alt"></i>
            </div>
        </div>
        <li class="visit__fullName"><span class="span">ФИО:</span>
            <p>${visit.fullName}</p></li>
        <li class="visit__doctor"><span class="span">Доктор:</span>
            <p>${visit.doctor}</p></li>
    </ul>
    <input type="button" value="Показать больше" class="button__more"></div>
<ul class="visit__option">
    <li class="visit__title"><span class="span">Цель визита: </span>
        <p>${visit.title}</p></li>
    <li class="visit__description"><span class="span">Описание визита: </span>
        <p>${visit.description}</p></li>
    <li class="visit__urgency"><span class="span">Срочность: </span>
        <p>${visit.urgency}</p></li>
    <li class="visit__date"><p>${visit.date ? `<span class="span">Дата визита: </span>${visit.date}` : ""}</p></li>
</ul>`);
    this.deleteVisit(visit, parentCard);
    this.editVisit(visit, parentCard);
    const visitOption = parentCard.querySelector(".visit__option");
    visitOption.insertAdjacentHTML("afterend", `<div  id="test${visit.id}"></div>`);
    return visitOption;
  }
}
exports.Visit = Visit;
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
    age
  }) {
    super({
      id,
      doctor,
      date,
      title,
      description,
      urgency,
      fullName
    });
    this.pressure = pressure;
    this.bodyMass = bodyMass;
    this.disease = disease;
    this.age = age;
  }
  renderCard(visit) {
    const visitOption = super.renderCard(visit);
    visitOption.insertAdjacentHTML("afterbegin", `<li class="visit__pressure"><p>${visit.pressure ? `<span class="span">Давление: </span> ${visit.pressure}` : ""}</p></li>
<li class="visit__weight"><p>${visit.weight ? `<span class="span">Вес: </span>${visit.weight}` : ""}</p></li>
<li class="visit__disease"><p>${visit.disease ? `<span class="span">Перенесенные заболевания: </span>${visit.disease}` : ""}</p></li>
<li class="visit__age"><p>${visit.age ? `<span class="span">Возраст: </span>${visit.age}` : ``}</p></li>`);
    return visitOption.closest(".visit__item");
  }
}
exports.VisitCardiologist = VisitCardiologist;
class VisitDentist extends Visit {
  constructor({
    id,
    doctor,
    date,
    title,
    description,
    urgency,
    fullName,
    dateOfLastVisit
  }) {
    super({
      id,
      doctor,
      date,
      title,
      description,
      urgency,
      fullName
    });
    this.dateOfLastVisit = dateOfLastVisit;
  }
  renderCard(visit) {
    const visitOption = super.renderCard(visit);
    visitOption.insertAdjacentHTML("afterbegin", `<li className="visit__date"><p>${visit.dateOfLastVisit ? `<span class="span">Последний визит: </span>${visit.dateOfLastVisit}` : ""}</p></li>`);
    return visitOption.closest(".visit__item");
    ;
  }
}
exports.VisitDentist = VisitDentist;
class VisitTherapist extends Visit {
  constructor({
    id,
    doctor,
    date,
    title,
    description,
    urgency,
    fullName,
    age
  }) {
    super({
      id,
      doctor,
      date,
      title,
      description,
      urgency,
      fullName
    });
    this.age = age;
  }
  renderCard(visit) {
    const visitOption = super.renderCard(visit);
    visitOption.insertAdjacentHTML("afterbegin", `   <li class="visit__age"><p>${visit.age ? `<span class="span">Возраст: </span>${visit.age}` : ``}</p></li>`);
    return visitOption.closest(".visit__item");
    ;
  }
}
exports.VisitTherapist = VisitTherapist;
},{"../../function/api/API":"function/api/API.js","../../scripts":"scripts/index.js","../../function/filters/filters":"function/filters/filters.js","../../function/views/visitsView":"function/views/visitsView.js"}],"clasess/modules/getVisitsFromServer.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createVisitForView = createVisitForView;
exports.getVisits = getVisits;
var _API = _interopRequireDefault(require("../../function/api/API"));
var _filters = require("../../function/filters/filters");
var _scripts = require("../../scripts");
var _visitsModel = require("./visitsModel");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function getVisits() {
  _API.default.getCards().then(responses => {
    responses.forEach(response => {
      createVisitForView(response);
    });
    (0, _filters.visitLayout)(_scripts.arrayVisitsView);
  });
}
function createVisitForView(object) {
  //создает обьект согласно нужного класса. Добавялет обьект в массив для отображения

  const findDoctor = object => {
    console.log(object);
    switch (object.doctor) {
      case "Стоматолог":
        return new _visitsModel.VisitDentist(object);
      case "Кардиолог":
        return new _visitsModel.VisitCardiologist(object);
      case "Терапевт":
        return new _visitsModel.VisitTherapist(object);
    }
    return {};
  };
  _scripts.arrayVisitsView.push(findDoctor(object));
}
},{"../../function/api/API":"function/api/API.js","../../function/filters/filters":"function/filters/filters.js","../../scripts":"scripts/index.js","./visitsModel":"clasess/modules/visitsModel.js"}],"clasess/modules/Layout.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.additionalForm = additionalForm;
exports.exit = exit;
exports.init = void 0;
exports.newForm = newForm;
exports.renderModalform = renderModalform;
exports.responseEnter = responseEnter;
var _API = _interopRequireDefault(require("../../function/api/API"));
var _checkFetchData = require("../../function/api/checkFetchData");
var _Input = require("../models/Input");
var _Select = require("../models/Select");
var _ClassModal = require("./ClassModal");
var _Form = require("./Form");
var _getVisitsFromServer = require("./getVisitsFromServer");
var _sendDataFormOnServer = require("./sendDataFormOnServer");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const init = () => {
  const buttonEnter = document.querySelector("#button-enter");
  if (localStorage.getItem("token")) {
    buttonEnter.remove();
    newForm();
    (0, _getVisitsFromServer.getVisits)();
  } else {
    document.querySelector(".visits__item-wrapper").insertAdjacentHTML("afterbegin", `<h2>No items have been added</h2>`);
    renderModalform();
    responseEnter();
  }
};

//форма авторизации
exports.init = init;
function renderModalform() {
  const modalLogin = new _ClassModal.Modal("Войти", (0, _Input.formLogin)(), ".header");
  modalLogin.renderModal();
}

// отправка запроса авторизации
function responseEnter() {
  const submit = document.getElementById("submit");
  const modal = document.querySelector(".btn-close");
  const email = document.querySelector('[name="email"]');
  const password = document.querySelector('[name="password"]');
  submit.addEventListener("click", () => {
    _API.default.auth({
      email: email.value,
      password: password.value
    }).then(res => {
      return (0, _checkFetchData.checkFetchData)(res);
    }).then(token => {
      console.log(token);
      localStorage.setItem("token", `${token}`);
      modal.click();
      init();
    }).catch(e => (0, _checkFetchData.checkFetchData)(e));
  });
}

// создаем форму в модальном окне и выводим туда список выбора докторов
function newForm() {
  const buttonCreateVisit = document.querySelector(".header");
  const btnExit = document.querySelector(".btn-exit");
  const selectDoctor = new _Select.Select("form-select ", "doctor", "Выбор Врача,Кардиолог,Стоматолог,Терапевт");
  new _ClassModal.Modal("Создать Визит", selectDoctor.render(), ".header").renderModal();
  if (!btnExit) {
    buttonCreateVisit.insertAdjacentHTML("beforeend", "<button type='button' id='button-enter' class='btn btn-primary' data-bs-toggle='modal' data-bs-target='#exampleModal'>Создать визит</button><input class='btn-exit' type='button' value='Выйти'/>");
  }
  exit();
  let selector = document.querySelector('[name="doctor"]');
  selector.addEventListener("change", function (e) {
    additionalForm(this.value);
  }, false);
  (0, _sendDataFormOnServer.cardObjCreate)();
}

//    Функция генерации дополнительныъ полей ввода в модальном окне после выбора доктора
function additionalForm(value) {
  const enterAdd = document.querySelector('[name="doctor"]');
  let renderForm = "";
  const elementsArr = document.querySelectorAll(".clear");
  elementsArr.forEach(elem => {
    elem.remove();
  });
  if (value === "Кардиолог") {
    renderForm = new _Form.FormCardiologist();
  } else if (value === "Стоматолог") {
    renderForm = new _Form.FormDentist();
  } else if (value === "Терапевт") {
    renderForm = new _Form.FormTherapist();
  }
  const SiblingsInput = new _Form.Form();
  enterAdd.insertAdjacentHTML("afterend", `${SiblingsInput.render()}${renderForm.render()}`);
  _Form.Form.formValid();
}
function exit() {
  const btnExit = document.querySelector(".btn-exit");
  btnExit.addEventListener("click", () => {
    localStorage.removeItem("token");
    location.reload();
  });
}
},{"../../function/api/API":"function/api/API.js","../../function/api/checkFetchData":"function/api/checkFetchData.js","../models/Input":"clasess/models/Input.js","../models/Select":"clasess/models/Select.js","./ClassModal":"clasess/modules/ClassModal.js","./Form":"clasess/modules/Form.js","./getVisitsFromServer":"clasess/modules/getVisitsFromServer.js","./sendDataFormOnServer":"clasess/modules/sendDataFormOnServer.js"}],"scripts/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.arrayVisitsView = void 0;
exports.elementDeleteINArray = elementDeleteINArray;
var _Layout = require("../clasess/modules/Layout");
(0, _Layout.init)();
let arrayVisitsView = [];
exports.arrayVisitsView = arrayVisitsView;
function elementDeleteINArray(array, deleteID) {
  for (let i = array.length - 1; i >= 0; i--) {
    if (array[i].id === deleteID) {
      array.splice(i, 1);
      break;
    }
  }
}
},{"../clasess/modules/Layout":"clasess/modules/Layout.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}
module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "63964" + '/');
  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);
    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);
          if (didAccept) {
            handled = true;
          }
        }
      });

      // Enable HMR for CSS by default.
      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });
      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }
    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }
    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }
    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}
function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}
function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }
  var parents = [];
  var k, d, dep;
  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }
  if (checkedAssets[id]) {
    return;
  }
  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }
  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}
function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }
  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }
  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","scripts/index.js"], null)
//# sourceMappingURL=/scripts.bcf3243b.js.map