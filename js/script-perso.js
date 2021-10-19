const API_URL = "https://swapi.dev/api/people/?page=1";

const BOX = document.getElementById("box");


// fetch(API_URL).then(resp => {
//         return resp.json()
//     }).then(data => {

//         console.log(Math.ceil(data.count/10));

//     });

async function getData(api){
    const response = await fetch(api);
    const data = await response.json();

    let results = data.results;

    for (let index = 0; index < results.length; index++) {

        let arrayFilms = [];
        for(let i = 0; i <(results[index].films).length ; i++){

            arrayFilms.push(getFilms(results[index].films[i]));

        }
        
        Promise.all(arrayFilms).then((value)=>{
            BOX.innerHTML += 
            ` 
            <h2>${results[index].name}</h2>
    
            <div class="data_base">
            <p>La taille : ${results[index].height}</p>
            <p>Le poids  : ${results[index].mass}</p>
            <p>La couleur des cheveux : ${results[index].hair_color}</p>
            <p>La couleur de la peau : ${results[index].skin_color}</p>
            <p>La couleur des yeux : ${results[index].eye_color}</p>
            <p>La date de naissance : ${results[index].birth_year}</p>
            <p>Le genre : ${results[index].gender}</p>
            </div>
            <div class="data_second">
                <p> Apparitions films : ${value} </p>
            </div>
            <div class="data_three">
    
            </div>
            `
            //console.log(value);
        });

        // let p = Promise.all(arrayFilms);
        // console.log(p);
        
    }
}

async function getFilms(dataFilms){
    const responseFilms = await fetch(dataFilms);
    const dataFilm = await responseFilms.json();
    return dataFilm.title;

}

getData(API_URL);
