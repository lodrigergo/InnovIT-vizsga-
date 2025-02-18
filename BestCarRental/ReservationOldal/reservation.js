document.addEventListener("DOMContentLoaded", function () {
  // LOGIN PANEL and related variables
  const loginBtn = document.querySelector(".login-btn");
  const loginPanel = document.getElementById("login-panel");
  const overlay = document.getElementById("overlay");
  const closeLoginPanel = document.getElementById("close-login-panel");
  const loginSubmitBtn = document.querySelector("#login-panel .login-btn");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const profileIcon = document.getElementById("profile-icon");
  const profilePanel = document.getElementById("profile-panel");
  const closeProfilePanel = document.getElementById("close-profile-panel");
  const usernameDisplay = profilePanel.querySelector("h2");
  const logoutBtn = document.querySelector(".logout-btn");

  // REGISTER PANEL and related variables
  const registerPanel = document.getElementById("register-panel");
  const closeRegisterPanel = document.getElementById("close-register-panel");
  const createAccountBtn = document.querySelector(".create-account-btn");
  const backToLoginBtn = document.querySelector(".register-panel .login-btn");

  // Login-section (reservation page) and store its original content
  const loginSection = document.querySelector(".login-section");
  const originalLoginSectionHTML = loginSection ? loginSection.innerHTML : "";

  // Function to create an error message element for an input
  function createErrorElement(input) {
    const error = document.createElement("p");
    error.style.color = "red";
    error.style.fontSize = "14px";
    input.parentNode.appendChild(error);
    return error;
  }

  const emailError = createErrorElement(emailInput);
  const passwordError = createErrorElement(passwordInput);

  const usernameInput = document.getElementById("username");
  const registerEmailInput = document.getElementById("register-email");
  const registerPasswordInput = document.getElementById("register-password");
  const personalIdInput = document.getElementById("personal-id");

  const usernameError = createErrorElement(usernameInput);
  const registerEmailError = createErrorElement(registerEmailInput);
  const registerPasswordError = createErrorElement(registerPasswordInput);
  const personalIdError = createErrorElement(personalIdInput);

  loginBtn.addEventListener("click", function () {
    loginPanel.classList.add("open");
    overlay.classList.add("show");
  });

  function closeAllPanels() {
    loginPanel.classList.remove("open");
    registerPanel.classList.remove("open");
    profilePanel.classList.remove("open");
    overlay.classList.remove("show");
  }

  overlay.addEventListener("click", closeAllPanels);
  closeLoginPanel.addEventListener("click", closeAllPanels);
  closeRegisterPanel.addEventListener("click", closeAllPanels);

  profileIcon.addEventListener("click", function () {
    profilePanel.classList.add("open");
    overlay.classList.add("show");
  });

  closeProfilePanel.addEventListener("click", function () {
    profilePanel.classList.remove("open");
    overlay.classList.remove("show");
  });

  createAccountBtn.addEventListener("click", function () {
    loginPanel.classList.remove("open");
    registerPanel.classList.add("open");
  });

  backToLoginBtn.addEventListener("click", function () {
    registerPanel.classList.remove("open");
    loginPanel.classList.add("open");
  });

  const reservationButtons = document.querySelectorAll(".login-section .btn");
  if (reservationButtons.length >= 2) {
    reservationButtons[0].addEventListener("click", function () {
      registerPanel.classList.add("open");
      overlay.classList.add("show");
    });
    reservationButtons[1].addEventListener("click", function () {
      loginPanel.classList.add("open");
      overlay.classList.add("show");
    });
  }

  // LOGIN VALIDATION and API call
  loginSubmitBtn.addEventListener("click", async function (event) {
    event.preventDefault();
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    if (!email) {
      emailError.textContent = "Kérlek add meg az email címed!";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      emailError.textContent = "Érvénytelen email!";
    } else {
      emailError.textContent = "";
    }

    if (!password) {
      passwordError.textContent = "Kérlek add meg a jelszavad!";
    } else if (password.length < 8 || password.length > 20) {
      passwordError.textContent =
        "A jelszónak 8-20 karakter hosszúnak kell lennie!";
    } else if (!/^[A-Z]/.test(password)) {
      passwordError.textContent = "A jelszónak nagybetűvel kell kezdődnie!";
    } else {
      passwordError.textContent = "";
    }

    if (emailError.textContent || passwordError.textContent) {
      return;
    }

    try {
      const response = await fetch(
        "http://127.0.0.1:8080/InnovIT_vizsga-1.0-SNAPSHOT/webresources/user/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );
      const data = await response.json();
      if (response.ok && data.status === "success") {
        localStorage.setItem("jwt", data.result.jwt);
        localStorage.setItem("username", data.result.name);
        usernameDisplay.textContent = data.result.name;
        closeAllPanels();
        loginBtn.style.display = "none";
        profileIcon.style.display = "block";
        const profileImageKey = "profileImage_" + data.result.name;
        const savedImage = localStorage.getItem(profileImageKey);
        if (savedImage) {
          document.getElementById("profile-image").src = savedImage;
          document.getElementById("profile-icon").src = savedImage;
        }
        if (loginSection) {
          loginSection.innerHTML = "<h3>No vehicle reserved yet.</h3>";
        }
        alert("Üdvözöllek, " + data.result.name + "!");
        showLoader();
      } else {
        passwordError.textContent = "Hibás email vagy jelszó!";
      }
    } catch (error) {
      console.error("Hiba a bejelentkezés során:", error);
      passwordError.textContent = "Hálózati hiba történt!";
    }
  });

  logoutBtn.addEventListener("click", function () {
    localStorage.removeItem("jwt");
    localStorage.removeItem("username");
    closeAllPanels();
    loginBtn.style.display = "block";
    profileIcon.style.display = "none";
    if (loginSection) {
      loginSection.innerHTML = originalLoginSectionHTML;
    }
    alert("Sikeresen kijelentkeztél.");
  });

  // If user is already logged in, update UI accordingly
  const storedUsername = localStorage.getItem("username");
  if (storedUsername) {
    usernameDisplay.textContent = storedUsername;
    loginBtn.style.display = "none";
    profileIcon.style.display = "block";
    const profileImageKey = "profileImage_" + storedUsername;
    const savedImage = localStorage.getItem(profileImageKey);
    if (savedImage) {
      document.getElementById("profile-image").src = savedImage;
      document.getElementById("profile-icon").src = savedImage;
    }
    if (loginSection) {
      loginSection.innerHTML = "<h3>No vehicle reserved yet.</h3>";
    }
  }

  // REGISTRATION VALIDATION and API call
  const registerSubmitBtn = document.querySelector(
    ".register-create-account-btn"
  );
  const touched = {
    username: false,
    registerEmail: false,
    registerPassword: false,
    personalId: false,
  };

  usernameInput.addEventListener("blur", () => {
    touched.username = true;
    validateRegistration();
  });

  registerEmailInput.addEventListener("blur", () => {
    touched.registerEmail = true;
    validateRegistration();
  });

  registerPasswordInput.addEventListener("blur", () => {
    touched.registerPassword = true;
    validateRegistration();
  });

  personalIdInput.addEventListener("blur", () => {
    touched.personalId = true;
    validateRegistration();
  });

  function validateRegistration() {
    let valid = true;
    if (touched.username) {
      if (!usernameInput.value.trim()) {
        usernameError.textContent = "Felhasználónév megadása kötelező!";
        valid = false;
      } else {
        usernameError.textContent = "";
      }
    } else {
      usernameError.textContent = "";
      if (!usernameInput.value.trim()) {
        valid = false;
      }
    }
    if (touched.registerEmail) {
      if (!registerEmailInput.value.trim()) {
        registerEmailError.textContent = "Email megadása kötelező!";
        valid = false;
      } else if (
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(registerEmailInput.value.trim())
      ) {
        registerEmailError.textContent = "Érvénytelen email!";
        valid = false;
      } else {
        registerEmailError.textContent = "";
      }
    } else {
      registerEmailError.textContent = "";
      if (!registerEmailInput.value.trim()) {
        valid = false;
      }
    }
    if (touched.registerPassword) {
      if (!registerPasswordInput.value.trim()) {
        registerPasswordError.textContent = "Jelszó megadása kötelező!";
        valid = false;
      } else {
        registerPasswordError.textContent = "";
      }
    } else {
      registerPasswordError.textContent = "";
      if (!registerPasswordInput.value.trim()) {
        valid = false;
      }
    }
    if (touched.personalId) {
      if (!/^\d+[a-zA-Z]$/.test(personalIdInput.value.trim())) {
        personalIdError.textContent =
          "Personal-ID számokból álljon, az utolsó karakter betű legyen!";
        valid = false;
      } else {
        personalIdError.textContent = "";
      }
    } else {
      personalIdError.textContent = "";
      if (!/^\d+[a-zA-Z]$/.test(personalIdInput.value.trim())) {
        valid = false;
      }
    }
    registerSubmitBtn.disabled = !valid;
    return valid;
  }

  document.querySelectorAll("#register-panel input").forEach((input) => {
    input.addEventListener("input", validateRegistration);
  });

  registerSubmitBtn.addEventListener("click", async function (event) {
    event.preventDefault();
    if (!validateRegistration()) return;
    try {
      const response = await fetch(
        "http://127.0.0.1:8080/InnovIT_vizsga-1.0-SNAPSHOT/webresources/user/registerUser",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: usernameInput.value.trim(),
            email: registerEmailInput.value.trim(),
            password: registerPasswordInput.value.trim(),
            personalId: personalIdInput.value.trim(),
          }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        alert("Sikeres regisztráció! Most már bejelentkezhetsz.");
        registerPanel.classList.remove("open");
        loginPanel.classList.add("open");
      } else {
        alert(
          "Hiba történt a regisztráció során: Létezik már ilyen email cimmel regisztrált felhasználó!"
        );
      }
    } catch (error) {
      console.error("Hiba a regisztráció során:", error);
    }
  });

  document.querySelectorAll(".profile-option").forEach((option) => {
    option.addEventListener("click", function () {
      const selectedImage = this.getAttribute("data-image");
      document.getElementById("profile-image").src = selectedImage;
      document.getElementById("profile-icon").src = selectedImage;
      const currentUser = localStorage.getItem("username");
      if (currentUser) {
        localStorage.setItem("profileImage_" + currentUser, selectedImage);
      }
    });
  });

  function showLoader() {
    const loaderOverlay = document.getElementById("loader-overlay");
    loaderOverlay.style.display = "flex";
    setTimeout(() => {
      loaderOverlay.style.display = "none";
    }, 1500);
  }
});
