// ==========================================================================
// HIMANSHI RAJPUT — INTERACTIVE PORTFOLIO ENGINE
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  const mobileToggle = document.getElementById('mobileToggle');
  const navList = document.getElementById('navLinks');
  const copyEmailBtn = document.getElementById('copyEmailBtn');
  const toastNotice = document.getElementById('toastNotice');

  // Mobile menu toggle
  if (mobileToggle && navList) {
    mobileToggle.addEventListener('click', () => {
      navList.classList.toggle('open');
    });

    // Close mobile nav when clicking a link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navList.classList.remove('open');
      });
    });
  }

  // Active section tracking with IntersectionObserver
  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -60% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));

  // Copy email functionality
  if (copyEmailBtn && toastNotice) {
    copyEmailBtn.addEventListener('click', async () => {
      const email = copyEmailBtn.getAttribute('data-email') || 'himanshi.rajput@email.com';
      try {
        await navigator.clipboard.writeText(email);
        showToast('Email address copied to clipboard!');
      } catch (err) {
        // Fallback
        const textarea = document.createElement('textarea');
        textarea.value = email;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        showToast('Email address copied to clipboard!');
      }
    });
  }

  function showToast(message) {
    if (!toastNotice) return;
    toastNotice.textContent = message;
    toastNotice.classList.add('show');
    setTimeout(() => {
      toastNotice.classList.remove('show');
    }, 3200);
  }

  // Handle PDF download links gracefully
  const pdfLinks = document.querySelectorAll('a[download]');
  pdfLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      // If the static PDF hasn't been generated yet or fails, fallback to opening the printable portfolio page
      fetch(link.getAttribute('href'), { method: 'HEAD' })
        .then(res => {
          if (!res.ok) {
            window.open('portfolio_pdf.html', '_blank');
          }
        })
        .catch(() => {
          window.open('portfolio_pdf.html', '_blank');
        });
    });
  });
});
