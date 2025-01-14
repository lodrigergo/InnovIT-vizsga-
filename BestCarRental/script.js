document.getElementById('logo').addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});


// Az oldal tetejére ugrás a Home linkre kattintva
document.getElementById('home-link').addEventListener('click', function (event) {
    event.preventDefault();
    document.getElementById('home').scrollIntoView({ behavior: 'smooth' });
});


// Az "About" link kezelése
document.querySelector('a[href="#about"]').addEventListener('click', function (event) {
    event.preventDefault(); 
    document.querySelector('#about').scrollIntoView({
        behavior: 'smooth'
    });
});


// Az összes vehicle-option kiválasztása
const vehicleOptions = document.querySelectorAll('.vehicle-option');


// Váltás a vehicle-option gombok között
vehicleOptions.forEach(option => {
    option.addEventListener('click', function() {
        vehicleOptions.forEach(opt => opt.classList.remove('active'));
        this.classList.add('active');
    });
});


// A mezők azonosítása
const locationInput = document.getElementById('location');
const pickupDateInput = document.getElementById('pickup-date');
const pickupTimeInput = document.getElementById('pickup-time');
const dropoffDateInput = document.getElementById('dropoff-date');
const dropoffTimeInput = document.getElementById('dropoff-time');


// Az események kezelése
locationInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault(); 
        pickupDateInput.focus(); 
    }
});


// További mezők eseménykezelése az Enter billentyűre
pickupDateInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        pickupTimeInput.focus(); 
    }   
});

pickupTimeInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        dropoffDateInput.focus(); 
    }
});

dropoffDateInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        dropoffTimeInput.focus(); 
    }
});


// Kiválasztjuk a szükséges elemeket
const loginBtn = document.querySelector('.login-btn'); 
const loginPanel = document.getElementById('login-panel'); 
const closeLoginPanel = document.getElementById('close-login-panel'); 


// Félrekattintás esetén a panelek bezárása
overlay.addEventListener('click', function (event) {
    if (event.target === overlay) {
        loginPanel.classList.remove('open'); 
        registerPanel.classList.remove('open'); 
        overlay.classList.remove('show'); 
    }
});


// Login panel megjelenítése
loginBtn.addEventListener('click', function () {
    loginPanel.classList.add('open');
    overlay.classList.add('show');
});


// Login panel elrejtése az X gombra kattintva
closeLoginPanel.addEventListener('click', function () {
    loginPanel.classList.remove('open'); 
    overlay.classList.remove('show'); 
});


// Kiválasztjuk az elemeket
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');


// Email validálás
emailInput.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        const emailValue = emailInput.value.trim(); 
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(emailValue)) {
            displayError(emailInput, 'Invalid email address');
        } else {
            removeError(emailInput);
            passwordInput.focus(); 
        }
    }
});


// Jelszó validálás
passwordInput.addEventListener('input', function () {
    const passwordValue = passwordInput.value;

    if (passwordValue.length < 8) {
        displayError(passwordInput, 'Password must be at least 8 characters long');
        updateButtonState(); 
    } else if (passwordValue.length > 20) {
        displayError(passwordInput, 'Password cannot exceed 20 characters');
        updateButtonState(); 
    } else {
        removeError(passwordInput);
        updateButtonState(); 
    }
});

passwordInput.addEventListener('blur', function () {
    const passwordValue = passwordInput.value;

    if (passwordValue === "") {
        removeError(passwordInput);
    } else if (passwordValue.length >= 8 && passwordValue.length <= 20) {
        removeError(passwordInput);
    } else {
        displayError(passwordInput, 'Password must be 8-20 characters long');
    }
    updateButtonState(); 
});


// Jelszó validálása input eseményre
passwordInput.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        event.preventDefault(); 
    }
});


// Hibaüzenet megjelenítése
function displayError(inputElement, message) {
    let errorElement = inputElement.nextElementSibling;

    if (!errorElement || !errorElement.classList.contains('error-message')) {
        errorElement = document.createElement('div');
        errorElement.classList.add('error-message');
        inputElement.parentElement.appendChild(errorElement);
    }

    errorElement.textContent = message; 
    errorElement.style.color = 'red';
}


// Hibaüzenet eltávolítása
function removeError(inputElement) {
    const errorElement = inputElement.nextElementSibling;

    if (errorElement && errorElement.classList.contains('error-message')) {
        errorElement.remove(); 
    }
}


// Log In gomb kiválasztása
const logInButton = document.querySelector('.btn.login-btn');
logInButton.disabled = true;
logInButton.style.opacity = '0.6'; 


// Email validálás frissítése
emailInput.addEventListener('input', function () {
    const emailValue = emailInput.value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(emailValue)) {
        displayError(emailInput, 'Invalid email address');
        updateButtonState(); 
    } else {
        removeError(emailInput);
        updateButtonState();
    }
});


