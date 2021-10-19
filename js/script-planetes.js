const NIVEAU0 = document.getElementById('box');
const NIVEAU1 = document.getElementById('data_base');
const NIVEAU2 = document.getElementById('data_second');
const NIVEAU3 = document.getElementById('data_three');

console.log(NIVEAU1);

const API_URL = "https://swapi.dev/api/planets";



const getData = () => {
    fetch(API_URL).then(resp => {
        return resp.json()
    }).then(data => {
        console.log(data);

        const NBPLANETES= data.count;

        console.log("Il y a "+ NBPLANETES + " planètes");


        console.log (data);
        console.log ("nb de résidents =" + data.results.residents);


        for (let i = 0; i< data.results.length; i++ ) {
            console.log(i);
            console.log("test numero de planete " + [i]);

            const NBRESIDENTS=data.results[i].residents.length;
            console.log("nb de résidents hop : "+ NBRESIDENTS);

        console.log("nom de toutes les planetes est :" + data.results[i].name +"\n");

        NIVEAU1.innerHTML += `
        Planète <h3> ${data.results[i].name} </h3>

        Planète n° ${[i]+1}. Sa journée dure ${data.results[i].rotation_period} heures et son année dure ${data.results[i].orbital_period} jours.

        Son diamètre est de ${data.results[i].diameter} miles.
        Son climat est réputé ${data.results[i].climate}
        et sa gravité ${data.results[i].gravity}. 

        Son terrain est de type ${data.results[i].terrain}, sa surface d'eau est d'environ ${data.results[i].surface_water} miles carrés. 
        On y compte ${data.results[i].population} têtes, et là il nous manque les RESIDENTS
        
        il manque aussi les FILMS dans lesquels ces planètes apparaissent !

        Planète créée le ${data.results[i].created}, éditée le ${data.results[i].edited}, et  : <a href="
        ${data.results[i].url} " >son lien </a>.

        ${NBRESIDENTS} ethnies différentes y sont présentes. 





        ` 
        //fin du tic

        //======================PARTIE SUR LES RESIDENTS==================
        // on a déjà fait ça :  const NBRESIDENTS=data.results[i].residents.length;
        for (let i = 0; i== NBRESIDENTS; i++ ){
            console.log("nb residents pour mon for est de " + NBRESIDENTS);
        }

        /* code Paul Emmanuel :

        let starship = [...dataFilms.results[index].starships];
                let war = [];
                for(let i = 0; i <= starship.length ; i++){
                    const vaisseau = fetch(starship[i]).then(resp => resp.json());
                    war.push(vaisseau);
                    }
                    let star = (await Promise.all(war)).map(v => v.name); */

        //je crée un tableau "habitants" pour récupérer le listing de "residents"
        let habitants= [...data.results[i].residents];
        console.log ("tableau des habitants= "+ habitants); //ok

        // je crée un tableau vide pour le remplir de futures promesses (???)
        let machin=[]; 
        console.log("machin = " + machin);//ok

        //pour boucler dans le tableau originel "residents" sur lequel est construit "habitants"
        for (let j=0; j < habitants.length; j++){

            //et là une nouvelle variable pour récuperer le truc de l'api au bout du lien
            let monButUltime = fetch(habitants[j]).then(resp => resp.json());
            console.log("monButUltime" +monButUltime);
            //et je dois faire rentrer la variable ci-dessus dans mon tableau "machin"
            machin.push(monButUltime);
            console.log("mon tableau machin : " + machin[j]);
        } // fin for
        
        // et encore une maudite variable pour ????
        //let inviteMystere = (await Promise.all(machin)).map(onsenfoutdunom => console.log(onsenfoutdunom));
        console.log(machin)
        Promise.all(machin).then(resul => {
            console.log(resul)
        });
//=========================================== la meme chose sur les planetes dans les films =========
                  //je crée un tableau "lesFilms" pour récupérer le listing des films 
        let lesFilms= [...data.results[i].films];
        console.log ("tableau des films= "+ lesFilms);

        // je crée un tableau vide pour le remplir de futures promesses (???)
        let machinTruc=[]; 
        console.log("machinTruc = " + machinTruc);//ok

        for (let k=0; k < lesFilms.length; k++){
            let monAutreButUltime = fetch(lesFilms[k]).then(resp => resp.json());
            console.log("monAutreButUltime" +monAutreButUltime);
            machin.push(monAutreButUltime);
            console.log("mon tableau machin : " + machinTruc[k]);
        } 
        
        // et encore une maudite variable pour ????
        //let inviteMystere = (await Promise.all(machin)).map(onsenfoutdunom => console.log(onsenfoutdunom));
        console.log(machin)
        Promise.all(machin).then(resul => {
            console.log(resul)
        });  


//========================================== fin des planetes dans les films
}
    }).catch(error => {
        console.error(error)
    })
}


getData();
