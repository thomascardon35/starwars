const megaBox = document.getElementById("megaBox");
const donnée_base = document.getElementById("data_base");
const nom_vaisseaux = document.getElementById("data_second");
const espèce = document.getElementById("data_three");

const API_URL = "https://swapi.dev/api/films/";

const getData = (API_URL) => {
    fetch(API_URL).then(resp => {
        return resp.json()
    }).then(dataFilms => {
        console.log(dataFilms)

        for(let index = 0; index < dataFilms.count; index++){

        megaBox.innerHTML +=`

        <div class="box" id="box">
            <h2>${dataFilms.results[index].title} Episode n°${dataFilms.results[index].episode_id}</h2>

            <div class="data_base" id="data_base">
            
            <p>Résumé : ${dataFilms.results[index].opening_crawl}</p>
            <p>Réalisateur : ${dataFilms.results[index].director}</p>
            <p>Producteur : ${dataFilms.results[index].producer}</p>
            <p>Année de sortie : ${dataFilms.results[index].release_date}</p>
            </div>
            <div class="data_second" id="data_second">
            <p>Vaisseaux :</p>
            </div>
            <div class="data_three" id="data_three">

            </div>


        </div>
        `
        }
    })
}
getData(API_URL);

