const inputName = document.querySelector(".name");
const inputPhoneNumber = document.querySelector(".phone");
const inputEmail = document.querySelector(".email");
const inputPassword = document.querySelector(".password");
const signUpBtn = document.querySelector(".signUp");
const systemMessage = document.querySelector(".systemMessage");
const body = document.querySelector("body");

const users = localStorage.getItem("users")
  ? JSON.parse(localStorage.getItem("users"))
  : [];

signUpBtn.addEventListener("click", () => {
  if (
    inputName.value === "" ||
    inputPhoneNumber.value === "" ||
    inputEmail.value === "" ||
    inputPassword.value === ""
  ) {
    systemMessage.textContent = "All fields are required";
    systemMessage.style.color = "red";
  } else {
    let isError = false;
    for (let i = 0; i < users.length; i++) {
      if (users[i].email === inputEmail.value) {
        isError = true;
      }
    }

    // Validation: Name {
    // Min 2 Symbols
    // Max 24 Symbols
    // Only Letters
    // }
    const nameRegex = /^[A-Za-zА-Яа-яЁёЇїІіЄєҐґ]+$/;
    if (
      inputName.value.length < 2 ||
      inputName.value.length > 24 ||
      !nameRegex.test(inputName.value)
    ) {
      systemMessage.textContent = "Name must be 2-24 letters only";
      systemMessage.style.color = "red";
      return;
    }

    // Validation Phone {
    // First symbol +
    // Max 12 numbers
    // Min 8 numbers
    // Only numbers
    // }
    const phoneWithoutPlus = inputPhoneNumber.value.slice(1);
    if (
      !inputPhoneNumber.value.startsWith("+") ||
      inputPhoneNumber.value.length < 8 ||
      inputPhoneNumber.value.length > 13 ||
      /\D/.test(phoneWithoutPlus)
    ) {
      systemMessage.textContent = "Invalid phone number format";
      systemMessage.style.color = "red";
      return;
    }
    // Validation Email {
    // Required symbol @
    // Min 7 symbols
    // }

    if (!inputEmail.value.includes("@") || inputEmail.length < 7) {
      systemMessage.textContent =
        "Email must be at least 7 characters and include '@'";
      systemMessage.style.color = "red";
      return;
    }

    //   Validation Password min 5 symbols max 26 symbols
    if (inputPassword.value.length < 5 || inputPassword.value.length > 26) {
      systemMessage.textContent =
        "Length of password must be from 5 to 26 symbols";
      systemMessage.style.color = "red";
      return;
    }

    //   Validation for those who already exists

    if (isError) {
      systemMessage.textContent = "A user with this email already exists o_0";
      systemMessage.style.color = "red";
    } else {
      const userData = {
        name: inputName.value,
        phoneNumber: inputPhoneNumber.value,
        email: inputEmail.value,
        password: inputPassword.value,
      };

      users.push(userData);
      localStorage.setItem("users", JSON.stringify(users));
      inputName.value = "";
      inputPhoneNumber.value = "";
      inputEmail.value = "";
      inputPassword.value = "";
      systemMessage.textContent = "You have successfully registered =)";
      systemMessage.style.color = "green";
    }
  }
});

const loginInputEmail = document.querySelector(".emailLogin");
const logiInputPassword = document.querySelector(".passwordLogin");
const loginBtn = document.querySelector(".login");

loginBtn.addEventListener("click", () => {
  let isLoginError = true;
  for (let i = 0; i < users.length; i++) {
    if (
      loginInputEmail.value === users[i].email &&
      logiInputPassword.value === users[i].password
    ) {
      isLoginError = false;
    }
  }

  if (isLoginError) {
    if (loginInputEmail.value === "" || loginInputPassword.value === "") {
      systemMessage.textContent = "All fields are required";
      systemMessage.style.color = "red";
    } else {
      systemMessage.textContent =
        "You have entered an incorrect email or password o_0";
      systemMessage.style.color = "red";
    }
  } else {
    loginInputEmail.value = "";
    loginInputPassword.value = "";
    systemMessage.textContent = "You passed successfuly";
    systemMessage.style.color = "green";
    body.textContent = "";
    const btnLogout = document.createElement("button");
    btnLogout.textContent = "Logout";
    body.append(btnLogout);
  }
});
