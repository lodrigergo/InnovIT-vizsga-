document.addEventListener("DOMContentLoaded", function () {
  // "Felhasználók betöltése" gomb eseménykezelője
  const loadUsersBtn = document.getElementById("load-users-btn");
  loadUsersBtn.addEventListener("click", loadUsers);

  // Delegált eseménykezelés a #users-table tbody részében a törlés gombokra
  const tbody = document.querySelector("#users-table tbody");
  tbody.addEventListener("click", function (event) {
    if (event.target && event.target.classList.contains("delete-btn")) {
      const userId = event.target.getAttribute("data-id");
      if (confirm("Biztosan törli a felhasználót?")) {
        deleteUser(userId);
      }
    }
  });
});

/**
 * Lekéri az összes felhasználót a backend végpontról,
 * majd frissíti a táblázatot.
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
      // Ellenőrizzük, hogy a statusCode 200, azaz sikeres a lekérdezés
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
 * A kapott felhasználó adatokat megjeleníti a #users-table tbody részében.
 * @param {Array} usersArray - A backendből kapott felhasználók tömbje.
 */
function populateUsersTable(usersArray) {
  const tbody = document.querySelector("#users-table tbody");
  tbody.innerHTML = ""; // Korábbi sorok törlése

  usersArray.forEach((user) => {
    const tr = document.createElement("tr");

    // Az "isAdmin" érték alapján jelenítjük meg a szerepet (Admin/User)
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
document.addEventListener("DOMContentLoaded", function () {
  // Az "Autók betöltése" gomb lekérése
  const loadCarsBtn = document.getElementById("load-cars-btn");
  loadCarsBtn.addEventListener("click", loadCars);
});

/**
 * Lekéri az összes autót a backend végpontról,
 * majd meghívja a táblázat frissítését.
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
 * A kapott autó adatokat megjeleníti a #cars-table tbody részében.
 * @param {Array} carsArray - A backendből kapott autók tömbje.
 */
function populateCarsTable(carsArray) {
  const tbody = document.querySelector("#cars-table tbody");
  tbody.innerHTML = "";

  carsArray.forEach((car) => {
    const tr = document.createElement("tr");

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
        <td><img src="${car.image}" alt="Car Image" style="width:100px;"/></td>
        <td>
            <button class="edit-btn" data-id="${car.id}">Szerkesztés</button>
            <button class="delete-btn" data-id="${car.id}">Törlés</button>
        </td>
      `;
    tbody.appendChild(tr);
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
