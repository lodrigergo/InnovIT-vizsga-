document.addEventListener("DOMContentLoaded", function () {
  // LOGIN PANEL és kapcsolódó változók
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

  // REGISZTRÁCIÓ PANEL és kapcsolódó változók
  const registerPanel = document.getElementById("register-panel");
  const closeRegisterPanel = document.getElementById("close-register-panel");
  const createAccountBtn = document.querySelector(".create-account-btn");
  const backToLoginBtn = document.querySelector(".register-panel .login-btn");

  // Hibauzenetek létrehozása
  function createErrorElement(input) {
    const error = document.createElement("p");
    error.style.color = "red";
    error.style.fontSize = "14px";
    input.parentNode.appendChild(error);
    return error;
  }

  // Login panel hibaelemei
  const emailError = createErrorElement(emailInput);
  const passwordError = createErrorElement(passwordInput);

  // Regisztrációs panel elemei és hibaelemei
  const usernameInput = document.getElementById("username");
  const registerEmailInput = document.getElementById("register-email");
  const registerPasswordInput = document.getElementById("register-password");
  const personalIdInput = document.getElementById("personal-id");

  const usernameError = createErrorElement(usernameInput);
  const registerEmailError = createErrorElement(registerEmailInput);
  const registerPasswordError = createErrorElement(registerPasswordInput);
  const personalIdError = createErrorElement(personalIdInput);

  // PANEL KEZELÉS (megnyitás, bezárás)
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

  // Navigáció a login és regisztrációs panelekkel
  createAccountBtn.addEventListener("click", function () {
    loginPanel.classList.remove("open");
    registerPanel.classList.add("open");
  });

  backToLoginBtn.addEventListener("click", function () {
    registerPanel.classList.remove("open");
    loginPanel.classList.add("open");
  });

  // LOGIN VALIDÁCIÓ ÉS API HÍVÁS
  loginSubmitBtn.addEventListener("click", async function (event) {
    event.preventDefault();

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    // Egyszerű validáció
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
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();

      if (response.ok && data.status === "success") {
        localStorage.setItem("jwt", data.result.jwt);
        localStorage.setItem("username", data.result.name);

        // Frissítjük a profil panel felhasználó nevét
        usernameDisplay.textContent = data.result.name;

        closeAllPanels();
        loginBtn.style.display = "none";
        profileIcon.style.display = "block";

        // Elmentett profilkép betöltése, ha létezik
        const profileImageKey = "profileImage_" + data.result.name;
        const savedImage = localStorage.getItem(profileImageKey);
        if (savedImage) {
          document.getElementById("profile-image").src = savedImage;
          document.getElementById("profile-icon").src = savedImage;
        }

        // Sikeres bejelentkezés alert
        alert("Üdvözöllek, " + data.result.name + "!");

        // Loader megjelenítése 1,5 másodpercig
        showLoader();
      } else {
        passwordError.textContent = "Hibás email vagy jelszó!";
      }
    } catch (error) {
      console.error("Hiba a bejelentkezés során:", error);
      passwordError.textContent = "Hálózati hiba történt!";
    }
  });

  // Loader megjelenítése
  function showLoader() {
    const loaderOverlay = document.getElementById("loader-overlay");
    loaderOverlay.style.display = "flex"; // megjelenítjük az overlay-t (flex, hogy a spinner középre kerüljön)
    setTimeout(() => {
      loaderOverlay.style.display = "none";
    }, 1500);
  }

  // Logout: töröljük a token és felhasználónév adatait, de megőrizzük a profilkép beállítást
  logoutBtn.addEventListener("click", function () {
    localStorage.removeItem("jwt");
    localStorage.removeItem("username");
    // A profilkép kulcsát nem töröljük, így új bejelentkezéskor megmarad a választott kép.

    closeAllPanels();

    loginBtn.style.display = "block";
    profileIcon.style.display = "none";

    alert("Sikeresen kijelentkeztél.");
  });

  // Ha a felhasználó már be van jelentkezve, betöltjük a mentett adatokat
  const storedUsername = localStorage.getItem("username");
  if (storedUsername) {
    usernameDisplay.textContent = storedUsername;
    loginBtn.style.display = "none";
    profileIcon.style.display = "block";

    // Mentett profilkép betöltése
    const profileImageKey = "profileImage_" + storedUsername;
    const savedImage = localStorage.getItem(profileImageKey);
    if (savedImage) {
      document.getElementById("profile-image").src = savedImage;
      document.getElementById("profile-icon").src = savedImage;
    }
  }

  // REGISZTRÁCIÓ VALIDÁCIÓ ÉS API HÍVÁS
  const registerSubmitBtn = document.querySelector(
    ".register-create-account-btn"
  );

  // "Touched" objektum a mezők validálásához
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

    // Username validáció
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

    // Email validáció
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

    // Jelszó validáció
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

    // Personal-ID validáció
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
          headers: {
            "Content-Type": "application/json",
          },
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

  // Profilkép kiválasztás: előre definiált képek eseménykezelője
  document.querySelectorAll(".profile-option").forEach((option) => {
    option.addEventListener("click", function () {
      const selectedImage = this.getAttribute("data-image");
      // Frissítjük a profil panel és a navbar képeit
      document.getElementById("profile-image").src = selectedImage;
      document.getElementById("profile-icon").src = selectedImage;
      // Elmentjük a választást, ha be van jelentkezve a felhasználó
      const currentUser = localStorage.getItem("username");
      if (currentUser) {
        localStorage.setItem("profileImage_" + currentUser, selectedImage);
      }
    });
  });
});

