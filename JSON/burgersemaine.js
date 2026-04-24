$(document).ready(function() {
  $.ajax({
    url: 'JSON/burgerdelasemaine.JSON',
    type: 'GET',
    dataType: 'json',
    success: function(data) {
      // Récupérer la date d'aujourd'hui au format 'YYYY-MM-DD'
      let todayDate = new Date().toISOString().slice(0, 10);

      // Filtrer les burgers de la semaine pour n'afficher que celui correspondant à la date d'aujourd'hui
      let filteredBurger = data.burgers_semaine.find(burger => burger.date_debut <= todayDate && burger.date_fin >= todayDate);

      // Vérifier si un burger correspondant a été trouvé
      if (filteredBurger) {
        displayBurger(filteredBurger);
      } else {
        $('#burger-container').html('<p>Aucun burger de la semaine disponible pour aujourd\'hui.</p>');
      }
    },
    error: function(xhr, status, error) {
      console.error('Erreur lors de la récupération des données JSON:', status, error);
    }
  });

  function displayBurger(burger) {
    let burgerHtml = `
      <div class="burger-item">
        <div class="burger-info">
          <h4>${burger.nom}</h4>
          <p class="description">${burger.description}</p>
          <ul class="ingredients">
            ${burger.ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
          </ul>
        </div>
        <div class="burger-price">
          <img src="${burger.image}" alt="${burger.nom}">
          <span class="price">${burger.prix} €</span>
        </div>
      </div>
    `;
    $('#burger-container').html(burgerHtml);
  
    // Ajouter le bouton "Voir la carte" après avoir affiché les détails du burger
    let btnHtml = `<a href="menu.html" id="btn-voir-contact" class="btn btn-dark btn-lg btn-custom">Voir le Menu</a>
    `;
    $('#burger-container').append(btnHtml);
  }
    
});


