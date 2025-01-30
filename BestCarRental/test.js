 // **🔹 REGISZTRÁCIÓ PANEL**
 const registerPanel = document.getElementById("register-panel");
 const closeRegisterPanel = document.getElementById("close-register-panel");
 const createAccountBtn = document.querySelector(".create-account-btn");
 const backToLoginBtn = document.querySelector(".register-panel .login-btn");

 createAccountBtn.addEventListener("click", function () {
     loginPanel.classList.remove("open");
     registerPanel.classList.add("open");
 });

 backToLoginBtn.addEventListener("click", function () {
     registerPanel.classList.remove("open");
     loginPanel.classList.add("open");
 });

 closeRegisterPanel.addEventListener("click", closeAllPanels);

 function closeAllPanels() {
     loginPanel.classList.remove("open");
     registerPanel.classList.remove("open");
     overlay.classList.remove("show");
 }

 function createErrorElement(input) {
     const error = document.createElement("p");
     error.style.color = "red";
     error.style.fontSize = "14px";
     error.style.marginTop = "5px";
     input.parentNode.appendChild(error);
     return error;
 }

 // **🔹 REGISZTRÁCIÓ VALIDÁCIÓ ÉS API HÍVÁS**
 const registerSubmitBtn = document.querySelector(".register-create-account-btn");
 const usernameInput = document.getElementById("username");
 const registerEmailInput = document.getElementById("register-email");
 const registerPasswordInput = document.getElementById("register-password");
 const personalIdInput = document.getElementById("personal-id");

 const usernameError = createErrorElement(usernameInput);
 const registerEmailError = createErrorElement(registerEmailInput);
 const registerPasswordError = createErrorElement(registerPasswordInput);
 const personalIdError = createErrorElement(personalIdInput);

 function validateRegistration() {
     let valid = true;

     if (!usernameInput.value.trim()) {
         usernameError.textContent = "Felhasználónév megadása kötelező!";
         valid = false;
     } else {
         usernameError.textContent = "";
     }

     if (!registerEmailInput.value.trim()) {
         registerEmailError.textContent = "Email megadása kötelező!";
         valid = false;
     } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(registerEmailInput.value.trim())) {
         registerEmailError.textContent = "Érvénytelen email!";
         valid = false;
     } else {
         registerEmailError.textContent = "";
     }

     const password = registerPasswordInput.value.trim();
     if (!password) {
         registerPasswordError.textContent = "Jelszó megadása kötelező!";
         valid = false;
     } else if (password.length < 8 || password.length > 20) {
         registerPasswordError.textContent = "A jelszónak 8-20 karakter hosszúnak kell lennie!";
         valid = false;
     } else if (!/^[A-Z]/.test(password)) {
         registerPasswordError.textContent = "A jelszónak nagybetűvel kell kezdődnie!";
         valid = false;
     } else if (!/\d/.test(password) || !/[!@#$%^&*]/.test(password)) {
         registerPasswordError.textContent = "A jelszónak tartalmaznia kell számot és speciális karaktert!";
         valid = false;
     } else {
         registerPasswordError.textContent = "";
     }

     if (!/^\d+[a-zA-Z]$/.test(personalIdInput.value.trim())) {
         personalIdError.textContent = "Personal-ID számokból álljon, az utolsó karakter betű legyen!";
         valid = false;
     } else {
         personalIdError.textContent = "";
     }

     registerSubmitBtn.disabled = !valid;
     return valid;
 }

 document.querySelectorAll("#register-panel input").forEach(input => {
     input.addEventListener("input", validateRegistration);
 });

 registerSubmitBtn.addEventListener("click", async function (event) {
     event.preventDefault();
     if (!validateRegistration()) return;

     const userData = {
         name: usernameInput.value.trim(),
         email: registerEmailInput.value.trim(),
         password: registerPasswordInput.value.trim(),
         personalId: personalIdInput.value.trim()
     };

     // **Konzolon ellenőrizzük, hogy helyesen küldjük-e az adatokat**
     console.log("Elküldött adatok:", userData);

     try {
         const response = await fetch("http://127.0.0.1:8080/InnovIT_vizsga-1.0-SNAPSHOT/webresources/user/registerUser", {
             method: "POST",
             headers: {
                 "Content-Type": "application/json"
             },
             body: JSON.stringify(userData)
         });

         const data = await response.json();
         console.log("Backend válasz:", data);

         if (response.ok) {
             alert("Sikeres regisztráció! Most már bejelentkezhetsz.");
             registerPanel.classList.remove("open");
         } else {
             alert("Hiba történt a regisztráció során: " + data.status);
         }
     } catch (error) {
         console.error("Hiba a regisztráció során:", error);
     }
 });
