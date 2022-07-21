let params = window.location.href; // renvoi le href (url) de la page en cours
let url = new URL(params);
let idArticle = url.searchParams.get("id");
console.log(idArticle); //renvoi bien l'id de l'article selectionné en page d'accueil



fetch("http://localhost:3000/api/products/" + idArticle)

.then(function (response) {
    //retourne la réponse au format json
    return response.json();
})


.then(function (idArticle) {
    console.table(idArticle);
    //retourne en réponse un tableau de l'article en détail

    article = idArticle;
    
    const itemImg = document.createElement("img");//création de la balise img
    document.querySelector(".item__img").appendChild(itemImg);//rajoute un enfant à l'élément (code raccourci)
    console.log(itemImg);//renvoi bien la balise img dans la console
    itemImg.src = article.imageUrl;
    itemImg.alt = article.altTxt;

    const itemName = document.querySelector("#title");
    console.log(itemName); // renvoi bien le title h1  du dom ds la console
    itemName.textContent = article.name;

    const itemPrice = document.querySelector("#price");
    console.log(itemPrice); //renvoi bien le price span  du dom ds la concole
    itemPrice.textContent = article.price;

    const itemDescription = document.querySelector("#description");
    console.log(itemDescription); // renvoi bien la description p  du dom ds la console
    itemDescription.textContent = article.description;

    //création d'une boucle for...of pour répeter les tâches de choix de couleurs
    for( let colors of article.colors){ 
    console.log(colors);// renvoi bien les couleurs dispo ds la console
    const itemColor = document.createElement("option");//création d'une nvelle balise option pr choix des couleurs
    document.querySelector("#colors").appendChild(itemColor);//ajoute un enfant
    itemColor.value = colors;
    itemColor.textContent = colors;
    }

});

/* .catch (function(error){

        alert ("Erreur!!!")
    })*/
