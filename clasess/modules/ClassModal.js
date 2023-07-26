class Modal {
  constructor(title, content, selector) {
    this.selector = selector;
    this.title = title;
    this.content = content;
  }
  renderModal() {
    const modal = document.querySelector(this.selector);
    modal.insertAdjacentHTML(
      "afterbegin",
      `
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
     </div>`
    );
  }
}

export { Modal };
