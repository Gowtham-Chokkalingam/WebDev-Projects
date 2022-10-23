//navbar & active menu
import { navbar, activeMenu } from "../components/navbar.js";
document.getElementById("navbar").innerHTML = navbar();
activeMenu("search-receipe-by-name", "receipe-of-the-day", "random-receipes");

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

let displayLogedUserdata = (data) => {
  let container = document.getElementById("container");
  // console.log(data);
  container.innerHTML = "";

  if (loginData == null) return;
  let card = document.createElement("div");
  card.setAttribute("class", "card");

  let img = document.createElement("img");
  if (data.gender == "Male") {
    img.src =
      "https://icons-for-free.com/download-icon-business+costume+male+man+office+user+icon-1320196264882354682_512.png";
  } else if (data.gender == "Female") {
    img.src =
      "https://toppng.com/uploads/preview/female-user-icon-11549837859owkm4qddjy.png";
  } else {
    img.src =
      "https://toppng.com/public/uploads/preview/circled-user-icon-user-pro-icon-11553397069rpnu1bqqup.png";
  }

  let name = document.createElement("h3");
  name.innerText = data.name;

  let mobile = document.createElement("p");
  mobile.innerText = data.mobile;

  let email = document.createElement("p");
  email.innerText = data.email;

  card.append(img, name, mobile, email);
  container.append(card);
};

let loginData = JSON.parse(localStorage.getItem("loginData")) || null;
displayLogedUserdata(loginData);
