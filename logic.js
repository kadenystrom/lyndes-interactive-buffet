// logic.js

let activityStarted = true;
let timerStarted = false;
let timerInterval;
let startTime;
let selectedItem = null;
let correctCount = 0;
let totalAttempts = 0;

const timerDisplay = document.getElementById('timer');
const messageBox = document.getElementById('message');
const highscoreDisplay = document.getElementById('highscore');
const narratorNameSpan = document.getElementById("narrator-name");
const voiceSelect = document.getElementById("voice-select");
const correctSound = document.getElementById('correct-sound');
const wrongSound = document.getElementById('wrong-sound');
const completionBox = document.getElementById('completion-screen');
const roundStatsBox = document.getElementById('round-stats');
const lifetimeStatsBox = document.getElementById('lifetime-stats');
const selectedNameDisplay = document.getElementById('selected-item-name');
const itemsContainer = document.getElementById('items');
const zones = document.querySelectorAll('.zone');

function startTimer() {
  if (!timerStarted) {
    timerStarted = true;
    startTime = Date.now();
    timerInterval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      timerDisplay.textContent = `Time: ${elapsed}s`;
    }, 1000);
  }
}

function populateVoiceDropdown() {
  const availableVoices = speechSynthesis.getVoices();
  allVoiceNames.forEach(name => {
    const match = availableVoices.find(v => v.name === name);
    if (match) {
      const option = document.createElement("option");
      option.value = name;
      option.textContent = name.replace("Microsoft ", "");
      voiceSelect.appendChild(option);
    }
  });
}

function playVoiceover() {
  const availableVoices = speechSynthesis.getVoices();
  const chosenName = voiceSelect.value;
  const selectedVoice = chosenName
  ? availableVoices.find(v => v.name === chosenName)
  : availableVoices.find(v => v.name === allVoiceNames[0]);

  const message = new SpeechSynthesisUtterance(
    "Welcome to the Buffet Setup Practice Activity! Your challenge is to arrange items correctly along the buffet table, moving from left to right as guests would approach. If you make a mistake, don't worry. I’ll provide hints to help you place items correctly. Remember, a well-organized buffet ensures smooth and enjoyable dining for everyone! Keep an eye on the timer to see how quickly you can complete the task. Aim to beat your best time or set a new high score! And when you’ve finished, a colorful surprise awaits you. Good luck!"
    );

  message.voice = selectedVoice;
  message.pitch = 1.5;
  message.rate = 1.1;
  message.volume = 1;

  if (selectedVoice) {
    narratorNameSpan.textContent = selectedVoice.name.replace("Microsoft ", "");
  }
  speechSynthesis.cancel();
  speechSynthesis.speak(message);
}

window.speechSynthesis.onvoiceschanged = populateVoiceDropdown;
window.onload = () => speechSynthesis.cancel();

const previousHighscore = localStorage.getItem('buffetHighscore');
if (previousHighscore) {
  highscoreDisplay.textContent = `🏆 Best Time: ${previousHighscore}s`;
}

// Guarantee at least one item from every category
const categories = Object.keys(correctPlacement);
const initialItems = categories.map(cat => {
  const options = correctPlacement[cat];
  return options[Math.floor(Math.random() * options.length)];
});

// Fill remainder randomly
const remainingPool = allItems.filter(id => !initialItems.includes(id));
remainingPool.sort(() => Math.random() - 0.5);
const selectedItems = [...initialItems, ...remainingPool.slice(0, 15 - initialItems.length)];
selectedItems.sort(() => Math.random() - 0.5);

selectedItems.forEach(id => {
  const div = document.createElement('div');
  div.className = 'item';
  div.id = id;
  div.draggable = true;
  div.textContent = itemNames[id];
  itemsContainer.appendChild(div);
});

const totalItems = selectedItems.length;

function updateProgressBar() {
  const progressPercentage = Math.floor((correctCount / totalItems) * 100);
  document.getElementById('progress-bar').style.width = `${progressPercentage}%`;
}

function triggerConfetti() {
  const canvas = document.getElementById('confetti-canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const confetti = Array.from({ length: 150 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height - canvas.height,
    radius: Math.random() * 6 + 4,
    color: `hsl(${Math.random() * 360}, 70%, 60%)`,
    velocity: Math.random() * 2 + 2,
    tilt: Math.random() * 10 - 5
  }));

  let frame = 0;
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    confetti.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI);
      ctx.fillStyle = p.color;
      ctx.fill();
      p.y += p.velocity;
      p.x += Math.sin(frame / 20 + p.tilt);
      if (p.y > canvas.height) p.y = 0;
    });
    frame++;
    if (frame < 1000) requestAnimationFrame(draw);
    else ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
  draw();
}

