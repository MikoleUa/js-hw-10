import "./css/styles.css";
import Notiflix from "notiflix";
import debounce from "lodash.debounce";
import API from "./api";

const DEBOUNCE_DELAY = 300;

const inputText = document.querySelector("#search-box");
const countryInfo = document.querySelector(".country-info");
const countryList = document.querySelector(".country-list");

inputText.addEventListener(
  "input",
  debounce(onSearchCountries, DEBOUNCE_DELAY)
);

function onSearchCountries(e) {
  e.preventDefault();

  if (!inputText.value.trim()) {
    countryInfo.innerHTML = "";
    countryList.innerHTML = "";
  } else {
    API.fetchCountry(e.target.value.trim())
      .then((data) => {
        if (data.length > 1 && data.length < 10) {
          countryInfo.innerHTML = "";
          renderCountryList(data);
        } else if (data.length === 1) {
          countryList.innerHTML = "";
          renderCountryInfo(data);
        } else if (data.length > 10) {
          countryInfo.innerHTML = "";
          countryList.innerHTML = "";
          Notiflix.Notify.warning(
            "Too many matches found. Please enter a more specific name."
          );
        }
      })
      .catch(() =>
        Notiflix.Notify.failure("Oops, there is no country with that name")
      );
  }
}
function renderCountryInfo(data) {
  const renderCountry = data
    .map((data) => {
      return `
      <ul> <img src = ${data.flags.svg} width = 20px> ${data.name.official}
    <li>Столиця: ${data.capital}</li>
    <li>Населення: ${data.population}</li>
    <li>Мова: ${Object.values(data.languages)}</li>
  </ul>`;
    })
    .join("");

  return countryInfo.insertAdjacentHTML("beforeend", renderCountry);
}
function renderCountryList(data) {
  const renderCountryList = data
    .map(
      (data) =>
        `<li><img src = ${data.flags.svg} width = 20px> ${data.name.official}</li>`
    )
    .join("");
  return countryList.insertAdjacentHTML("afterbegin", renderCountryList);
}
