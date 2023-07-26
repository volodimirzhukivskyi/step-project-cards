import { visitsView } from "../views/visitsView";

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
                                    ${STATUS_FILTER.map(
                                      (option) => `
                            <option value="${option}">${option}</option>`
                                    )}
                        </select>
                </div>`;

    html += `<div class="col-sm">
                <label class="status-label">Priority:</label>
                <select class="form-select" id="priority-filter">
                           ${PRIORITY_FILTER.map(
                             (option) => `
                    <option value="${option}">
                        ${option}
                    </option>`
                           )}
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
    const search = document
      .getElementById("cardsSearch")
      .value.toString()
      .toLowerCase();

    // Проверка на наличие текста и если текст есть, то картинку не показывать
    if (search !== "") {
      document.getElementById("cardsSearch").style.background = "none";
    } else {
      document.getElementById("cardsSearch").style.background =
        "url(https://img.icons8.com/plasticine/30/000000/google-web-search.png) no-repeat";
    }

    let currentDate = new Date().getTime();

    outputGoods(
      filterArray.filter(
        (n) =>
          (priority === "All" || n.urgency === priority) && // фильтр по приоритету
          (status === "All" || // фильтр по статусу
            (new Date(n.date).getTime() < currentDate && status === "done") ||
            (new Date(n.date).getTime() > currentDate && status === "open")) && // фильтр по вводу текста
          (n.doctor.toLowerCase().includes(search) ||
            n.description.toLowerCase().includes(search) ||
            n.fullName.toLowerCase().includes(search))
      )
    );
  }

  function outputGoods(goods) {
    visitsView(goods);
  }
}

export { visitLayout };
