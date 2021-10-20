const API_URL = "https://swapi.dev/api/people/?page=";

const BOX = document.getElementById("megaBox");

let allDatas = [];


async function getData(api){

    // on récupère le nombre de pages de personnages
    const resp  = await fetch(api);
    const d = await resp.json();
    let nbPages = Math.ceil(d.count/10);

    // on boucle sur le nombre total de pages
    for(i=1; i <= nbPages; i++){
        
        const response = await fetch(api + i);
        const data = await response.json();
        
        // les résultats disponibles en retour de l'appel API
        let results = data.results;

        // on boucle sur tous les index donc tous les personnages
        for (let index = 0; index < results.length; index++) {
            let objetPerso= {};
            //let arrayFilms = [];
            
        //     // dans le tableau on refait un appel sur l'API des films
        //     for(let i = 0; i <(results[index].films).length ; i++){

        //         arrayFilms.push(getFilms(results[index].films[i]));

        //     }
        //     const responseFilms = await Promise.all(arrayFilms);


        //     // on stocke les noms des planetes de naissance dans un tableau
        //     let dataPlanete = [];
        //     dataPlanete.push(getPlanete(results[index].homeworld));
        //     const responsePlanete = await Promise.all(dataPlanete);

        //     // on extrait le nom de la planete qu'on stocke dans une variable
        //     let nomPlanete;
        //     for(ind=0;ind<responsePlanete.length;ind++){
        //         nomPlanete = responsePlanete[ind];
        //     };

        //     // on stocke chaque objet dans un tableau.
            allDatas.push(objetPerso={
                "name" : results[index].name,
                "height" : results[index].height,
                "mass" : results[index].mass,
                "hair_color" : results[index].hair_color,
                "skin_color" : results[index].skin_color,
                "eye_color" : results[index].eye_color,
                "birth_year" : results[index].birth_year,
                "gender" : results[index].gender,
                "films" : results[index].films,
                "getDataFilm": false,
                "datafilm" : [] ,
                "planete" : results[index].homeworld,
                "getHomeWorld" : false,
                "homeworld" : []
            });




            
        //         BOX.innerHTML += 
        //         ` 
        //         <h2>${allDatas[index].name}</h2>
        
        //         <div class="data_base">
        //             <ul>
        //                 <li>La taille : ${allDatas[index].height}</li>
        //                 <li>Le poids  : ${allDatas[index].mass}</li>
        //                 <li>La couleur des cheveux : ${allDatas[index].hair_color}</li>
        //                 <li>La couleur de la peau : ${allDatas[index].skin_color}</li>
        //                 <li>La couleur des yeux : ${allDatas[index].eye_color}</li>
        //                 <li>La date de naissance : ${allDatas[index].birth_year}</li>
        //                 <li>Le genre : ${allDatas[index].gender}</li>
        //             </ul>
        //         </div>
        //         <div class="data_second">
        //         <h2>Apparition Films</h2>
        //             <p> ${allDatas[index].films} </p>
        //         </div>
        //         <div class="data_three">
        //         <h2>Nom de la Planète de naissance</h2>
        //         <p> ${allDatas[index].planete} </p>
        
        //         </div>
        //         `

            
        }

    }

    affichageNoms(allDatas);

    
    // for(let indexx = 0 ; indexx<allDatas.length ; indexx++){
    //     BOX.innerHTML += 
    //     ` 
    //     <h2>${allDatas[indexx].name}</h2>
    //     <div></div>
    //     `;

    // }

    affichageDetails();

}

async function getFilms(dataFilms){
    const responseFilms = await fetch(dataFilms);
    const dataFilm = await responseFilms.json();
    return dataFilm.title;

}

async function getPlanete(dataPlanetes){
    const responsePlanete = await fetch(dataPlanetes);
    const dataPlanete = await responsePlanete.json();
    return dataPlanete.name;
}

async function getPromiseFilms(datafilms){
    let arrayFilms = [];
    for(let i = 0; i <datafilms.length ; i++){
        arrayFilms.push(getFilms(datafilms[i]));
    }
    return Promise.all(arrayFilms);
}

async function getPromisePlanetes(dataplanetes){
    let dataPlanete = [];
    dataPlanete.push(getPlanete(dataplanetes));

    return Promise.all(dataPlanete);
}

function affichageNoms(tab){
    for(let indexx = 0 ; indexx<tab.length ; indexx++){
        BOX.innerHTML += 
        `
        <div class="box" id="box">
            <h2 class="title">${tab[indexx].name}</h2>
            <div class="data_base"></div>
        </div>  
        `;
    }
}

function affichageDetails(){
    let buttons = document.querySelectorAll('h2');

    for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener("click", function(e) {
            const DIV = e.target.nextSibling.nextElementSibling;
            
            for(let index = 0 ; index < allDatas.length ; index++){
                if(allDatas[index].name === e.target.innerText){
                    getPromiseFilms(allDatas[index].films).then(resp =>{

                        getPromisePlanetes(allDatas[index].planete).then(respPlanete=>{
                            DIV.innerHTML = 
                            ` 
                            <div >
                                <ul>
                                    <li>La taille : ${allDatas[index].height}</li>
                                    <li>Le poids  : ${allDatas[index].mass}</li>
                                    <li>La couleur des cheveux : ${allDatas[index].hair_color}</li>
                                    <li>La couleur de la peau : ${allDatas[index].skin_color}</li>
                                    <li>La couleur des yeux : ${allDatas[index].eye_color}</li>
                                    <li>La date de naissance : ${allDatas[index].birth_year}</li>
                                    <li>Le genre : ${allDatas[index].gender}</li>
                                </ul>
                            </div>
                            <div class="data_second">
                            <h2>Apparition Films</h2>
                                <p> ${resp.join(" , ")} </p>
                            </div>
                            <div class="data_three">
                                <h2>Nom de la Planète de naissance</h2>
                                <p> ${respPlanete} </p>
                    
                            </div>
                            `
                        })
                        
                    });

    
                }
            }
        });
    }
}

getData(API_URL);

const INPUTSEARCH = document.getElementById('search');
document.querySelector('.button').addEventListener('click',()=>{
    let arrayName = [];
    for(let i = 0; i<allDatas.length;i++){

        if ((allDatas[i].name.toLowerCase()).indexOf(INPUTSEARCH.value.toLowerCase()) != -1){
            arrayName.push(allDatas[i]);
        }

    }
    if(arrayName.length != 0){
        BOX.innerHTML = "";
        affichageNoms(arrayName);
        affichageDetails();
    }else{
        window.alert("Aucune réponse trouvée!");
    }
    
    //affichageNoms(arrayName);


})
