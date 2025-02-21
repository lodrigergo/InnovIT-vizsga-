document.addEventListener("DOMContentLoaded", function () {
  function createErrorElement(input) {
    const error = document.createElement("p");
    error.style.color = "red";
    error.style.fontSize = "14px";
    input.parentNode.appendChild(error);
    return error;
  }

  const overlay = document.getElementById("overlay");
  const loginPanel = document.getElementById("login-panel");
  const registerPanel = document.getElementById("register-panel");
  const profilePanel = document.getElementById("profile-panel");

  function closeAllPanels() {
    loginPanel.classList.remove("open");
    registerPanel.classList.remove("open");
    profilePanel.classList.remove("open");
    overlay.classList.remove("show");
  }
  overlay.addEventListener("click", closeAllPanels);

  function setupLogin() {
    const loginBtn = document.querySelector(".login-btn");
    const closeLoginPanel = document.getElementById("close-login-panel");
    const loginSubmitBtn = loginPanel.querySelector(".login-btn");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");

    const emailError = createErrorElement(emailInput);
    const passwordError = createErrorElement(passwordInput);

    loginBtn.addEventListener("click", function () {
      loginPanel.classList.add("open");
      overlay.classList.add("show");
    });

    closeLoginPanel.addEventListener("click", closeAllPanels);

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

          const usernameDisplay = profilePanel.querySelector("h2");
          usernameDisplay.textContent = data.result.name;
          closeAllPanels();

          loginBtn.style.display = "none";
          const profileIcon = document.getElementById("profile-icon");
          profileIcon.style.display = "block";

          const profileImageKey = "profileImage_" + data.result.name;
          const savedImage = localStorage.getItem(profileImageKey);
          if (savedImage) {
            const profileImageElement =
              profilePanel.querySelector(".profile-image");
            if (profileImageElement) {
              profileImageElement.src = savedImage;
            }
            profileIcon.src = savedImage;
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
  }
  setupLogin();

  function setupProfile() {
    const profileIcon = document.getElementById("profile-icon");
    const closeProfilePanel = document.getElementById("close-profile-panel");

    profileIcon.addEventListener("click", function () {
      profilePanel.classList.add("open");
      overlay.classList.add("show");
    });

    closeProfilePanel.addEventListener("click", function () {
      profilePanel.classList.remove("open");
      overlay.classList.remove("show");
    });

    const logoutBtn = document.querySelector(".logout-btn");
    logoutBtn.addEventListener("click", function () {
      localStorage.removeItem("jwt");
      localStorage.removeItem("username");
      closeAllPanels();
      const loginBtn = document.querySelector(".login-btn");
      loginBtn.style.display = "block";
      profileIcon.style.display = "none";
      alert("Sikeresen kijelentkeztél.");
    });

    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      const usernameDisplay = profilePanel.querySelector("h2");
      usernameDisplay.textContent = storedUsername;
      const loginBtn = document.querySelector(".login-btn");
      loginBtn.style.display = "none";
      profileIcon.style.display = "block";
      const profileImageKey = "profileImage_" + storedUsername;
      const savedImage = localStorage.getItem(profileImageKey);
      if (savedImage) {
        const profileImageElement =
          profilePanel.querySelector(".profile-image");
        if (profileImageElement) {
          profileImageElement.src = savedImage;
        }
        profileIcon.src = savedImage;
      }
    }
  }
  setupProfile();

  function setupRegistration() {
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

    const usernameInput = document.getElementById("username");
    const registerEmailInput = document.getElementById("register-email");
    const registerPasswordInput = document.getElementById("register-password");
    const personalIdInput = document.getElementById("personal-id");

    const usernameError = createErrorElement(usernameInput);
    const registerEmailError = createErrorElement(registerEmailInput);
    const registerPasswordError = createErrorElement(registerPasswordInput);
    const personalIdError = createErrorElement(personalIdInput);

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
  }
  setupRegistration();

  function setupProfileImageSelection() {
    document.querySelectorAll(".profile-option").forEach((option) => {
      option.addEventListener("click", function () {
        const selectedImage = this.getAttribute("data-image");
        const profileImageElement =
          profilePanel.querySelector(".profile-image");
        if (profileImageElement) {
          profileImageElement.src = selectedImage;
        }
        const profileIcon = document.getElementById("profile-icon");
        if (profileIcon) {
          profileIcon.src = selectedImage;
        }
        const currentUser = localStorage.getItem("username");
        if (currentUser) {
          localStorage.setItem("profileImage_" + currentUser, selectedImage);
        }
      });
    });
  }
  setupProfileImageSelection();

  function showLoader() {
    const loaderOverlay = document.getElementById("loader-overlay");
    loaderOverlay.style.display = "flex";
    setTimeout(() => {
      loaderOverlay.style.display = "none";
    }, 1500);
  }
});

