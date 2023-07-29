const apiUrl = 'https://api.thecatapi.com/v1/breeds';
const api_key = 'live_QizwG36WpcJn3g8MpfMLtUHPQYLKvggVkcmarBeXGmgXp17Vzihd9AFNXfBzcDUY'

export function fetchBreeds() {
  return fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      const breeds = data.map(breed => breed.name);
      return breeds;
    })
    .catch(error => console.log("error"));
}

export function fetchCatByBreed(breedId) {
  return fetch(`https://api.thecatapi.com/v1/images/search?api_key=${api_key}&breed_ids=${breedId}`)
      .then(response => {
          if (!response.ok) {
              throw new Error(response.status);
          }
          return response.json();
      });  
};