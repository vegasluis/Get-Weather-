console.log("Client side js file is open");

// fetch("http://puzzle.mead.io/puzzle").then((response) => {
//   response.json().then((data) => {
//     console.log(data);
//   });
// });

// fetch("http://localhost:3001/weather?address=Boston").then((response) => {
//   response.json().then((data) => {
//     if (data.error) {
//       return console.log(data.error);
//     }
//     console.log(data);
//   });
// });

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");
//messageTwo.textContent = "From Javascript";
weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const location = search.value;

  if (location.length === 0) return alert("Please submit a location ");

  messageOne.textContent = "Loading....";
  messageTwo.textContent = "";

  fetch(`http://localhost:3001/weather?address=${location}`).then(
    (response) => {
      response.json().then((data) => {
        if (data.error) {
          return (messageOne.textContent = data.error);
        }
        messageOne.textContent = data.location;
        messageTwo.textContent = data.forecastData;
      });
    }
  );
});
