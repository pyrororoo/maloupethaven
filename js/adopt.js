const petList = document.getElementById("pet-list");
const filterType = document.getElementById("filter-type");
const filterAge = document.getElementById("filter-age");
const filterSize = document.getElementById("filter-size");
const filterAvailability = document.getElementById("filter-availability");
const filterButton = document.getElementById("filter-button");

let pets = [];

fetch("./data/pets.json")
  .then(response => response.json())
  .then(data => {
    pets = data; //store fetched pets in a variable
    displayPets(pets); // display all pets initially
  })
  .catch(error => console.error("Error fetching pets:", error));

  
// display pets
function displayPets(filteredPets) {
  petList.innerHTML = ""; // clears existing pets
  if (filteredPets.length === 0) {
    petList.innerHTML = `<p class="secondary-font">No pets found.</p>`;
    return;
  }

  filteredPets.forEach(pet => {
    const petDiv = document.createElement("div");
    petDiv.classList.add("pet");

    if (pet.status === "Available") {
    petDiv.innerHTML = `
    <div class="card">
      <img src="./images/pets/${pet.image}" alt="${pet.name}" class="card-img">

      <div class="content">
        <h3 class="txt-24 secondary-font clr-yellow green-bg">${pet.name}</h3>
        <p class="status txt-18">Status: ${pet.status}</p>
        <p class="txt-18">Type: ${pet.type}</p>
        <p class="txt-18">Age: ${pet.age}</p>
        <p class="txt-18">Size: ${pet.size || "N/A"}</p>
        <p class="txt-18">Health: ${pet.health_status}</p>
        <p class="description txt-18">${pet.short_desc}</p>

        <div class="btn-pane">
          <button 
          class="btn green-bg clr-yellow secondary-font txt-18" 
          onclick="redirectToForm('${pet.name}', '${pet.type}')"
          ${pet.status !== "Available" ? "disabled" : ""}>
          Adopt Me!
          </button>
        </div>

      </div>
    </div>
    `;
    } else {
      petDiv.innerHTML = `
    <div class="card">
      <img src="/images/pets/${pet.image}" alt="${pet.name}" class="card-img">

      <div class="content">
        <h3 class="txt-24 secondary-font clr-yellow green-bg">${pet.name}</h3>
        <p class="status txt-18" style="color:var(--red)">Status: ${pet.status}</p>
        <p class="txt-18">Type: ${pet.type}</p>
        <p class="txt-18">Age: ${pet.age}</p>
        <p class="txt-18">Size: ${pet.size || "N/A"}</p>
        <p class="txt-18">Health: ${pet.health_status}</p>
        <p class="description txt-18">${pet.short_desc}</p>

        <div class="btn-pane">
          <button 
          class="btn green-bg clr-yellow secondary-font txt-18" 
          onclick="redirectToForm('${pet.name}', '${pet.type}')"
          ${pet.status !== "Available" ? "disabled" : ""}>
          Adopt Me!
          </button>
        </div>

      </div>
    </div>
    `;
    }
    petList.appendChild(petDiv);
  });
}

// filter pets based on selected options
function filterPets() {
  const type = filterType.value;
  const age = filterAge.value;
  const size = filterSize.value;
  const availability = filterAvailability.value;

  const filteredPets = pets.filter(pet => {
    return (
      (type === "all" || pet.type === type) &&
      (age === "all" || pet.age_class === age) &&
      (size === "all" || pet.size === size) &&
      (availability === "all" || pet.status === availability)
    );
  });

  displayPets(filteredPets);
}

// event listener for button click gaaah
filterButton.addEventListener("click", filterPets);

//redirects to adoption form w/ name
function redirectToForm(petName, petType) {
  const url = `./forms/adoption.html?pet=${encodeURIComponent(petName)}&type=${encodeURIComponent(petType)}`;
  window.location.href = url;
}
