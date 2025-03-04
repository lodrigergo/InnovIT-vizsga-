document.addEventListener("DOMContentLoaded", function () {
  // FELHASZNÁLÓK KEZELÉSE
  // "Felhasználók betöltése" gomb eseménykezelője
  const loadUsersBtn = document.getElementById("load-users-btn");
  if (loadUsersBtn) {
    loadUsersBtn.addEventListener("click", loadUsers);
  }

  // Delegált eseménykezelés a #users-table tbody részében a törlés gombokra
  const usersTbody = document.querySelector("#users-table tbody");
  if (usersTbody) {
    usersTbody.addEventListener("click", function (event) {
      if (event.target && event.target.classList.contains("delete-btn")) {
        const userId = event.target.getAttribute("data-id");
        if (confirm("Biztosan törli a felhasználót?")) {
          deleteUser(userId);
        }
      }
    });
  }

  // AUTÓK KEZELÉSE
  // "Autók betöltése" gomb eseménykezelője
  const loadCarsBtn = document.getElementById("load-cars-btn");
  if (loadCarsBtn) {
    loadCarsBtn.addEventListener("click", loadCars);
  }

  // "Autó hozzáadása" gomb eseménykezelője
  const addCarBtn = document.getElementById("add-car-btn");
  if (addCarBtn) {
    addCarBtn.addEventListener("click", addCar);
  }

  // Delegált eseménykezelés a #cars-table tbody részében a törlés gombokra
  const carsTbody = document.querySelector("#cars-table tbody");
  if (carsTbody) {
    carsTbody.addEventListener("click", function (event) {
      if (event.target && event.target.classList.contains("delete-btn")) {
        const carId = event.target.getAttribute("data-id");
        if (confirm("Biztosan törli az autót?")) {
          deleteCar(carId);
        }
      }
    });
  }
});

// ------------------------
// FELHASZNÁLÓK KEZELÉSE
// ------------------------

/**
 * Lekéri az összes felhasználót a backend végpontról,
 * majd frissíti a #users-table tbody tartalmát.
 */
function loadUsers() {
  fetch(
    "http://127.0.0.1:8080/InnovIT_vizsga-1.0-SNAPSHOT/webresources/user/getAllUser",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Hálózati hiba: " + response.status);
      }
      return response.json();
    })
    .then((data) => {
      if (data.statusCode === 200) {
        populateUsersTable(data.users);
      } else {
        alert("Hiba: " + data.message);
      }
    })
    .catch((error) => {
      console.error("Hiba a felhasználók lekérésekor:", error);
      alert("Hiba történt a felhasználók lekérésekor.");
    });
}

/**
 * A backendből kapott felhasználó adatokat megjeleníti a #users-table tbody részében.
 * @param {Array} usersArray - A backendből kapott felhasználók tömbje.
 */
function populateUsersTable(usersArray) {
  const tbody = document.querySelector("#users-table tbody");
  tbody.innerHTML = ""; // Korábbi sorok törlése

  usersArray.forEach((user) => {
    const tr = document.createElement("tr");

    // Az isAdmin érték alapján jelenítjük meg a szerepet
    const role = user.isAdmin ? "Admin" : "User";

    tr.innerHTML = `
        <td>${user.id}</td>
        <td>${user.name}</td>
        <td>${user.email}</td>
        <td>${role}</td>
        <td>
          <button class="edit-btn" data-id="${user.id}">Szerkesztés</button>
          <button class="delete-btn" data-id="${user.id}">Törlés</button>
        </td>
      `;
    tbody.appendChild(tr);
  });
}

/**
 * Törli a megadott felhasználót a backend DELETE végpontjának hívásával.
 * @param {Number} id - A törlendő felhasználó ID-ja.
 */
function deleteUser(id) {
  fetch(
    "http://127.0.0.1:8080/InnovIT_vizsga-1.0-SNAPSHOT/webresources/user/deleteUserById?id=" +
      id,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Hálózati hiba: " + response.status);
      }
      return response.json();
    })
    .then((data) => {
      if (data.result === "success") {
        alert("Felhasználó törölve!");
        loadUsers();
      } else {
        alert("Hiba történt a törlés során.");
      }
    })
    .catch((error) => {
      console.error("Error deleting user:", error);
      alert("Hiba történt a felhasználó törlésekor.");
    });
}

// ------------------------
// AUTÓK KEZELÉSE
// ------------------------

/**
 * Lekéri az összes autót a backend végpontról,
 * majd frissíti a #cars-table tbody tartalmát.
 */
