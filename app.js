// Select all elements we'll need
let items = document.querySelectorAll('.slider .list .item');
let next = document.getElementById('next');
let prev = document.getElementById('prev');
let thumbnails = document.querySelectorAll('.thumbnail .item');

let countItem = items.length;
let itemActive = 0;
let refreshInterval;

// Function to show the current slide
function showSlider() {
    // Remove active class from previous active elements
    let itemActiveOld = document.querySelector('.slider .list .item.active');
    let thumbnailActiveOld = document.querySelector('.thumbnail .item.active');
    
    if (itemActiveOld) itemActiveOld.classList.remove('active');
    if (thumbnailActiveOld) thumbnailActiveOld.classList.remove('active');
    
    // Add active class to current elements
    items[itemActive].classList.add('active');
    thumbnails[itemActive].classList.add('active');
    
    // Center the active thumbnail in the carousel
    thumbnails[itemActive].scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center'
    });
    
    // Reset the auto-rotation timer
    clearInterval(refreshInterval);
    refreshInterval = setInterval(() => {
        itemActive = (itemActive + 1) % countItem;
        showSlider();
    }, 5000); // Change slide every 5 seconds
}

// Next button click handler
next.onclick = function() {
    itemActive = (itemActive + 1) % countItem;
    showSlider();
};

// Previous button click handler
prev.onclick = function() {
    itemActive = (itemActive - 1 + countItem) % countItem;
    showSlider();
};

// Add click event to each thumbnail
thumbnails.forEach((thumbnail, index) => {
    thumbnail.addEventListener('click', () => {
        itemActive = index;
        showSlider();
    });
});

// Handle audio functionality
document.addEventListener('DOMContentLoaded', function() {
    const audioElement = document.querySelector('audio');
    
    // Create mute button if it doesn't exist
    if (!document.getElementById('muteButton')) {
        const muteButton = document.createElement('button');
        muteButton.id = 'muteButton';
        muteButton.textContent = 'Mute Music';
        document.body.appendChild(muteButton);
        
        muteButton.addEventListener('click', function() {
            if (audioElement.muted) {
                audioElement.muted = false;
                muteButton.textContent = 'Mute Music';
            } else {
                audioElement.muted = true;
                muteButton.textContent = 'Unmute Music';
            }
        });
    }
    
    // Try to autoplay audio (may be blocked by browser policies)
    audioElement.play().catch(e => {
        console.log('Autoplay prevented by browser. User interaction required.');
    });
});

// Initialize the slider with auto-rotation
document.addEventListener('DOMContentLoaded', function() {
    // Display first slide
    showSlider();
    
    // Load only a subset of thumbnails initially
    const thumbnailContainer = document.querySelector('.thumbnail');
    const visibleCount = Math.min(5, thumbnails.length); // Show max 5 thumbnails initially
    
    // Set the width based on visible thumbnails
    thumbnailContainer.style.justifyContent = 'center';
    
    // Add lazy loading for thumbnails as user scrolls
    thumbnailContainer.addEventListener('scroll', function() {
        thumbnails.forEach(thumb => {
            const rect = thumb.getBoundingClientRect();
            // If thumbnail is in viewport, ensure it's loaded
            if (rect.left < window.innerWidth && rect.right > 0) {
                const img = thumb.querySelector('img');
                if (img.dataset.src && !img.src) {
                    img.src = img.dataset.src;
                    delete img.dataset.src;
                }
            }
        });
    });
});