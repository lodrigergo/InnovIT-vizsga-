document.addEventListener("DOMContentLoaded", function () {
  // Login panel megnyitása
  document.querySelector(".login-btn").addEventListener("click", function () {
    document.getElementById("login-panel").classList.add("open");
    document.getElementById("overlay").classList.add("show");
  });

  // Függvény az összes panel bezárására
  function closeAllPanels() {
    document.getElementById("login-panel").classList.remove("open");
    document.getElementById("register-panel").classList.remove("open");
    document.getElementById("profile-panel").classList.remove("open");
    document.getElementById("overlay").classList.remove("show");
  }

  // Panelek bezárása
  document.getElementById("overlay").addEventListener("click", closeAllPanels);
  document.getElementById("close-login-panel").addEventListener("click", closeAllPanels);
  document.getElementById("close-register-panel").addEventListener("click", closeAllPanels);

  // Profil panel megnyitása és bezárása
  document.getElementById("profile-icon").addEventListener("click", function () {
    document.getElementById("profile-panel").classList.add("open");
    document.getElementById("overlay").classList.add("show");
  });
  document.getElementById("close-profile-panel").addEventListener("click", function () {
    document.getElementById("profile-panel").classList.remove("open");
    document.getElementById("overlay").classList.remove("show");
  });

  // Regisztrációs panelre váltás és vissza a login panelhez
  document.querySelector(".create-account-btn").addEventListener("click", function () {
    document.getElementById("login-panel").classList.remove("open");
    document.getElementById("register-panel").classList.add("open");
  });
  document.querySelector(".register-panel .login-btn").addEventListener("click", function () {
    document.getElementById("register-panel").classList.remove("open");
    document.getElementById("login-panel").classList.add("open");
  });

  // Login-section gombok: regisztráció vagy bejelentkezés megnyitása
  let resBtns = document.querySelectorAll(".login-section .btn");
  if (resBtns.length >= 2) {
    resBtns[0].addEventListener("click", function () {
      document.getElementById("register-panel").classList.add("open");
      document.getElementById("overlay").classList.add("show");
    });
    resBtns[1].addEventListener("click", function () {
      document.getElementById("login-panel").classList.add("open");
      document.getElementById("overlay").classList.add("show");
    });
  }

  // Login gomb eseménykezelő
  document.querySelector("#login-panel .login-btn").addEventListener("click", async function (e) {
    e.preventDefault();
    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value.trim();

    let emailError = document.getElementById("email").parentNode.querySelector("p") || (function () {
      let el = document.createElement("p");
      el.style.color = "red";
      el.style.fontSize = "14px";
      document.getElementById("email").parentNode.appendChild(el);
      return el;
    })();
    let passwordError = document.getElementById("password").parentNode.querySelector("p") || (function () {
      let el = document.createElement("p");
      el.style.color = "red";
      el.style.fontSize = "14px";
      document.getElementById("password").parentNode.appendChild(el);
      return el;
    })();

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
      passwordError.textContent = "A jelszónak 8-20 karakter hosszúnak kell lennie!";
    } else if (!/^[A-Z]/.test(password)) {
      passwordError.textContent = "A jelszónak nagybetűvel kell kezdődnie!";
    } else {
      passwordError.textContent = "";
    }
    if (emailError.textContent || passwordError.textContent) return;
    try {
      let response = await fetch("http://127.0.0.1:8080/InnovIT_vizsaga-1.0-SNAPSHOT/webresources/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      let data = await response.json();
      if (response.ok && data.status === "success") {
        localStorage.setItem("jwt", data.result.jwt);
        localStorage.setItem("username", data.result.name);
        document.querySelector("#profile-panel h2").textContent = data.result.name;
        closeAllPanels();
        document.querySelector(".login-btn").style.display = "none";
        document.getElementById("profile-icon").style.display = "block";
        let profileImageKey = "profileImage_" + data.result.name;
        let savedImage = localStorage.getItem(profileImageKey);
        if (savedImage) {
          document.getElementById("profile-image").src = savedImage;
          document.getElementById("profile-icon").src = savedImage;
        }
        if (document.querySelector(".login-section") && !localStorage.getItem("reservationConfirmed")) {
          document.querySelector(".login-section").innerHTML = "<h3>No vehicle reserved yet.</h3>";
        }
        alert("Üdvözöllek, " + data.result.name + "!");
        (function showLoader() {
          document.getElementById("loader-overlay").style.display = "flex";
          setTimeout(function () {
            document.getElementById("loader-overlay").style.display = "none";
          }, 1500);
        })();
      } else {
        passwordError.textContent = "Hibás email vagy jelszó!";
      }
    } catch (err) {
      console.error("Hiba a bejelentkezés során:", err);
      passwordError.textContent = "Hálózati hiba történt!";
    }
  });

  // Logout eseménykezelő
  document.querySelector(".logout-btn").addEventListener("click", function () {
    localStorage.removeItem("jwt");
    localStorage.removeItem("username");
    closeAllPanels();
    document.querySelector(".login-btn").style.display = "block";
    document.getElementById("profile-icon").style.display = "none";
    let ls = document.querySelector(".login-section");
    if (ls)
      ls.innerHTML = ls.getAttribute("data-original") || "<h3>No vehicle reserved yet.</h3>";
    alert("Sikeresen kijelentkeztél.");
  });

  // Ha már be van jelentkezve
  let storedUsername = localStorage.getItem("username");
  if (storedUsername) {
    document.querySelector("#profile-panel h2").textContent = storedUsername;
    document.querySelector(".login-btn").style.display = "none";
    document.getElementById("profile-icon").style.display = "block";
    let profileImageKey = "profileImage_" + storedUsername;
    let savedImage = localStorage.getItem(profileImageKey);
    if (savedImage) {
      document.getElementById("profile-image").src = savedImage;
      document.getElementById("profile-icon").src = savedImage;
    }
    if (document.querySelector(".login-section") && !localStorage.getItem("reservationConfirmed")) {
      document.querySelector(".login-section").innerHTML = "<h3>No vehicle reserved yet.</h3>";
    }
  }

  // Regisztráció validáció
  document.querySelectorAll("#register-panel input").forEach(function (input) {
    input.addEventListener("input", validateRegistration);
    input.addEventListener("blur", validateRegistration);
  });
  document.querySelector(".register-create-account-btn").addEventListener("click", async function (e) {
    e.preventDefault();
    if (!validateRegistration()) return;
    try {
      let response = await fetch("http://127.0.0.1:8080/InnovIT_vizsaga-1.0-SNAPSHOT/webresources/user/registerUser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: document.getElementById("username").value.trim(),
          email: document.getElementById("register-email").value.trim(),
          password: document.getElementById("register-password").value.trim(),
          personalId: document.getElementById("personal-id").value.trim(),
        }),
      });
      let data = await response.json();
      if (response.ok) {
        alert("Sikeres regisztráció! Most már bejelentkezhetsz.");
        document.getElementById("register-panel").classList.remove("open");
        document.getElementById("login-panel").classList.add("open");
      } else {
        alert("Hiba történt a regisztráció során: Létezik már ilyen email cimmel regisztrált felhasználó!");
      }
    } catch (err) {
      console.error("Hiba a regisztráció során:", err);
    }
  });

  // Profil opciók
  document.querySelectorAll(".profile-option").forEach(function (option) {
    option.addEventListener("click", function () {
      let selectedImage = this.getAttribute("data-image");
      document.getElementById("profile-image").src = selectedImage;
      document.getElementById("profile-icon").src = selectedImage;
      let currentUser = localStorage.getItem("username");
      if (currentUser)
        localStorage.setItem("profileImage_" + currentUser, selectedImage);
    });
  });

  // Loader megjelenítése
  function showLoader() {
    document.getElementById("loader-overlay").style.display = "flex";
    setTimeout(function () {
      document.getElementById("loader-overlay").style.display = "none";
    }, 1500);
  }

  // Ha a foglalás megerősítve van, állítsuk vissza a foglalás állapotát
  if (localStorage.getItem("reservationConfirmed") && document.querySelector(".login-section")) {
    let qty = parseInt(localStorage.getItem("reservationQuantity")) || 1;
    document.querySelector(".login-section").innerHTML = `<h3>${qty} foglalásod van <i class="fas fa-check-circle"></i></h3>`;
    let steps = document.querySelectorAll(".step div");
    if (steps.length >= 2) {
      steps[0].classList.remove("active");
      steps[0].classList.add("completed");
      steps[1].classList.add("active");
      steps[1].style.backgroundColor = "green";
      steps[1].style.color = "#fff";
    }
  }

  // Foglalás leadása: reservation-button eseménykezelő
  const reservationButton = document.querySelector(".reservation-button");
  if (reservationButton) {
    reservationButton.addEventListener("click", function () {
      // Ellenőrzés: ha nincs bejelentkezve, figyelmeztetés
      if (!localStorage.getItem("jwt")) {
        alert("Please log in to complete your reservation.");
        return;
      }
      // Töröljük a korábbi foglalási adatokat
      localStorage.removeItem("selectedCar");
      localStorage.removeItem("reservationQuantity");
      localStorage.removeItem("reservationConfirmed");

      // Foglalás adatok mentése (ha szükséges, például az autó adatai)
      let selectedCarData = {
        image: document.querySelector(".car-info img") ? document.querySelector(".car-info img").src : "",
        brand: document.querySelector(".car-info .details p:nth-child(1)") ? document.querySelector(".car-info .details p:nth-child(1)").textContent : "",
        model: document.querySelector(".car-info .details p:nth-child(2)") ? document.querySelector(".car-info .details p:nth-child(2)").textContent : "",
      };
      localStorage.setItem("selectedCar", JSON.stringify(selectedCarData));
      localStorage.setItem("reservationQuantity", 1);
      localStorage.setItem("reservationConfirmed", "true");

      // Frissítjük a jobb oldali tartalmat (például a .reservation-info konténerben)
      const reservationInfoContainer = document.querySelector(".reservation-info");
      if (reservationInfoContainer) {
        reservationInfoContainer.innerHTML = `
          <div class="confirmation-container">
            <img src="./Photos/thank-you.png" alt="Köszönjük a foglalását" class="confirmation-image">
            <div class="confirmation-text">
              <h3>Köszönjük a foglalását <i class="fas fa-check-circle"></i></h3>
            </div>
          </div>
        `;
      }
      
      // Értesítés a felhasználónak
      alert("A foglalás sikeresen elküldve lett!");
      
      // Frissítjük a lépésindikátorokat (ha vannak)
      let steps = document.querySelectorAll(".step div");
      if (steps.length >= 2) {
        steps[0].classList.remove("active");
        steps[0].classList.add("completed");
        steps[1].classList.add("active");
        steps[1].style.backgroundColor = "green";
        steps[1].style.color = "#fff";
      }
      
      // Alsó bal oldali értesítő megjelenítése
      showBottomLeftAlert("Köszönjük a foglalását!");

      // Letiltjuk a foglalás gombot, hogy ne lehessen többször leadni
      reservationButton.disabled = true;
    });
  }

  // Autó adatok és foglalási mennyiség megjelenítése
  if (document.querySelector(".car-info")) {
    let selectedCarJSON = localStorage.getItem("selectedCar");
    let qty = parseInt(localStorage.getItem("reservationQuantity")) || 1;
    if (!selectedCarJSON) {
      document.querySelector(".car-info").innerHTML = "<h3>Nincs autó lefoglalva.</h3>";
    } else {
      let carData = JSON.parse(selectedCarJSON);
      document.querySelector(".car-info img").src = carData.image;
      document.querySelector(".car-info .details").innerHTML = `
        <p>Brand: ${carData.brand}</p>
        <p>Model: ${carData.model}</p>
        <p>Year: ${carData.year || ""}</p>
        <p>Fuel: ${carData.fuelType || ""}</p>
        <p>Transmission: ${carData.transmission || ""}</p>
        <p>Price per day: ${carData.pricePerDay || ""}€</p>
      `;
      let quantityDisplay = document.querySelector(".quantity-control .quantity");
      if (quantityDisplay) quantityDisplay.textContent = qty;
    }
  }

  // Számláló logika: plusz és mínusz gombok
  if (document.querySelector(".quantity-control")) {
    let minusBtn = document.querySelector(".quantity-control .minus-btn");
    let plusBtn = document.querySelector(".quantity-control .plus-btn");
    let quantityDisplay = document.querySelector(".quantity-control .quantity");
    let qty = parseInt(localStorage.getItem("reservationQuantity")) || 1;
    minusBtn.addEventListener("click", function () {
      if (qty > 0) {
        qty--;
        quantityDisplay.textContent = qty;
        localStorage.setItem("reservationQuantity", qty);
        if (qty === 0) {
          localStorage.removeItem("selectedCar");
          localStorage.removeItem("reservationQuantity");
          localStorage.removeItem("reservationConfirmed");
          if (document.querySelector(".car-info"))
            document.querySelector(".car-info").innerHTML = "<h3>Nincs autó lefoglalva.</h3>";
        }
      }
    });
    plusBtn.addEventListener("click", function () {
      qty++;
      quantityDisplay.textContent = qty;
      localStorage.setItem("reservationQuantity", qty);
    });
  }

  // Alsó bal oldali alert megjelenítése
  function showBottomLeftAlert(message) {
    let alertDiv = document.createElement("div");
    alertDiv.className = "bottom-alert";
    alertDiv.innerHTML = `<span>${message}</span> <button class="close-alert">OK</button>`;
    document.body.appendChild(alertDiv);
    alertDiv.querySelector(".close-alert").addEventListener("click", function () {
      alertDiv.remove();
    });
  }
});

