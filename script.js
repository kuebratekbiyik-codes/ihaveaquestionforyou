// Initialize configuration
const config = window.VALENTINE_CONFIG;

// Validate configuration
function validateConfig() {
    const warnings = [];

    if (!config.valentineName) {
        warnings.push("Valentine's name is not set! Using default.");
        config.valentineName = "My Love";
    }

    // Validate colors
    const isValidHex = (hex) => /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(hex);
    if (!config.colors) config.colors = {};
    Object.entries(config.colors).forEach(([key, value]) => {
        if (!isValidHex(value)) {
            warnings.push(`Invalid color for ${key}! Using default.`);
            config.colors[key] = getDefaultColor(key);
        }
    });

    // Validate animation values
    if (config.animations && parseFloat(config.animations.floatDuration) < 5) {
        warnings.push("Float duration too short! Setting to 5s minimum.");
        config.animations.floatDuration = "5s";
    }

    if (config.animations && (config.animations.heartExplosionSize < 1 || config.animations.heartExplosionSize > 3)) {
        warnings.push("Heart explosion size should be between 1 and 3! Using default.");
        config.animations.heartExplosionSize = 1.5;
    }

    if (warnings.length > 0) {
        console.warn("⚠️ Configuration Warnings:");
        warnings.forEach(warning => console.warn("- " + warning));
    }
}

function getDefaultColor(key) {
    const defaults = {
        backgroundStart: "#ffafbd",
        backgroundEnd: "#ffc3a0",
        buttonBackground: "#ff6b6b",
        buttonHover: "#ff8787",
        textColor: "#ff4757"
    };
    return defaults[key];
}

// Set page title
document.title = config.pageTitle || document.title;

// -------------------- DOM READY --------------------
window.addEventListener('DOMContentLoaded', () => {
    validateConfig();

    // Title
    document.getElementById('valentineTitle').textContent = `Hi ${config.valentineName} ❤️ `;

    // Q1 texts
    document.getElementById('question1Text').textContent = config.questions.first.text;
    document.getElementById('yesBtn1').textContent = config.questions.first.yesBtn;
    document.getElementById('noBtn1').textContent = config.questions.first.noBtn;
    document.getElementById('secretAnswerBtn').textContent = config.questions.first.secretAnswer;

    // Hint logic Q1
    const hintText = document.getElementById('hintText');
    const yesBtn1 = document.getElementById('yesBtn1');
    const noBtn1 = document.getElementById('noBtn1');

    hintText.textContent = "Don't you dare klicking no... but you can try 🤨";

    yesBtn1.addEventListener("click", () => {
        hintText.textContent = "This is better, but think again... 😝";
    });

    noBtn1.addEventListener("click", () => {
        hintText.textContent = "Nice try...but this is not acceptable! 😤";
    });

    // Q2 texts
    document.getElementById('question2Text').textContent = config.questions.second.text;
    document.getElementById('startText').textContent = config.questions.second.startText;
    document.getElementById('nextBtn').textContent = config.questions.second.nextBtn;

    // Q5 texts (your former question4)
    document.getElementById('question5Text').textContent = config.questions.third.text;
    document.getElementById('yesBtn5').textContent = config.questions.third.yesBtn;
    document.getElementById('noBtn5').textContent = config.questions.third.noBtn;

    const q5Feedback = document.getElementById("q5Feedback");
    const noBtn5 = document.getElementById("noBtn5");
    
    if (noBtn5 && q5Feedback) {
        noBtn5.addEventListener("click", () => {
            q5Feedback.textContent = "DAS IST RESPEKTLOS 😭";
        });
    }


    // Floating background
    createFloatingElements();

    // Music
    //setupMusicPlayer();

    // Love meter initial state
    setInitialPosition();
});

// -------------------- Floating elements --------------------
function createFloatingElements() {
    const container = document.querySelector('.floating-elements');
    if (!container) return;

    const hearts = Array.isArray(config.floatingEmojis?.hearts) ? config.floatingEmojis.hearts : [];
    hearts.forEach(heart => {
        const div = document.createElement('div');
        div.className = 'heart';
        div.innerHTML = heart;
        setRandomPosition(div);
        container.appendChild(div);
    });

    // Guard against undefined bears
    const bears = Array.isArray(config.floatingEmojis?.bears) ? config.floatingEmojis.bears : [];
    bears.forEach(bear => {
        const div = document.createElement('div');
        div.className = 'bear';
        div.innerHTML = bear;
        setRandomPosition(div);
        container.appendChild(div);
    });
}