function handleDrop(zone, itemId, draggedItem) {
  totalAttempts++;
  const zoneType = zone.getAttribute('data-accept');
  if (!zone.contains(draggedItem)) {
    if (correctPlacement[zoneType].includes(itemId)) {
      zone.appendChild(draggedItem);
      draggedItem.setAttribute('draggable', false);
      draggedItem.style.backgroundColor = '#aaffaa';
      draggedItem.style.border = '1px solid #ccc';
      draggedItem.style.padding = '2px';
      correctSound.play();
      correctCount++;
      
      selectedItem = null;
      selectedNameDisplay.textContent = 'None';
      
      completionBox.textContent = `Great job! You placed "${draggedItem.textContent}" correctly!`;
      updateProgressBar();

      if (correctCount === totalItems) {
        const timeTaken = Math.floor((Date.now() - startTime) / 1000);
        clearInterval(timerInterval);
        const accuracy = Math.round((correctCount / totalAttempts) * 100);

        completionBox.textContent = `✅ All items placed!`;
        roundStatsBox.innerHTML = `⏱ Time: ${timeTaken}s | 🎯 Accuracy: ${accuracy}%`;
        messageBox.textContent = ``;
        triggerConfetti();

        const games = parseInt(localStorage.getItem('gamesPlayed') || '0') + 1;
        const totalTime = parseInt(localStorage.getItem('totalTime') || '0') + timeTaken;
        const totalAccuracy = parseInt(localStorage.getItem('totalAccuracy') || '0') + accuracy;

        localStorage.setItem('gamesPlayed', games);
        localStorage.setItem('totalTime', totalTime);
        localStorage.setItem('totalAccuracy', totalAccuracy);

        const avgTime = Math.round(totalTime / games);
        const avgAcc = Math.round(totalAccuracy / games);
        lifetimeStatsBox.innerHTML = `Lifetime Stats → Rounds: ${games} | Avg Time: ${avgTime}s | Avg Accuracy: ${avgAcc}%`;

        const currentHigh = localStorage.getItem('buffetHighscore');
        if (!currentHigh || timeTaken < parseInt(currentHigh)) {
          localStorage.setItem('buffetHighscore', timeTaken);
          highscoreDisplay.textContent = `🏆 New Best Time: ${timeTaken}s`;
        }
      }
    } else {
      const hint = hints[itemId] || 'Hint: Think about the natural flow of a buffet table.';
      messageBox.textContent = `Oops! "${draggedItem.textContent}" doesn't go here. ${hint}`;
      wrongSound.play();
      draggedItem.style.border = '1px solid #ccc';
      selectedItem = null;
      selectedNameDisplay.textContent = 'None';
    }
  }
}

function selectOrDeselectItem(item) {
  if (item.parentElement.classList.contains('zone')) return;
  startTimer();

  if (selectedItem === item.id) {
    item.style.border = '1px solid #ccc';
    selectedItem = null;
    selectedNameDisplay.textContent = 'None';
  } else {
    if (selectedItem) {
      const prev = document.getElementById(selectedItem);
      if (prev) prev.style.border = '1px solid #ccc';
    }
    selectedItem = item.id;
    item.style.border = '2px solid #76c7c0';
    selectedNameDisplay.textContent = itemNames[selectedItem];
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const games = parseInt(localStorage.getItem('gamesPlayed') || '0');
  if (games > 0) {
    const avgTime = Math.round(parseInt(localStorage.getItem('totalTime') || '0') / games);
    const avgAcc = Math.round(parseInt(localStorage.getItem('totalAccuracy') || '0') / games);
    lifetimeStatsBox.innerHTML = `Lifetime Stats → Rounds: ${games} | Avg Time: ${avgTime}s | Avg Accuracy: ${avgAcc}%`;
  }

  document.querySelectorAll('.item').forEach(item => {
    item.addEventListener('dragstart', e => {
      startTimer();
      e.dataTransfer.setData('text/plain', item.id);
    });

    item.addEventListener('click', e => {
      selectOrDeselectItem(item);
      e.stopPropagation();
    });
  });

  zones.forEach(zone => {
    zone.addEventListener('dragover', e => {
      e.preventDefault();
      zone.classList.add('hovered');
    });
    zone.addEventListener('dragleave', () => zone.classList.remove('hovered'));
    zone.addEventListener('drop', e => {
      e.preventDefault();
      zone.classList.remove('hovered');
      const itemId = e.dataTransfer.getData('text/plain');
      const draggedItem = document.getElementById(itemId);
      handleDrop(zone, itemId, draggedItem);
    });
    
    zone.addEventListener('click', e => {
      if (!selectedItem) {
        messageBox.textContent = 'Please select an item first!';
        setTimeout(() => messageBox.textContent = '', 2000);
        return;
      }
      const draggedItem = document.getElementById(selectedItem);
      handleDrop(zone, selectedItem, draggedItem);
      e.stopPropagation();
    });
  });
});
