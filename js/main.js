const API = "https://restcountries.com/v3.1/all";
const contires = document.querySelector(".contires");
const input = document.querySelector("#input");
const animation = document.querySelector(".animation");
const select = document.querySelector("#select");
const inputScrol = document.querySelector("#input_scrol");
const errorEl = document.querySelector(".errorEl");
const countryName = document.getElementsByClassName("countryName");
const regionName = document.getElementsByClassName("regions");

//mode
const body = document.querySelector("body");
const darkBtn = document.getElementById("dark-btn");
const lightBtn = document.getElementById("light-btn");
const modeLocal = localStorage.getItem("mode");

input.focus();
// togle mode
if (modeLocal) {
  body.classList.add("dark-mode");
  darkBtn.classList.toggle("hidden");
  lightBtn.classList.toggle("hidden");
}
const toggleModeBtn = () => {
  darkBtn.classList.toggle("hidden");
  lightBtn.classList.toggle("hidden");
  body.classList.toggle("dark-mode");
};
darkBtn.addEventListener("click", () => {
  toggleModeBtn();
  localStorage.setItem("mode", "dark-mode");
});
lightBtn.addEventListener("click", () => {
  toggleModeBtn();
  localStorage.setItem("mode", "");
});

let data = [];

const getData = async (surse) => {
  animation.classList.remove("active");
  const req = await fetch(surse);
  data = await req.json();
  useDate(data);
  animation.classList.add("active");
};

getData(API);

const useDate = (data) => {
  contires.innerHTML = "";
  data[67] = { ...data[67], languages: { en: "English" } };
  data.forEach((item) => {
    const { name, flags, capital, population, region } = item;
    contires.innerHTML += `
    <div class="country"> 
    <img src=${flags.svg} alt="${name.common} flag img" height="160px">
    <h3 class="countryName">${name.common}</h3>
    <p> <span> Population &nbsp&nbsp </span>  ${population}</p>
    <p class="regions"> <span> Region: &nbsp &nbsp &nbsp &nbsp </span> ${region}</p>
    <p id="scrEl" > <span> Capital: &nbsp &nbsp &nbsp &nbsp </span> ${
      capital ? capital : "no capital"
    }</p>
  </div>
    `;
  });
};
select.addEventListener("change", () => {
  Array.from(regionName).forEach((element) => {
    if (element.innerText.includes(select.value) || select.value == "All") {
      element.parentElement.classList.remove("hidden");
    } else {
      element.parentElement.classList.add("hidden");
    }
  });
});
input.addEventListener("input", () => {
  let val = input.value.toLowerCase().trim();
  Array.from(countryName).forEach((item) => {
    if (item.textContent.toLowerCase().includes(val)) {
      item.parentElement.classList.remove("hidden");
    } else {
      item.parentElement.classList.add("hidden");
      errorEl.classList.remove("hidden");
    }
  });
});

document.addEventListener("scroll", (e) => {
  let regionsEl = e.target.querySelector(".scrollEl");

  if (regionsEl) {
    setTimeout(() => {
      inputScrol.classList.add("scroll");
      input.focus();
    }, 3000);
  }
});

document.addEventListener("dblclick", (e) => {
  input.focus();
});


