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
    var maxY = containerRect.height - buttonRect.height;
    
    if(maxY<=0) {
      maxY = maxX * 0.7
    }
    
    // Ensure positive values
    const safeMaxX = Math.max(0, maxX);
    const safeMaxY = Math.max(0, maxY);

    // Generate new position that's different from current
    let newX, newY;
    do {
        newX = (Math.random() - 0.6) * safeMaxX * 0.9;
        newY = (Math.random() - 0.6) * safeMaxY * 1.2;
    } while (
        Math.abs(newX - currentX) < buttonRect.width && 
        Math.abs(newY - currentY) < buttonRect.height
    );

    currentX = newX;
    currentY = newY;
    
    return { x: newX - 10, y: newY - 50 };
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
    var old_yes_display = yesBtn.style.display;
    var old_no_display = noBtn.style.display;
    noBtn.style.display = "none";
    yesBtn.style.display = "none";
    sendWebhookNotification('Ja ek wil jou valentine wees.');
    setTimeout(() => {
      noBtn.style.display = old_no_display;
      yesBtn.style.display = old_yes_display;
      question.innerHTML = "Sal jy my valentyn wees?";
      noBtn.style.transform = `translate(0px, 0px)`; // Set initial position
      gif.src = "/cat.gif";
    }, 8000);
});

noBtn.addEventListener("mouseover", moveButton);
noBtn.addEventListener("click", () => {
    question.innerHTML = "Probeer weer! 😉";
    moveButton();
    setTimeout(() => {
        question.innerHTML = "Sal jy my valentyn wees?";
      }, 2000);
});

document.addEventListener("DOMContentLoaded", () => {
    // Add event listener for the "beforeunload" event
    noBtn.style.transform = `translate(0px, 0px)`; // Set initial position
    window.addEventListener("beforeunload", (event) => {
        // Cancel the event as stated by the standard.
        event.preventDefault();
        // Chrome requires returnValue to be set.
        event.returnValue = "";
    });
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