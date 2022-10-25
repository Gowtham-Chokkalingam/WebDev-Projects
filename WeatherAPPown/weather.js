let API_key = "055d5fb648a00f95fc9c4eefa8321217";

let searchbtn = document.getElementById("searchbtn");
searchbtn.addEventListener("click", getWeather);

searchbtn.addEventListener("click", getWeather5days);

async function getWeather() {
  let city = document.getElementById("search-bar").value;
  let map1 = document.querySelector(".mapouter");

  try {
    let res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_key}&units=metric`);
    console.log("res:", res);
    let data = await res.json();
    appendData(data);
    console.log("data:", data);
  } catch (error) {
    console.log("error:", error);
  }
}

// todo--> fetch for 5 days
async function getWeather5days() {
  let city = document.getElementById("search-bar").value;
  console.log("days:", city);

  try {
    let res = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_key}&units=metric`);
    let Fivedays = await res.json();
    console.log("Fivedays:", Fivedays);
    append5days(Fivedays);
  } catch (error) {
    console.log("error:", error);
  }
}
// todo--> Appending to section 1;

function appendData(data) {
  let city = document.getElementById("search-bar").value;
  let map1 = document.querySelector(".mapouter");

  if (city !== "") {
    map1.classList.toggle("active");
  }

  // let cityName = document.querySelector(".city");
  // cityName.innertext = data.city;

  let cityname = data.name;

  let icon = data.weather[0].icon;
  console.log("icon:", icon);

  let humidity = data.main.humidity;

  let temperature = data.main.temp;
  let description = data.weather[0].description;

  //   let pressure = data.main.pressure;

  let windSpeed = data.wind.speed;
  //* --------------------------------------------------//
  let cityName = document.querySelector(".city");
  cityName.innerText = `Weather in ${cityname}`;

  let Temperature = document.querySelector(".temp");
  Temperature.innerText = `${temperature} °C`;

  let Icon = document.querySelector(".icon");

  Icon.src = `https://openweathermap.org/img/wn/${icon}.png`;

  let Description = document.querySelector(".description");
  Description.innerText = description;

  let Humidity = document.querySelector(".humidity");
  Humidity.innerText = `${humidity} %`;

  let Wind = document.querySelector(".wind");

  Wind.innerText = `${windSpeed} kmph`;
  document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + cityname + "')";

  //   document.body.style.backgroundImage = "url("https://source.unsplash.com/1600x900/?"+cityname+"")"
  // todo map
  let map = document.getElementById("gmap_canvas");
  map.src = `https://maps.google.com/maps?q=${data.name}&t=&z=13&ie=UTF8&iwloc=&output=embed
`;
}

// todo--> Appending to section 2
function append5days(data) {
  for (let i = 0; i < 7; i++) {
    const element = data.list[i];

    document.getElementById("day" + (i + 1) + "Min").innerHTML = "Min:" + Number(element.main.temp_min) + " °C";

    document.getElementById("day" + (i + 1) + "Max").innerHTML = "Max:" + Number(element.main.temp_max) + " °C";

    document.getElementById("img" + (i + 1)).src = `http://openweathermap.org/img/wn/${element.weather[0].icon}.png`;

    document.getElementById("day" + (i + 1)).innerText = weekDays[CheckDay(i)];
  }
}

// todo To get the day

const d = new Date();
const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function CheckDay(day) {
  if (day + d.getDay() > 6) {
    console.log("getDay:", d.getDay());

    return day + d.getDay() - 7;
  } else {
    return day + d.getDay();
  }
}

// * This  function will run while pressing the enter button in the input field

document.getElementById("search-bar").addEventListener("keypress", function (event) {
  if (event.key == "Enter") {
    getWeather();
    getWeather5days();
  }
});

document.getElementById("search-bar").addEventListener("input", function () {
  let city = document.getElementById("search-bar").value;
  let map1 = document.querySelector(".mapouter");
  if (city.length == 0) {
    map1.classList.toggle("active");
  }
});
