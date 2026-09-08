# Lynde's Interactive Buffet Trainer

[![Live Demo](https://img.shields.io/badge/Demo-Live%20Application-2ea44f?style=for-the-badge&logo=github)](https://kadenystrom.github.io/lyndes-interactive-buffet/)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3 / Grid](https://img.shields.io/badge/CSS3_Grid-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS/grid)
[![JavaScript](https://img.shields.io/badge/JavaScript_ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

An interactive, gamified training application designed to teach event staff and catering teams optimal buffet line setup. Modeled after commercial banquet operations at **Lynde's Restaurant & Catering**, this tool simulates natural guest flow ergonomics, proper chafer temperature sequencing, and multi-sensory validation.

👉 **[Launch the Live Training Activity](https://kadenystrom.github.io/lyndes-interactive-buffet/)**

---

## 🧭 The Design & Operational Challenge

In high-volume catering, poor buffet spatial sequencing leads directly to operational bottlenecks:
* Plates positioned after food or silverware taken too early, occupying guests' hands.
* Entrées placed before starches, leaving guests unsure of portion balance.
* High-volume beverages or desserts placed in the middle of savory dishes rather than at dedicated end-cap stations.

This application translates culinary staging standards into an intuitive micro-learning activity that tests item placement order from **Left to Right** as a guest would navigate the line.

---

## 🍽️ The 8-Zone Buffet Architecture

To create a balanced, ergonomic buffet table, the interface utilizes a symmetrical **4×2 CSS Grid** representing the operational sequence:

| Step | Zone | Operational Rationale |
| :---: | :--- | :--- |
| **1** | **Plates & Service** | Dinnerware, napkins, and rolled flatware retrieved first before approaching food. |
| **2** | **Breads** | Dinner rolls, tortillas, chips, and butter serve as initial starches and base carriers. |
| **3** | **Salads** | Cold greens and deli bowls are plated early before heat from chafers affects them. |
| **4** | **Sides** | Warm grains, potatoes, and steamed vegetables establish the foundation of the plate. |
| **5** | **Main Courses** | Core proteins (Broaster Chicken, Meatloaf, Lasagna) anchor the meal center. |
| **6** | **Toppings** | Gravies, salsas, shredded cheese, and garnishes finish the warm dishes. |
| **7** | **Desserts** | Cookies, dessert bars, and sweets sit at the end of the line. |
| **8** | **Beverages** | Hot coffee, waters, and sodas are picked up last to eliminate sloshing while dishing food. |

---

## ✨ Key UX & Interaction Features

* **Dual-Input Modalities (Mouse & Touch):** Full desktop drag-and-drop combined with tap-to-select functionality for tablets and mobile devices.
* **Balanced Round Generation:** Dynamically samples a minimum of one item from every category per round before populating remaining slots, ensuring every station is represented.
* **Socratic Hint System:** When a mistake occurs, contextual prompts guide the user through dining logic, temperature considerations, and ergonomics without spoiling answers.
* **Multi-Sensory Feedback Loop:** Audio feedback (`correct.mp3`, `incorrect.mp3`), visual success indicators, real-time progress bars, and custom HTML5 Canvas confetti upon completion.
* **Voice Synthesis Options:** Uses the Web Speech Synthesis API to provide auditory instruction readouts with adjustable voice options.
* **Persistence & Stats:** Tracks current round time, accuracy percentages, personal best high scores, and aggregate lifetime metrics via the Web Storage API (`localStorage`).

---

## 📱 Responsive Layout Strategy

* **Desktop (681px+):** 4-column × 2-row CSS Grid simulating full-length commercial catering tables.
* **Tablet (401px – 680px):** 2-column × 4-row layout prioritizing vertical thumb reach and card scanning.
* **Mobile (≤ 400px):** Single-column stacked order enabling tap-and-place target areas.

---

## 🛠️ Project Structure

```text
lyndes-interactive-buffet/
├── index.html          # Semantic layout, drop zones, accessible audio nodes
├── styles.css          # Responsive 4x2 CSS Grid, animations, zone hover states
├── logic.js           # Drag-and-drop state machine, timer, stats, and canvas confetti
├── data.js            # Menu items, category arrays, hint definitions, and voice data
├── correct.mp3        # Positive action sound cue
├── incorrect.mp3      # Error feedback sound cue
└── README.md          # Project documentation
