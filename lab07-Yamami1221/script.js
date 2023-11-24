const firstNameInput = document.getElementById("first-name-input");
const lastNameInput = document.getElementById("last-name-input");
const emailInput = document.getElementById("email-input");
const passwordInput = document.getElementById("password-input");
const summitBtn = document.querySelector("#submit-btn");

firstNameInput.addEventListener("input", function () {
  firstNameInput.classList.remove("is-invalid", "is-valid");
});
lastNameInput.addEventListener("input", function () {
  lastNameInput.classList.remove("is-invalid", "is-valid");
});
emailInput.addEventListener("input", function () {
  emailInput.classList.remove("is-invalid", "is-valid");
});
passwordInput.addEventListener("input", function () {
  passwordInput.classList.remove("is-invalid", "is-valid");
});

summitBtn.addEventListener("click", function () {
  firstNameInput.classList.remove("is-invalid", "is-valid");
  lastNameInput.classList.remove("is-invalid", "is-valid");
  emailInput.classList.remove("is-invalid", "is-valid");
  passwordInput.classList.remove("is-invalid", "is-valid");
  if (firstNameInput.value === "") {
    firstNameInput.classList.add("is-invalid");
  } else {
    firstNameInput.classList.add("is-valid");
  }
  if (lastNameInput.value === "") {
    lastNameInput.classList.add("is-invalid");
  } else {
    lastNameInput.classList.add("is-valid");
  }
  if (!validateEmail(emailInput.value)) {
    emailInput.classList.add("is-invalid");
  } else {
    emailInput.classList.add("is-valid");
  }
  if (passwordInput.value === "" || passwordInput.value.length < 6) {
    passwordInput.classList.add("is-invalid");
  } else {
    passwordInput.classList.add("is-valid");
  }
});

//simple email validation
function validateEmail(email) {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
}