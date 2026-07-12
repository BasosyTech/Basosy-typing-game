# ⌨️ Typing Speed Test Game

A dynamic, interactive typing speed test game built entirely with Vanilla JavaScript. This project was developed to solidify core client-side mechanics, focusing on DOM manipulation, event handling, and data persistence without relying on external frameworks.

## ✨ Features
- **Multiple Difficulty Levels:** Easy, Normal, and Hard modes with customized time limits and word pools.
- **Smart Word Generation:** Randomly generates words utilizing deep cloning (`structuredClone`) to ensure proper memory management.
- **Real-Time Tracking:** Live countdown timer and score calculation.
- **Persistent Leaderboard:** Saves the top 5 scores locally using `localStorage`, categorized by difficulty level.
- **Custom UI:** Interactive, fully responsive popups for level completion and game over states.

## 🚀 Technologies Used
- **HTML5:** Semantic structure.
- **CSS3:** Custom properties (variables), Flexbox layouts, and responsive design.
- **Vanilla JavaScript (ES6+):** Event delegation, error handling (try/catch), and local storage management.

## 🛠️ How to Run
Since this is a pure front-end project, no build tools or dependencies are required. 

1. Clone the repository:
`https://github.com/BasosyTech/Basosy-typing-game.git`

2. Open `index.html` in your favorite web browser and start typing!

## 🧠 Technical Highlights
- Implemented **Event Delegation** to minimize memory consumption and optimize the Garbage Collector.
- Used `DocumentFragment` to batch DOM updates, preventing unnecessary browser reflows and repaints.
- Defensive programming applied to `localStorage` to handle corrupted data gracefully and prevent application crashes.

## 👨‍💻 Author
**Abdo (BasosyTech)**
- GitHub: [@BasosyTech](https://github.com/BasosyTech)