// Filter szűrési logika
function filterCars() {
  // Összegyűjtjük a kiválasztott filtereket csoportonként
  const filterGroups = document.querySelectorAll(".sidebar .filter-group");
  let selectedFilters = {
    brand: [],
    persons: [],
    price: [],
    year: [],
    fuel: [],
  };

  filterGroups.forEach((group) => {
    const groupName = group.querySelector("h3").textContent.toLowerCase();
    const checkedValues = Array.from(
      group.querySelectorAll('input[type="checkbox"]:checked')
    ).map((cb) => cb.id);

    if (groupName.includes("brand")) {
      selectedFilters.brand = checkedValues;
    } else if (groupName.includes("persons")) {
      selectedFilters.persons = checkedValues;
    } else if (groupName.includes("price")) {
      selectedFilters.price = checkedValues;
    } else if (groupName.includes("year")) {
      selectedFilters.year = checkedValues;
    } else if (groupName.includes("fuel")) {
      selectedFilters.fuel = checkedValues;
    }
  });

  // Minden autó kártya végigellenőrzése
  const carCards = document.querySelectorAll(".car-card");
  carCards.forEach((card) => {
    const titleText = card.querySelector("h3").textContent.trim();
    // Brand: feltételezzük, hogy a cím első szava a márka
    const brand = titleText.split(" ")[0];
    // Year: keresünk egy 4 számjegyű számot
    const yearMatch = titleText.match(/\b(20\d{2})\b/);
    const year = yearMatch ? yearMatch[0] : "";
    // Fuel: feltételezzük, hogy a cím utolsó szava a fuel típus
    const fuel = titleText.split(" ").pop();

    // Persons: keresünk olyan elemet, amely tartalmazza a "fa-user" ikont
    let persons = "";
    const detailsDivs = card.querySelectorAll(".details div");
    detailsDivs.forEach((div) => {
      if (div.innerHTML.includes("fa-user")) {
        persons = div.textContent.trim();
      }
    });

    // Price: a .price elem szövegéből vesszük az ár számot
    const priceText = card.querySelector(".price").textContent;
    const priceMatch = priceText.match(/\d+/);
    const price = priceMatch ? parseInt(priceMatch[0]) : 0;

    // Alapfeltétel: az autó látszani fog, ha minden filternek megfelel
    let visible = true;

    // Brand szűrés: ha van bejelölt márka, akkor a kártya márkája benne kell legyen
    if (
      selectedFilters.brand.length > 0 &&
      !selectedFilters.brand.includes(brand)
    ) {
      visible = false;
    }

    // Persons szűrés
    if (
      selectedFilters.persons.length > 0 &&
      !selectedFilters.persons.includes(persons)
    ) {
      visible = false;
    }

    // Year szűrés
    if (
      selectedFilters.year.length > 0 &&
      !selectedFilters.year.includes(year)
    ) {
      visible = false;
    }

    // Fuel szűrés
    if (
      selectedFilters.fuel.length > 0 &&
      !selectedFilters.fuel.includes(fuel)
    ) {
      visible = false;
    }

    // Price szűrés: itt minden bejelölt ár tartomány közül legalább egynek meg kell felelnie
    if (selectedFilters.price.length > 0) {
      let matchPrice = false;
      selectedFilters.price.forEach((range) => {
        // Az id például: "10€-30€" – ebből a minimumot és maximumot vesszük ki
        const numbers = range.split("€-");
        if (numbers.length === 2) {
          const min = parseInt(numbers[0]);
          const max = parseInt(numbers[1].replace("€", ""));
          if (price >= min && price <= max) {
            matchPrice = true;
          }
        }
      });
      if (!matchPrice) {
        visible = false;
      }
    }

    // Végül a kártya láthatóságát beállítjuk
    card.style.display = visible ? "block" : "none";
  });
}

// Loader effekt a filterek alkalmazása előtt
function applyFiltersWithLoader() {
  const loaderOverlay = document.getElementById("loader-overlay");
  loaderOverlay.style.display = "flex";

  setTimeout(() => {
    filterCars();
    loaderOverlay.style.display = "none";
  }, 300);
}

// Eseményfigyelők minden filter checkbox-hoz
const filterCheckboxes = document.querySelectorAll(
  '.sidebar input[type="checkbox"]'
);
filterCheckboxes.forEach((checkbox) => {
  // Eredeti filterCars() helyett az új applyFiltersWithLoader()-t hívjuk
  checkbox.addEventListener("change", applyFiltersWithLoader);
});

// Reset gomb kezelése: törli a bejelöléseket, majd újraszűri a kártyákat a loader effekt segítségével
document.querySelector(".reset-filters-btn").addEventListener("click", () => {
  filterCheckboxes.forEach((checkbox) => {
    checkbox.checked = false;
  });
  applyFiltersWithLoader();
});

// Globális változó, ami tárolja a jelenleg kinyitott kártyát (ha van)
let currentlyExpandedCard = null;

// Segédfüggvény a kártya bezárásához
function collapseCard(card) {
  if (!card) return;
  const detailsPanel = card.querySelector(".details-panel");
  detailsPanel.classList.remove("active");
  card.classList.remove("expanded");
  // A "Check out our car" gomb újra láthatóvá tétele
  const detailsBtn = card.querySelector(".details-btn");
  if (detailsBtn) {
    detailsBtn.style.display = "block";
  }
}

// Eseményfigyelő a "Check out our car" gombokhoz
document.querySelectorAll(".details-btn").forEach((button) => {
  button.addEventListener("click", function (e) {
    e.stopPropagation(); // Megakadályozza, hogy a globális click esemény azonnal bezárja a kártyát

    const card = this.closest(".car-card");

    // Ha már van kinyitott kártya, és az nem ez, bezárjuk az előzőt
    if (currentlyExpandedCard && currentlyExpandedCard !== card) {
      collapseCard(currentlyExpandedCard);
    }

    // Toggle: ha már kinyitva van, akkor bezárjuk, ellenkező esetben kinyitjuk
    if (card.classList.contains("expanded")) {
      collapseCard(card);
      currentlyExpandedCard = null;
    } else {
      const detailsPanel = card.querySelector(".details-panel");
      detailsPanel.classList.add("active");
      card.classList.add("expanded");
      this.style.display = "none";
      currentlyExpandedCard = card;
    }
  });
});

// Globális eseményfigyelő: ha bárhová kattintanak az oldalon, ami nem az aktuális kinyitott kártyán belül van, akkor bezárjuk azt
document.addEventListener("click", function (e) {
  if (currentlyExpandedCard && !currentlyExpandedCard.contains(e.target)) {
    collapseCard(currentlyExpandedCard);
    currentlyExpandedCard = null;
  }
});
