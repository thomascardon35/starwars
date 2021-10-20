//partie cécile pas finie


const NIVEAU0 = document.getElementById('megaBox');
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



 //les habitants
        for (let i = 0; i== NBRESIDENTS; i++ ){
            console.log("nb residents pour mon for est de " + NBRESIDENTS);
        }
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
        console.log("machin " + machin);
        Promise.all(machin).then(resul => {
            console.log("nom resul " +resul)
        });
//===================== la meme chose sur les planetes dans les films =========
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




//______________________________CE QU ON VA AFFICHER



        NIVEAU0.innerHTML += `
        <div class="box">
            <h2 class="title"> ${data.results[i].name} </h2>
            <div class="data_base">
                Planète n° ${[i]+1}. Sa journée dure ${data.results[i].rotation_period} heures et son année est de ${data.results[i].orbital_period} jours. Son diamètre est de ${data.results[i].diameter} kilomètres. Son climat est de type "${data.results[i].climate}" et sa gravité est de type "${data.results[i].gravity}". Son terrain est dit "${data.results[i].terrain}", sa surface d'eau est d'environ ${data.results[i].surface_water} km². 
                On y compte ${data.results[i].population} habitants, répartis en ${NBRESIDENTS} ethnies différentes.

                (Planète créée le ${data.results[i].created}, éditée le ${data.results[i].edited})
            </div>
        </div>
      




        ` 
        //fin du tic
    }

}).catch(error => {
    console.error(error)
})
}



getData();