// Gomb állapotának frissítése
function updateButtonState() {
    const emailValue = emailInput.value.trim();
    const passwordValue = passwordInput.value;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailPattern.test(emailValue) && passwordValue.length >= 8 && passwordValue.length <= 20) {
        loginSubmitButton.disabled = false;
        loginSubmitButton.style.opacity = '1';
    } else {
        loginSubmitButton.disabled = true;
        loginSubmitButton.style.opacity = '0.6';
    }
}



// Hibaüzenet eltávolítása gépelés közben az email mezőben
emailInput.addEventListener('input', function () {
    removeError(emailInput); 
    updateButtonState(); 
});


// Email validálás csak a mező elhagyásakor (blur esemény)
emailInput.addEventListener('blur', function () {
    const emailValue = emailInput.value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(emailValue) && emailValue.length > 0) {
        displayError(emailInput, 'Invalid email address');
    }
    updateButtonState(); 
});


// Kiválasztjuk a szükséges elemeket
const createAccountBtn = document.querySelector('.create-account-btn'); 
const registerPanel = document.getElementById('register-panel'); 
const closeRegisterPanel = document.getElementById('close-register-panel'); 


// Register panel megnyitása és Login panel bezárása
createAccountBtn.addEventListener('click', function () {
    loginPanel.classList.remove('open'); 
    registerPanel.classList.add('open'); 
});


// Register panel bezárása az × gombra kattintva
closeRegisterPanel.addEventListener('click', function () {
    registerPanel.classList.remove('open'); 
    overlay.classList.remove('show'); 
});



// Register panel Login gomb eseménykezelője
const registerLoginBtn = document.querySelector('.register-panel .login-btn');

registerLoginBtn.addEventListener('click', function () {
    registerPanel.classList.remove('open'); 
    loginPanel.classList.add('open'); 
    overlay.classList.add('show'); 
});


// Login panel Create Account gomb eseménykezelője
const loginCreateAccountBtn = document.querySelector('.login-panel .create-account-btn');
loginCreateAccountBtn.addEventListener('click', function () {
    loginPanel.classList.remove('open'); 
    registerPanel.classList.add('open'); 
    overlay.classList.add('show'); 
});


// Az elemek kiválasztása
const loginButton = document.querySelector('.login-btn'); 
const profileIcon = document.getElementById('profile-icon'); 


// Login gomb eseménykezelő
loginButton.addEventListener('click', function () {
    loginPanel.classList.add('open'); 
    document.getElementById('overlay').classList.add('show');
});



// Login panelben a bejelentkezéskor
const loginSubmitButton = document.querySelector('.btn.login-btn');
loginSubmitButton.addEventListener('click', function (event) {
    event.preventDefault(); 
    localStorage.setItem('isLoggedIn', 'true'); 
    loginPanel.classList.remove('open'); 
    overlay.classList.remove('show'); 
    loginButton.style.display = 'none'; 
    profileIcon.style.display = 'block';  
});


//A profil panel emnyitása
const profilePanel = document.getElementById('profile-panel'); 
const closeProfilePanel = document.getElementById('close-profile-panel'); 
profileIcon.addEventListener('click', function () {
    profilePanel.classList.add('open'); 
    overlay.classList.add('show');
});


// Profilpanel bezárása az '×' gombra kattintva
closeProfilePanel.addEventListener('click', function () {
    profilePanel.classList.remove('open'); 
    overlay.classList.remove('show'); 
});


// Overlay-re kattintáskor a panel bezárása
overlay.addEventListener('click', function () {
    if (profilePanel.classList.contains('open')) {
        profilePanel.classList.remove('open');
        overlay.classList.remove('show');
    }
});


// Logout gomb működésének kezelése
const logoutButton = document.querySelector('.logout-btn'); 
logoutButton.addEventListener('click', function () {
    profilePanel.classList.remove('open'); 
    overlay.classList.remove('show'); 
    profileIcon.style.display = 'none'; 
    loginButton.style.display = 'block';
});


// Bejelentkezési állapot mentése
localStorage.setItem('username', 'John Doe'); 
const username = localStorage.getItem('username'); 


// a profil panelhez való gombok és annak müködései
document.addEventListener('DOMContentLoaded', function () {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const username = localStorage.getItem('username');

    if (isLoggedIn === 'true') {
        loginButton.style.display = 'none';
        profileIcon.style.display = 'block';
        profileIcon.style.opacity = '1';
        
        // Profil panel felhasználónév frissítése
        document.querySelector('.profile-header h2').textContent = username;
    } else {
        loginButton.style.display = 'block';
        profileIcon.style.display = 'none';
    }
});

// Kiválasztjuk az elemeket
const profileImage = document.getElementById('profile-image');
const profileImageInput = document.getElementById('profile-image-input');
const uploadImageBtn = document.getElementById('upload-image-btn');