function loadCars() {
  fetch(
    "http://127.0.0.1:8080/InnovIT_vizsga-1.0-SNAPSHOT/webresources/car/getAllCar",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Hálózati hiba: " + response.status);
      }
      return response.json();
    })
    .then((data) => {
      if (data.statusCode === 200) {
        populateCarsTable(data.cars);
      } else {
        alert("Hiba: " + data.message);
      }
    })
    .catch((error) => {
      console.error("Hiba az autók lekérésekor:", error);
      alert("Hiba történt az autók lekérésekor.");
    });
}

/**
 * A backendből kapott autó adatokat megjeleníti a #cars-table tbody részében.
 * @param {Array} carsArray - A backendből kapott autók tömbje.
 */
function populateCarsTable(carsArray) {
  const tbody = document.querySelector("#cars-table tbody");
  tbody.innerHTML = ""; // Korábbi sorok törlése

  carsArray.forEach((car) => {
    const tr = document.createElement("tr");

    // Feltételezzük, hogy a képek a "webresources/images/" mappában vannak
    const imageUrl = `http://127.0.0.1:8080/InnovIT_vizsga-1.0-SNAPSHOT/webresources/images/${car.image}`;

    tr.innerHTML = `
        <td>${car.id}</td>
        <td>${car.brand}</td>
        <td>${car.model}</td>
        <td>${car.licensePlate}</td>
        <td>${car.year}</td>
        <td>${car.fuelType}</td>
        <td>${car.pricePerDay}</td>
        <td>${car.transmission}</td>
        <td>${car.doors}</td>
        <td>${car.AC}</td>
        <td>${car.seats}</td>
        <td><img src="${imageUrl}" alt="Car Image" style="width:100px;"/></td>
        <td>
          <button class="edit-btn" data-id="${car.id}">Szerkesztés</button>
          <button class="delete-btn" data-id="${car.id}">Törlés</button>
        </td>
      `;
    tbody.appendChild(tr);
  });
}

/**
 * Összegyűjti az autó hozzáadás űrlap adatait és elküldi a backend addCar végpontjára.
 * Ha a kérés sikeres, újratölti az autók listáját.
 */
function addCar() {
  const brand = document.getElementById("car-brand").value;
  const model = document.getElementById("car-model").value;
  const licensePlate = document.getElementById("car-licensePlate").value;
  const year = parseInt(document.getElementById("car-year").value);
  const fuelType = document.getElementById("car-fuelType").value;
  const pricePerDay = parseFloat(document.getElementById("car-price").value);
  const transmission = document.getElementById("car-transmission").value;
  const doors = parseInt(document.getElementById("car-doors").value);
  const ac = document.getElementById("car-ac").checked;
  const seats = parseInt(document.getElementById("car-seat").value);
  const image = document.getElementById("car-image").value;

  // Összeállítjuk a JSON objektumot a backend által elvárt kulcsokkal
  const carData = {
    brand: brand,
    model: model,
    licensePlate: licensePlate,
    year: year,
    fuelType: fuelType,
    pricePerDay: pricePerDay,
    transmission: transmission,
    doors: doors,
    ac: ac,
    seats: seats,
    image: image,
  };

  console.log("Elküldendő autó adatok:", JSON.stringify(carData));

  fetch("http://127.0.0.1:8080/InnovIT_vizsga-1.0-SNAPSHOT/webresources/car/addCar", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(carData),
  })
    .then((response) => {
      if (!response.ok) {
        return response.json().then((errorData) => {
          console.error("Backend hiba:", errorData);
          throw new Error("Hálózati hiba: " + response.status);
        });
      }
      return response.json();
    })
    .then((data) => {
      if (data.status && data.status === "success") {
        alert("Autó sikeresen hozzáadva!");
        loadCars(); // frissítjük az autók listáját
      } else {
        alert("Hiba: " + (data.errorMessage || data.status));
      }
    })
    .catch((error) => {
      console.error("Hiba az autó hozzáadásakor:", error);
      alert("Hiba történt az autó hozzáadásakor.");
    });
}



/**
 * Törli a megadott autót a backend DELETE végpontjának hívásával.
 * @param {Number} id - A törlendő autó ID-ja.
 */
