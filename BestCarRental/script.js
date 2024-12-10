// A logóra kattintva az oldal tetejére ugrik és újratölti az oldalt
document.getElementById('logo').addEventListener('click', function() {
    window.scrollTo(0, 0); 
    location.reload(); 
});


// Az oldal tetejére és újratöltésre a Home linkre kattintáskor
document.getElementById('home-link').addEventListener('click', function(event) {
    event.preventDefault(); 
    window.scrollTo(0, 0); 
    location.reload(); 
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


// Az "About" link kezelése
document.querySelector('a[href="#about"]').addEventListener('click', function (event) {
    event.preventDefault(); 
    document.querySelector('#about').scrollIntoView({
        behavior: 'smooth'
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


// Login panel elrejtése félrekattintáskor
overlay.addEventListener('click', function () {
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


// // Jelszó validálás frissítése
// passwordInput.addEventListener('input', function () {
//     const passwordValue = passwordInput.value;

//     if (passwordValue.length > 20) {
//         displayError(passwordInput, 'Password cannot exceed 20 characters');
//         updateButtonState(); 
//     } else {
//         removeError(passwordInput);
//         updateButtonState(); 
//     }
// });


// Gomb állapotának frissítése
function updateButtonState() {
    const emailValue = emailInput.value.trim();
    const passwordValue = passwordInput.value;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (passwordValue.length >= 8 && passwordValue.length <= 20) {
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


// Login panel bezárása az × gombra kattintva
closeLoginPanel.addEventListener('click', function () {
    loginPanel.classList.remove('open'); 
});


// Register panel mezők kiválasztása
const registerEmail = document.getElementById('register-email');
const registerPassword = document.getElementById('register-password');
const confirmPassword = document.getElementById('confirm-password');
const usernameInput = document.getElementById('username');
const registerCreateAccountButton = document.querySelector('.register-create-account-btn');


// Alapértelmezett: a Create Account gomb tiltva van
registerCreateAccountButton.disabled = true;
registerCreateAccountButton.style.opacity = '0.6'; 


// Register Email Validáció
registerEmail.addEventListener('blur', function () {
    const emailValue = registerEmail.value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(emailValue) && emailValue.length > 0) {
        displayError(registerEmail, 'Invalid email address'); 
    } else if (emailValue.length === 0) {
        displayError(registerEmail, 'Email is required'); 
    } else {
        removeError(registerEmail); 
    }
    updateRegisterButtonState(); 
});


// Register Password Validáció
registerPassword.addEventListener('blur', function () {
    const passwordValue = registerPassword.value;

    if (passwordValue.length === 0) {
        displayError(registerPassword, 'Password is required'); 
    } else if (passwordValue.length > 20) {
        displayError(registerPassword, 'Password cannot exceed 20 characters'); 
    } else {
        removeError(registerPassword); 
    }
    updateRegisterButtonState(); 
});


// Confirm Password Validáció
confirmPassword.addEventListener('blur', function () {
    if (confirmPassword.value !== registerPassword.value) {
        displayError(confirmPassword, 'Passwords do not match'); 
    } else {
        removeError(confirmPassword); 
    }
    updateRegisterButtonState(); 
});


// Username Validáció
usernameInput.addEventListener('blur', function () {
    const usernameValue = usernameInput.value.trim();

    if (usernameValue.length === 0) {
        displayError(usernameInput, 'Username is required');
    } else if (usernameValue.length > 20) {
        displayError(usernameInput, 'Username cannot exceed 20 characters'); 
    } else {
        removeError(usernameInput); 
    }
    updateRegisterButtonState(); 
});


// Create Account Gomb Állapotának Frissítése
function updateRegisterButtonState() {
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(registerEmail.value.trim());
    const passwordValid = registerPassword.value.length > 0 && registerPassword.value.length <= 20;
    const passwordsMatch = registerPassword.value === confirmPassword.value;
    const usernameValid = usernameInput.value.trim().length > 0 && usernameInput.value.trim().length <= 20;

    if (emailValid && passwordValid && passwordsMatch && usernameValid) {
        registerCreateAccountButton.disabled = false; 
        registerCreateAccountButton.style.opacity = '1';
    } else {
        registerCreateAccountButton.disabled = true; 
        registerCreateAccountButton.style.opacity = '0.6';
    }
}


// Hibaüzenet Kezelés
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

function removeError(inputElement) {
    const errorElement = inputElement.nextElementSibling;

    if (errorElement && errorElement.classList.contains('error-message')) {
        errorElement.remove();
    }
}


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


// Változók megadása
const comfortMoreInfo = document.querySelector('.feature-item a');
const comfortInfoPanel = document.getElementById('comfort-info-panel');


// A panel megjelenítése
comfortMoreInfo.addEventListener('mouseenter', function () {
    comfortInfoPanel.style.display = 'block';
});


// A panel elrejtése, amikor az egér elhagyja a gombot vagy a panelt
comfortMoreInfo.addEventListener('mouseleave', function () {
    comfortInfoPanel.style.display = 'none';
});
comfortInfoPanel.addEventListener('mouseleave', function () {
    comfortInfoPanel.style.display = 'none';
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
    if (isLoggedIn === 'true') {
        loginButton.style.display = 'none'; 
        profileIcon.style.display = 'block'; 
        profileIcon.style.opacity = '1'; 
    } else {
        loginButton.style.display = 'block'; 
        profileIcon.style.display = 'none';
    }
});


// Profil ikon animáció megjelenítése login után
loginSubmitButton.addEventListener('click', function (event) {
    event.preventDefault();
    localStorage.setItem('isLoggedIn', 'true'); 
    loginPanel.classList.remove('open'); 
    overlay.classList.remove('show'); 
    loginButton.style.display = 'none'; 
    profileIcon.style.display = 'block'; 
    profileIcon.style.animation = 'profileIconFloatIn 1.5s ease-out'; 
});


// Login gomb eseménykezelő
loginButton.addEventListener('click', function () {
    loginPanel.classList.add('open'); 
    overlay.classList.add('show'); 
});


// Login panelben a bejelentkezéskor
loginSubmitButton.addEventListener('click', function (event) {
    event.preventDefault();

    const emailValue = emailInput.value.trim();
    const passwordValue = passwordInput.value;

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    let valid = true;

    if (!emailPattern.test(emailValue)) {
        displayError(emailInput, 'Invalid email address');
        valid = false;
    } else {
        removeError(emailInput);
    }

    // Jelszó ellenőrzése
    if (passwordValue.length < 8 || passwordValue.length > 20) {
        displayError(passwordInput, 'Password must be 8-20 characters long');
        valid = false;
    } else {
        removeError(passwordInput);
    }

    if (valid) {
        localStorage.setItem('isLoggedIn', 'true');
        loginPanel.classList.remove('open');
        overlay.classList.remove('show');
        loginButton.style.display = 'none';
        profileIcon.style.display = 'block';
    }
});


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

