let params = window.location.href;
let url = new URL(params);
let idArticle = url.searchParams.get("id");
console.log(idArticle); //renvoi bien l'id de l'article selectionné en page d'accueil

const itemImg = document.createElement("img"); 
console.log(itemImg);// va chercher l'élément img créé
document.querySelector(".item_img"); //va chercher l'élément ayant la class item_img dans le dom



const itemName = document.querySelector("#title");
console.log(itemName); // renvoi bien le title h1 vide du dom ds la console

const itemPrice = document.querySelector("#price");
console.log(itemPrice); //renvoi bien le price span vide du dom ds la concole

const itemDescription = document.querySelector("#description");
console.log(itemDescription); // renvoi bien la description p vide du dom ds la console

const itemColor = document.querySelector("#colors");
console.log(itemColor); //renvoi bien la color select vide du dom ds la console

fetch("http://localhost:3000/api/products/" + idArticle)

.then(function (response) {
    //retourne la réponse au format json
    return response.json();
})


.then(function (idArticle) {
    console.table(idArticle);
    //retourne en réponse un tableau de l'article en détail

    article = idArticle;
    
    itemImg.src = article.imageUrl; // pq ca ne s'affiche pas?????????? pq ne puis-je pas mettre mon appendchild??
    itemImg.alt = article.altTxt;
    
    itemName.textContent = article.name;
    itemDescription.textContent = article.description;
    itemPrice.textContent = article.price;


    //idée pourrie couleurs
   /* const colorSelection = article.colors;
    console.log (colorSelection);//affiche les couleurs dans la console
    for (let color of colorSelection){
        itemColor.innerHTML += `<option value ="${color}">${color}</option>`;
    }*/

});

/* .catch (function(error){

        alert ("Erreur!!!")
    })*/
