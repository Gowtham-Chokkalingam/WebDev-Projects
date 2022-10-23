let users = JSON.parse(localStorage.getItem("users")) || [];
let loginData = JSON.parse(localStorage.getItem("loginData")) || [];
let login = localStorage.getItem("login") || false;

class User {
  constructor(name, mobile, gender) {
    this.name = name;
    this.mobile = mobile;
    this.gender = gender;
  }

  saveSignupdata(email, password) {
    let checkEmailPresent = this.checkEmailPresent(email);
    if (checkEmailPresent == false) {
      this.email = email;
      this.password = password;
      users.push(this);
      console.log("this:", this);

      localStorage.setItem("users", JSON.stringify(users));
      return true;
    } else {
      alert("Email already exists, Login");
    }
  }

  checkEmailPresent(email) {
    let emailList = {};
    users.filter((element) => {
      emailList[element.email] = 1;
    });
    if (emailList[email]) {
      return true;
    } else {
      return false;
    }
  }

  saveLogindata(email, password) {
    let checkEmail = this.checkEmailPresent(email);
    if (checkEmail) {
      let checkEmailpassValid = this.checkEmailPassword(email, password);
      if (checkEmailpassValid) {
        let userdetails = {
          email: email,
          password: password,
        };
        users.forEach((element) => {
          if (element.email == email) {
            userdetails["name"] = element.name;
            userdetails["mobile"] = element.mobile;
            userdetails["gender"] = element.gender;
          }
        });
        localStorage.setItem("loginData", JSON.stringify(userdetails));
        localStorage.setItem("login", true);
        return true;
      } else {
        alert("Wrong credentials");
      }
    } else {
      alert("User doesn't exist, Sign Up");
    }
  }

  checkEmailPassword(email, password) {
    let emailPasswordList = {};

    // users.filter((element) => {
    //   emailPasswordList[element.email] = element.password;
    // });
    users.forEach(element => {
      emailPasswordList[element.email] = element.password;
      
    });
    console.log('emailPasswordList:', emailPasswordList)
    
// console.log(234 && 123==123)


    if (emailPasswordList[email] && emailPasswordList[email] == password) {
      return true;
    } else {
      return false;
    }

    
  }
}
