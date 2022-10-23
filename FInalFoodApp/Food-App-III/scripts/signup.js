// accept  signup page data
let form = document.querySelector("form");

let signupFunction = (event) => {
  event.preventDefault();

  let name = form.name.value;
  let mobile = form.mobile.value;
  let gender = form.gender.value;
  let email = form.email.value;
  let password = form.password.value;

  if (name == "") {
    alert("Please enter a name");
  } else if (mobile == "") {
    alert("Please enter a mobile number");
  } else if (gender == "") {
    alert("Please select gender");
  } else if (email == "") {
    alert("Please enter a email");
  } else if (password == "") {
    alert("Please enter a password");
  } else {

    // note User is the class which is definec in the login-signup.js

    let newuser = new User(name, mobile, gender);
    console.log('newuser:', newuser)

    let res = newuser.saveSignupdata(email, password);

    if (res) {
      alert("Signup successful!");

      form.name.value = "";
      form.mobile.value = "";
      form.gender.value = "";
      form.email.value = "";
      form.password.value = "";
    }
  }
};

form.addEventListener("submit", signupFunction);
