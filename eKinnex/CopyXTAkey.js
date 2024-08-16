const accessToken = sessionStorage.getItem('ERG__TOKEN') || localStorage.getItem('ERG__TOKEN');

if (accessToken) {
    navigator.clipboard.writeText(accessToken) 

   // Show message for 1 second
   const message = document.createElement('div');
   message.textContent = accessToken;
   message.style.position = 'fixed';
   message.style.top = '50%';
   message.style.left = '50%';
   message.style.transform = 'translate(-50%, -50%)';
   message.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
   message.style.color = 'white';
   message.style.padding = '20px';
   message.style.borderRadius = '10px';
   message.style.zIndex = '9999';
   document.body.appendChild(message);
 
   setTimeout(() => {
     // Remove message after 1 second
     message.remove();
   }, 1000);


} else {
    console.error('Access token not found in sessionStorage or localStorage');
}

  