function setRandomPosition(element) {
    element.style.left = Math.random() * 100 + 'vw';
    element.style.animationDelay = Math.random() * 5 + 's';
    element.style.animationDuration = 10 + Math.random() * 20 + 's';
}

// -------------------- Navigation --------------------
function showNextQuestion(questionNumber) {
    document.querySelectorAll('.question-section').forEach(q => q.classList.add('hidden'));
    document.getElementById(`question${questionNumber}`).classList.remove('hidden');

    const hintText = document.getElementById('hintText');
    if (questionNumber !== 1 && hintText) hintText.textContent = "";

    // init hedgehog slide whenever we enter it
    if (questionNumber === 3) {
        setupHedgehogSlide();
    }

    // init the new 3-button slide whenever we enter it
    if (questionNumber === 4) {
        setupQuestion4();
    }
    const title = document.getElementById("valentineTitle");
    if (title) {
      title.style.display = (questionNumber === 1) ? "block" : "none";
}

}

// -------------------- Button trolling --------------------
function moveButton(button) {
    const x = Math.random() * (window.innerWidth - button.offsetWidth);
    const y = Math.random() * (window.innerHeight - button.offsetHeight);
    button.style.position = 'fixed';
    button.style.left = x + 'px';
    button.style.top = y + 'px';
}

// -------------------- Love meter --------------------
const loveMeter = document.getElementById('loveMeter');
const loveValue = document.getElementById('loveValue');
const extraLove = document.getElementById('extraLove');

function setInitialPosition() {
    if (!loveMeter || !loveValue) return;
    loveMeter.value = 100;
    loveValue.textContent = 100;
    loveMeter.style.width = '100%';
}

if (loveMeter) {
    loveMeter.addEventListener('input', () => {
        const value = parseInt(loveMeter.value, 10);
        const percentSign = document.getElementById('percentSign');

        // Jupiter switch
        const JUPITER_AT = 7000; // your current setting
        if (value <= JUPITER_AT) {
            loveValue.textContent = value;
            if (percentSign) percentSign.style.display = "inline";
        } else {
            loveValue.textContent = "To Jupiter and back!! 🚀";
            if (percentSign) percentSign.style.display = "none";
        }

        // Hardcoded milestones
        let msg = "";
        if (value >= 5000) {
            msg = "OH DAMN, YOU'RE OBSESSED WITH ME BABY";
            extraLove.classList.add('super-love');
        } else if (value >= 1000) {
            msg = "Mhmm...now we're talking 😝";
            extraLove.classList.remove('super-love');
        } else if (value > 100) {
            msg = "Okay, cute 🥰";
            extraLove.classList.remove('super-love');
        }

        // Keep original behavior (show extraLove + slider expansion)
        if (value > 100) {
            extraLove.classList.remove('hidden');
            extraLove.textContent = msg;

            const overflowPercentage = (value - 100) / 9900;
            const extraWidth = overflowPercentage * window.innerWidth * 0.8;
            loveMeter.style.width = `calc(100% + ${extraWidth}px)`;
            loveMeter.style.transition = 'width 0.3s';
        } else {
            extraLove.classList.add('hidden');
            extraLove.classList.remove('super-love');
            loveMeter.style.width = '100%';
        }
    });
}

// -------------------- Celebration --------------------
function celebrate() {
    document.querySelectorAll('.question-section').forEach(q => q.classList.add('hidden'));
    const celebration = document.getElementById('celebration');
    celebration.classList.remove('hidden');

    document.getElementById('celebrationTitle').textContent = config.celebration.title;
    document.getElementById('celebrationMessage').textContent = config.celebration.message;
    document.getElementById('celebrationEmojis').textContent = config.celebration.emojis;

    createHeartExplosion();
}

function createHeartExplosion() {
    const container = document.querySelector('.floating-elements');
    if (!container) return;

    const hearts = Array.isArray(config.floatingEmojis?.hearts) ? config.floatingEmojis.hearts : [];
    for (let i = 0; i < 50; i++) {
        const heart = document.createElement('div');
        const randomHeart = hearts[Math.floor(Math.random() * hearts.length)] || "❤️";
        heart.innerHTML = randomHeart;
        heart.className = 'heart';
        container.appendChild(heart);
        setRandomPosition(heart);
    }
}

