// Function to move the "No" button away from the cursor
function moveButton() {
    const noButton = document.getElementById('noButton');
    if (!noButton) return;

    document.addEventListener('mousemove', (event) => {
        const buttonRect = noButton.getBoundingClientRect();
        const buttonCenterX = buttonRect.left + buttonRect.width / 2;
        const buttonCenterY = buttonRect.top + buttonRect.height / 2;

        // Get the current mouse position
        const mouseX = event.clientX;
        const mouseY = event.clientY;

        // Check if the mouse is within a certain distance from the button
        const distance = 100; // Distance threshold

        if (Math.abs(mouseX - buttonCenterX) < distance && Math.abs(mouseY - buttonCenterY) < distance) {
            // Generate new random positions
            const randomX = Math.floor(Math.random() * (window.innerWidth - 200)) + 100; // Random X position
            const randomY = Math.floor(Math.random() * (window.innerHeight - 200)) + 100; // Random Y position

            // Move the button to a new position smoothly
            noButton.style.transition = 'left 0.5s ease, top 0.5s ease'; // Smooth transition
            noButton.style.position = 'fixed'; // Change to fixed positioning
            noButton.style.left = randomX + 'px';
            noButton.style.top = randomY + 'px';

            // Add glittering effect
            noButton.classList.add('glitter');
        } else {
            // Remove glittering effect
            noButton.classList.remove('glitter');
        }
    });
}

// Function to create floating hearts
function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.innerHTML = '❤';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = Math.random() * 3 + 2 + 's';
    document.querySelector('.hearts').appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 5000);
}

// Function to load content into the dynamic content div
// Function to load content into the dynamic content div
function loadContent(page) {
    fetch(`/html/${page}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(data => {
            // Extract the name from the URL query parameter
            const urlParams = new URLSearchParams(window.location.search);
            const name = urlParams.get('v') || 'Mukesh'; // Default to 'Guest' if no name is provided

            // Replace the placeholder in the content
            data = data.replace(/{anyname}/g, name); // Replace {anyname} with the actual name

            document.getElementById('dynamic-content').innerHTML = data;
            // Re-run the moveButton function to attach event listeners for the new "No" button
            moveButton();
            // Reload Tenor embed script
            loadTenorScript();
        })
        .catch(error => console.error('Error loading page:', error));
}

// Function to load the Tenor embed script
function loadTenorScript() {
    // Remove existing Tenor script if it exists
    const existingScript = document.querySelector('script[src="https://tenor.com/embed.js"]');
    if (existingScript) {
        existingScript.remove();
    }

    // Create a new script element for the Tenor embed
    const script = document.createElement('script');
    script.src = 'https://tenor.com/embed.js';
    script.async = true;
    document.body.appendChild(script);
}

// Load the initial page content (p1)
window.onload = () => {
    loadContent('p1.html'); // Load p1.html initially
    setInterval(createHeart, 300);
};

// Redirect function for buttons
function redirectToPage(page) {
    loadContent(page);
}