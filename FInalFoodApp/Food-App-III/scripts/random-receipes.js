//active menu
import { navbar, activeMenu } from "../components/navbar.js";
document.getElementById("navbar").innerHTML = navbar();
activeMenu("search-receipe-by-name", "receipe-of-the-day", "random-receipes");

// display receipe
let displayReseipe = (data) => {
  let container = document.getElementById("container");
  if (!data) return;

  let leftDiv = document.createElement("div");
  leftDiv.setAttribute("class", "leftDiv");

  let img = document.createElement("img");
  img.src = data.strMealThumb;

  let title = document.createElement("h3");
  title.innerText = data.strMeal;

  let area = document.createElement("p");
  area.innerText = `Area: ${data.strArea} | Category: ${data.strCategory}`;

  let youtubeLink = document.createElement("a");
  youtubeLink.innerText = "Learn from YouTube";
  youtubeLink.href = data.strYoutube;
  youtubeLink.setAttribute("class", "link");

  leftDiv.append(img, title, area, youtubeLink);

  let rightDiv = document.createElement("div");
  rightDiv.setAttribute("class", "rightDiv");

  let ins_title = document.createElement("h3");
  ins_title.innerText = "Instructions";
  ins_title.setAttribute("class", "ins_title");

  let instraction = document.createElement("p");
  instraction.innerText = data.strInstructions;

  rightDiv.append(ins_title, instraction);

  container.append(leftDiv, rightDiv);
};

//fetch ReceipeOfTheDay
let fetchRandomReceipe = async () => {
  let res = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
  let data = await res.json();
  let val = data.meals[0];
  displayReseipe(val);
};

//invoke fetchRandomReceipe
fetchRandomReceipe();

//random btn
let randomButton = document.getElementById("random-btn");
randomButton.addEventListener("click", () => {
  window.location.reload();
});

//redirect to home
document.getElementById("logo").addEventListener("click", () => {
  window.location.href = "index.html";
});

//logout
let signup_btn = document.getElementById("signup");
let loginStatus = localStorage.getItem("login") || null;
if (loginStatus == "true") {
  document.getElementById("login").innerText = "Logout";
  signup_btn.style.display = "none";
}
let login_btn = document.getElementById("login");
if (login_btn.innerText == "Login") {
  login_btn.href = "login.html";
  signup_btn.style.display = "block";
  signup_btn.href = "signup.html";
} else {
  login_btn.addEventListener("click", () => {
    let text = "Are you sure want to logout?";
    if (confirm(text) == true) {
      localStorage.removeItem("loginData");
      localStorage.removeItem("login");
    }
  });
}
