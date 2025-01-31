const yesBtn = document.querySelector(".yes-btn");
const noBtn = document.querySelector(".no-btn");
const question = document.querySelector(".question");
const gif = document.querySelector(".gif");

// Change text and gif when the Yes button is clicked
yesBtn.addEventListener("click", () => {
    question.innerHTML = "Yipee! 🎉";
    gif.src = "/minions.gif";
    
    // Hide the No button
    noBtn.style.display = "none";
    yesBtn.style.display = "none";
    sendWebhookNotification('Ja ek wil gaan koffie drink! ☕');
});

// Make the No button move randomly on hover
noBtn.addEventListener("mouseover", () => {
    const wrapper = document.querySelector(".wrapper");
    const wrapperRect = wrapper.getBoundingClientRect();
    const noBtnRect = noBtn.getBoundingClientRect();

    // Calculate the maximum possible positions for the No button within the wrapper
    const maxX = wrapperRect.width - noBtnRect.width;
    const maxY = wrapperRect.height - noBtnRect.height;

    // Ensure the randomX and randomY values keep the button inside the wrapper bounds
    const randomX = Math.max(0, Math.min(Math.floor(Math.random() * maxX), maxX));
    const randomY = Math.max(0, Math.min(Math.floor(Math.random() * maxY), maxY));

    // Apply the random position using transform (without breaking the container bounds)
    noBtn.style.transform = `translate(${randomX}px, ${randomY}px)`;
});

// Reset No button position when clicked
noBtn.addEventListener("click", () => {
    const wrapper = document.querySelector(".wrapper");
    const wrapperRect = wrapper.getBoundingClientRect();
    const noBtnRect = noBtn.getBoundingClientRect();

    // Calculate the maximum possible positions for the No button within the wrapper
    const maxX = wrapperRect.width - noBtnRect.width;
    const maxY = wrapperRect.height - noBtnRect.height;

    // Ensure the randomX and randomY values keep the button inside the wrapper bounds
    const randomX = Math.max(0, Math.min(Math.floor(Math.random() * maxX), maxX));
    const randomY = Math.max(0, Math.min(Math.floor(Math.random() * maxY), maxY));

    // Apply the random position using transform (without breaking the container bounds)
    noBtn.style.transform = `translate(${randomX}px, ${randomY}px)`;

    // Optionally, trigger an action when the No button is clicked
    sendWebhookNotification('No button clicked!');
});

async function sendWebhookNotification(message = 'Notification sent from JavaScript!') {
    const webhookUrl = 'https://api.pretoriusse.net/api/megan/incoming/';
  
    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      console.log('Notification sent successfully!');
      return true;
    } catch (error) {
      console.error('Error sending notification:', error);
      return false;
    }
}
