//récupération des informations de l'api :

fetch("http://localhost:3000/api/products")
  //promesse faite à l'api si succès:

  .then(function (response) {
    //retourne la réponse au format json
    return response.json();
  })

  .then(function (apiArticles) {
    console.log(apiArticles);
    //retourne en réponse un tableau contenant plusieurs articles

    //Création de la boucle ForEach afin d'inserer dynamiquement les éléments ds le DOM
    apiArticles.forEach((article) => {
      console.log(article);

      const itemsLink = document.createElement("a"); // créé un élement lien
      document.querySelector(".items"); //va chercher l'élément dans le dom
      items.appendChild(itemsLink); //rajoute à l'élément du dom un enfant
      itemsLink.href = `../html/product.html?id=${article._id}`; //

      const itemsArticle = document.createElement("article"); // fait apparaitre carte bleue foncée ds navigateur
      itemsLink.appendChild(itemsArticle);

      const itemsImg = document.createElement("img"); // fait apparaitre contours blancs dans la carte itemsArticle
      itemsArticle.appendChild(itemsImg);
      itemsImg.src = article.imageUrl; //ajoute la source de l'img depuis l'api
      itemsImg.alt = article.altTxt; //ajoute le alt de l'img depuis l'api

      const itemsH3 = document.createElement("h3");
      itemsArticle.appendChild(itemsH3);
      itemsH3.textContent = article.name; //ajoute les titres

      const itemsParagraph = document.createElement("p");
      itemsArticle.appendChild(itemsParagraph);
      itemsParagraph.textContent = article.description; //ajoute les textes descriptifs
    });
  })

  .catch(function (error) {
    //si erreur retourne un message d'erreur
    alert("Erreur! Avez-vous bien lancé le serveur local (port 3000)");
  });