// Aktuális felhasználónév lekérése (a login vagy regisztráció során kell menteni a username-t)
const currentUsername = localStorage.getItem('username');

// Betöltéskor ellenőrizzük, van-e elmentett profilkép az aktuális felhasználóhoz
document.addEventListener('DOMContentLoaded', function () {
    if (currentUsername) {
        const savedProfileImage = localStorage.getItem(`profileImage_${currentUsername}`);
        
        if (savedProfileImage) {
            profileImage.src = savedProfileImage; 
        }
    }
});

// Gombra kattintáskor megnyitjuk a fájlválasztó ablakot
uploadImageBtn.addEventListener('click', function () {
    profileImageInput.click();
});

// Fájlválasztás után frissítjük a profilképet és elmentjük a localStorage-ba felhasználónként
profileImageInput.addEventListener('change', function (event) {
    const file = event.target.files[0]; 

    if (file) {
        const reader = new FileReader();
        
        reader.onload = function (e) {
            profileImage.src = e.target.result;
            if (currentUsername) {
                localStorage.setItem(`profileImage_${currentUsername}`, e.target.result); 
            }
        };
        
        reader.readAsDataURL(file); 
    }
});


if (loginSubmitButton && emailInput && passwordInput) {
    loginSubmitButton.addEventListener('click', function (event) {
        event.preventDefault();

        const emailValue = emailInput.value.trim();
        const passwordValue = passwordInput.value.trim();

        const loginData = { email: emailValue, password: passwordValue };

        // API hívás a bejelentkezés ellenőrzésére
        fetch('http://127.0.0.1:8080/InnovIT_vizsga-1.0-SNAPSHOT/webresources/user/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(loginData)
        })
        .then(response => {
            if (!response.ok) {
                // Ha a válasz nem OK, feldolgozzuk a hibát
                return response.json().then(errData => {
                    if (errData.message === 'Email not found') {
                        throw new Error('This email is not registered. Please check and try again.');
                    } else if (errData.message === 'Incorrect password') {
                        throw new Error('Incorrect password. Please try again.');
                    } else {
                        throw new Error('Login failed. Please try again later.');
                    }
                });
            }
            return response.json();
        })
        .then(data => {
            console.log('Login successful:', data);
            const usernameFromDB = data.name;
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('username', usernameFromDB);
            document.querySelector('.profile-header h2').textContent = usernameFromDB;
            loginPanel.classList.remove('open');
            overlay.classList.remove('show');
            loginBtn.style.display = 'none';
            profileIcon.style.display = 'block';
            alert('Successfully logged in!');
        })
        .catch(error => {
            console.error('Error:', error.message);
            displayError(emailInput, error.message);
        });
    });
}



// Profil ikonra kattintáskor a panel megnyitása
profileIcon.addEventListener('click', function () {
    profilePanel.classList.add('open'); 
    overlay.classList.add('show');
});


// Profil panel bezárása
document.getElementById('close-profile-panel').addEventListener('click', function () {
    profilePanel.classList.remove('open');
    overlay.classList.remove('show'); 
});


// Logout gomb eseménykezelő
logoutButton.addEventListener('click', function () {
    localStorage.setItem('isLoggedIn', 'false');
    profilePanel.classList.remove('open'); 
    overlay.classList.remove('show'); 
    loginButton.style.display = 'block'; 
    profileIcon.style.display = 'none'; 

    emailInput.value = "";
    passwordInput.value = "";

    removeError(emailInput);
    removeError(passwordInput);
});



// Az összes kiválaszott animált elem
const scrollElements = document.querySelectorAll('.scroll-animate');
const elementInView = (el, offset = 0) => {
    const elementTop = el.getBoundingClientRect().top;
    return elementTop <= (window.innerHeight || document.documentElement.clientHeight) - offset;
};


//Ha görgetek akkor lesz látható az animáció
const displayScrollElement = (element) => {
    element.classList.add('visible');
};


// Az animációk kezelése görgetéskor
const handleScrollAnimation = () => {
    scrollElements.forEach((el) => {
        if (elementInView(el, 150)) {
            displayScrollElement(el);
        } 
    });
};


// Görgetési esemény regisztrálása
window.addEventListener('scroll', () => {
    handleScrollAnimation();
});


// Mezők azonosítása
const registerEmail = document.getElementById('register-email');
const registerPassword = document.getElementById('register-password');
const usernameInput = document.getElementById('username');
const personalIdInput = document.getElementById('personal-id');
const registerCreateAccountButton = document.querySelector('.register-create-account-btn');

// Alapértelmezett: a "Create Account" gomb tiltva van
registerCreateAccountButton.disabled = true;
registerCreateAccountButton.style.opacity = '0.6';

