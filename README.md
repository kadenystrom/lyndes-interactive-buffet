# [Buffet Flow Interactive](https://kadenystrom.github.io/lyndes-interactive-buffet/)

An interactive web-based training simulation designed to teach event staff and culinary teams optimal catering buffet setups. Built with vanilla HTML5, CSS Grid, and JavaScript, it focuses on guest ergonomics, workflow sequencing, and accessible sensory feedback.

[🚀 **Launch Live Demo**](https://kadenystrom.github.io/lyndes-interactive-buffet/)

---

## 🎯 The UX Problem
Buffet lines in high-volume catering often suffer from guest bottlenecks due to poor spatial layout—such as placing heavy entrees before starch bases or desserts in the middle of savory dishes. This tool provides an active-learning interface to reinforce correct left-to-right setup standards based on commercial catering workflows.

## ✨ Key Features
- **Fluid Drag-and-Drop & Tap Selection:** Supports both traditional desktop mouse drag-and-drop and touch/click tap-to-place interactions for tablets and mobile devices.
- **Dynamic 4×2 Buffet Grid:** Built using responsive CSS Grid that mirrors actual buffet tables on wide screens (Plates ➔ Breads ➔ Salads ➔ Sides ➔ Mains ➔ Toppings ➔ Desserts ➔ Beverages) and collapses adaptively across viewports.
- **Contextual Hint System:** Instead of spoon-feeding answers, incorrect placements trigger guiding questions rooted in dining logic and temperature zones.
- **Multi-Sensory Feedback:** Integrated audio cues (`correct.mp3`, `incorrect.mp3`), an HTML5 Canvas confetti reward system, and Web Speech API narrator support.
- **Session & Lifetime Tracking:** Persists player high scores, round completion times, and overall placement accuracy via the Web Storage API.

## 🛠️ Tech Stack
- **Interface & Structure:** Semantic HTML5, CSS Grid & Flexbox
- **Logic & State:** Vanilla JavaScript (ES6+), Web Storage API
- **Audio & Speech:** HTML5 Audio Elements, Web Speech Synthesis API
- **Visual Effects:** HTML5 2D Canvas API

## 🚀 Local Development
To run this project locally:
1. Clone the repository:
   ```bash
   git clone [https://github.com/kadenystrom/lyndes-interactive-buffet.git](https://github.com/kadenystrom/lyndes-interactive-buffet.git)