// -------------------- Music --------------------
function setupMusicPlayer() {
    const musicControls = document.getElementById('musicControls');
    const musicToggle = document.getElementById('musicToggle');
    const bgMusic = document.getElementById('bgMusic');
    const musicSource = document.getElementById('musicSource');

    if (!config.music?.enabled) {
        musicControls.style.display = 'none';
        return;
    }

    musicSource.src = config.music.musicUrl;
    bgMusic.volume = config.music.volume ?? 0.5;
    bgMusic.load();

    if (config.music.autoplay) {
        const playPromise = bgMusic.play();
        if (playPromise !== undefined) {
            playPromise.catch(() => {
                console.log("Autoplay prevented by browser");
                musicToggle.textContent = config.music.startText;
            });
        }
    }

    musicToggle.addEventListener('click', () => {
        if (bgMusic.paused) {
            bgMusic.play();
            musicToggle.textContent = config.music.stopText;
        } else {
            bgMusic.pause();
            musicToggle.textContent = config.music.startText;
        }
    });
}

// -------------------- Hedgehog slide (question3) --------------------
let hedgehogPets = 0;

function setupHedgehogSlide() {
    const hedgehog = document.getElementById("hedgehog");
    const hedgehogText = document.getElementById("hedgehogText");
    const nextBtn = document.getElementById("hedgehogNextBtn");

    if (!hedgehog || !hedgehogText || !nextBtn) return;

    // reset state
    hedgehogPets = 0;
    hedgehog.style.transform = "scale(1)";
    hedgehogText.textContent = "Pet it 3 times so we can move on 🥹";
    nextBtn.classList.add("hidden");

    const handlePet = () => {
        hedgehogPets += 1;

        // grow each click
        const scale = 1 + hedgehogPets * 0.12;
        hedgehog.style.transform = `scale(${scale})`;

        if (hedgehogPets === 1) {
            hedgehogText.textContent = "One pet 🥹";
        } else if (hedgehogPets === 2) {
            hedgehogText.textContent = "Two pets 🥹";
        } else {
            hedgehogText.textContent = "Aww, he likes youuuu 🥹 And I love youuu 😝";
            nextBtn.classList.remove("hidden");
            hedgehog.removeEventListener("click", handlePet);
        }
    };

    // avoid stacking listeners
    const cleanHedgehog = hedgehog.cloneNode(true);
    hedgehog.parentNode.replaceChild(cleanHedgehog, hedgehog);
    cleanHedgehog.addEventListener("click", handlePet);

    // go to NEW question4
    nextBtn.onclick = () => showNextQuestion(4);
}

// -------------------- NEW: Question4 (3 buttons, only button2 continues) --------------------
function setupQuestion4() {
    const qText = document.getElementById("question4Text");
    const b1 = document.getElementById("q4Btn1");
    const b2 = document.getElementById("q4Btn2");
    const b3 = document.getElementById("q4Btn3");
    const feedback = document.getElementById("q4Feedback");

    if (!qText || !b1 || !b2 || !b3 || !feedback) return;

    qText.textContent =
        "Anyway — back to the question. So you love me to Jupiter and back, huh? Then tell me… which one of these also applies:";

    b1.textContent = "…in slow motion while confetti meteors rain down 🎉☄️";
    b2.textContent = "…with a tiny (romantic) picnic on Enceladus 🥹🧺";
    b3.textContent = "…by sending 300 love letters via space pigeons 💌🕊️";

    feedback.textContent = "";

    // Clear old listeners by cloning
    const c1 = b1.cloneNode(true);
    const c2 = b2.cloneNode(true);
    const c3 = b3.cloneNode(true);
    b1.parentNode.replaceChild(c1, b1);
    b2.parentNode.replaceChild(c2, b2);
    b3.parentNode.replaceChild(c3, b3);

    const nb1 = document.getElementById("q4Btn1");
    const nb2 = document.getElementById("q4Btn2");
    const nb3 = document.getElementById("q4Btn3");

    nb1.addEventListener("click", () => {
        feedback.textContent = "Wrong… but honestly not would be so cool 😌 Try again! ";
        // moveButton(nb1);
    });

    nb3.addEventListener("click", () => {
        feedback.textContent = "AWW, you know I would love this, but this is not what we say! 😝";
        // moveButton(nb3);
    });

    // ✅ only correct button continues
    nb2.addEventListener("click", () => {
        feedback.textContent = "Correct answer! 😝💗";
        setTimeout(() => showNextQuestion(5), 1600);
    });
}
