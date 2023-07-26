import { init } from "../clasess/modules/Layout";

init();
let arrayVisitsView = [];

function elementDeleteINArray(array, deleteID) {
  for (let i = array.length - 1; i >= 0; i--) {
    if (array[i].id === deleteID) {
      array.splice(i, 1);
      break;
    }
  }
}

export { arrayVisitsView };
export { elementDeleteINArray };
