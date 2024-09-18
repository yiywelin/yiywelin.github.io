// animated intro
let typedText = "Hey... I'm Lynn!";
let index = 0;

function typeText() {
    if (index < typedText.length) {
        document.getElementById("greeting").innerHTML += typedText.charAt(index);
        index++;
        setTimeout(typeText, 100);
    }
}

window.onload = typeText;


// dark-mode toggle
document.addEventListener('DOMContentLoaded', () => {
    // Selecting the button and the body
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;

    // Check if dark mode is already enabled from local storage
    if (localStorage.getItem('darkMode') === 'enabled') {
        body.classList.add('dark-mode');
        darkModeToggle.textContent = '☀️';  // Switch to sun icon for light mode
    }

    // Toggle dark mode on button click
    darkModeToggle.addEventListener('click', () => {
        if (body.classList.contains('dark-mode')) {
            body.classList.remove('dark-mode'); // Turn off dark mode
            darkModeToggle.textContent = '🌙';  // Change back to moon icon
            localStorage.setItem('darkMode', 'disabled');  // Save preference
        } else {
            body.classList.add('dark-mode'); // Turn on dark mode
            darkModeToggle.textContent = '☀️';  // Switch to sun icon for light mode
            localStorage.setItem('darkMode', 'enabled');  // Save preference
        }
    });
});




// back-to-top button
const topButton = document.getElementById('backToTop');

window.onscroll = function () {
    if (window.pageYOffset > 100) {
        topButton.style.display = 'block';
    } else {
        topButton.style.display = 'none';
    }
};

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}