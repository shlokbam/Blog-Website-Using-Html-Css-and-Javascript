// View and Like functionality
const viewCountDisplay = document.getElementById('viewCount');
const likeButton = document.getElementById('likeButton');
const likeCountDisplay = document.getElementById('likeCount');

// Function to get a unique identifier for the user
function getUserId() {
    let userId = localStorage.getItem('userId');
    if (!userId) {
        userId = 'user_' + Date.now();
        localStorage.setItem('userId', userId);
    }
    return userId;
}

// Increment view count
function incrementViewCount() {
    const userId = getUserId();
    const viewedUsers = JSON.parse(localStorage.getItem('viewedUsers') || '[]');
    if (!viewedUsers.includes(userId)) {
        const viewCount = parseInt(localStorage.getItem('viewCount') || '0') + 1;
        localStorage.setItem('viewCount', viewCount);
        viewCountDisplay.textContent = viewCount;
        viewedUsers.push(userId);
        localStorage.setItem('viewedUsers', JSON.stringify(viewedUsers));
    } else {
        viewCountDisplay.textContent = localStorage.getItem('viewCount') || '0';
    }
}

// Like functionality
function setupLikeButton() {
    const userId = getUserId();
    const likedUsers = JSON.parse(localStorage.getItem('likedUsers') || '[]');
    const likeCount = likedUsers.length;
    likeCountDisplay.textContent = likeCount;

    if (likedUsers.includes(userId)) {
        likeButton.disabled = true;
        likeButton.textContent = 'Liked';
    } else {
        likeButton.addEventListener('click', () => {
            likedUsers.push(userId);
            localStorage.setItem('likedUsers', JSON.stringify(likedUsers));
            likeCountDisplay.textContent = likedUsers.length;
            likeButton.disabled = true;
            likeButton.textContent = 'Liked';
        });
    }
}

// Initialize view and like functionality
incrementViewCount();
setupLikeButton();

// Background color changer with text color adjustment
const colorPicker = document.getElementById('bgColor');

colorPicker.addEventListener('input', (e) => {
    document.body.style.backgroundColor = e.target.value;
    toggleDarkMode(e.target.value);
});

// Function to determine if the background color is dark
function isDarkColor(hexColor) {
    const r = parseInt(hexColor.substr(1, 2), 16);
    const g = parseInt(hexColor.substr(3, 2), 16);
    const b = parseInt(hexColor.substr(5, 2), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness < 128;
}

// Toggle dark mode based on the background color
function toggleDarkMode(color) {
    if (isDarkColor(color)) {
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
    }
}

// Load saved background color and adjust text color
const savedColor = localStorage.getItem('bgColor');
if (savedColor) {
    document.body.style.backgroundColor = savedColor;
    colorPicker.value = savedColor;
    toggleDarkMode(savedColor);
}

colorPicker.addEventListener('change', (e) => {
    localStorage.setItem('bgColor', e.target.value);
    toggleDarkMode(e.target.value);
});

// Side Panel Functionality
function openNav() {
    document.getElementById("sidePanel").style.width = "250px";
}
  
function closeNav() {
    document.getElementById("sidePanel").style.width = "0";
}
  
// Function to populate the side panel with headings
function populateSidePanel() {
    const sidePanel = document.getElementById("sidePanel");
    const headings = document.querySelectorAll('h1, h2');
    
    headings.forEach(heading => {
      if (!heading.id) {
        heading.id = heading.textContent.toLowerCase().replace(/\s+/g, '-');
      }
      const link = document.createElement('a');
      link.href = `#${heading.id}`;
      link.textContent = heading.textContent;
      link.onclick = closeNav;
      sidePanel.appendChild(link);
    });
}

// Call this function when the page loads
document.addEventListener('DOMContentLoaded', populateSidePanel);

