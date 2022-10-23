import { navbar, activeMenu } from "../components/navbar.js";

document.getElementById("navbar").innerHTML = navbar();
activeMenu("search-receipe-by-name", "receipe-of-the-day", "random-receipes");

//display receipes
let displayReseips = (data) => {
  let receipes = document.getElementById("receipes");
  let container = document.getElementById("container");
  container.style.display = "block";
  receipes.innerHTML = "";

  if (!data) return;

  if (
    data.length == 0 ||
    document.getElementById("receipe-query").value == ""
  ) {
    container.style.display = "none";
  }

  data.forEach((element) => {
    let link = document.createElement("a");
    link.href = element.strYoutube;
    link.target = "_blank";

    let card = document.createElement("div");
    card.setAttribute("class", "card");

    let img = document.createElement("img");
    img.src = element.strMealThumb;

    let category = document.createElement("p");
    category.setAttribute("class", "receipe-category");
    category.innerText = element.strCategory;

    let title = document.createElement("h3");
    title.setAttribute("class", "receipe-title");
    title.innerText = element.strMeal;

    card.append(img, category, title);
    link.append(card);
    receipes.append(link);
  });
};

//serach receipes
let getReseipes = async () => {
  let query = document.getElementById("receipe-query").value;
  let res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
  );
  let data = await res.json();
  return data.meals;
};

//pass data to displayReseips
let mainFunction = async () => {
  let data = await getReseipes();
  displayReseips(data);
};

//debounce function
let debounce = (func, delay) => {
  if (id) {
    clearTimeout(id);
  }
  id = setTimeout(function () {
    func();
  }, delay);
};

// take data from search
let id;
document.getElementById("receipe-query").addEventListener("input", (e) => {
  debounce(mainFunction, 500);
});
