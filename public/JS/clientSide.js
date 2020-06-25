console.log("JS working");
const btn = document.getElementById("btn");
const locationName = document.getElementById("loc");
const tempe = document.getElementById("temp");
const forecast = document.getElementById("fc");
const inputValue = document.querySelector("input");

btn.addEventListener("click", (e) => {
  e.preventDefault();
  const location = inputValue.value;

  fetch("http://localhost:3000/weather?address=" + location).then(
    (response) => {
      response.json().then((data) => {
        if (data.error) {
          alert(data.error);
        } else {
          locationName.innerText = data.location;
          tempe.innerText = data.temperature;
          forecast.innerText = data.description;
        }
      });
    }
  );
});
