const API = "https://restcountries.com/v3.1/all";
const contires = document.querySelector(".contires");
const input = document.querySelector("#input");
const animation = document.querySelector(".animation");
const select = document.querySelector("#select");
const inputScrol = document.querySelector("#input_scrol");
const errorEl = document.querySelector(".errorEl");

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

// filter select
let countr = data;

const useDate = (data) => {
  contires.innerHTML = "";
  data[67] = { ...data[67], languages: { en: "English" } };
  data.forEach((item) => {
    const { name, flags, capital, population, region } = item;
    contires.innerHTML += `
    <div class="country"> 
    <img src=${flags.svg} alt="${name.common} flag img" height="160px">
    <h3>${name.common}</h3>
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
  if (select.value == "All") {
    useDate(data);
    alert("All selected");
    console.log(allEl);
  }

  const filterCounrt = data.filter((item) => {
    return item.region == select.value;
  });
  countr = filterCounrt;
  useDate(countr);
});
//127.0.0.1:5501/
http: input.addEventListener("input", () => {
  let val = input.value.toLowerCase().trim();
  // let errorEl = "No result";
  let filtered = [];
  data.forEach((item) => {
    if (contires.innerHTML) {
      errorEl.classList.add("hidden");
      if (item.name.common.toLowerCase().includes(val)) {
        filtered.push(item);
        errorEl.classList.add("hidden");
      }
    } else if (contires.innerHTML === "") {
      if (item.name.common.toLowerCase().includes(val)) {
        filtered.push(item);
        errorEl.classList.add("hidden");
      } else {
        errorEl.classList.remove("hidden");
      }
    }
  });
  useDate(filtered);
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
