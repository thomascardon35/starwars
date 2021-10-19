const megaBox = document.getElementById("megaBox");
const donnée_base = document.getElementById("data_base");
const nom_vaisseaux = document.getElementById("data_second");
const espèce = document.getElementById("data_three");

const API_URL = "https://swapi.dev/api/films/";

async function getData(){
    const resp = await fetch(API_URL);
    const dataFilms = await resp.json();


    for(let index = 0; index < dataFilms.count; index++){

            
     // VAISSEAUX       
            
            let starship = [...dataFilms.results[index].starships];   
                let war = [];
            
                for(let i = 0; i < starship.length ; i++){
             
             const vaisseau = fetch(starship[i]).then(resp => resp.json());
             war.push(vaisseau);
             
            }
            let star = (await Promise.all(war)).map(v => v.name);

     // ESPECES       
            
            let spacies = [...dataFilms.results[index].species];

            let people = [];

            for(let i = 0; i < spacies.length ; i++){
                
                const human = fetch(spacies[i]).then(resp => resp.json());
                people.push(human);
            }

            let wookie = (await Promise.all(people)).map(v => v.name);

            

           
         
         

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
            <p>Vaisseaux : ${star} </p>
            </div>
            <div class="data_three" id="data_three">
            <p> Espèces : ${wookie}</p>

            </div>


        </div>
        `
        
    }
    

}
getData(API_URL);

