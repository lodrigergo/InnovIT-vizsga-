// A logóra kattintva az index.html oldal tetejére navigál
document.getElementById('logo').addEventListener('click', function () {
    window.location.href = '../index.html#home';
});

// Az "About" link kezelése
const aboutLink = document.querySelector('a[href="#about"]');
if (aboutLink) {
    aboutLink.addEventListener('click', function (event) {
        event.preventDefault();
        document.querySelector('#about').scrollIntoView({
            behavior: 'smooth'
        });
    });
}
