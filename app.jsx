// Initial Setup
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
let circleX = 50; // Circle position (x-axis)
let circleY = canvas.height / 2; // Centered vertically
const circleRadius = 40;
let arrowX = canvas.width - 100; // Initial arrow position
let arrowY = canvas.height / 2;
let arrowSpeed = 0; // Arrow speed when hit button is clicked
let isHit = false; // Tracks whether arrow hit the circle

// Generate random color for the circle
let circleColor = getRandomColor();

// Draw initial canvas with circle and arrow
function drawCanvas() {
  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw circle
  ctx.beginPath();
  ctx.arc(circleX, circleY, circleRadius, 0, Math.PI * 2);
  ctx.fillStyle = circleColor;
  ctx.fill();
  ctx.closePath();

  // Draw arrow
  ctx.beginPath();
  ctx.moveTo(arrowX, arrowY);
  ctx.lineTo(arrowX - 40, arrowY - 10);
  ctx.lineTo(arrowX - 40, arrowY + 10);
  ctx.closePath();
  ctx.fillStyle = 'black';
  ctx.fill();
}

// Function to move arrow
function moveArrow() {
  if (!isHit) {
    arrowX -= arrowSpeed;

    // Check for collision
    if (arrowX - 40 <= circleX + circleRadius) {
      isHit = true;
      circleColor = getRandomColor(); // Change circle color on hit
      arrowSpeed = 0; // Stop arrow movement
    }

    drawCanvas();

    if (!isHit) {
      requestAnimationFrame(moveArrow); // Keep moving if not hit
    }
  }
}

// Generate random color
function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// Reset the app to initial state
function resetApp() {
  arrowX = canvas.width - 100;
  arrowSpeed = 0;
  isHit = false;
  circleColor = getRandomColor(); // New random color for circle
  drawCanvas();
}

// Hit button click event
document.getElementById('hitButton').addEventListener('click', function () {
  if (!isHit) {
    arrowSpeed = 3; // Set arrow speed on hit
    moveArrow();
  }
});

// Reset button click event
document.getElementById('resetButton').addEventListener('click', resetApp);

// Initial drawing of canvas
drawCanvas();
