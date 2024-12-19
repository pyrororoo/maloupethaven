const petList = document.getElementById("pet-list");
const filterType = document.getElementById("filter-type");
const filterAge = document.getElementById("filter-age");
const filterSize = document.getElementById("filter-size");
const filterAvailability = document.getElementById("filter-availability");
const filterButton = document.getElementById("filter-button");

let pets = [];

fetch("/data/pets.json")
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
    petList.innerHTML = "<p>No pets found.</p>";
    return;
  }

  filteredPets.forEach(pet => {
    const petDiv = document.createElement("div");
    petDiv.classList.add("pet");
    petDiv.innerHTML = `
      <img src="/images/pets/${pet.image}" alt="${pet.name}">
      <h3>${pet.name}</h3>
      <p>Type: ${pet.type}</p>
      <p>Age: ${pet.age}</p>
      <p>Size: ${pet.size || "N/A"}</p>
      <p>Status: ${pet.status}</p>
      <p>${pet.short_desc}</p>
      <button class="adopt-button" onclick="redirectToForm('${pet.name}')" ${pet.status !== "Available" ? "disabled" : ""}>Adopt</button>
    `;
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
function redirectToForm(petName) {
  const url = `./forms/adoption.html?pet=${encodeURIComponent(petName)}`;
  window.location.href = url;
}