function deleteCar(id) {
  fetch(
    "http://127.0.0.1:8080/InnovIT_vizsga-1.0-SNAPSHOT/webresources/car/deleteCarById?id=" +
      id,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Hálózati hiba: " + response.status);
      }
      return response.json();
    })
    .then((data) => {
      if (data.result === "success") {
        alert("Autó törölve!");
        loadCars();
      } else {
        alert("Hiba történt a törlés során.");
      }
    })
    .catch((error) => {
      console.error("Error deleting car:", error);
      alert("Hiba történt az autó törlésekor.");
    });
}

// Új függvény az autó szerkesztéséhez
function editCar(carId) {
  if (confirm("Biztosan frissíteni szeretné az autót?")) {
    // A prompt-ok segítségével kérjük be az új adatokat
    const newBrand = prompt("Adja meg az új márkát:");
    const newModel = prompt("Adja meg az új típust:");
    const newLicensePlate = prompt("Adja meg az új rendszámot:");
    const newYear = parseInt(prompt("Adja meg az új évet:"));
    const newFuelType = prompt("Adja meg az új üzemanyagot:");
    const newPricePerDay = parseFloat(prompt("Adja meg az új napidíjat:"));
    const newTransmission = prompt("Adja meg az új váltót:");
    const newDoors = parseInt(prompt("Adja meg az új ajtók számát:"));
    const newAc = confirm("Van-e AC? (OK = Igen, Cancel = Nem)");
    const newSeats = parseInt(prompt("Adja meg az új ülések számát:"));
    const newImage = prompt("Adja meg az új kép URL-t:");

    // Összeállítjuk az új adatokat egy JSON objektumba
    const updatedCarData = {
      brand: newBrand,
      model: newModel,
      licensePlate: newLicensePlate,
      year: newYear,
      fuelType: newFuelType,
      pricePerDay: newPricePerDay,
      transmission: newTransmission,
      doors: newDoors,
      ac: newAc,
      seats: newSeats,
      image: newImage
    };

    // API kérés a PUT metódussal
    fetch(`http://127.0.0.1:8080/InnovIT_vizsga-1.0-SNAPSHOT/webresources/car/updateCarById?id=${carId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updatedCarData)
    })
      .then(response => response.json())
      .then(data => {
        if (data.status === "success") {
          alert("Autó frissítve!");
          loadCars(); // Frissítjük az autók listáját
        } else {
          alert("Hiba történt a frissítés során: " + (data.errorMessage || data.status));
        }
      })
      .catch(error => {
        console.error("Frissítési hiba:", error);
        alert("Hiba történt az autó frissítésekor.");
      });
  }
}

// Az "edit-btn" eseménykezelő hozzárendelése a táblázathoz
const carsTbody = document.querySelector("#cars-table tbody");
if (carsTbody) {
  carsTbody.addEventListener("click", function (event) {
    if (event.target && event.target.classList.contains("edit-btn")) {
      const carId = event.target.getAttribute("data-id");
      editCar(carId);
    }
    // A törléshez használt kód itt már létezhet...
  });
}

// Új függvény a felhasználó szerkesztéséhez
function editUser(userId) {
  if (confirm("Biztosan frissíteni szeretné a felhasználót?")) {
    // Prompt-okkal bekérjük az új adatokat
    const newName = prompt("Adja meg az új nevet:");
    const newEmail = prompt("Adja meg az új email címet:");
    const newPassword = prompt("Adja meg az új jelszót:");
    const newPersonalId = prompt("Adja meg az új személyi azonosítót:");

    // Összeállítjuk az új adatokat egy JSON objektumba
    const updatedUserData = {
      name: newName,
      email: newEmail,
      password: newPassword,
      personalId: newPersonalId
    };

    // API kérés a PUT metódussal
    fetch(`http://127.0.0.1:8080/InnovIT_vizsga-1.0-SNAPSHOT/webresources/user/updateUserById?id=${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updatedUserData)
    })
      .then(response => response.json())
      .then(data => {
        if (data.status === "success") {
          alert("Felhasználó frissítve!");
          loadUsers(); // Frissítjük a felhasználók listáját
        } else {
          alert("Hiba történt a frissítés során: " + (data.errorMessage || data.status));
        }
      })
      .catch(error => {
        console.error("Frissítési hiba:", error);
        alert("Hiba történt a felhasználó frissítésekor.");
      });
  }
}

// Az "edit-btn" eseménykezelő hozzárendelése a felhasználók táblázatához
const usersTbody = document.querySelector("#users-table tbody");
if (usersTbody) {
  usersTbody.addEventListener("click", function (event) {
    if (event.target && event.target.classList.contains("edit-btn")) {
      const userId = event.target.getAttribute("data-id");
      editUser(userId);
    }
  });
}
