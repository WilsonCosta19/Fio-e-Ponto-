/* =====================================================================
   FIO & PONTO — Interações da landing page
   1) Menu mobile (abrir/fechar + fechar ao clicar em link)
   2) Sombra no header ao rolar a página
   3) Revelação suave das seções ao entrar na tela (IntersectionObserver)
   4) Botão flutuante de WhatsApp (aparece após passar o hero)
   5) Carrossel de depoimentos (setas, pontos e autoplay)
   6) Formulário de pedido rápido -> monta link do WhatsApp
   7) Ano atual automático no rodapé
   ===================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* --------------------- NÚMERO DE WHATSAPP DO NEGÓCIO ---------------------
     Troque pelo número real no formato internacional, sem espaços ou símbolos.
     Ex.: 55 (Brasil) + DDD + número. */
  const WHATSAPP_NUMBER = '5531999999999';

  /* ===================== 1) MENU MOBILE ===================== */
  const navToggle = document.getElementById('navToggle');
  const siteNav = document.getElementById('siteNav');

  function closeMenu() {
    siteNav.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'Abrir menu de navegação');
  }

  function toggleMenu() {
    const isOpen = siteNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
    navToggle.setAttribute('aria-label', isOpen ? 'Fechar menu de navegação' : 'Abrir menu de navegação');
  }

  if (navToggle && siteNav) {
    navToggle.addEventListener('click', toggleMenu);

    // Fecha o menu automaticamente ao clicar em qualquer link de navegação
    siteNav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', closeMenu);
    });

    // Fecha o menu ao pressionar Esc (acessibilidade via teclado)
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeMenu();
    });
  }

  /* ===================== 2) SOMBRA NO HEADER AO ROLAR ===================== */
  const siteHeader = document.getElementById('siteHeader');
  function handleHeaderShadow() {
    if (window.scrollY > 10) {
      siteHeader.classList.add('scrolled');
    } else {
      siteHeader.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', handleHeaderShadow, { passive: true });
  handleHeaderShadow();

  /* ===================== 3) REVELAÇÃO SUAVE AO ROLAR ===================== */
  const revealTargets = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window && revealTargets.length) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    revealTargets.forEach((target) => revealObserver.observe(target));
  } else {
    // Fallback: se o navegador não suportar, apenas mostra tudo
    revealTargets.forEach((target) => target.classList.add('is-visible'));
  }

  /* ===================== 4) BOTÃO FLUTUANTE DE WHATSAPP ===================== */
  const whatsappFloat = document.getElementById('whatsappFloat');
  const heroSection = document.getElementById('topo');

  if (whatsappFloat && heroSection && 'IntersectionObserver' in window) {
    const heroObserver = new IntersectionObserver(
      ([entry]) => {
        // Mostra o botão flutuante quando o hero sai da tela
        whatsappFloat.classList.toggle('visible', !entry.isIntersecting);
      },
      { threshold: 0 }
    );
    heroObserver.observe(heroSection);
  } else if (whatsappFloat) {
    whatsappFloat.classList.add('visible');
  }

  /* ===================== 5) CARROSSEL DE DEPOIMENTOS ===================== */
  const track = document.getElementById('testimonialTrack');
  const dotsWrap = document.getElementById('carouselDots');
  const prevBtn = document.getElementById('prevTestimonial');
  const nextBtn = document.getElementById('nextTestimonial');
  const carousel = document.getElementById('testimonialCarousel');

  if (track && dotsWrap && prevBtn && nextBtn) {
    const slides = Array.from(track.children);
    let currentIndex = 0;
    let autoplayTimer = null;

    // Cria os pontos de navegação dinamicamente
    slides.forEach((_, index) => {
      const dot = document.createElement('button');
      dot.setAttribute('role', 'tab');
      dot.setAttribute('aria-label', `Ir para depoimento ${index + 1}`);
      if (index === 0) dot.classList.add('active');
      dot.addEventListener('click', () => goToSlide(index));
      dotsWrap.appendChild(dot);
    });
    const dots = Array.from(dotsWrap.children);

    function goToSlide(index) {
      currentIndex = (index + slides.length) % slides.length;
      track.style.transform = `translateX(-${currentIndex * 100}%)`;
      dots.forEach((dot, i) => dot.classList.toggle('active', i === currentIndex));
    }

    function nextSlide() { goToSlide(currentIndex + 1); }
    function prevSlide() { goToSlide(currentIndex - 1); }

    nextBtn.addEventListener('click', () => { nextSlide(); restartAutoplay(); });
    prevBtn.addEventListener('click', () => { prevSlide(); restartAutoplay(); });

    // Autoplay: troca de depoimento a cada 6 segundos
    function startAutoplay() {
      autoplayTimer = setInterval(nextSlide, 6000);
    }
    function restartAutoplay() {
      clearInterval(autoplayTimer);
      startAutoplay();
    }

    // Pausa o autoplay quando o usuário passa o mouse ou foca no carrossel
    carousel.addEventListener('mouseenter', () => clearInterval(autoplayTimer));
    carousel.addEventListener('mouseleave', startAutoplay);
    carousel.addEventListener('focusin', () => clearInterval(autoplayTimer));
    carousel.addEventListener('focusout', startAutoplay);

    startAutoplay();
  }

  /* ===================== 6) FORMULÁRIO DE PEDIDO RÁPIDO ===================== */
  const quickOrderForm = document.getElementById('quickOrderForm');
  const formHint = document.getElementById('formHint');

  if (quickOrderForm) {
    quickOrderForm.addEventListener('submit', (event) => {
      event.preventDefault();

      const name = document.getElementById('orderName').value.trim();
      const piece = document.getElementById('orderPiece').value;
      const message = document.getElementById('orderMessage').value.trim();

      // Validação simples: nome e categoria são obrigatórios
      if (!name || !piece) {
        formHint.textContent = 'Por favor, preencha seu nome e a categoria da peça.';
        return;
      }

      // Monta a mensagem que será enviada pronta no WhatsApp
      const textLines = [
        `Olá, Fio & Ponto! Meu nome é ${name}.`,
        `Tenho interesse em: ${piece}.`,
      ];
      if (message) textLines.push(`Detalhes: ${message}`);

      const encodedText = encodeURIComponent(textLines.join(' '));
      const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedText}`;

      formHint.textContent = 'Abrindo o WhatsApp com sua mensagem pronta...';
      window.open(whatsappUrl, '_blank', 'noopener');

      quickOrderForm.reset();
    });
  }

  /* ===================== 7) ANO ATUAL NO RODAPÉ ===================== */
  const yearEl = document.getElementById('currentYear');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

});
