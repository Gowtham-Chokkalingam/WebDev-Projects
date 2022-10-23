import { navbar, activeMenu } from "../components/navbar.js";

document.getElementById("navbar").innerHTML = navbar();
activeMenu("search-receipe-by-name", "receipe-of-the-day", "random-receipes");