// Regisztráció validáció
function validateRegistration() {
  let valid = true;
  let usernameInput = document.getElementById("username");
  let registerEmailInput = document.getElementById("register-email");
  let registerPasswordInput = document.getElementById("register-password");
  let personalIdInput = document.getElementById("personal-id");
  let usernameError = usernameInput.parentNode.querySelector("p") || (function () {
    let el = document.createElement("p");
    el.style.color = "red";
    el.style.fontSize = "14px";
    usernameInput.parentNode.appendChild(el);
    return el;
  })();
  let registerEmailError = registerEmailInput.parentNode.querySelector("p") || (function () {
    let el = document.createElement("p");
    el.style.color = "red";
    el.style.fontSize = "14px";
    registerEmailInput.parentNode.appendChild(el);
    return el;
  })();
  let registerPasswordError = registerPasswordInput.parentNode.querySelector("p") || (function () {
    let el = document.createElement("p");
    el.style.color = "red";
    el.style.fontSize = "14px";
    registerPasswordInput.parentNode.appendChild(el);
    return el;
  })();
  let personalIdError = personalIdInput.parentNode.querySelector("p") || (function () {
    let el = document.createElement("p");
    el.style.color = "red";
    el.style.fontSize = "14px";
    personalIdInput.parentNode.appendChild(el);
    return el;
  })();

  if (usernameInput.value.trim() === "") {
    usernameError.textContent = "Felhasználónév megadása kötelező!";
    valid = false;
  } else {
    usernameError.textContent = "";
  }
  if (registerEmailInput.value.trim() === "") {
    registerEmailError.textContent = "Email megadása kötelező!";
    valid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(registerEmailInput.value.trim())) {
    registerEmailError.textContent = "Érvénytelen email!";
    valid = false;
  } else {
    registerEmailError.textContent = "";
  }
  if (registerPasswordInput.value.trim() === "") {
    registerPasswordError.textContent = "Jelszó megadása kötelező!";
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
  document.querySelector(".register-create-account-btn").disabled = !valid;
  return valid;
}
