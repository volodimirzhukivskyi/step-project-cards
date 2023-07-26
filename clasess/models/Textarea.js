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

export { Textarea };
