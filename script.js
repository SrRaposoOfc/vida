// Alternar entre modos claro e escuro
const sunIcon = document.getElementById('sun-icon');
const moonIcon = document.getElementById('moon-icon');
const body = document.body;
const cloudsContainer = document.getElementById('clouds'); // Contêiner das nuvens
const starfield = document.createElement('div'); // Para as estrelas
starfield.id = 'starfield';

// Verifica se o modo claro ou escuro está ativo
const currentMode = localStorage.getItem('mode');
if (currentMode === 'light') {
    body.classList.add('light-mode');
    moonIcon.style.display = "none";
    sunIcon.style.display = "block";
    cloudsContainer.style.display = "none"; // Nuvens inicialmente escondidas
    document.body.appendChild(starfield); // Adiciona estrelas no modo escuro
    createStars(); // Gera as estrelas
} else {
    moonIcon.style.display = "block";
    sunIcon.style.display = "none";
    document.body.appendChild(starfield); // Adiciona estrelas no modo escuro
    createStars(); // Gera as estrelas
}

// Alterna o tema entre claro e escuro
function toggleMode() {
    if (body.classList.contains('light-mode')) {
        body.classList.remove('light-mode');
        localStorage.setItem('mode', 'dark');
        sunIcon.style.display = "none";
        moonIcon.style.display = "block";
        cloudsContainer.style.display = "none"; // Esconde as nuvens no modo escuro
        starfield.remove(); // Remove as estrelas no modo escuro
        document.body.appendChild(starfield); // Adiciona estrelas no modo escuro
        createStars(); // Gera as estrelas
    } else {
        body.classList.add('light-mode');
        localStorage.setItem('mode', 'light');
        sunIcon.style.display = "block";
        moonIcon.style.display = "none";
        cloudsContainer.style.display = "block"; // Exibe as nuvens no modo claro
        createClouds(); // Gera as nuvens
        starfield.remove(); // Remove as estrelas no modo claro
    }
}

sunIcon.addEventListener('click', toggleMode);
moonIcon.addEventListener('click', toggleMode);

// Revealing de elementos ao clicar no botão
document.getElementById('reveal-btn').addEventListener('click', function() {
    const container = document.querySelector('.container');
    const photoContainer = document.getElementById('photo-container');
    const footer = document.getElementById('footer');
    const revealButton = document.getElementById('reveal-btn');
    const spotifyLink = document.getElementById('spotify-link');
    const title = document.getElementById('page-title');

    // Previne comportamento de bounce/scroll em dispositivos móveis
    document.body.style.position = 'fixed';
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden'; // HTML element
    
    // Desativa eventos de touch que podem causar scroll
    document.addEventListener('touchmove', function(e) {
        e.preventDefault();
    }, { passive: false });

    container.style.transition = 'opacity 1s ease';
    container.style.opacity = '0';
    revealButton.style.transition = 'opacity 1s ease';
    revealButton.style.opacity = '0';

    setTimeout(() => {
        photoContainer.style.display = 'block';
        footer.style.display = 'block';
        spotifyLink.style.display = 'block';
        title.classList.add('show-title');

        // Ajusta o layout após revelar o conteúdo
        container.style.opacity = '1';
        
        // Força um reflow/repaint para garantir que tudo está no lugar
        window.requestAnimationFrame(() => {
            rotateImage(270);
            resizeImage(270);
        });

        startCountdown('2023-06-27T00:00:00');
        startHeartRain();
    }, 1000);
});

// Adicionar função para prevenir zoom em dispositivos móveis
document.addEventListener('gesturestart', function(e) {
    e.preventDefault();
});

// Prevenir double-tap zoom em iOS
document.addEventListener('touchend', function(e) {
    e.preventDefault();
    e.target.click();
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

// Função para criar o fundo estrelado
function createStars() {
    const numberOfStars = 200; // Quantidade de estrelas
    for (let i = 0; i < numberOfStars; i++) {
        const star = document.createElement('div');
        star.classList.add('star');

        // Define a posição aleatória das estrelas
        star.style.left = `${Math.random() * 100}vw`; // Largura total da tela
        star.style.top = `${Math.random() * 100}vh`;  // Altura total da tela

        // Define um atraso aleatório para o "twinkle" de cada estrela
        star.style.animationDelay = `${Math.random() * 3}s`;

        starfield.appendChild(star);
    }
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

// Gerar nuvens aleatórias
function createClouds() {
    let cloudCount = 0;
    const numberOfClouds = 4; // Número de nuvens aleatórias por vez
    const cloudMinDuration = 60; // Duração mínima da animação (em segundos)
    const cloudMaxDuration = 120; // Duração máxima da animação (em segundos)

    setInterval(() => {
        if (cloudCount < numberOfClouds) {
            const cloud = document.createElement('div');
            cloud.classList.add('cloud');

            // Posição aleatória vertical (topo)
            const topPosition = Math.random() * 100 + 'vh';
            cloud.style.top = topPosition;

            // Posição aleatória horizontal (left)
            const leftPosition = Math.random() * 100 + '%';
            cloud.style.left = leftPosition;

            // Duração aleatória da animação
            const animationDuration = Math.random() * (cloudMaxDuration - cloudMinDuration) + cloudMinDuration + 's';
            cloud.style.animationDuration = animationDuration;

            cloudsContainer.appendChild(cloud);
            cloudCount++;
        }
    }, 15000); // A cada 1 segundo, adicionar 4 nuvens
}
