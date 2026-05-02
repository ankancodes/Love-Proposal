function nextScreen(current, next) {
    const currentScreen = document.getElementById(`screen${current}`);
    const nextScreen = document.getElementById(`screen${next}`);
    
    currentScreen.classList.remove('active');
    
    // Slight delay for smooth transition
    setTimeout(() => {
        nextScreen.classList.add('active');
    }, 400); 
}

const noBtn = document.getElementById('noBtn');

// Evasion Logic
function evadeCursor() {
    // If not already absolute, move it to the body to escape container bounds
    if (noBtn.style.position !== 'absolute') {
        const rect = noBtn.getBoundingClientRect();
        
        // Append to body
        document.body.appendChild(noBtn);
        
        // Match current position to prevent teleporting immediately on detach
        noBtn.style.position = 'absolute';
        noBtn.style.top = `${rect.top}px`;
        noBtn.style.left = `${rect.left}px`;
    }

    // Calculate window bounds
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    
    const btnWidth = noBtn.offsetWidth;
    const btnHeight = noBtn.offsetHeight;

    // Safety margins
    const margin = 20;
    const maxX = windowWidth - btnWidth - margin;
    const maxY = windowHeight - btnHeight - margin;
    
    // Generate new random position
    const randomX = Math.floor(Math.random() * (maxX - margin + 1)) + margin;
    const randomY = Math.floor(Math.random() * (maxY - margin + 1)) + margin;

    // Apply new position
    noBtn.style.left = `${randomX}px`;
    noBtn.style.top = `${randomY}px`;
}

// Attach event listeners to No button
noBtn.addEventListener('mouseenter', evadeCursor);
noBtn.addEventListener('touchstart', function(e) {
    e.preventDefault(); // Prevent accidental tap
    evadeCursor();
});
noBtn.addEventListener('click', function(e) {
    e.preventDefault();
    evadeCursor();
});
noBtn.addEventListener('focus', evadeCursor); // For keyboard navigation cheating

// Proposal Success Logic
function acceptProposal() {
    nextScreen(5, 6);
    fireConfetti();
}

function fireConfetti() {
    // Wait for the transition to finish
    setTimeout(() => {
        const duration = 4 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        function randomInRange(min, max) {
          return Math.random() * (max - min) + min;
        }

        const interval = setInterval(function() {
          const timeLeft = animationEnd - Date.now();

          if (timeLeft <= 0) {
            return clearInterval(interval);
          }

          const particleCount = 50 * (timeLeft / duration);
          
          confetti({
            ...defaults, particleCount,
            origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
          });
          confetti({
            ...defaults, particleCount,
            origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
          });
        }, 250);
    }, 500);
}