const checkoutButtons = document.querySelectorAll(".flip-card-back button");
checkoutButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    const targetId = this.getAttribute("data-target");
    // Átirányítunk a cars.html oldalra a hash hozzáfűzésével
    window.location.href = "./Carsoldal/cars.html#" + targetId;
  });
});

document.addEventListener("DOMContentLoaded", function () {
  // Végigmegyünk minden feature item-en
  const featureItems = document.querySelectorAll(".feature-item");

  featureItems.forEach(function (item) {
    const moreInfoButton = item.querySelector(".more-info");
    const infoBox = item.querySelector(".info-box");

    if (moreInfoButton && infoBox) {
      // "More Info" gomb kattintására
      moreInfoButton.addEventListener("click", function (e) {
        e.preventDefault();
        // Megakadályozzuk, hogy az esemény továbbterjedjen a dokumentum click eseményéhez
        e.stopPropagation();

        // Bezárjuk az összes aktív infó dobozt (csak egy lehet egyszerre)
        document
          .querySelectorAll(".info-box.active")
          .forEach(function (openBox) {
            if (openBox !== infoBox) {
              openBox.classList.remove("active");
              const siblingButton =
                openBox.parentElement.querySelector(".more-info");
              if (siblingButton) {
                siblingButton.style.display = "inline-block";
              }
            }
          });

        // Megnyitjuk a kiválasztott infó dobozt és elrejtjük a gombot
        infoBox.classList.add("active");
        moreInfoButton.style.display = "none";
      });
    }
  });

  // Globális kattintás: ha a felhasználó bárhová kattint az oldalon (nem az infó dobozra vagy a "More Info" gombra),
  // akkor az aktív panel bezárul
  document.addEventListener("click", function (e) {
    if (!e.target.closest(".info-box") && !e.target.closest(".more-info")) {
      document
        .querySelectorAll(".info-box.active")
        .forEach(function (activeBox) {
          activeBox.classList.remove("active");
          const siblingButton =
            activeBox.parentElement.querySelector(".more-info");
          if (siblingButton) {
            siblingButton.style.display = "inline-block";
          }
        });
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const searchForm = document.querySelector(".search-box form");

  searchForm.addEventListener("submit", function (e) {
    e.preventDefault(); // Megakadályozzuk az űrlap alapértelmezett elküldését

    // Lekérjük a felhasználó által megadott dátumokat
    const pickupDateInput = document.getElementById("pickup-date").value;
    const dropoffDateInput = document.getElementById("dropoff-date").value;

    if (!pickupDateInput || !dropoffDateInput) {
      alert("Kérlek add meg mind a felvétel, mind a leadás dátumát!");
      return;
    }

    // Az időpontokhoz hozzáadjuk a " 00:00:00" részt
    const pickupDate = encodeURIComponent(pickupDateInput + " 00:00:00");
    const returnDate = encodeURIComponent(dropoffDateInput + " 00:00:00");

    // A megadott URL a BookingsController végponthoz
    const url = `http://127.0.0.1:8080/InnovIT_vizsga-1.0-SNAPSHOT/webresources/BookingsController/searchCarsBetweenDates?pickupDate=${pickupDate}&returnDate=${returnDate}`;

    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error("Hálózati hiba: " + response.status);
        }
        return response.json();
      })
      .then(data => {
        // Eredmények megjelenítése
        displaySearchResults(data);
      })
      .catch(error => {
        console.error("Hiba a keresési eredmények lekérésekor:", error);
        alert("Hiba történt a keresés során!");
      });
  });
});

// Eredmények megjelenítése egy dinamikusan létrehozott konténerben
function displaySearchResults(results) {
  let resultsContainer = document.getElementById("search-results");
  if (!resultsContainer) {
    resultsContainer = document.createElement("div");
    resultsContainer.id = "search-results";
    resultsContainer.style.marginTop = "20px";
    // A hero-content elem alá helyezzük el az eredményeket
    const heroContent = document.querySelector(".hero-content");
    heroContent.appendChild(resultsContainer);
  }
  
  resultsContainer.innerHTML = "";

  // Ha nincs találat, értesítjük a felhasználót
  if (results.length === 0) {
    resultsContainer.innerHTML = "<p>Nincs elérhető autó a megadott időpontok között.</p>";
    return;
  }

  // Rácsos konténer a kártyákhoz
  const gridContainer = document.createElement("div");
  gridContainer.className = "search-results-container";

  results.forEach(car => {
    const card = document.createElement("div");
    card.className = "search-result-card";

    // Kártya címe: márka és típus (kattintható)
    const carTitle = document.createElement("h3");
    carTitle.textContent = `${car.brand} ${car.model}`;
    carTitle.style.cursor = "pointer"; // mutatja, hogy kattintható

    // Kattintásra átirányít a Cars oldalra (pl. hash-ben átadva az autó ID-t)
    carTitle.addEventListener("click", function () {
      window.location.href = "./Carsoldal/cars.html#" + car.car_id;
    });

    // Autó azonosító
    const carId = document.createElement("p");
    carId.innerHTML = `<strong>ID:</strong> ${car.car_id}`;

    // Felvétel dátuma
    const pickupDate = document.createElement("p");
    pickupDate.innerHTML = `<strong>Felvétel:</strong> ${car.pickup_date}`;

    // Leadás dátuma
    const returnDate = document.createElement("p");
    returnDate.innerHTML = `<strong>Leadás:</strong> ${car.return_date}`;

    // Kártya tartalmának összeállítása
    card.appendChild(carTitle);
    card.appendChild(carId);
    card.appendChild(pickupDate);
    card.appendChild(returnDate);

    gridContainer.appendChild(card);
  });

  resultsContainer.appendChild(gridContainer);
}

