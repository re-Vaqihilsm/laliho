// DOM Elements
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const showRegisterLink = document.getElementById('show-register');
const showLoginLink = document.getElementById('show-login');
const notification = document.getElementById('notification');
const togglePasswordButtons = document.querySelectorAll('.toggle-password');

// Initialize the database (simulated with localStorage)
function initDatabase() {
    if (!localStorage.getItem('users')) {
        const defaultUsers = [
            {
                id: 1,
                username: 'admin',
                email: 'admin@example.com',
                password: 'admin123'
            },
            {
                id: 2,
                username: 'demo',
                email: 'demo@example.com',
                password: 'demo123'
            }
        ];
        
        localStorage.setItem('users', JSON.stringify(defaultUsers));
    }
}

// Show notification
function showNotification(message, type) {
    notification.textContent = message;
    notification.className = `notification ${type}`;
    notification.classList.add('show');
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// Toggle password visibility
togglePasswordButtons.forEach(button => {
    button.addEventListener('click', () => {
        const input = button.previousElementSibling;
        const icon = button.querySelector('i');
        
        if (input.type === 'password') {
            input.type = 'text';
            icon.classList.remove('fa-eye');
            icon.classList.add('fa-eye-slash');
        } else {
            input.type = 'password';
            icon.classList.remove('fa-eye-slash');
            icon.classList.add('fa-eye');
        }
    });
});

// Show register form
showRegisterLink.addEventListener('click', (e) => {
    e.preventDefault();
    loginForm.classList.add('hidden');
    registerForm.classList.remove('hidden');
});

// Show login form
showLoginLink.addEventListener('click', (e) => {
    e.preventDefault();
    registerForm.classList.add('hidden');
    loginForm.classList.remove('hidden');
});

// Handle login
// Handle login
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const remember = document.getElementById('remember').checked;
    
    // Get users from localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];
    
    // Find user
    const user = users.find(u => u.username === username && u.password === password);
    
    if (user) {
        // Store user session
        if (remember) {
            localStorage.setItem('currentUser', JSON.stringify(user));
        } else {
            sessionStorage.setItem('currentUser', JSON.stringify(user));
        }
        
        showNotification('Login successful! Redirecting...', 'success');
        
        // Redirect based on username
        setTimeout(() => {
            if (username === 'admin') {
                window.location.href = 'index.html';
            } else if (username === 'demo') {
                window.location.href = 'portfolio-minimalis/index.html';
            } else {
                // For other users, default to persona theme
                window.location.href = 'index.html';
            }
        }, 1500);
    } else {
        showNotification('Invalid username or password', 'error');
    }
});

// Handle registration
// Handle registration
registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const username = document.getElementById('reg-username').value;
    const email = document.getElementById('reg-email').value;
    const password = document.getElementById('reg-password').value;
    const confirmPassword = document.getElementById('reg-confirm-password').value;
    
    // Validate passwords match
    if (password !== confirmPassword) {
        showNotification('Passwords do not match', 'error');
        return;
    }
    
    // Get users from localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];
    
    // Check if username already exists
    if (users.some(u => u.username === username)) {
        showNotification('Username already exists', 'error');
        return;
    }
    
    // Check if email already exists
    if (users.some(u => u.email === email)) {
        showNotification('Email already exists', 'error');
        return;
    }
    
    // Create new user
    const newUser = {
        id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1,
        username,
        email,
        password
    };
    
    // Add user to "database"
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    showNotification('Registration successful! Please login.', 'success');
    
    // Reset form and show login form
    registerForm.reset();
    registerForm.classList.add('hidden');
    loginForm.classList.remove('hidden');
});

// Check if user is already logged in
function checkAuth() {
    const currentUser = localStorage.getItem('currentUser') || sessionStorage.getItem('currentUser');
    
    if (currentUser) {
        // If user is already logged in, redirect to portfolio
        window.location.href = 'index.html';
    }
}

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    initDatabase();
    checkAuth();
});

// Ambil elemen tombol
const tombol = document.getElementById('login-button-hidden');

// Tambahkan event listener untuk klik
tombol.addEventListener('click', function() {
    // Buat objek audio baru
    const suara = new Audio('click-sound.wav');
    
    // Putar suara
    suara.play();
});

// Efek suara saat hover
const buttons = document.querySelectorAll('button');
buttons.forEach(button => {
  button.addEventListener('mouseenter', function() {
    const sound = new Audio('hover-sound.wav');
    sound.play();
  });
});