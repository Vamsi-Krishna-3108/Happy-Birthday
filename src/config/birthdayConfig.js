/**
 * Central Configuration File for Best-Friend Birthday Surprise Website
 * 
 * You can customize any names, messages, photos, videos, and settings here!
 */

export const birthdayConfig = {
  // Senders and Birthday Person Details
  recipient: {
    name: "Divya K",
    nickname: "Divyu / Queen of Chaos 👑",
    birthdayDate: "October 30",
    birthYear: "2002",
  },
  
  senders: {
    friendOne: {
      name: "Vamsi C",
      role: "The Overthinker & Part-time Comedian",
      avatarBg: "#FFD6E7", // Pastel Pink
      tagline: "The one who plans the chaos",
      letterTitle: "FROM VAMSI C 💗",
      letterGreeting: "Dear Divya,",
      letterBody: `Happy Birthday to the most chaotic, incredible, and genuinely wonderful friend I could ever ask for!

Honestly, where do I even begin? From our endless late-night rants to laughing at the dumbest jokes that literally nobody else understands, you have made every single memory ten times brighter. You have this ridiculous superpower of turning an ordinary boring Tuesday into an unforgettable adventure.

Thank you for always listening when I'm overthinking, for giving the absolute best advice (even when I take forever to follow it), and for never judging me when I do something completely unhinged. You are the glue that holds our two collective braincells together.

I hope this year brings you all the happiness, success, good health, and peace you so richly deserve. Keep shining, keep being your unapologetic self, and remember I'll always have your back no matter what!`,
      letterSignoff: "Forever your partner in crime,",
      letterSignature: "Vamsi C ✨"
    },
    friendTwo: {
      name: "Gowthami D",
      role: "The Chief Instigator & Full-time Hype Woman",
      avatarBg: "#FFF0AD", // Butter Yellow
      tagline: "The one who fuels the chaos",
      letterTitle: "FROM GOWTHAMI D 💛",
      letterGreeting: "My Dearest Divya,",
      letterBody: `HAPPY HAPPY BIRTHDAY TO MY ABSOLUTE SOUL SISTER!! 🎂✨

If someone told me years ago that we'd become this inseparable, I would have said "obviously, because the universe knew we needed to cause trouble together." You are genuinely one of the purest, kindest, and most hilarious souls on this planet.

Thank you for the spontaneous hangout plans, the snack-stealing sessions, the 3 AM gossip voice notes, and the constant hyping up whenever either of us needs a confidence boost. You make life so much more fun just by existing in it.

I'm so ridiculously proud of everything you do and the amazing human you are. Please promise me you'll never change (except maybe replying to texts 5 minutes faster, please and thank you 😭😂).

Wishing you a year filled with pure joy, delicious food, zero stress, and endless laughter. I love you to the moon and back!`,
      letterSignoff: "Your personal cheerleader for life,",
      letterSignature: "Gowthami D 💖"
    }
  },

  // Hero Typewriter Subtitles
  heroSubtitles: [
    "Two idiots. One birthday. Maximum chaos. 🌪️",
    "We made this because you deserve something special. ✨",
    "Warning: unlimited affection and bad jokes ahead 🥹",
    "Your two favorite people have entered the chat 😎",
    "Certified 100% handmade digital love 💌"
  ],

  // Scrapbook Photo Gallery - Using real uploaded photos
  photos: [
    {
      id: "cartoon-trio",
      src: "assets/images/image_1.jpeg",
      title: "The 3D Pixar Filter Incident 🤪",
      caption: "When Snapchat filters made us look like animated Pixar characters! Inseparable since day one. 💖",
      date: "College Memories",
      tag: "PIXAR MODE",
      rotation: -2.5
    },
    {
      id: "vamsi-divya",
      src: "assets/images/image_2.jpeg",
      title: "Queen in Fuchsia Pink 💅",
      caption: "Divya looking like absolute royalty in bright pink! Proof that we can clean up nicely when we want to. ✨",
      date: "Campus Glam",
      tag: "ROYAL VIBES",
      rotation: 3
    },
    {
      id: "afternoon-chill",
      src: "assets/images/image_3.jpeg",
      title: "Monday 3:20 PM Chill ⏰",
      caption: "Pretending to be serious students, but actually cracking jokes and laughing until our stomachs hurt! 😂",
      date: "Monday 3:20 PM",
      tag: "AFTERNOON CHILL",
      rotation: -1.8
    },
    {
      id: "traditional-day",
      src: "assets/images/image_4.jpeg",
      title: "Traditional Day Vibes 🌿",
      caption: "Divya rocking the stunning green saree, flanked by her two permanent bodyguards! 💚",
      date: "Traditional Day",
      tag: "TRADITIONAL GOALS",
      rotation: 2.2
    },
    {
      id: "gowthami-divya",
      src: "assets/images/image_5.jpeg",
      title: "Soul Sisters Celebrating 👯‍♀️",
      caption: "Festive smiles, yellow & purple glam, and a sisterhood that shines brighter than the sun! 💛",
      date: "Festive Day",
      tag: "SOUL SISTERS",
      rotation: -3
    },
    {
      id: "bus-stop",
      src: "assets/images/image_6.jpeg",
      title: "Bus Stop Chronicles 🚌",
      caption: "Dexter's Lab tee, twin yellow energy, and endless gossip while waiting for the college bus! 💛✨",
      date: "College Bus Stop",
      tag: "BUS GANG",
      rotation: 2.8
    }
  ],

  // Video Memory Wall - Using real uploaded videos
  videos: [
    {
      id: "video-1",
      src: "assets/videos/video1.mp4",
      title: "PURE JOY & BESTIE VIBES ✨",
      caption: "Caught on camera: The genuine smiles and laugh-out-loud energy that make our friendship so special.",
      duration: "0:10",
      badge: "CORE MEMORY",
      thumbnailIcon: "🎬"
    },
    {
      id: "video-2",
      src: "assets/videos/video2.mp4",
      title: "SPECIAL BIRTHDAY TRIBUTE 💌",
      caption: "Dedicated straight to our favorite birthday girl, Divya! Turn your sound up for this one!",
      duration: "0:15",
      badge: "MUST WATCH",
      featured: true,
      thumbnailIcon: "💝"
    },
    {
      id: "video-3",
      src: "assets/videos/video3.mp4",
      title: "THE UNFILTERED CHAOS COMPILATION 🤡",
      caption: "Zero scripts, zero seriousness. Just the trio doing what we do best: causing fun mayhem.",
      duration: "0:11",
      badge: "HILARIOUS",
      thumbnailIcon: "🎭"
    },
    {
      id: "video-4",
      src: "assets/videos/video4.mp4",
      title: "VAULT SPECIAL: BEHIND THE SCENES 🍿",
      caption: "A golden mini moment from the archives. Proof that being weird together is the greatest gift.",
      duration: "0:04",
      badge: "GOLDEN MOMENT",
      thumbnailIcon: "✨"
    }
  ],

  // Balloon Popping Mini-Game Messages
  balloonMessages: [
    "You're the glue holding our collective two braincells together! 🧠✨",
    "Certified 100% snack stealer, but we love you anyway 🍕",
    "Chief Emotional Support Officer for life 🫂💗",
    "You have the best laugh in any room you walk into 🎶",
    "Always ready for late-night tea and wild theories ☕👀",
    "Official partner-in-crime: Charges dropped due to cuteness 🚨💖",
    "Queen of lighting up everyone's mood effortlessly 🌟",
    "The world is genuinely 1000x brighter with you in it 🌈"
  ],

  // Scrapbook Memory Timeline
  timeline: [
    {
      year: "Chapter 1",
      date: "The Day We Met",
      title: "When The Trio Was Born 💫",
      description: "The universe realized that one chaotic soul wasn't enough, so it brought us three together. We started as polite acquaintances and within 48 hours were sharing our deepest secrets.",
      tag: "THE BEGINNING"
    },
    {
      year: "Chapter 2",
      date: "The First Road Trip / Outing",
      title: "5 Hours Felt Like 5 Minutes 🚗💨",
      description: "Terrible navigation, wrong turns that became the best discoveries, blasting songs off-key, and laughing until our sides ached.",
      tag: "ADVENTURE"
    },
    {
      year: "Chapter 3",
      date: "The Inside Joke Era",
      title: "Eye Contact Is A Dangerous Weapon 👀😂",
      description: "Reaching that telepathic bestie level where just one look across a crowded room makes us burst into tears of laughter without saying a single word.",
      tag: "INSIDE JOKES"
    },
    {
      year: "Chapter 4",
      date: "Through Every Ups & Down",
      title: "Always Having Each Other's Backs 🛡️",
      description: "Exam panic, career stress, random breakdowns, and life milestones. No matter what happened, we knew there were two people who'd pick up on the first ring.",
      tag: "UNBREAKABLE"
    },
    {
      year: "Chapter 5",
      date: "Today & Beyond",
      title: "Celebrating Divya Day!! 🎂🥳",
      description: "Another year of you making the world more magical. Vamsi and Gowthami officially renew their lifetime friendship contract!",
      tag: "FOREVER"
    }
  ],

  // Secret Surprise Gift Data
  secretGift: {
    title: "OFFICIAL BEST FRIEND CERTIFICATE 📜✨",
    subtitle: "Issued with full authority by Vamsi C & Gowthami D",
    badge: "100% UNCONDITIONAL",
    perks: [
      "🎫 Unlimited Lifetime Free Hugs & Emergency Vent Sessions",
      "🍦 Free Ice Cream / Bubble Tea on Bad Days (Guaranteed)",
      "📞 3 AM Hotline for Ghost Stories, Memes & Life Crises",
      "👯 Anti-Loneliness Guarantee: We will annoy you forever",
      "🏆 Official Title: 'The Greatest Friend in Human History'"
    ],
    terms: "Non-transferable. Non-refundable. Signed in digital pinky-promise glitter."
  },

  // Easter Egg Modal Data
  easterEgg: {
    title: "YOU FOUND THE SECRET BESTIE BUTTON! 🕵️‍♀️✨",
    message: "Fun fact: Vamsi and Gowthami spent over 40 minutes debating whether to roast you or be sweet today. You're just too precious, so we chose sweetness (with 5% mild teasing). Also, you owe both of us birthday cake! 🍰💗"
  },

  // Final Emotional Message
  finalMessage: {
    heading: "WAIT... ONE LAST THING FOR YOU 🥹💗",
    body: `HAPPY BIRTHDAY, DIVYA K!! 🎂💖

We don't always say it, but we're genuinely so lucky to have you in our lives.

Thank you for the laughs, the memories, the random nonsense, and all the little moments that somehow become our favorite ones.

We hope this new year of your life brings you happiness, good health, exciting adventures, and everything your heart is wishing for.

No matter how much we annoy you, remember that you've got two people cheering for you, supporting you, and making sure your birthday is extra special.

You deserve all the love in the world.

Happy Birthday, bestie! We love you loads. 🫶💗`,
    senders: "— Vamsi C & Gowthami D",
    footerQuote: "MADE WITH 💗, FRIENDSHIP & QUESTIONABLE LEVELS OF CHAOS BY YOUR TWO FAVORITE IDIOTS."
  }
};
