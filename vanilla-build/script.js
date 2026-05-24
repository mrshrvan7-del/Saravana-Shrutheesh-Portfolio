// script.js

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Hamburger Menu
  const hamburgerBtn = document.querySelector('.nav-hamburger');
  const closeBtn = document.querySelector('.drawer-close');
  const drawer = document.querySelector('.nav-drawer');
  const backdrop = document.querySelector('.nav-backdrop');
  const drawerLinks = document.querySelectorAll('.drawer-link');

  function openDrawer() {
    drawer.classList.add('open');
    backdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    drawer.classList.remove('open');
    backdrop.classList.remove('open');
    document.body.style.overflow = '';
  }

  hamburgerBtn?.addEventListener('click', openDrawer);
  closeBtn?.addEventListener('click', closeDrawer);
  backdrop?.addEventListener('click', closeDrawer);
  
  drawerLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeDrawer();
  });

  // 2. Scroll Reveal (IntersectionObserver)
  const revealElements = document.querySelectorAll('.reveal');
  
  const revealOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, revealOptions);

  revealElements.forEach(el => {
    revealObserver.observe(el);
  });

  // 3. Copy Email Toast
  const copyBtn = document.getElementById('copy-email-btn');
  const toast = document.getElementById('toast');
  const email = "Saravanashrutheesh@gmail.com"; // Placeholder email

  copyBtn?.addEventListener('click', async (e) => {
    e.preventDefault();
    try {
      await navigator.clipboard.writeText(email);
      showToast();
    } catch (err) {
      console.error('Failed to copy email:', err);
    }
  });

  function showToast() {
    toast.classList.add('visible');
    setTimeout(() => {
      toast.classList.remove('visible');
    }, 1800);
  }
  
  // 4. Timeline Dot Animation Scale (handled by CSS, but we can trigger class)
  const dots = document.querySelectorAll('.timeline-dot');
  dots.forEach(dot => {
    dot.style.transform = 'scale(0)';
    dot.style.transition = 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
  });
  
  const dotObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.transform = 'scale(1)';
      }
    });
  }, { threshold: 0.5 });
  
  dots.forEach(dot => dotObserver.observe(dot));

  // 5. Stat Counter Animation
  const statNumbers = document.querySelectorAll('.stat-number, .stats-bar-num');
  const animateValue = (obj, start, end, duration, suffix = "") => {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      // Ease out quartic
      const easeProgress = 1 - Math.pow(1 - progress, 4);
      const current = (progress === 1) ? end : start + ((end - start) * easeProgress);
      
      // Handle decimals vs integers
      if (end % 1 !== 0) {
        obj.innerHTML = current.toFixed(1) + suffix;
      } else {
        obj.innerHTML = Math.floor(current) + suffix;
      }
      
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  };

  const statObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const text = entry.target.innerText;
        // Extract number and suffix (+ or %)
        const match = text.match(/([\d.]+)(.*)/);
        if (match) {
          const endValue = parseFloat(match[1]);
          const suffix = match[2] || "";
          if (!isNaN(endValue)) {
            animateValue(entry.target, 0, endValue, 2000, suffix);
          }
        }
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(stat => statObserver.observe(stat));

  // 5. Skills Bento Grid Interactive Features
  const filterBtns = document.querySelectorAll('.filter-btn');
  const bentoItems = document.querySelectorAll('.bento-item');
  
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active from all buttons
      filterBtns.forEach(b => b.classList.remove('active'));
      // Add active to clicked button
      btn.classList.add('active');
      
      const filterValue = btn.getAttribute('data-filter');
      
      bentoItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        if (filterValue === 'all') {
          item.style.opacity = '1';
          item.style.transform = 'none';
          item.style.pointerEvents = 'auto';
        } else if (itemCategory === filterValue) {
          item.style.opacity = '1';
          item.style.transform = 'scale(1.02)';
          item.style.borderColor = 'var(--text-primary)';
          item.style.pointerEvents = 'auto';
          item.style.zIndex = '2';
        } else {
          item.style.opacity = '0.25';
          item.style.transform = 'scale(0.97)';
          item.style.borderColor = 'rgba(61, 58, 26, 0.08)';
          item.style.pointerEvents = 'none';
          item.style.zIndex = '1';
        }
      });
    });
  });

  // Skills Bento Grid Interactive Hover Details
  bentoItems.forEach(item => {
    const descEl = item.querySelector('.bento-desc');
    if (!descEl) return;
    const defaultDesc = descEl.textContent;
    const chips = item.querySelectorAll('.bento-chip');
    
    chips.forEach(chip => {
      const detailText = chip.getAttribute('data-detail');
      if (!detailText) return;
      
      chip.addEventListener('mouseenter', () => {
        descEl.style.opacity = '0';
        setTimeout(() => {
          descEl.innerHTML = `<strong>${chip.textContent.trim()}:</strong> ${detailText}`;
          descEl.style.opacity = '1';
        }, 150);
      });
      
      chip.addEventListener('mouseleave', () => {
        descEl.style.opacity = '0';
        setTimeout(() => {
          descEl.textContent = defaultDesc;
          descEl.style.opacity = '1';
        }, 150);
      });
    });
  });

});
