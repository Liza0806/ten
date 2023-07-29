

// слушаем инпут
function getChosenCat (e){
    e.preventDefault();
    breedId = e.currentTarget.value
    console.log(breedId)
    getCatImage(breedId).then( const imgElement = document.createElement('img');
    imgElement.src = catPicture; 
    
    refs.catInfo.style.display= "flex";
    refs.catInfo.style.flexDirection= "row-reverse";
    refs.catInfo.style.gap="20px";
    
    
    refs.catInfo.appendChild(imgElement);
    imgElement.style.width="300px";)
  }
  // тут мы берем ид породы и фетчим данные чтобы забрать картинку этой породы
  // создаем картинку 
  // задаем стили отображению на странице всего и картинки
  //возвращаем урл картинки
  
  const imgElement = document.createElement('img');
  imgElement.src = catPicture; 
  
  refs.catInfo.style.display= "flex";
  refs.catInfo.style.flexDirection= "row-reverse";
  refs.catInfo.style.gap="20px";
  
  
  refs.catInfo.appendChild(imgElement);
  imgElement.style.width="300px";
  
  refs.error.removeAttribute("hidden")




  export function getCatImage(breedId) {
    // получаем массив котов
      fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
    
        const dataArr = data.map(breed =>breed )
        const breedIdId = data.map(breed => breed.id);
        console.log(breedIdId)
    
        return dataArr
        //теперь у нас есть массив котов, ищем в нем ид
      }).then((dataArr) => { 
        
          const cat = dataArr.find(cat => cat.name === breedId);
          const catId = cat.id
          //return cat ? cat.id : null;
    //тут подставили кат ид в урл, зафетчили его и нашли ссылку на изображение
    getCatPicture (catId)
    
    })}
    
    function getCatPicture (catId){
      const pictureUrl = `https://api.thecatapi.com/v1/images/search?limit=10&breed_ids=${catId}&api_key=%22live_QizwG36WpcJn3g8MpfMLtUHPQYLKvggVkcmarBeXGmgXp17Vzihd9AFNXfBzcDUY%22`;
      console.log(pictureUrl)
      fetch(pictureUrl)
      .then(response => response.json()).then(data => {const urlPicture = data[0].url;
        const imgElement = document.createElement('img');
        imgElement.src = urlPicture; 
        this.refs.catInfo.appendChild(imgElement);
    
      console.log(urlPicture);
    
      return urlPicture
      })
    }
    
    function catPaint(){
      return innerPart = `<div><h1> ${catsBreedName}</h1> <p>${catsBreedDescr}<br> <b> Temperament: </b> ${catsTemperament}</p><div>`;
    }