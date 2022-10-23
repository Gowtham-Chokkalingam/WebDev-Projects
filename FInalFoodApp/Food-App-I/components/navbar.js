let navbar = () => {
  return `<div id="logo">
  <img src="https://www.themealdb.com/images/logo-small.png" alt="logo" />
</div>
<div id="menus">
  <a href="./search-receipe-by-name.html" id="search-receipe-by-name"
    >Search Receipe</a
  >
  <a href="./receipe-of-the-day.html" id="receipe-of-the-day"
    >Receipe of the Day</a
  >
  <a href="./random-receipes.html" id="random-receipes"
    >Random Receipes</a
  >
</div>`;
};

// make active menu
let activeMenu = (a, b, c) => {
  let currPageURL = window.location.href;

  if (currPageURL.includes("/search-receipe-by-name.html")) {
    document.getElementById(a).setAttribute("class", "active-menu");
  } else if (currPageURL.includes("/receipe-of-the-day.html")) {
    document.getElementById(b).setAttribute("class", "active-menu");
  } else if (currPageURL.includes("/random-receipes.html")) {
    document.getElementById(c).setAttribute("class", "active-menu");
  } else {
    document.getElementById(a).setAttribute("class", "not-active-menu");
    document.getElementById(b).setAttribute("class", "not-active-menu");
    document.getElementById(c).setAttribute("class", "not-active-menu");
  }
};

//export components
export { navbar, activeMenu };
