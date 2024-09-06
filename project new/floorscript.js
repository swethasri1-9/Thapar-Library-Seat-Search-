const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.sold)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");

populateUI();

let ticketPrice = +movieSelect.value;
let selectedSeat = null;

// Save selected movie index and price
function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem("selectedMovieIndex", movieIndex);
  localStorage.setItem("selectedMoviePrice", moviePrice);
}

// Update total and count
function updateSelectedCount() {
  if (selectedSeat !== null) {
    const selectedSeatsCount = 1;

    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice;

    setMovieData(movieSelect.selectedIndex, movieSelect.value);
  }
}

// Get data from local storage and populate UI
function populateUI() {
  const selectedSeatIndex = localStorage.getItem("selectedSeatIndex");

  if (selectedSeatIndex !== null) {
    selectedSeat = seats[selectedSeatIndex];
    selectedSeat.classList.add("selected");
  }

  const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");

  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }
}

// Movie select event
movieSelect.addEventListener("change", (e) => {
  ticketPrice = +e.target.value;
  setMovieData(e.target.selectedIndex, e.target.value);
  updateSelectedCount();
});

// Seat click event
container.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("sold")
  ) {
    if (selectedSeat !== null) {
      selectedSeat.classList.remove("selected");
    }

    selectedSeat = e.target;
    selectedSeat.classList.add("selected");

    updateSelectedCount();
  }
});

// Initial count and total set
updateSelectedCount();
