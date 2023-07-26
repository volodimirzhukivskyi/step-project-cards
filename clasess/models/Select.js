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
            return prev + ` <option ${this.urgency !== next ? "" : "selected"} value="${next}">${next}</option>`
        }, "")

        
        return `<select   class=" ${this.classSelect}" name=${this.name} >
            ${resultStr}
        </select>
`;
    }
}

export {Select};
