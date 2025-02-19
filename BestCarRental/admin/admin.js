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
  const year = document.getElementById("car-year").value;
  const fuelType = document.getElementById("car-fuelType").value;
  const price = parseFloat(document.getElementById("car-price").value);
  const transmission = document.getElementById("car-transmission").value;
  const doors = parseInt(document.getElementById("car-doors").value);
  const ac = document.getElementById("car-ac").checked;
  const seat = parseInt(document.getElementById("car-seat").value);
  const image = document.getElementById("car-image").value;

  // Összeállítjuk a JSON objektumot
  const carData = {
    brand: brand,
    model: model,
    licensePlate: licensePlate,
    year: year,
    fuelType: fuelType,
    price: price,
    transmission: transmission,
    doors: doors,
    AC: ac,
    seat: seat,
    image: image,
  };

  console.log("Elküldendő autó adatok:", JSON.stringify(carData));

  fetch(
    "http://127.0.0.1:8080/InnovIT_vizsga-1.0-SNAPSHOT/webresources/car/addCar",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(carData),
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
        alert("Autó sikeresen hozzáadva!");
        loadCars();
      } else {
        alert("Hiba: " + data.status);
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
