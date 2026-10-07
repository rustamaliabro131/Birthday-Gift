tailwind.config = {
    theme: {
        extend: {
            colors: {
                cream: '#FAF6F0',
                roseGold: '#B87333',
                softPink: '#FCE7F3',
                blush: '#F472B6',
                warmGold: '#D97706',
                dustyRose: '#E0A96D'
            },
            fontFamily: {
                hand: ['Caveat', 'cursive'],
                script: ['Great Vibes', 'cursive'],
                urdu: ['Noto Nastaliq Urdu', 'serif'],
                sans: ['Plus Jakarta Sans', 'sans-serif']
            }
        }
    }
};

// --- Local MP3 Music Player ---
let isPlaying = false;

function toggleBirthdayMusic() {
    const audio = document.getElementById('birthdayAudio');
    const musicText = document.getElementById('musicText');
    const musicIcon = document.getElementById('musicIcon');

    if (isPlaying) {
        audio.pause();
        isPlaying = false;
        musicText.innerText = 'Play Music 🎵';
        musicIcon.classList.remove('fa-spin');
    } else {
        audio.play().catch((e) => console.warn('Audio playback failed:', e));
        isPlaying = true;
        musicText.innerText = 'Pause Music ⏸';
        musicIcon.classList.add('fa-spin');
    }
}

// --- Candle Blowing Logic ---
let blownCandles = 0;

function extinguishCandle(id) {
    const flame = document.getElementById(`flame${id}`);
    if (flame && flame.style.display !== 'none') {
        flame.style.display = 'none';
        blownCandles++;
        triggerConfettiBurst();

        if (blownCandles === 3) {
            document.getElementById('candleInstruction').innerText = "🎉 Yay! All candles blown! May all your wishes come true, Shazia! ❤️";
            triggerGrandConfetti();
        }
    }
}

function blowAllCandles() {
    extinguishCandle(1);
    extinguishCandle(2);
    extinguishCandle(3);
}

function relightCandles() {
    for (let i = 1; i <= 3; i++) {
        const flame = document.getElementById(`flame${i}`);
        if (flame) flame.style.display = 'flex';
    }
    blownCandles = 0;
    document.getElementById('candleInstruction').innerText = "Click on the candles to blow them out and make a wish! 🎂✨";
}

// --- Confetti Animations ---
function triggerConfettiBurst() {
    if (typeof confetti === 'function') {
        confetti({
            particleCount: 40,
            spread: 60,
            origin: { y: 0.6 }
        });
    }
}

function triggerGrandConfetti() {
    if (typeof confetti === 'function') {
        confetti({
            particleCount: 120,
            spread: 100,
            origin: { y: 0.5 },
            colors: ['#F472B6', '#FBBF24', '#60A5FA', '#34D399', '#A78BFA']
        });
    }
}

// --- Random Wishes Feature ---
const wishesList = [
    "🌸 May your year be as bright and beautiful as your smile!",
    "✨ Wishing you unending happiness, good health, and success!",
    "💖 May all your dreams find wings and soar high this year!",
    "🌺 Stay as amazing, kind, and wonderful as you are!",
    "🎉 Cheers to another fantastic year of memories and milestone achievements!"
];

function drawRandomWish() {
    const randomWish = wishesList[Math.floor(Math.random() * wishesList.length)];
    const outputBox = document.getElementById('wishOutput');
    outputBox.innerText = randomWish;
    outputBox.classList.remove('hidden');
    triggerConfettiBurst();
}

function flipWishCard(cardElement) {
    triggerConfettiBurst();
}

// --- Scroll Helpers ---
function scrollToCake() {
    document.getElementById('cakeSection').scrollIntoView({ behavior: 'smooth' });
}

function scrollToGallery() {
    document.getElementById('gallerySection').scrollIntoView({ behavior: 'smooth' });
}

// --- Customization Modal ---
function toggleCustomizeModal() {
    const modal = document.getElementById('customizeModal');
    modal.classList.toggle('hidden');
}

function applyPersonalization() {
    const newName = document.getElementById('inputFriendName').value.trim() || 'Shazia';
    const newMessage = document.getElementById('inputMessage').value.trim();

    document.getElementById('friendNameDisplay').innerText = newName;
    if (newMessage) {
        document.getElementById('heroSubtitle').innerText = newMessage;
    }

    toggleCustomizeModal();
    triggerGrandConfetti();
}

// Initial welcome confetti on load
window.addEventListener('load', () => {
    setTimeout(triggerGrandConfetti, 800);
});
