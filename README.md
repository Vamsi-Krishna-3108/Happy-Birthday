# 🎂 Happy Birthday, Divya K! 🎉💖

A complete, responsive, and interactive best-friend birthday website created by **Vamsi C** and **Gowthami D** for **Divya K**.

Built with a premium pastel scrapbook aesthetic, micro-animations, authentic best-friend banter, games, and genuine emotional surprises.

---

## ✨ Features Included

1. **🎁 Welcome Screen & Surprise Reveal**:
   - Animated gift box with ribbon that shakes and pops open with sound effects.
   - Confetti burst and playful character introductions for Vamsi C and Gowthami D.
   - Skip animation button for quick viewing.
2. **🎉 Birthday Hero**:
   - Animated typography and dynamic typewriter subtitles.
   - Quick navigation buttons to jump straight to memories or trigger funny surprise popups.
3. **📸 Scrapbook Polaroid Gallery**:
   - Polaroid cards with washi tape, authentic tilt angles, and hover lift effects.
   - Fullscreen Lightbox with Next/Previous, swipe/touch, and keyboard (Arrow keys & Escape) navigation.
   - "SHOW ME A RANDOM MEMORY" button that randomly highlights and opens a memory.
4. **🎬 Video Memory Wall**:
   - Video cards with badges, durations, and titles ("THE CHAOS COMPILATION", "A LITTLE MESSAGE FROM US", etc.).
   - Interactive modal video player with canvas-rendered retro film animations and audio.
   - Featured video slot for a personal message from both senders.
5. **💌 Two Friends, Two Personal Letters**:
   - Individual animated envelopes from **Vamsi C** and **Gowthami D**.
   - Distinct pastel cards with authentic, heartwarming, and hilarious messages.
   - Session storage tracking: When both letters are opened, an official celebration banner unlocks: *"CONGRATULATIONS!! YOU ARE OFFICIALLY STUCK WITH US FOREVER 🤝💗"* with a celebratory confetti blast!
6. **🎂 Interactive Birthday Cake**:
   - Handcrafted SVG cake with 3 animated flickering flame candles.
   - "BLOW OUT THE CANDLES" button that plays a blowing sound, extinguishes the flames, releases animated smoke puffs, and reveals a sweet wish.
   - "MAKE ANOTHER WISH" button to relight the candles.
7. **💖 Friendship Love Meter**:
   - "CALCULATE OUR LOVE" interaction that fills the gauge, overloads past 100% to 999999%, shakes with glitch sound effects, and reveals *"ERROR 404: LOVE TOO BIG TO CALCULATE. RESULT: STUCK WITH US FOREVER. NO REFUNDS. 😂"*.
8. **🎈 Pop the Balloons Mini-Game**:
   - Playable floating balloon arcade.
   - Click/tap to pop balloons with sound effects, particle bursts, and secret compliments.
   - Visible score counter; popping 3 balloons unlocks an exclusive VIP bonus message!
9. **🔐 Secret Gift & Easter Egg**:
   - Classified document lockbox revealing an official *"Lifetime Best Friend Certificate"* signed by Vamsi & Gowthami with hilarious perks.
   - A hidden floating star sticker on the page that triggers an exclusive funny easter egg when discovered!
10. **🫶 Friendship Memory Timeline**:
    - Scrapbook milestone timeline showing "How the trio was born", road trips, and inside jokes.
11. **🎵 Docked Music Player**:
    - Web Audio API synthesized lo-fi music-box Happy Birthday melody that works 100% offline without broken external MP3 links.
    - Play, pause, mute, and live animated soundwave equalizer bars. Automatically pauses during video playback.
12. **💝 Final Surprise & Grand Finale**:
    - Full-width emotional birthday letter to Divya K.
    - Continuous celebration confetti.
    - Working "REPLAY THE BIRTHDAY SURPRISE" button that smoothly restarts the experience.

---

## 🛠️ How to Customize

All text, names, photos, messages, and settings are centralized in one file:

📂 **`src/config/birthdayConfig.js`**

### 1. Changing Names & Dates
Open `src/config/birthdayConfig.js` and edit:
```js
recipient: {
  name: "Divya K",
  nickname: "Divyu / Queen of Chaos 👑",
  birthdayDate: "October 30",
  ...
}
```

### 2. Replacing Photos
Place your images in `assets/images/` and update the `photos` array in `birthdayConfig.js`:
```js
photos: [
  {
    id: "picnic",
    src: "assets/images/your_photo.jpg",
    title: "Trip to Goa",
    caption: "A certified core memory 💗",
    date: "July 2024",
    tag: "CORE MEMORY",
    rotation: -2.5
  },
  ...
]
```

### 3. Adding or Uploading Videos 🎬
1. Place your video files (`.mp4`, `.webm`, or `.mov`) into the **`assets/videos/`** folder:
   - Example: `assets/videos/my_birthday_wish.mp4`
2. Open `src/config/birthdayConfig.js` and update the `src` attribute in the `videos` array:
```js
videos: [
  {
    id: "video-1",
    src: "assets/videos/my_birthday_wish.mp4",
    title: "A SPECIAL BIRTHDAY MESSAGE 💌",
    caption: "A video message straight from our hearts (with some mild chaos)!",
    duration: "1:20",
    badge: "MUST WATCH",
    type: "animated_message",
    thumbnailIcon: "🎬"
  },
  ...
]
```
> **Note**: If you don't have a video file yet or leave `src` blank, the website automatically plays a cute interactive retro animated film simulation with music so nothing ever looks empty or broken!

### 4. Editing Personal Letters
Update `senders.friendOne.letterBody` and `senders.friendTwo.letterBody` directly in `birthdayConfig.js`.

---

## 🚀 How to Run Locally

You can open this website with any simple HTTP server:

### Option 1: Python (Pre-installed)
Run in powershell or terminal:
```bash
python -m http.server 3000
```
Then open: **`http://localhost:3000`** in your browser.

### Option 2: VS Code Live Server
Right-click `index.html` and click **"Open with Live Server"**.

---

## 🌐 Deploying Online (Free & Instant)

You can publish this surprise website in less than 60 seconds so your best friend can open it on their phone:

### Deploy with Vercel or Netlify:
1. Drag and drop the `birthday` folder onto **[Netlify Drop](https://app.netlify.com/drop)**.
2. Your website is instantly live with a custom shareable link (e.g. `divya-birthday-surprise.netlify.app`)!

### Deploy with GitHub Pages:
1. Push this folder to a GitHub repository.
2. Go to **Settings > Pages** and set branch to **`main`**.

---

*Made with 💗, friendship & questionable levels of chaos by Vamsi C & Gowthami D for Divya K.*