// Valós idejű hibajelzésekhez hibaüzenet megjelenítése
function displayFieldError(inputElement, message) {
    let errorElement = inputElement.nextElementSibling;

    if (!errorElement || !errorElement.classList.contains('error-message')) {
        errorElement = document.createElement('div');
        errorElement.classList.add('error-message');
        inputElement.parentElement.appendChild(errorElement);
    }

    errorElement.textContent = message;
    errorElement.style.color = 'red';
}

// Hibaüzenet eltávolítása
function removeFieldError(inputElement) {
    const errorElement = inputElement.nextElementSibling;

    if (errorElement && errorElement.classList.contains('error-message')) {
        errorElement.remove();
    }
}

// Email valós idejű ellenőrzése
registerEmail.addEventListener('input', function () {
    const emailValue = registerEmail.value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(emailValue)) {
        displayFieldError(registerEmail, 'Invalid email format. Must contain "@" and "."');
    } else {
        removeFieldError(registerEmail);
    }

    updateCreateAccountButton();
});

// Jelszó valós idejű ellenőrzése
registerPassword.addEventListener('input', function () {
    const passwordValue = registerPassword.value.trim();
    const passwordPattern = /^(?=.*[A-Z])(?=.*\d).{8,20}$/;

    if (passwordValue.length < 8 || passwordValue.length > 20) {
        displayFieldError(registerPassword, 'Password must be 8-20 characters long');
    } else if (!passwordPattern.test(passwordValue)) {
        displayFieldError(registerPassword, 'Password must contain at least one uppercase letter and one number');
    } else {
        removeFieldError(registerPassword);
    }

    updateCreateAccountButton();
});

// Personal-ID valós idejű ellenőrzése
personalIdInput.addEventListener('input', function () {
    const personalIdValue = personalIdInput.value.trim();
    const personalIdPattern = /^[A-Z]{5}[0-9]{2}$/;

    if (personalIdValue.length > 7) {
        displayFieldError(personalIdInput, 'Personal-ID must be exactly 7 characters');
    } else if (!personalIdPattern.test(personalIdValue) && personalIdValue.length === 7) {
        displayFieldError(personalIdInput, 'Personal-ID must be 5 uppercase letters followed by 2 numbers');
    } else {
        removeFieldError(personalIdInput);
    }

    updateCreateAccountButton();
});

// Gomb engedélyezése csak akkor, ha minden mező megfelelő
function updateCreateAccountButton() {
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(registerEmail.value.trim());
    const passwordValid = /^(?=.*[A-Z])(?=.*\d).{8,20}$/.test(registerPassword.value.trim());
    const usernameValid = usernameInput.value.trim().length > 0;
    const personalIdValid = /^[A-Z]{5}[0-9]{2}$/.test(personalIdInput.value.trim());

    if (emailValid && passwordValid && usernameValid && personalIdValid) {
        registerCreateAccountButton.disabled = false;
        registerCreateAccountButton.style.opacity = '1';
    } else {
        registerCreateAccountButton.disabled = true;
        registerCreateAccountButton.style.opacity = '0.6';
    }
}

// Eseménykezelők a mezők változásához
registerEmail.addEventListener('input', updateCreateAccountButton);
registerPassword.addEventListener('input', updateCreateAccountButton);
usernameInput.addEventListener('input', updateCreateAccountButton);

// Regisztrációs gomb eseménykezelője
registerCreateAccountButton.addEventListener('click', function (event) {
    event.preventDefault();

    // Adatok összegyűjtése a mezőkből
    const registerData = {
        name: usernameInput.value.trim(),
        email: registerEmail.value.trim(),
        password: registerPassword.value.trim(),
        personalId: personalIdInput.value.trim()
    };

    console.log("Register data:", registerData);

    // POST kérés elküldése
    fetch('http://127.0.0.1:8080/InnovIT_vizsga-1.0-SNAPSHOT/webresources/user/registerUser', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Expect': ''
        },
        body: JSON.stringify(registerData)
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(errData => {
                throw new Error(errData.message || 'Registration failed');
            });
        }
        return response.json();
    })
    .then(data => {
        alert("Registration successful!");
        
        // Adatok mentése localStorage-ba
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('username', registerData.name);

        // Profil ikon megjelenítése, login gomb elrejtése
        loginButton.style.display = 'none';
        profileIcon.style.display = 'block';

        // Profil panel felhasználónév frissítése
        document.querySelector('.profile-header h2').textContent = registerData.name;

        // Mezők törlése
        registerEmail.value = '';
        registerPassword.value = '';
        usernameInput.value = '';
        personalIdInput.value = '';

        // Regisztrációs panel bezárása
        registerPanel.classList.remove('open');
        overlay.classList.remove('show');
    })
    .catch(error => {
        console.error('Full error:', error);
        alert('Registration failed. Check console for details.');
    });
});

