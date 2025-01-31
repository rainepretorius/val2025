const yesBtn = document.querySelector(".yes-btn");
const noBtn = document.querySelector(".no-btn");
const question = document.querySelector(".question");
const gif = document.querySelector(".gif");
const btnGroup = document.querySelector(".btn-group");

// Initialize button position
let currentX = 0;
let currentY = 0;

function getValidPosition() {
    const containerRect = btnGroup.getBoundingClientRect();
    const buttonRect = noBtn.getBoundingClientRect();
    
    const maxX = containerRect.width - buttonRect.width;
    const maxY = containerRect.height - buttonRect.height;
    
    // Ensure positive values
    const safeMaxX = Math.max(0, maxX);
    const safeMaxY = Math.max(0, maxY);

    // Generate new position that's different from current
    let newX, newY;
    do {
        newX = Math.random() * safeMaxX / 2;
        newY = Math.random() * safeMaxY;
    } while (
        Math.abs(newX - currentX) < buttonRect.width/2 && 
        Math.abs(newY - currentY) < buttonRect.height/2
    );

    currentX = newX;
    currentY = newY;
    
    return { x: newX - 10, y: newY };
}

function moveButton() {
    const newPos = getValidPosition();
    noBtn.style.transform = `translate(${newPos.x}px, ${newPos.y}px)`;
}

// Initial position set
document.addEventListener('DOMContentLoaded', () => {
    const initPos = getValidPosition();
    noBtn.style.transform = `translate(${initPos.x}px, ${initPos.y}px)`;
});

yesBtn.addEventListener("click", () => {
    question.innerHTML = "Yipee! 🎉";
    gif.src = "/minions.gif";
    noBtn.style.display = "none";
    yesBtn.style.display = "none";
    sendWebhookNotification('Ja ek wil gaan koffie drink! ☕');
});

noBtn.addEventListener("mouseover", moveButton);
noBtn.addEventListener("click", () => {
    moveButton();
    sendWebhookNotification('No button clicked!');
});

// Webhook function remains the same
async function sendWebhookNotification(message) {
    try {
        const response = await fetch('https://api.pretoriusse.net/api/megan/incoming/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message }),
        });
        if (!response.ok) throw new Error(`HTTP error! ${response.status}`);
        console.log('Notification sent!');
    } catch (error) {
        console.error('Error:', error);
    }
}