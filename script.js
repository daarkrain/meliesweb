// Fonction de décodage du message
function decoderMessage() {
  const input = document.getElementById('decodeInput');
  const result = document.getElementById('result');
  const terminalTitle = document.querySelector('.terminal-title');
  const terminalContent = document.getElementById('terminal-content');
  
  const messageSaisi = input.value.toUpperCase().trim();
  const messageAttendu = "TROUVEZ MOI LA OU VIVENT LES ETRES CHEMINEE LA OU LUMIERE PENETRE";

  if (messageSaisi === messageAttendu) {
    // Ajout classe victory pour transition verte
    document.body.classList.add('victory');
    
    // Cache COMPLETEMENT le contenu du terminal
    terminalContent.style.opacity = '0';
    terminalContent.style.height = '0';
    terminalContent.style.overflow = 'hidden';
    terminalContent.style.transition = 'all 0.5s ease-out';
    
    // Remplace par le message victoire CENTRé
    setTimeout(() => {
      terminalTitle.innerHTML = `
        <div style="margin-bottom: 20px; font-size: clamp(1.2rem, 4vw, 1.8rem); letter-spacing: 2px;">
          MESSAGE POUR TOI
        </div>
        <div class="victory-message-terminal">
          FELICITATION .. LA PREMIERE PARTIE DE LA CARTE T'ATTENDS LA BAS, VA LA CHERCHER...ET SCAN LE PROCHAIN QR CODE DANS CET EMPLACEMENT
          <br><span class="signature">SIGNÉ  V </span>
        
        </div>
      `;
    }, 500);

  } else {
    // ERREUR ANIMÉE
    result.innerHTML = "✗ <strong>ERREUR SYSTÈME</strong><br>Clé invalide. Réessaie.";
    result.className = "result error";
    result.style.display = "block";
  }

  input.value = "";
  if (messageSaisi !== messageAttendu) {
    setTimeout(() => input.focus(), 200);
  }
}

// Initialisation
document.addEventListener('DOMContentLoaded', function() {
  const decodeBtn = document.getElementById('decodeBtn');
  const decodeInput = document.getElementById('decodeInput');
  const result = document.getElementById('result');
  
  decodeBtn.addEventListener('click', decoderMessage);
  
  decodeInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') decoderMessage();
  });
  
  decodeInput.addEventListener('input', function() {
    if (result.style.display === "block") {
      result.style.display = "none";
      result.className = "result";
    }
  });
  
  setTimeout(() => decodeInput.focus(), 4000);
  
  // Animations intro
  setTimeout(() => {
    document.getElementById('intro').classList.add('fade-out');
    document.getElementById('vMain').classList.add('active');
    document.getElementById('rose').classList.add('active');
    // masque affiché dans l'intro uniquement
    document.getElementById('messageContainer').style.opacity = '1';
  }, 2500);
  
  initMatrix();
});

// Matrix Rain
function initMatrix() {
  const canvas = document.getElementById('matrix');
  const ctx = canvas.getContext('2d');
  
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  const chars = 'MELIESENJEU';
  const fontSize = 14;
  const columns = canvas.width / fontSize;
  const drops = Array(Math.floor(columns)).fill(1);
  
  function draw() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = '#0F3';
    ctx.font = fontSize + 'px monospace';
    
    for (let i = 0; i < drops.length; i++) {
      const text = chars[Math.floor(Math.random() * chars.length)];
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);
      
      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }
  }
  
  setInterval(draw, 35);
}
