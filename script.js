document.addEventListener('DOMContentLoaded', function() {
    // Galeria de imagens automática
    const images = document.querySelectorAll('.gallery-slider img');
    let currentImage = 0;
    
    function changeImage() {
        images[currentImage].classList.remove('active');
        currentImage = (currentImage + 1) % images.length;
        images[currentImage].classList.add('active');
    }
    
    // Mudar imagem a cada 5 segundos
    setInterval(changeImage, 5000);
    
    // Efeito de digitação no subtítulo
    const subtitle = document.querySelector('.hero-subtitle');
    const originalText = subtitle.textContent;
    subtitle.textContent = '';
    
    let i = 0;
    function typeWriter() {
        if (i < originalText.length) {
            subtitle.textContent += originalText.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    }
    
    // Iniciar após 1 segundo
    setTimeout(typeWriter, 1000);

});

document.addEventListener('DOMContentLoaded', function() {
    // ... (código existente) ...
    
    // Ver mais/Ver menos
    const readMoreBtn = document.querySelector('.read-more-btn');
    if (readMoreBtn) {
        readMoreBtn.addEventListener('click', function() {
            const content = document.querySelector('.content-collapse');
            content.classList.toggle('show');
            
            if (content.classList.contains('show')) {
                readMoreBtn.textContent = 'Ver menos';
            } else {
                readMoreBtn.textContent = 'Ver mais';
            }
        });
    }
});

// Efeito de vibração ao aparecer no scroll
document.addEventListener('DOMContentLoaded', function() {
    const vibrateElements = document.querySelectorAll('.vibrate-on-scroll');
    
    function checkScroll() {
        vibrateElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150; // Quantidade de pixels visíveis para disparar
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('visible');
                
                // Adiciona a classe de vibração por 2 segundos
                element.classList.add('vibrate');
                setTimeout(() => {
                    element.classList.remove('vibrate');
                }, 5000);
            }
        });
    }
    
    // Verifica ao carregar e ao rolar
    window.addEventListener('load', checkScroll);
    window.addEventListener('scroll', checkScroll);
    
    // Inicializa verificando os elementos visíveis
    checkScroll();
});

// Efeito de máquina de escrever
document.addEventListener('DOMContentLoaded', function() {
    // Configuração do Intersection Observer para disparar o efeito
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const typewriter = entry.target;
                typewriter.style.animation = 'none';
                void typewriter.offsetWidth; // Trigger reflow
                typewriter.style.animation = null;
                
                // Remove o cursor após a animação
                setTimeout(() => {
                    typewriter.style.borderRight = 'none';
                }, 2500);
            }
        });
    }, { threshold: 0.5 });

    // Aplica o observer a todos os elementos com a classe
    document.querySelectorAll('.typewriter-text').forEach(el => {
        observer.observe(el);
    });
});
