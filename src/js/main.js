import Option from "./components/Option";
import singleCarousel from "./components/SingleCarousel";

// https://dog.ceo/api/breed/affenpinscher/images/random
// https://dog.ceo/api/breeds/list/all

const BASE_URL = `https://dog.ceo/api/`;

// === MARK: DOM Selection
const breedListEl = document.querySelector("#data-breed-list");
const carouselContainerEl = document.querySelector(".carousel-inner");

// === MARK: Fetch
// Get dog breeds and set to local storage
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

// Fetch [images] for a given breed
async function getDogImages(breed) {
  try {
    const res = await fetch(`${BASE_URL}breed/${breed}/images`);
    const data = await res.json();
    return data.message.slice(0, 10);
  } catch (error) {
    return console.error(error);
  }
}

// === MARK: Render
async function renderSelect() {
  const dogsList = await getDogsList();

  const fragment = document.createDocumentFragment();

  console.log(dogsList);

  Object.keys(dogsList).forEach((dogName) => {
    fragment.appendChild(Option(dogName));
  });

  breedListEl.append(fragment);
}

async function renderImageCarousel(breed) {
  carouselContainerEl.innerHTML = "";

  // Step1: Get list of images based on breed
  const data = await getDogImages(breed);
  console.log(data);

  const fragment = document.createDocumentFragment();

  data.forEach((link, idx) => {
    fragment.appendChild(singleCarousel(link, idx === 0));
  });

  carouselContainerEl.appendChild(fragment);
}

// === MARK:  Events
breedListEl.addEventListener("change", async (e) => {
  const currInput = e.target.value;
  renderImageCarousel(currInput);
});

// === Render on inital load
document.addEventListener("DOMContentLoaded", () => {
  renderSelect();
  renderImageCarousel("affenpinscher");
});
