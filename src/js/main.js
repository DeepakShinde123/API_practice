import Option from "./components/Option";
import singleCarousel from "./components/SingleCarousel";

// https://dog.ceo/api/breed/affenpinscher/images/random
// https://dog.ceo/api/breeds/list/all

const BASE_URL = `https://dog.ceo/api/`;

const breedListEl = document.querySelector("#data-breed-list");
console.log(breedListEl);

const carouselContainerEl = document.querySelector(".carousel-inner");

async function getDogsList() {
  let breeds = JSON.parse(localStorage.getItem("breeds"));

  if (!breeds) {
    try {
      const res = await fetch(`${BASE_URL}breeds/list/all`);
      const data = await res.json();
      localStorage.setItem("breeds", JSON.stringify(data.message));
      breeds = data.message;
    } catch (err) {
      console.error("Error occured", err);
    }
  }

  return breeds;
}

async function getDogImages(breed) {
  try {
    const res = await fetch(`${BASE_URL}breed/${breed}/images`);
    const data = await res.json();
    console.log(data.message);
    return data.message;
  } catch (error) {
    return console.error(error);
  }
}

function renderSelect() {
  getDogsList().then((breedList) => {
    const fragment = document.createDocumentFragment();
    for (let breed in breedList) {
      breedListEl.appendChild(Option(breed));
    }
  });
}

// async function renderSelect() {
//   const dogsList = await getDogsList();
//   Object.keys(dogsList).forEach((dogName) => {
//     breedListEl.apppendChild(Option(dogName));
//   });
// }

async function renderImageCarousel(breed) {
  carouselContainerEl.innerHTML = "";
  const data = await getDogImages(breed);
  const fragment = document.createDocumentFragment();
  data.forEach((link) => fragment.appendChild(singleCarousel(link)));
  carouselContainerEl.appendChild(fragment);
}
renderImageCarousel("poodle");

breedListEl.addEventListener("change", async (e) => {
  const currentValue = e.target.value;
  renderImageCarousel(currentValue);
});

renderSelect();
