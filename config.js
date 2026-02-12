// ============================================
// 💝 CUSTOMIZE YOUR VALENTINE'S WEBSITE HERE 💝
// ============================================

const CONFIG = {
    // Your Valentine's name that will appear in the title
    // Example: "Jade", "Sarah", "Mike"
    valentineName: "princess",

    // The title that appears in the browser tab
    // You can use emojis! 💝 💖 💗 💓 💞 💕
    pageTitle: "Will You Be My Valentine? 💝",

    // Floating emojis that appear in the background
    // Find more emojis at: https://emojipedia.org
    floatingEmojis: {
        hearts: ['❤️', '💖', '❤️', '💖'],  // Heart emojis
        // If you don't want bears, keep this as an empty array (prevents JS errors)
        bears: []
        // bears: ['🧸', '🐻']
    },

    // Questions and answers
    // Customize each question and its possible responses
    questions: {
        first: {
            text: "Okay, first of all: Do you like me?",
            yesBtn: "Yes!",
            noBtn: "No.",
            secretAnswer: "I don't like you, I love youuu! ❤️"
        },
        second: {
            text: "Well, then tell me: How much do you love me?",
            startText: "This much!",
            nextBtn: "Next ❤️"
        },
        third: {
            text: "NOW THE MOST IMPORTANT QUESTION: Lisa, will you be my Valentine on February 14th, 2026? 🌹",
            yesBtn: "YES!!! ❤️",
            noBtn: "...no, sorry."
        }
    },

    // Love meter messages
    loveMessages: {
        extreme: "OH DAMN, YOU'RE OBSESSED WITH ME BABY",
        high: "mhmm...now we're talking",
        normal: "okay, cute 🥰"
    },

    // Messages that appear after they say "Yes!"
    celebration: {
        title: "AHHH, I guess I'm the luckiest person in the world and I love you a Walmart parking lot! 😝💖",
        message: "My place on Saturday at 17:00? And I cook for us and we have a nice chill day that is full of love? 😝💖",
        emojis: ""
    },

    // Color scheme for the website
    colors: {
        backgroundStart: "#5E081E",
        backgroundEnd: "#E48397",
        buttonBackground: "#ff6b6b",
        buttonHover: "#ff8787",
        textColor: "#ff4757"
    },

    // Animation settings
    animations: {
        floatDuration: "15s",
        floatDistance: "50px",
        bounceSpeed: "0.5s",
        heartExplosionSize: 1.5
    },

    // Background Music (Optional)
    music: {
        enabled: true,
        autoplay: true,
        musicUrl: "https://res.cloudinary.com/dncywqfpb/video/upload/v1738399057/music_qrhjvy.mp3",
        startText: "🎵 Play Music",
        stopText: "🔇 Stop Music",
        volume: 0.5
    }
};

// Don't modify anything below this line unless you know what you're doing
window.VALENTINE_CONFIG = CONFIG;
