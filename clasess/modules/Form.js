import { Input } from "../models/Input";
import { Select } from "../models/Select";
import { Textarea } from "../models/Textarea";

class Form {
  constructor() {}
  makeHtmlStr(arr) {
    let resultStr = "";
    arr.forEach((input) => (resultStr += input.render()));
    return resultStr;
  }
  render() {
    const inputs = [
      new Select(
        "form-select clear",
        "urgency",
        "Срочность,Обычная,Приоритетная,Неотложная"
      ),
      new Input("text", "form-control", "title", "Введите цель визита"),
      new Input(
        "text",
        "form-control",
        "fullName",
        "Введите Фамилию Имя Отчество"
      ),
      new Textarea(
        "5",
        "58",
        "description",
        "Краткое описание визита",
        "clear"
      ),
    ];

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
      errors.forEach(error=>error.remove())
      formInputs.forEach(formInput=>{
        if (!formInput.value) {
          console.log(formInput);
          const error = document.createElement("div");
          error.className = "error";
          error.innerHTML = `Не заповнене поле - ${formInput.name}`;
          formInput.parentElement.insertBefore(error, formInput);
        }
      })

    });
  }
}

class FormCardiologist extends Form {
  constructor() {
    super();
  }

  render() {
    const cardiologistInputs = [
      new Input("date", "form-control", "date", "Введите дату визита "),
      new Input(
        "text",
        "form-control",
        "pressure",
        "Введите давление в формате XXX/XX"
      ),
      new Input("text", "form-control", "bodyMass", "Введите массу тела"),
      new Input(
        "text",
        "form-control",
        "disease",
        "Введите перенесенные заболевания сердечно-сосудистой системы"
      ),
      new Input("text", "form-control", "age", "Введите возраст пациента"),
    ];

    return `
<div>
${this.makeHtmlStr(cardiologistInputs)}

</div>

`;
  }
}

class FormDentist extends Form {
  constructor() {
    super();
  }

  render() {
    const dentistInputs = [
      new Input("date", "form-control", "date", "Введите дату визита "),
      new Input(
        "date",
        "form-control",
        "dateOfLastVisit",
        "Введите дату последнего визита "
      ),
    ];

    return `
    <div>
    ${this.makeHtmlStr(dentistInputs)}
    </div>
`;
  }
}

class FormTherapist extends Form {
  constructor() {
    super();
  }

  render() {
    const therapistInputs = [
      new Input("date", "form-control", "date", "Введите дату визита "),
      new Input("text", "form-control", "age", "Введите возраст пациента"),
    ];

    return `
${this.makeHtmlStr(therapistInputs)}
`;
  }
}

export { Form, FormCardiologist, FormDentist, FormTherapist };
