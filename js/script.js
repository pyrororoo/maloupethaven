
fetch('data/pets.json')
  .then((response) => response.json())
  .then((pets) => {
    const petsContainer = document.getElementById('pets-container');
    pets.forEach((pet) => {
      if(pet.featured == "Yes") {
      const petCard = document.createElement('div');
      petCard.innerHTML = `
      
        <div class="card">

          <img src="./images/pets/${pet.image}" alt="${pet.name}" class="card-img" draggable="false">

          <div class="card-content">
            <h3 class="txt-32 pet-name secondary-font">${pet.name}</h3>
            <p class="body-font information"> <span class="information status">${pet.status}</span> <span class="information">${pet.age}</span> </p>

            <div class="btn-pane">
              <a class="btn small-btn green-bg clr-yellow">Adopt Me!</a>
            </div>
          </div>

        </div>
      `;
      petsContainer.appendChild(petCard);
       }
    });
  })
  .catch((error) => console.error('Error loading pets:', error));
