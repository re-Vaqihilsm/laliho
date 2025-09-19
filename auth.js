// Check if user is logged in
function checkAuth() {
    const currentUser = localStorage.getItem('currentUser') || sessionStorage.getItem('currentUser');
    
    if (!currentUser) {
        // If user is not logged in, redirect to login page
        window.location.href = 'login.html';
    }
    
    return JSON.parse(currentUser);
}

// Logout function
function logout() {
    localStorage.removeItem('currentUser');
    sessionStorage.removeItem('currentUser');
    window.location.href = 'login.html';
}

// Add logout button to navigation
function addLogoutButton() {
    const navContainer = document.querySelector('.nav-container');
    const logoutButton = document.createElement('a');
    logoutButton.href = '#';
    logoutButton.textContent = 'Logout';
    logoutButton.style.color = 'var(--primary-red)';
    logoutButton.style.fontFamily = "'Oswald', sans-serif";
    logoutButton.style.fontWeight = '700';
    logoutButton.style.textTransform = 'uppercase';
    logoutButton.style.letterSpacing = '0.05em';
    logoutButton.style.marginLeft = '2rem';
    
    logoutButton.addEventListener('click', (e) => {
        e.preventDefault();
        logout();
    });
    
    navContainer.appendChild(logoutButton);
}

// Check if user is logged in
function checkAuth() {
    const currentUser = localStorage.getItem('currentUser') || sessionStorage.getItem('currentUser');
    
    if (!currentUser) {
        // If user is not logged in, redirect to login page
        window.location.href = 'index.html';
        return null;
    }
    
    const user = JSON.parse(currentUser);
    
    // Redirect based on username
    if (user.username === 'admin') {
        // If already on persona portfolio, do nothing
        if (!window.location.href.includes('index.html')) {
            window.location.href = 'index.html';
        }
    } else if (user.username === 'demo') {
        // If already on minimalis portfolio, do nothing
        if (!window.location.href.includes('portfolio-minimalis')) {
            window.location.href = 'portfolio-minimalis/index.html';
        }
    } else {
        // Default to persona for other users
        if (!window.location.href.includes('index.html')) {
            window.location.href = 'index.html';
        }
    }
    
    return user;
}

// Initialize authentication
document.addEventListener('DOMContentLoaded', () => {
    const user = checkAuth();
    
    // Add welcome message
    const heroContent = document.querySelector('.hero-content');
    const welcomeMessage = document.createElement('p');
    welcomeMessage.textContent = `Welcome back, ${user.username}!`;
    welcomeMessage.style.color = 'var(--primary-red)';
    welcomeMessage.style.fontFamily = "'Oswald', sans-serif";
    welcomeMessage.style.fontSize = '1.2rem';
    welcomeMessage.style.marginBottom = '1rem';
    heroContent.insertBefore(welcomeMessage, heroContent.firstChild);
    
    // Add logout button
    addLogoutButton();
});