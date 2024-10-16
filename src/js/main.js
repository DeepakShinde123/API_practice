import Option from "./components/Option";

// https://dog.ceo/api/breed/affenpinscher/images/random
// https://dog.ceo/api/breeds/list/all

const BASE_URL = `https://dog.ceo/api/`;

const breedListEl = document.querySelector("#data-breed-list");
const imageEl = document.querySelector("img");

function getDogsList() {
  return fetch(`${BASE_URL}breeds/list/all`)
    .then((res) => res.json())
    .then((data) => data.message)
    .catch((err) => console.error("error aagyi", err));
}

function getDogImage(breed) {
  fetch(`${BASE_URL}breed/${breed}/images/random`)
    .then((res) => res.json())
    .then((data) => data.message);
}

function renderSelect() {
  getDogsList().then((breedList) => {
    for (let breed in breedList) {
      breedListEl.appendChild(Option(breed));
    }
  });
}

renderSelect();

function renderImage() {}
