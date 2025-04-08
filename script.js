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

