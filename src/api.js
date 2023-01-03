function fetchCountry(searchCountry) {
  return fetch(
    `https://restcountries.com/v3.1/name/${searchCountry}?fields=name,capital,population,flags,languages`
  ).then((response) => {
    if (!response.ok) {
      throw new Error();
    }
    return response.json();
  });
}

export default { fetchCountry };
