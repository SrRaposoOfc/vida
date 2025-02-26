document.getElementById('reveal-btn').addEventListener('click', function() {
    const container = document.querySelector('.container');
    const photoContainer = document.getElementById('photo-container');
    const footer = document.getElementById('footer');
    const revealButton = document.getElementById('reveal-btn');
    const spotifyLink = document.getElementById('spotify-link');
    const title = document.getElementById('page-title');
    const countdownElement = document.getElementById('countdown'); // Referência para o contador

    container.style.transition = 'opacity 1s ease';
    container.style.opacity = '0';
    revealButton.style.transition = 'opacity 1s ease';
    revealButton.style.opacity = '0';

    setTimeout(() => {
        photoContainer.style.display = 'block';
        footer.style.display = 'block';
        spotifyLink.style.display = 'block';
        title.classList.add('show-title');

        rotateImage(270);
        resizeImage(270);

        // Aqui inicia o contador de tempo
        startCountdown('2023-06-27T00:00:00');  // Defina a data de alvo para o countdown
        startHeartRain();
    }, 1000); // Atraso para a exibição dos elementos
});

// Função para a chuva de corações
function startHeartRain() {
    const heartsContainer = document.getElementById('hearts');
    setInterval(() => {
        const heart = document.createElement('div');
        heart.textContent = '❤️';
        heart.style.position = 'absolute';
        heart.style.fontSize = '30px';
        heart.style.left = Math.random() * window.innerWidth + 'px';
        heart.style.top = '-50px';
        heart.style.animation = 'fall 3s linear forwards';

        heartsContainer.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, 3000);
    }, 200);
}

// Função do countdown
function startCountdown(targetDate) {
    const countdownElement = document.getElementById('countdown');
    const target = new Date(targetDate).getTime();

    const interval = setInterval(() => {
        const now = new Date().getTime();
        const distance = now - target;

        if (distance < 0) {
            clearInterval(interval);
            countdownElement.innerHTML = "A data chegou! 💖";
        } else {
            const years = Math.floor(distance / (1000 * 60 * 60 * 24 * 365.25));
            const months = Math.floor((distance % (1000 * 60 * 60 * 24 * 365.25)) / (1000 * 60 * 60 * 24 * 30.44));
            const days = Math.floor((distance % (1000 * 60 * 60 * 24 * 30.44)) / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            countdownElement.innerHTML = `${years} anos, ${months} meses, ${days} dias, ${hours} horas, ${minutes} minutos, ${seconds} segundos.`;
        }
    }, 1000);
}

// Função para rotacionar a imagem
function rotateImage(degrees) {
    const image = document.getElementById('photo');
    image.style.transition = 'transform 1s';
    image.style.transform = `rotate(${degrees}deg)`;
}

// Função para redimensionar a imagem
function resizeImage(size) {
    const image = document.getElementById('photo');
    image.style.width = `${size}px`;
    image.style.height = 'auto';
}

// Adiciona o evento de clique na imagem para redirecionar ao Spotify
document.getElementById('photo').addEventListener('click', function() {
    window.location.href = 'https://open.spotify.com/track/2p3QvyvrdHGntOeBwQNJQP?si=416bd0c37dfe4c92';  // Link do Spotify
});
