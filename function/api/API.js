import { checkFetchData } from "./checkFetchData";

const LINK = {
  cards: "https://ajax.test-danit.com/api/v2/cards",
  login: "https://ajax.test-danit.com/api/v2/cards/login",
};

function authorization() {
  return {
    "Content-type": "application/json",
    Authorization: localStorage.getItem("token")
      ? `Bearer ${localStorage.getItem("token")}`
      : undefined,
  };
}
const auth = (user) => {
  return fetch(LINK.login, {
    method: "POST",
    headers: authorization(),
    body: JSON.stringify(user),
  });
};

const getCards = () => {
  return fetch(LINK.cards, {
    headers: authorization(),
  }).then((r) => r.json());
};

const getOneCards = (ip) => {
  return fetch(`${LINK.cards}/${ip}`, {
    method: "GET",
    headers: authorization(),
  });
};

const addCard = (cardObj) => {
  return fetch(LINK.cards, {
    method: "POST",
    body: JSON.stringify(cardObj),
    headers: authorization(),
  }).then((r) => checkFetchData(r));
};

const delCards = (ip) => {
  return fetch(`${LINK.cards}/${ip}`, {
    method: "DELETE",
    headers: authorization(),
  });
};

function changeCard(ip, changeObj) {
  return fetch(`${LINK.cards}/${ip}`, {
    method: "PUT",
    headers: authorization(),
    body: JSON.stringify(changeObj),
  })
    .then((res) => res.text())
    .then((response) => response);
}

export default {
  getOneCards,
  changeCard,
  delCards,
  auth,
  getCards,
  addCard,
  authorization,
};
