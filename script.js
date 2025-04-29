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


// ondas sonoras  //

document.addEventListener('DOMContentLoaded', function() {
    const soundWave = document.getElementById('soundWave');
    let isAnimating = true;
    
    // Função para determinar número de barras baseado na largura da tela
    function getNumberOfBars() {
        const width = window.innerWidth;
        if (width < 480) return 40;
        if (width < 768) return 60;
        if (width < 1200) return 80;
        return 100;
    }
    
    // Paletas de cores para diferentes tipos de ondas
    const colorPalettes = [
      ['#0a617d', '#2196f3', '#64b5f6'], // Azul padrão
      ['#0a4c6d', '#1976d2', '#42a5f5'], // Azul mais escuro
      ['#0a3b5d', '#1565c0', '#1e88e5'], // Azul profundo
      ['#0a2c4d', '#0d47a1', '#0a6fb2']  // Azul oceânico
    ];
    
    // Criar barras
    function createBars() {
      // Limpar barras existentes
      soundWave.innerHTML = '';
      
      const numberOfBars = getNumberOfBars();
      const transitionTypes = ['bar-fast', 'bar-medium', 'bar-slow'];
      
      for (let i = 0; i < numberOfBars; i++) {
        const bar = document.createElement('div');
        bar.className = 'bar ' + transitionTypes[i % 3]; // Alternar entre tipos de transição
        
        // Atribuir uma paleta de cores baseada na posição
        const paletteIndex = Math.floor(i / (numberOfBars / colorPalettes.length));
        const palette = colorPalettes[paletteIndex % colorPalettes.length];
        bar.style.background = `linear-gradient(to top, ${palette[0]}, ${palette[1]}, ${palette[2]})`;
        
        soundWave.appendChild(bar);
      }
      
      return document.querySelectorAll('.bar');
    }
    
    let bars = createBars();
    
    // Diferentes tipos de movimento para diferentes seções
    const waveFunctions = [
      // Onda senoidal básica
      (time, index, total) => {
        const phase = index / total * Math.PI * 2;
        return Math.sin(time * 2 + phase) * 0.5 + 0.5;
      },
      // Onda exponencial (mais picos e vales)
      (time, index, total) => {
        const phase = index / total * Math.PI * 2;
        return Math.pow(Math.sin(time * 3 + phase), 2);
      },
      // Onda caótica (movimento mais aleatório)
      (time, index, total) => {
        const phase = index / total * Math.PI * 2;
        return (Math.sin(time * 1.5 + phase) * 0.3 + 
               Math.sin(time * 3.7 + phase * 2) * 0.3 + 
               Math.sin(time * 5.1 + phase * 0.5) * 0.4) * 0.5 + 0.5;
      },
      // Onda com batida (pulsação periódica)
      (time, index, total) => {
        const phase = index / total * Math.PI * 2;
        const beat = Math.pow(Math.sin(time * 1) * 0.5 + 0.5, 8);
        return Math.sin(time + phase) * 0.3 + beat * 0.7;
      }
    ];
    
    // Função de animação principal
    function animateWaves() {
      if (!isAnimating) return;
      
      const time = Date.now() * 0.001;
      const sectionsCount = waveFunctions.length;
      const barsPerSection = Math.ceil(bars.length / sectionsCount);
      
      bars.forEach((bar, index) => {
        // Determinar a seção à qual esta barra pertence
        const sectionIndex = Math.floor(index / barsPerSection);
        const waveFunction = waveFunctions[sectionIndex % sectionsCount];
        
        // Aplicar função de onda específica para a seção
        const waveValue = waveFunction(time, index % barsPerSection, barsPerSection);
        
        // Calcular altura baseada no valor da onda
        const height = 2 + (waveValue * (window.innerWidth < 768 ? 12 : 18));
        
        // Definir altura com suavização diferente para cada tipo de barra
        bar.style.height = `${height}px`;
        
        // Variar levemente a largura para algumas barras
        if (index % 5 === 0) {
          bar.style.width = `${1 + waveValue}px`;
        }
      });
      
      // Efeito de interferência entre ondas a cada 5 segundos
      const interferenceEffect = Math.sin(time * 0.2) * 0.5 + 0.5;
      if (interferenceEffect > 0.8) {
        // Criar um efeito de interferência entre as seções
        const midBar = Math.floor(bars.length / 2);
        const radius = Math.floor(bars.length * 0.2 * interferenceEffect);
        
        for (let i = midBar - radius; i < midBar + radius; i++) {
          if (i >= 0 && i < bars.length) {
            const distanceFromMid = Math.abs(i - midBar);
            const influence = 1 - distanceFromMid / radius;
            const currentHeight = parseFloat(bars[i].style.height) || 2;
            const newHeight = Math.min(20, currentHeight * (1 + influence * 0.5));
            bars[i].style.height = `${newHeight}px`;
          }
        }
      }
      
      requestAnimationFrame(animateWaves);
    }
    
    // Função para mover padrões de onda periodicamente
    function shiftWavePatterns() {
      if (!isAnimating) return;
      
      // Selecionar um subconjunto aleatório de barras para trocar de comportamento
      const startIndex = Math.floor(Math.random() * (bars.length / 2));
      const length = Math.floor(Math.random() * (bars.length / 4)) + (bars.length / 4);
      
      for (let i = startIndex; i < startIndex + length && i < bars.length; i++) {
        // Alterar a classe de transição
        const transitionTypes = ['bar-fast', 'bar-medium', 'bar-slow'];
        bars[i].className = 'bar ' + transitionTypes[Math.floor(Math.random() * 3)];
        
        // Ocasionalmente alterar a paleta de cores
        if (Math.random() > 0.7) {
          const palette = colorPalettes[Math.floor(Math.random() * colorPalettes.length)];
          bars[i].style.background = `linear-gradient(to top, ${palette[0]}, ${palette[1]}, ${palette[2]})`;
        }
      }
      
      // Programar próxima mudança
      setTimeout(shiftWavePatterns, 5000 + Math.random() * 5000);
    }
    
    // Efeito de "flash" - movimento rápido através das barras
    function flashEffect() {
      if (!isAnimating) return;
      
      // Direção aleatória (esquerda para direita ou direita para esquerda)
      const rightToLeft = Math.random() > 0.5;
      const delay = 15; // Milissegundos entre cada barra
      
      // Função para animar uma única barra
      function animateBar(index) {
        if (index >= 0 && index < bars.length) {
          const bar = bars[index];
          const currentHeight = parseFloat(bar.style.height) || 2;
          
          // Flash - aumentar altura rapidamente e depois voltar
          bar.style.height = `${Math.min(20, currentHeight * 2)}px`;
          setTimeout(() => {
            bar.style.height = `${currentHeight}px`;
          }, 200);
          
          // Próxima barra na sequência
          const nextIndex = rightToLeft ? index - 1 : index + 1;
          setTimeout(() => {
            animateBar(nextIndex);
          }, delay);
        }
      }
      
      // Começar animação do primeiro ou último elemento
      const startIndex = rightToLeft ? bars.length - 1 : 0;
      animateBar(startIndex);
      
      // Programar próximo flash
      setTimeout(flashEffect, 8000 + Math.random() * 7000);
    }
    
    // Iniciar todas as animações
    animateWaves();
    shiftWavePatterns();
    flashEffect();
    
    // Interação com o mouse/toque
    function handlePointerMove(x, y) {
      const windowWidth = window.innerWidth;
      
      bars.forEach((bar, index) => {
        const barPosition = (index / bars.length);
        const pointerPosition = (x / windowWidth);
        const distance = Math.abs(barPosition - pointerPosition);
        
        if (distance < 0.1) {
          const influence = Math.pow((0.1 - distance) * 10, 2);
          const pointerHeight = 20 * (1 - (Math.min(y, window.innerHeight) / window.innerHeight));
          const currentHeight = parseFloat(bar.style.height) || 2;
          const targetHeight = pointerHeight * influence + currentHeight * (1 - influence);
          bar.style.height = `${Math.min(20, targetHeight)}px`;
        }
      });
    }
    
    // Eventos de mouse
    document.addEventListener('mousemove', function(e) {
      handlePointerMove(e.clientX, e.clientY);
    });
    
    // Eventos de toque
    document.addEventListener('touchmove', function(e) {
      if (e.touches && e.touches[0]) {
        const touch = e.touches[0];
        handlePointerMove(touch.clientX, touch.clientY);
        
      }
    }, { passive: true });
    
    // Recriar barras quando a tela for redimensionada
    let resizeTimeout;
    window.addEventListener('resize', function() {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(function() {
        bars = createBars();
      }, 250);
    });
  });