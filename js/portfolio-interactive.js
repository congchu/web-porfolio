/* ==========================================================================
   Nguyen Minh Chau Portfolio - Interactive Features, Preloader & Cursor
   Inspired by modern cyber aesthetics & selfolio loading experience
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  // 1. Futuristic Interactive Preloader (Like selfolio)
  const preloader = document.getElementById('cyberPreloader');
  const loaderNum = document.getElementById('loaderNumber');
  const loaderFill = document.getElementById('loaderProgressFill');
  const loaderStatus = document.getElementById('loaderStatusText');

  if (preloader && loaderNum && loaderFill) {
    const statusMessages = [
      'Booting core kernel...',
      'Compiling Java Spring Boot & Angular modules...',
      'Initializing RxJS streaming & RabbitMQ queues...',
      'Indexing MySQL & Redis cache layers...',
      'Synchronizing enterprise projects & assets...',
      'System ready. Launching portfolio...'
    ];

    let progress = 0;
    const intervalTime = 20;

    const timer = setInterval(function () {
      // Natural variable speed progress
      if (progress < 40) {
        progress += Math.floor(Math.random() * 4) + 2;
      } else if (progress < 80) {
        progress += Math.floor(Math.random() * 3) + 1;
      } else if (progress < 100) {
        progress += Math.floor(Math.random() * 5) + 3;
      }

      if (progress >= 100) {
        progress = 100;
        clearInterval(timer);
        loaderNum.textContent = '100%';
        loaderFill.style.width = '100%';
        if (loaderStatus) loaderStatus.textContent = statusMessages[statusMessages.length - 1];

        // Smooth exit transition
        setTimeout(function () {
          preloader.classList.add('loaded');
          document.body.classList.add('app-ready');

          // Trigger AOS if available
          if (typeof AOS !== 'undefined') {
            AOS.refresh();
          }
        }, 350);
      } else {
        loaderNum.textContent = (progress < 10 ? '0' : '') + progress + '%';
        loaderFill.style.width = progress + '%';

        const msgIndex = Math.min(
          Math.floor((progress / 100) * statusMessages.length),
          statusMessages.length - 2
        );
        if (loaderStatus) loaderStatus.textContent = statusMessages[msgIndex];
      }
    }, intervalTime);
  }

  // 2. Interactive Cursor Dot & Cursor Outline (selfolio style)
  const cursorDot = document.querySelector('.cursor-dot');
  const cursorOutline = document.querySelector('.cursor-outline');

  if (cursorDot && cursorOutline && window.matchMedia('(pointer: fine)').matches) {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let outlineX = mouseX;
    let outlineY = mouseY;

    window.addEventListener('mousemove', function (e) {
      mouseX = e.clientX;
      mouseY = e.clientY;

      cursorDot.style.left = mouseX + 'px';
      cursorDot.style.top = mouseY + 'px';
    });

    function animateCursorOutline() {
      // Lerp smoothing
      outlineX += (mouseX - outlineX) * 0.16;
      outlineY += (mouseY - outlineY) * 0.16;

      cursorOutline.style.left = outlineX + 'px';
      cursorOutline.style.top = outlineY + 'px';

      requestAnimationFrame(animateCursorOutline);
    }
    animateCursorOutline();

    // Hover effect on interactive elements
    const hoverTargets = document.querySelectorAll(
      'a, button, input, textarea, .contact-pill-item, .filter-btn, .project-card-cyber, .stat-cyber-card, .skill-category-card, .bento-card, .tech-tag'
    );

    hoverTargets.forEach(function (el) {
      el.addEventListener('mouseenter', function () {
        document.body.classList.add('cursor-hover');
      });
      el.addEventListener('mouseleave', function () {
        document.body.classList.remove('cursor-hover');
      });
    });
  }

  // 3. Mouse Ambient Glow Follower for background
  const mouseGlow = document.querySelector('.mouse-glow');
  if (mouseGlow && window.innerWidth > 992) {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let currentX = mouseX;
    let currentY = mouseY;

    window.addEventListener('mousemove', function (e) {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    function animateMouseGlow() {
      currentX += (mouseX - currentX) * 0.08;
      currentY += (mouseY - currentY) * 0.08;
      mouseGlow.style.left = currentX + 'px';
      mouseGlow.style.top = currentY + 'px';
      requestAnimationFrame(animateMouseGlow);
    }
    animateMouseGlow();
  }

  // 4. Dynamic Typewriter Effect in English
  const typewriterElem = document.getElementById('heroTypewriter');
  if (typewriterElem) {
    const words = [
      'Fullstack Software Engineer',
      'Java Spring Boot & Cloud Specialist',
      'Angular & ReactJS Frontend Engineer',
      'High-Performance Real-Time Architect'
    ];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 85;

    function type() {
      const currentWord = words[wordIndex];
      if (isDeleting) {
        typewriterElem.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 40;
      } else {
        typewriterElem.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 85;
      }

      if (!isDeleting && charIndex === currentWord.length) {
        typeSpeed = 2200; // Pause at end of word
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typeSpeed = 400; // Pause before typing new word
      }

      setTimeout(type, typeSpeed);
    }
    type();
  }

  // 5. Copy to Clipboard with Toast Notification (English)
  window.copyTextToClipboard = function (text, label) {
    navigator.clipboard.writeText(text).then(function () {
      showToast('Copied ' + label + ': ' + text + ' ✨');
    }).catch(function () {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      showToast('Copied ' + label + ': ' + text + ' ✨');
    });
  };

  const toastElem = document.getElementById('cyberToast');
  let toastTimeout;
  function showToast(message) {
    if (!toastElem) return;
    const msgElem = toastElem.querySelector('.toast-msg');
    if (msgElem) msgElem.textContent = message;
    toastElem.classList.add('show');
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(function () {
      toastElem.classList.remove('show');
    }, 3200);
  }

  // 6. Project Category Filtering
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-item-wrapper');

  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      filterBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');

      const filterVal = this.getAttribute('data-filter');

      projectCards.forEach(function (card) {
        if (filterVal === 'all' || card.getAttribute('data-category').includes(filterVal)) {
          card.style.display = 'block';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 40);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 240);
        }
      });
    });
  });

  // 7. Back to Top Button & Navbar Scroll Shadow
  const backToTopBtn = document.getElementById('backToTopBtn');
  const navbar = document.querySelector('.navbar-custom');

  window.addEventListener('scroll', function () {
    const scrollPos = window.scrollY;

    if (navbar) {
      if (scrollPos > 60) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    if (backToTopBtn) {
      if (scrollPos > 400) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', function () {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // 8. Interactive Contact Form Submission (English)
  const contactForm = document.getElementById('portfolioContactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const name = document.getElementById('formName').value.trim();
      const email = document.getElementById('formEmail').value.trim();
      const message = document.getElementById('formMessage').value.trim();

      if (!name || !email || !message) {
        showToast('Please fill out all required fields! ⚠️');
        return;
      }

      const subject = encodeURIComponent('Opportunity Inquiry from Portfolio: ' + name);
      const body = encodeURIComponent('Hi Chau,\n\n' + message + '\n\n---\nFrom: ' + name + ' (' + email + ')');
      const mailtoUrl = 'mailto:nguyenminhchau09012003@gmail.com?subject=' + subject + '&body=' + body;

      showToast('Opening your email client to message Chau... 🚀');
      setTimeout(function () {
        window.location.href = mailtoUrl;
      }, 700);
    });
  }

  // 9. Numeric Stats Counter Animation
  const statsElements = document.querySelectorAll('.stat-count');
  if ('IntersectionObserver' in window) {
    const statsObserver = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const target = entry.target;
          const targetNum = parseInt(target.getAttribute('data-target'), 10);
          let currentNum = 0;
          const duration = 1400;
          const stepTime = 30;
          const increment = targetNum / (duration / stepTime);

          const counterInterval = setInterval(function () {
            currentNum += increment;
            if (currentNum >= targetNum) {
              target.textContent = targetNum;
              clearInterval(counterInterval);
            } else {
              target.textContent = Math.floor(currentNum);
            }
          }, stepTime);

          observer.unobserve(target);
        }
      });
    }, { threshold: 0.5 });

    statsElements.forEach(function (el) {
      statsObserver.observe(el);
    });
  }
});
