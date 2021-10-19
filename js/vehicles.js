const API_URL = 'https://swapi.dev/api/vehicles/';
const MEGABOX = document.getElementById('megabox')
const INPUT = document.getElementById('search')
const BTNSEARCH = document.getElementById('searchBtn')

const API_URLS = [
    'https://swapi.dev/api/vehicles/', 
    'https://swapi.dev/api/vehicles/?page=2',
    'https://swapi.dev/api/vehicles/?page=3',
    'https://swapi.dev/api/vehicles/?page=4'
]

const megaData = []
const superMegaData =[]



const getBigData = async () => {
    try{
        let allData = API_URLS.map(async (url) => {
            const data = await fetch(url);
            return data.json();
        })

        const getAllData = (await Promise.all(allData)).map(a => 
                a.results.map(b => {
                    return superMegaData.push(b)
            })
        )

        console.log(superMegaData)

        BTNSEARCH.addEventListener('click', () => {
            //console.log(INPUT.value)
            let search = INPUT.value
            getSearch(search)
        })

        const getSearch = (search) => {
            let d = 'Sand Crawler'
            // let res = superMegaData.filter(el => el.name.toLowerCase() == search.toLowerCase());
            let res = superMegaData.filter(el => el.name.toLowerCase().indexOf(search.toLowerCase()) !== -1)
            afficher(res)
            console.log(res)
        }
        
        

        const afficher = (data) => {
            console.log('aff', data)
            MEGABOX.innerHTML = '';
            if(data.length != 0) {
                for(let i = 0; i < data.length; i++){
                    MEGABOX.innerHTML += `
                    <div class="box">
                        <h2 id="${i}" class="title">${data[i].name}</h2>
                        <div class="data_base">
                            <ul>
                                <li>model:${data[i].model }</li>
                                <li>manufacturer: ${data[i].manufacturer}</li>
                                <li>cost in credits: ${data[i].cost_in_credits}</li>
                                <li>length: ${data[i].length}</li>
                                <li>max atmosphering speed: ${data[i].max_atmosphering_speed}</li>
                                <li>crew: ${data[i].crew}</li>
                                <li>passengers: ${data[i].passengers}</li>
                                <li>cargo capacity ${data[i].cargo_capacity}</li>
                                <li>consumables: ${data[i].consumables}</li>
                                <li>vehicles class: ${data[i].vehicle_class}</li>
                            </ul>
                            <div class="data_second" id="data_second">
                                <h3>Films</h3>
                                <ul>
                                    ${data[i].films.map(f => `<li>${f}</li>`)}
                                </ul>
                            </div>
                            <div class="data_three" id="data_three">
                                <h3>Pilots</h3>
                                <ul>
                                    ${data[i].pilots.length != 0 ? data[i].pilots : 'Pas de Pilotes'}
                                </ul>
                            </div> 
                        </div>
                    </div>
                `

            }
        } else {
                MEGABOX.innerHTML = '<div>Refaire une recherche</div>'
                
            }
            }
        
        
        afficher(superMegaData)

        let TITLE = document.querySelectorAll('h2');

        for (let i = 0; i < TITLE.length; i++) {
            TITLE[i].addEventListener("click", function() {
                let res = this.nextElementSibling
                res.classList.toggle("active")
            
                console.log(superMegaData[this.id])
        });

}   
        
        
    } catch(error) {
        console.error(error)    
    }
}



getBigData()
console.log('AFFICHAGE')
//  afficher()

const getData = async () => {
    try {
        const res = await fetch(API_URL);
        const resFormat = await res.json();
        console.log(resFormat)

        for (const vehicle of resFormat.results) {
            /*
			 * Récuperer les pilots
			 */
			let pilots = [...vehicle.pilots];

			let dataPilots = pilots.map(async (pilot) => {
				const data = await fetch(pilot);
				return data.json();
			});

			const getPilots = (await Promise.all(dataPilots)).map((p) => p.name);
			// console.log(getPilots);

			/*
			 * Récuperer les films
			 */
			let films = [...vehicle.films];
			let dataFilms = films.map(async (film) => {
				const data = await fetch(film);
				return data.json();
			});

			const getFilms = (await Promise.all(dataFilms)).map((f) => f.title);

            // console.log(getFilms)

            const bigData = {...vehicle, films: [...getFilms], pilots: [...getPilots]}
            
            megaData.push(bigData)

            MEGABOX.innerHTML += `
                    <div class="box">
                        <h2>${bigData.name}</h2>
                        <div class="data_base">
                            <ul>
                                <li>model:${bigData.model }</li>
                                <li>manufacturer: ${bigData.manufacturer}</li>
                                <li>cost in credits: ${bigData.cost_in_credits}</li>
                                <li>length: ${bigData.length}</li>
                                <li>max atmosphering speed: ${bigData.max_atmosphering_speed}</li>
                                <li>crew: ${bigData.crew}</li>
                                <li>passengers: ${bigData.passengers}</li>
                                <li>cargo capacity ${bigData.cargo_capacity}</li>
                                <li>consumables: ${bigData.consumables}</li>
                                <li>vehicles class: ${bigData.vehicle_class}</li>
                            </ul>
                        </div>
                        <div class="data_second" id="data_second">
                            <h3>Films</h3>
                            <ul>
                                ${bigData.films.map(f => `<li>${f}</li>`)}
                            </ul>
                        </div>
                        <div class="data_three" id="data_three">
                            <h3>Pilots</h3>
                            <ul>
                                ${bigData.pilots.length != 0 ? bigData  .pilots : 'Pas de Pilotes'}
                            </ul>
                        </div>  
                    </div>
                `
        }
    console.log(megaData)

    } catch (error) {
        console.error(error);
    }
}



// getData()


        //     MEGABOX.innerHTML += `
        //     <div class="box">
        //         <h2>${vehicle.name}</h2>
        //         <div class="data_base">
        //             <ul>
        //                 <li>model:${vehicle.model }</li>
        //                 <li>manufacturer: ${vehicle.manufacturer}</li>
        //                 <li>cost in credits: ${vehicle.cost_in_credits}</li>
        //                 <li>length: ${vehicle.length}</li>
        //                 <li>max atmosphering speed: ${vehicle.max_atmosphering_speed}</li>
        //                 <li>crew: ${vehicle.crew}</li>
        //                 <li>passengers: ${vehicle.passengers}</li>
        //                 <li>cargo capacity ${vehicle.cargo_capacity}</li>
        //                 <li>consumables: ${vehicle.consumables}</li>
        //                 <li>vehicle class: ${vehicle.vehicle_class}</li>
        //             </ul>
        //         </div>
        //         <div class="data_second" id="data_second">
        //             <h3>Films</h3>
        //             <ul>
        //                 ${getFilms}
        //             </ul>
        //         </div>
        //         <div class="data_three" id="data_three">
        //             <h3>Pilots</h3>
        //             <ul>
        //                 ${getPilots.length != 0 ? getPilots : 'Pas de Pilotes'}
        //             </ul>
        //         </div>  
        //     </div>
        //     `
        // }   