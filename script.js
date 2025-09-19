// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Animate skill bars on scroll
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const skillBars = entry.target.querySelectorAll('.skill-progress');
            skillBars.forEach(bar => {
                const width = bar.getAttribute('data-width');
                setTimeout(() => {
                    bar.style.width = width + '%';
                }, 200);
            });
        }
    });
}, observerOptions);

const skillsSection = document.querySelector('#skills');
if (skillsSection) {
    observer.observe(skillsSection);
}

// Slot Machine Modal
const gambleSendBtn = document.getElementById('gamble-send');
const slotMachineModal = document.getElementById('slot-machine');
const closeModalBtn = document.getElementById('close-modal');
const spinButton = document.getElementById('spin-button');
const slotResult = document.getElementById('slot-result');
const contactForm = document.getElementById('contact-form');

// Show slot machine modal
gambleSendBtn.addEventListener('click', () => {
    slotMachineModal.classList.add('active');
    resetSlotMachine();
});

// Close modal
closeModalBtn.addEventListener('click', () => {
    slotMachineModal.classList.remove('active');
});

// Spin the slot machine
spinButton.addEventListener('click', () => {
    spinSlotMachine();
});

// Reset slot machine
function resetSlotMachine() {
    const reels = document.querySelectorAll('.reel');
    reels.forEach(reel => {
        reel.innerHTML = `
         <div class="symbol">💔</div>
         <div class="symbol">🥀</div>
         <div class="symbol">🔥</div>
         <div class="symbol">🗣</div>
         <div class="symbol">👍</div>
         <div class="symbol">👅</div>
         <div class="symbol">7️⃣</div>
        `;
    });
    slotResult.textContent = '';
    spinButton.disabled = false;
}

// Spin the reels
function spinSlotMachine() {
    spinButton.disabled = true;
    slotResult.textContent = 'SPINNING...';
    
    const reels = document.querySelectorAll('.reel');
    const results = [];
    
    // Add spinning class to all reels
    reels.forEach(reel => {
        reel.classList.add('spinning');
    });
    
    // Stop each reel after a delay
    setTimeout(() => {
        stopReel(0, reels, results);
    }, 1000);
    
    setTimeout(() => {
        stopReel(1, reels, results);
    }, 2000);
    
    setTimeout(() => {
        stopReel(2, reels, results);
        checkWin(results);
    }, 3000);
}

// Stop a reel and get the result
function stopReel(index, reels, results) {
    const reel = reels[index];
    reel.classList.remove('spinning');
    
    // Get a random symbol
    const symbols = reel.querySelectorAll('.symbol');
    const randomIndex = Math.floor(Math.random() * symbols.length);
    const selectedSymbol = symbols[randomIndex].textContent;
    
    // Hide all symbols except the selected one
    symbols.forEach((symbol, i) => {
        symbol.style.display = i === randomIndex ? 'flex' : 'none';
    });
    
    results[index] = selectedSymbol;
}

// Check if the player won
function checkWin(results) {
    spinButton.disabled = false;
    
    // Check if all symbols match
    if (results[0] === results[1] && results[1] === results[2]) {
        // Jackpot!
        slotResult.textContent = 'JACKPOT! MESSAGE SENT!';
        slotResult.style.color = '#4CAF50';
        
        // Send the form after a delay
        setTimeout(() => {
            sendForm();
        }, 2000);
    } else {
        // Try again
        slotResult.textContent = 'TRY AGAIN!';
        slotResult.style.color = '#F44336';
    }
}

// Send the form
function sendForm() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // Create success message
    const successMsg = document.createElement('div');
    successMsg.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: var(--primary-red);
        color: white;
        padding: 2rem 3rem;
        border-radius: 10px;
        font-family: 'Oswald', sans-serif;
        font-size: 1.5rem;
        z-index: 3000;
        animation: fadeInUp 0.5s ease;
    `;
    successMsg.textContent = 'Message Sent Successfully!';
    document.body.appendChild(successMsg);
    
    // Reset form
    contactForm.reset();
    
    // Close modal
    slotMachineModal.classList.remove('active');
    
    // Remove message after 3 seconds
    setTimeout(() => {
        successMsg.style.animation = 'fadeOut 0.5s ease';
        setTimeout(() => successMsg.remove(), 500);
    }, 3000);
}

// Random glitch effect on hero title
setInterval(() => {
    const title = document.querySelector('.hero-title');
    if (Math.random() > 0.7) {
        title.classList.add('glitch');
        setTimeout(() => {
            title.classList.remove('glitch');
        }, 200);
    }
}, 3000);

// Add fade out animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOut {
        to {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.8);
        }
    }
`;
document.head.appendChild(style);

// Efek suara saat hover
const buttons = document.querySelectorAll('a');
buttons.forEach(button => {
  button.addEventListener('mouseenter', function() {
    const sound = new Audio('hover-sound.wav');
    sound.play();
  });
});