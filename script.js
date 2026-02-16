document.addEventListener('DOMContentLoaded', function() {
    const yesBtn = document.getElementById('yesBtn');
    const noBtn = document.getElementById('noBtn');
    const message = document.getElementById('message');

    // detect mobile / touch devices and adjust effects for performance/usability
    const isMobile = ('ontouchstart' in window) || navigator.maxTouchPoints > 0 || window.innerWidth < 700;

    // spawn hearts continuously to simulate rain
    let activeHearts = 0;
    let maxHearts = isMobile ? 40 : 80;

    function spawnHeart() {
        if (activeHearts >= maxHearts) return;
        activeHearts++;

        const heart = document.createElement('div');
        heart.className = 'heart';

        const inner = document.createElement('div');
        inner.className = 'heart-inner';
        inner.textContent = '❤️';

        // random horizontal position (avoid edges)
        const left = Math.random() * 90 + 3;
        heart.style.left = left + '%';

        // random size
        const size = (0.9 + Math.random() * 1.8).toFixed(2);
        inner.style.fontSize = size + 'em';

        // random fall duration and sway speed (seconds)
        const fallDur = (3 + Math.random() * 6).toFixed(2);
        const swayDur = (1.8 + Math.random() * 3).toFixed(2);
        const fallDelay = (Math.random() * 1.5).toFixed(2);

        inner.style.setProperty('--fall-dur', fallDur + 's');
        inner.style.setProperty('--fall-delay', fallDelay + 's');
        inner.style.setProperty('--sway-dur', swayDur + 's');
        inner.style.setProperty('--sway-delay', (Math.random() * 1).toFixed(2) + 's');

        heart.appendChild(inner);
        document.body.appendChild(heart);

        // remove after animation completes (fallDur + fallDelay + small buffer)
        const removeAfter = (parseFloat(fallDur) + parseFloat(fallDelay) + 0.6) * 1000;
        setTimeout(() => {
            heart.remove();
            activeHearts--;
        }, removeAfter);
    }

    // start spawning hearts at a steady rate (slower on mobile)
    const spawnRate = isMobile ? 350 : 220;
    const spawnInterval = setInterval(spawnHeart, spawnRate);

    // create a few initial hearts immediately for instant effect (fewer on mobile)
    const initial = isMobile ? 4 : 10;
    for (let i = 0; i < initial; i++) setTimeout(spawnHeart, i * 120);

    // Create confetti effect
    function createConfetti() {
        const count = isMobile ? 18 : 50;
        for (let i = 0; i < count; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.width = (isMobile ? 6 : 10) + 'px';
            confetti.style.height = (isMobile ? 6 : 10) + 'px';
            confetti.style.animationDelay = Math.random() * 1.2 + 's';
            confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 90%, ${isMobile ? '55%' : '50%'})`;
            document.body.appendChild(confetti);
            
            setTimeout(() => {
                confetti.remove();
            }, 3000);
        }
    }

    yesBtn.addEventListener('click', function() {
        message.textContent = "Yay! I love you too! ❤️💕";
        message.classList.add('show');
        yesBtn.style.display = 'none';
        noBtn.style.display = 'none';
        createConfetti();
        
        // Add more falling hearts when yes is clicked
        const extraCount = isMobile ? 8 : 12;
        for (let i = 0; i < extraCount; i++) {
            setTimeout(() => {
                const heart = document.createElement('div');
                heart.className = 'heart';
                const inner = document.createElement('div');
                inner.className = 'heart-inner';
                inner.textContent = '💖';

                heart.style.left = (8 + Math.random() * 84) + '%';
            inner.style.fontSize = (1 + Math.random() * 1.6) + 'em';

                inner.style.setProperty('--fall-dur', (2 + Math.random() * 4).toFixed(2) + 's');
                inner.style.setProperty('--fall-delay', '0s');
                inner.style.setProperty('--sway-dur', (1 + Math.random() * 2).toFixed(2) + 's');
                inner.style.setProperty('--sway-delay', (Math.random() * 0.5).toFixed(2) + 's');

                heart.appendChild(inner);
                document.body.appendChild(heart);

                setTimeout(() => heart.remove(), 7000);
            }, i * 100);
        }
    });

    // Evasive hover behavior only for non-touch devices
    if (!isMobile) {
        noBtn.addEventListener('mouseover', function() {
            const container = document.querySelector('.container');
            const containerRect = container.getBoundingClientRect();
            const btnRect = noBtn.getBoundingClientRect();

            let newLeft = Math.random() * (containerRect.width - btnRect.width);
            let newTop = Math.random() * (containerRect.height - btnRect.height);

            // Ensure it doesn't go outside the container
            newLeft = Math.max(0, Math.min(newLeft, containerRect.width - btnRect.width));
            newTop = Math.max(0, Math.min(newTop, containerRect.height - btnRect.height));

            noBtn.style.position = 'absolute';
            noBtn.style.left = newLeft + 'px';
            noBtn.style.top = newTop + 'px';
            noBtn.style.transition = 'all 0.3s ease';
        });
    } else {
        // On touch devices, avoid moving the button — show a playful message instead
        noBtn.addEventListener('touchstart', function(e) {
            e.preventDefault();
            message.textContent = "Hmm... tap again if you really mean it 😅";
            message.classList.add('show');
            setTimeout(() => message.classList.remove('show'), 2000);
        });
    }

    noBtn.addEventListener('click', function() {
        message.textContent = "Are you sure? Think again! 😢💔";
        message.classList.add('show');
        setTimeout(() => {
            message.classList.remove('show');
        }, 3000);
    });
});