const API_URL = 'https://swapi.dev/api/vehicles/';
const MEGABOX = document.getElementById('megabox')

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

			const getPilots = (await Promise.all(dataPilots)).map((p) => `<li>${p.name}</li>`);
			console.log(getPilots);

			/*
			 * Récuperer les films
			 */
			let films = [...vehicle.films];
			let dataFilms = films.map(async (film) => {
				const data = await fetch(film);
				return data.json();
			});

			const getFilms = (await Promise.all(dataFilms)).map((f) => `<li>${f.title}</li>`);

            console.log(vehicle)
            MEGABOX.innerHTML += `
            <div class="box">
                <h2>${vehicle.name}</h2>
                <div class="data_base">
                    <ul>
                        <li>model:${vehicle.model }</li>
                        <li>manufacturer: ${vehicle.manufacturer}</li>
                        <li>cost in credits: ${vehicle.cost_in_credits}</li>
                        <li>length: ${vehicle.length}</li>
                        <li>max atmosphering speed: ${vehicle.max_atmosphering_speed}</li>
                        <li>crew: ${vehicle.crew}</li>
                        <li>passengers: ${vehicle.passengers}</li>
                        <li>cargo capacity ${vehicle.cargo_capacity}</li>
                        <li>consumables: ${vehicle.consumables}</li>
                        <li>vehicle class: ${vehicle.vehicle_class}</li>
                    </ul>
                </div>
                <div class="data_second" id="data_second">
                </div>
                <div class="data_three" id="data_three">
                </div>
                <div>
            <h3>Films</h3>
            <ul>
              ${getFilms}
            </ul>
          </div>
          <div>
          <h3>Pilots</h3>
            <ul>
            ${getPilots.length != 0 ? getPilots : 'Pas de Pilotes'}
            </ul>
          </div>
            </div>
            `
        }   
    } catch (error) {
        console.error(error);
    }
    


}

getData()