document.addEventListener('DOMContentLoaded', () => {
  
  // ==========================================
  // 1. Typewriter Effect
  // ==========================================
  const nameElement = document.getElementById('typed-name');
  const nameText = 'Saarang R B';
  let charIndex = 0;

  function typeName() {
    if (charIndex < nameText.length) {
      nameElement.textContent += nameText.charAt(charIndex);
      charIndex++;
      setTimeout(typeName, 120 + Math.random() * 80);
    }
  }

  // Start typing after a short initial delay
  setTimeout(typeName, 600);


  // ==========================================
  // 2. Header Scroll & Mobile Nav Actions
  // ==========================================
  const header = document.querySelector('.header');
  const navToggle = document.getElementById('nav-toggle-btn');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Mobile Menu Toggling
  navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('open');
    navToggle.classList.toggle('open-menu-btn');
  });

  // Close menu on link clicks
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      navToggle.classList.remove('open-menu-btn');
    });
  });



  // ==========================================
  // 4. Skills IDE Tab & Explorer Switches
  // ==========================================
  const tabJson = document.getElementById('tab-json');
  const tabBash = document.getElementById('tab-bash');
  const fileJson = document.getElementById('file-json');
  const fileBash = document.getElementById('file-bash');
  
  const contentJson = document.getElementById('code-content-json');
  const contentBash = document.getElementById('code-content-bash');
  
  const footerSync = document.querySelector('.footer-sync');
  const footerRight = document.querySelector('.footer-right');

  function activateFile(fileId) {
    if (fileId === 'json') {
      tabJson.classList.add('active-tab');
      tabBash.classList.remove('active-tab');
      fileJson.classList.add('active');
      fileBash.classList.remove('active');
      
      contentJson.classList.remove('hidden');
      contentBash.classList.add('hidden');
      
      footerRight.innerHTML = 'UTF-8 &nbsp;&nbsp;&nbsp; JSON &nbsp;&nbsp;&nbsp; Line 1, Col 1';
    } else {
      tabJson.classList.remove('active-tab');
      tabBash.classList.add('active-tab');
      fileJson.classList.remove('active');
      fileBash.classList.add('active');
      
      contentJson.classList.add('hidden');
      contentBash.classList.remove('hidden');
      
      footerRight.innerHTML = 'UTF-8 &nbsp;&nbsp;&nbsp; ShellScript &nbsp;&nbsp;&nbsp; Line 1, Col 1';
    }
    
    // Simulate syncing text
    footerSync.textContent = '⟳ Syncing...';
    setTimeout(() => {
      footerSync.textContent = '✓ Ready';
    }, 450);
  }

  tabJson.addEventListener('click', () => activateFile('json'));
  tabBash.addEventListener('click', () => activateFile('bash'));
  fileJson.addEventListener('click', () => activateFile('json'));
  fileBash.addEventListener('click', () => activateFile('bash'));


  // ==========================================
  // 5. Featured Projects Card Glow Spotlight
  // ==========================================
  const projectCards = document.querySelectorAll('.project-card');

  projectCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });


  // ==========================================
  // 6. Intersection Observer Reveal Animations
  // ==========================================
  const revealElements = document.querySelectorAll('.reveal-left, .reveal-right, .reveal-up, .timeline-item, .fade-in-element');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Optional: stop observing once animate triggers
        // revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(elem => {
    revealObserver.observe(elem);
  });


  // ==========================================
  // 7. Footer Contacts Console Script simulation
  // ==========================================
  const scriptBtns = document.querySelectorAll('.script-btn');
  const typingCmd = document.getElementById('current-typing-command');
  const simLogWindow = document.getElementById('cli-sim-log');

  scriptBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const scriptName = btn.getAttribute('data-script');
      const url = btn.getAttribute('data-url');
      
      // Disable buttons temporarily
      scriptBtns.forEach(b => b.setAttribute('disabled', 'true'));
      
      // Simulate command typing
      typingCmd.textContent = '';
      simLogWindow.className = 'cli-log running';
      simLogWindow.textContent = 'Connecting terminal node...';
      
      let letterIndex = 0;
      function typeCmd() {
        if (letterIndex < scriptName.length) {
          typingCmd.textContent += scriptName.charAt(letterIndex);
          letterIndex++;
          setTimeout(typeCmd, 60);
        } else {
          // Command typing completed. Start executing simulation logs
          setTimeout(runScriptLogs, 300);
        }
      }
      
      typeCmd();

      function runScriptLogs() {
        simLogWindow.innerHTML = '';
        const logs = [
          `chmod +x ${scriptName}`,
          `executing shell sub-process...`,
          `<span class="accent-cyan">Redirecting browser session to:</span> ${url}`,
          `<span class="accent-green">✓ Operation successful. Exit code 0.</span>`
        ];

        let logLineIndex = 0;
        function printLogs() {
          if (logLineIndex < logs.length) {
            const line = document.createElement('div');
            line.innerHTML = logs[logLineIndex];
            simLogWindow.appendChild(line);
            logLineIndex++;
            setTimeout(printLogs, 250);
          } else {
            // Finished. Redirect in new tab and re-enable buttons
            setTimeout(() => {
              window.open(url, '_blank', 'noopener,noreferrer');
              scriptBtns.forEach(b => b.removeAttribute('disabled'));
              simLogWindow.className = 'cli-log completed';
              typingCmd.textContent = '';
              simLogWindow.textContent = 'System ready. Awaiting next executable script.';
            }, 600);
          }
        }
        printLogs();
      }
    });
  });


  // ==========================================
  // 8. Clipboard Copies & Toasts
  // ==========================================
  const copyEmailBtn = document.getElementById('copy-email-btn');
  const copyPhoneBtn = document.getElementById('copy-phone-btn');
  const copiedToast = document.getElementById('copied-toast');

  function handleCopy(btn, textToCopy) {
    // Write text to navigator clipboard API
    navigator.clipboard.writeText(textToCopy).then(() => {
      // Show toast
      copiedToast.classList.add('active');
      setTimeout(() => {
        copiedToast.classList.remove('active');
      }, 2000);
      
      // Update local badge UI
      const badge = btn.querySelector('.copy-badge');
      const originalBadgeText = badge.textContent;
      badge.textContent = 'copied!';
      badge.style.background = 'var(--accent-green)';
      badge.style.color = 'var(--bg-tertiary)';
      
      setTimeout(() => {
        badge.textContent = originalBadgeText;
        badge.style.background = '';
        badge.style.color = '';
      }, 1500);
    }).catch(err => {
      console.error('Failed to copy text: ', err);
    });
  }

  copyEmailBtn.addEventListener('click', () => {
    handleCopy(copyEmailBtn, copyEmailBtn.getAttribute('data-clipboard'));
  });

  copyPhoneBtn.addEventListener('click', () => {
    handleCopy(copyPhoneBtn, copyPhoneBtn.getAttribute('data-clipboard'));
  });

  // ==========================================
  // 9. Starry Canvas Background
  // ==========================================
  const canvas = document.getElementById('starry-canvas');
  const ctx = canvas.getContext('2d');

  let stars = [];
  let shootingStars = [];
  let width = window.innerWidth;
  let height = window.innerHeight;

  // Star density based on screen size
  let starCount = Math.min(150, Math.floor((width * height) / 8000));

  function resizeCanvas() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
    starCount = Math.min(150, Math.floor((width * height) / 8000));
    initStars();
  }

  class Star {
    constructor() {
      this.reset();
      this.y = Math.random() * height; // Distribute vertically initially
    }

    reset() {
      this.x = Math.random() * width;
      this.y = 0;
      this.size = Math.random() * 1.5 + 0.5; // size between 0.5px and 2px
      this.baseOpacity = Math.random() * 0.7 + 0.3; // opacity between 0.3 and 1.0
      this.opacity = this.baseOpacity;
      this.twinklePhase = Math.random() * Math.PI * 2;
      this.twinkleSpeed = Math.random() * 0.03 + 0.01;
    }

    update() {
      this.twinklePhase += this.twinkleSpeed;
      // Opacity cycles up and down to simulate twinkling
      this.opacity = this.baseOpacity * (0.4 + 0.6 * Math.sin(this.twinklePhase));
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
      // Occasionally stars glow in cyan or magenta syntax highlights
      if (this.baseOpacity > 0.85) {
        if (this.x % 3 === 0) {
          ctx.fillStyle = `rgba(0, 242, 254, ${this.opacity})`;
        } else if (this.x % 3 === 1) {
          ctx.fillStyle = `rgba(255, 0, 127, ${this.opacity})`;
        }
      }
      ctx.fill();
    }
  }

  class ShootingStar {
    constructor() {
      this.reset();
    }

    reset() {
      this.active = false;
      this.x = Math.random() * width;
      this.y = Math.random() * (height * 0.5); // Upper half
      this.length = Math.random() * 80 + 40;
      this.speed = Math.random() * 12 + 8;
      this.angle = Math.PI / 6 + (Math.random() * Math.PI / 12); // around 30 to 45 degrees down
      this.dx = Math.cos(this.angle) * this.speed;
      this.dy = Math.sin(this.angle) * this.speed;
      this.opacity = 1.0;
    }

    trigger() {
      this.reset();
      this.active = true;
    }

    update() {
      if (!this.active) return;
      this.x += this.dx;
      this.y += this.dy;
      this.opacity -= 0.02; // Fade out quickly
      if (this.opacity <= 0 || this.x > width || this.y > height) {
        this.active = false;
      }
    }

    draw() {
      if (!this.active) return;
      ctx.beginPath();
      const grad = ctx.createLinearGradient(
        this.x, this.y,
        this.x - this.dx * 3, this.y - this.dy * 3
      );
      grad.addColorStop(0, `rgba(0, 242, 254, ${this.opacity})`);
      grad.addColorStop(0.5, `rgba(255, 0, 127, ${this.opacity * 0.5})`);
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      
      ctx.strokeStyle = grad;
      ctx.lineWidth = 1.5;
      ctx.moveTo(this.x, this.y);
      ctx.lineTo(this.x - this.dx * 2, this.y - this.dy * 2);
      ctx.stroke();
    }
  }

  function initStars() {
    stars = [];
    for (let i = 0; i < starCount; i++) {
      stars.push(new Star());
    }
    shootingStars = [new ShootingStar()];
  }

  function animateStars() {
    ctx.clearRect(0, 0, width, height);

    // Update & draw background stars
    stars.forEach(star => {
      star.update();
      star.draw();
    });

    // Randomly trigger shooting star
    if (Math.random() < 0.003 && !shootingStars[0].active) {
      shootingStars[0].trigger();
    }

    // Update & draw shooting stars
    shootingStars.forEach(sStar => {
      sStar.update();
      sStar.draw();
    });

    requestAnimationFrame(animateStars);
  }

  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();
  animateStars();
});
