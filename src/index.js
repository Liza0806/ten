import axios from "axios";
import{fetchBreeds, fetchCatByBreed} from "./cats"


const refs = {
    selectForm: document.querySelector(".breed-select"),
loader: document.querySelector(".loader"),
error: document.querySelector(".error"),
catInfo: document.querySelector(".cat-info"),
bodyJs: document.querySelector("body")
}

refs.error.setAttribute("hidden", true);
refs.loader.setAttribute("hidden", true)
refs.selectForm.addEventListener("change", renderCat)

fetchBreeds()
  .then(response => {
    const breeds = response.data;
    const breedNames = breeds.map(breed => breed.name); // Store breed names in an array
    
    // Output breed names to the console
   

    // Now call createBreedsSelect with the breedNames array
    createBreedsSelect(breedNames);

    // If you need to do anything with descriptionBreed, all, or id, you can do it here as well

  })
  .catch(error => refs.error.removeAttribute("hidden"));

// Function to create the select dropdown
function createBreedsSelect(breedNames) {
  const selectElement = refs.selectForm;

  breedNames.forEach(breedName => {
    const optionElement = document.createElement('option');
    optionElement.value = breedName;
    optionElement.textContent = breedName;
    selectElement.appendChild(optionElement);
  });
}
function renderCat(e) {
  e.preventDefault();
  refs.loader.removeAttribute("hidden");
  let catsBreedName = e.currentTarget.value;
  console.log(catsBreedName);

  let foundBreed = false; // Flag to indicate if the matching breed is found

  fetchBreeds()
    .then(response => {
      const breeds = response.data;

      for (let i = 0; i < breeds.length; i++) {
        if (breeds[i].name === catsBreedName) {
          let catsBreedDescr = breeds[i].description;
          let catsTemperament = breeds[i].temperament;
          console.log(catsBreedDescr);
          console.log(catsTemperament);
          let chosenCat = breeds[i].id;

          // Using Promise.all to wait for both getCatImage and the breed information
          Promise.all([getCatImage(chosenCat), catsBreedDescr, catsTemperament])
            .then(([catPicture, breedDescr, temperament]) => {
              // Update the DOM with the selected cat information and image
              refs.catInfo.innerHTML = `<div><h1>${catsBreedName}</h1><p>${breedDescr}<br><b>Temperament:</b> ${temperament}</p></div>`;
              refs.loader.setAttribute("hidden", true); // Hide the loader after processing
            })
            .catch(error => console.log("error"));

          foundBreed = true; // Set the flag to true since the matching breed is found
          break; // Exit the loop after finding the matching breed
        }
      }

      // If the matching breed is not found, hide the loader and show an error
      if (!foundBreed) {
        refs.loader.setAttribute("hidden", true);
        refs.error.removeAttribute("hidden");
      }
    })
    .catch(error => refs.error.removeAttribute("hidden"));
}

  function getCatImage (breedId){ const pictureUrl = `https://api.thecatapi.com/v1/images/search?limit=10&breed_ids=${breedId}&api_key=%22live_QizwG36WpcJn3g8MpfMLtUHPQYLKvggVkcmarBeXGmgXp17Vzihd9AFNXfBzcDUY%22`;
   let catPicture = " ";
   fetchCatByBreed(breedId).then(data => {
     catPicture = data[0].url;
     console.log(catPicture);
     const imgElement = document.createElement('img');
     imgElement.src = catPicture; 

    refs.catInfo.style.display= "flex";
    refs.catInfo.style.flexDirection= "row-reverse";
    refs.catInfo.style.gap="20px";
   
 
     refs.catInfo.appendChild(imgElement);
     imgElement.style.width="300px";


     return catPicture;
   }).catch(error => refs.error.removeAttribute("hidden"));
  }