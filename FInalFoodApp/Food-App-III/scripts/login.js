// accept  login page data
let form = document.querySelector("form");

let loginFunction = (event) => {
  event.preventDefault();

  let email = form.email.value;
  let password = form.password.value;

  if (email == "") {
    alert("Please enter a email");
  } else if (password == "") {
    alert("Please enter a password");
  } else {
    let newUser = new User();
    let res = newUser.saveLogindata(email, password);
    if (res) {
      alert("Login successful!");
      window.location.href = "index.html";

      form.email.value = "";
      form.password.value = "";
    }
  }
};

form.addEventListener("submit", loginFunction);
