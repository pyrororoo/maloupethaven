fetch('./data/events.json')
  .then((response) => response.json())
  .then((event) => {
    const eventContainer = document.getElementById('events');
    const headlineContainer = document.getElementById('headline-event');
    event.forEach((event) => {

      const eventCard = document.createElement('div');
      eventCard.innerHTML = `
      
        <div class="card">

          <img src="./images/events/${event.image}">

          <div class="content">
            <h3 class="body-font txt-32 clr-green allcaps">${event.name}</h3>
            <p class="body-font">${event.description}</p>

            <p class="body-font">📌 ${event.venue}</p>
            <p class="body-font">🕛 ${event.time} </p>

            <div class="btn-pane">
              <button class="btn primary-btn" onclick="openForm('${event.name}')">${event.button}</button>
            </div>
          </div>

          
        </div>
      `;

      if(event.headline === "Yes") {
        
        headlineContainer.appendChild(eventCard);

      } else {
    
        eventContainer.appendChild(eventCard);

      }
    });
  })
  .catch((error) => console.error('Error loading pets:', error));


function openForm(eventName) {
    document.getElementById("eventApplicationModal").style.display = "block";
}

function closeModal() {
  document.getElementById("eventApplicationModal").style.display = "none";
}
