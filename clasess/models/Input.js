
class Input {
  constructor(type, styleCss, name, label,value) {
    this.type = type;
    this.classCss = styleCss;
    this.name = name;
    this.label = label;
    this.value=value||"";
  }

  render() {
    return `<label  class="form-label clear">${this.label}</label>
<input value="${this.value}" type=${this.type} class="clear ${this.classCss}" name=${this.name}>`;
  }
}

const formLogin = () => {
  const elem1 = new Input("email", "form-control", "email", "Емейл");
  const elem2 = new Input("password", "form-control", "password", "Пароль");
  return `<form>${elem1.render()} ${elem2.render()}</form>`;
};

export { Input, formLogin };

