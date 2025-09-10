// ───────── ELEMENT REFERENCES ─────────
const navbar = document.getElementById('navbar');
const navItems = document.querySelectorAll('nav ul li');
const demoTeamContent = document.querySelector('.demo-team-content');

// ───────── INTERSECTION OBSERVER FOR SMOOTH ANIMATIONS ─────────
const observerOptions = {
  root: null,
  rootMargin: '-10% 0px -10% 0px',
  threshold: 0.3
};

let lastScrollY = window.scrollY;

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const element = entry.target;
    const isScrollingDown = window.scrollY > lastScrollY;

    if (entry.isIntersecting) {
      animatePageElements(element, true);
    } else {
      if (isScrollingDown) {
        animatePageElements(element, false);
      } else {
        animatePageElements(element, false, true);
      }
    }
  });
  lastScrollY = window.scrollY;
}, observerOptions);

// ───────── ANIMATE PAGE ELEMENTS ─────────
function animatePageElements(page, show, reverse = false) {
  const reveals = page.querySelectorAll('.reveal');

  reveals.forEach((element, index) => {
    if (show) {
      element.classList.add('visible');
      element.classList.remove('reverse');
      element.style.transitionDelay = `${index * 0.15}s`;
    } else {
      element.classList.remove('visible');
      if (reverse) {
        element.classList.add('reverse');
      }
      element.style.transitionDelay = '0s';
    }
  });

  // Special handling for demo team
  if (page.id === 'demo-team') {
    const demoContent = page.querySelector('.demo-team-content');
    const demoTitle = page.querySelector('.demo-team-title');
    const marqueeTrack = page.querySelector('.marquee-track');

    if (show) {
      demoContent?.classList.add('visible');
      demoTitle?.classList.add('visible');
      marqueeTrack?.classList.add('visible');
    } else {
      demoContent?.classList.remove('visible');
      demoTitle?.classList.remove('visible');
      marqueeTrack?.classList.remove('visible');
    }
  }
}

// ───────── SCROLL HANDLER ─────────
let ticking = false;
function onScroll() {
  const y = window.scrollY;
  const h = window.innerHeight;
  const navHeight = 60;

  // --- 1. NAVBAR STYLE --- //
  const page2 = document.getElementById('master-nilesh');
  if (page2) {
    navbar.classList.toggle('merged', page2.getBoundingClientRect().top <= navHeight);
  }

  // --- 2. ACTIVE NAV ITEM --- //
  if (!window.location.pathname.includes('about.html') && !window.location.pathname.includes('demo.html')) {
    navItems.forEach(li => li.classList.toggle('active', li.dataset.page === 'home'));
  }

  // --- 4. ABOUT PAGE ANIMATIONS --- //
  if (window.location.pathname.includes('about.html')) {
    const aboutSections = document.querySelectorAll('.about-container section.reveal');
    aboutSections.forEach(section => {
      const rect = section.getBoundingClientRect();
      if (rect.top < h * 0.8 && rect.bottom > 0) {
        section.classList.add('visible');
      } else {
        section.classList.remove('visible');
      }
    });
  }

  ticking = false;
}

// ───────── RESET ANIMATIONS ON PAGE VISIT ─────────
function resetAllAnimations() {
  // Remove all visible classes to ensure fresh animations
  document.querySelectorAll('.reveal').forEach(el => {
    el.classList.remove('visible');
    el.style.transitionDelay = '0s';
  });

  // Reset demo team animations
  document.querySelectorAll('.demo-team-content, .demo-team-title, .marquee-track').forEach(el => {
    el.classList.remove('visible');
  });
}

// ───────── INITIAL STATE & EVENT LISTENERS ─────────
function setInitialActiveState() {
  const memberPages = ["kumari-mam.html", "prem-kumar-s.html", "vinu.html", "rijju.html", "kaif.html", "manju.html", "rajesh.html", "apu.html", "vivek.html", "nishika.html", "jadon.html", "kishore.html", "lakshmi.html", "jayesh.html", "lakshmi-2.html", "suman.html"];
  const isMemberPage = memberPages.some(page => window.location.pathname.includes(page));
  const isAboutPage = window.location.pathname.includes('about.html');
  const isDemoPage = window.location.pathname.includes('demo.html') || isMemberPage;

  // Hide body initially to prevent flash
  document.body.style.visibility = 'hidden';

  // Reset all animations first
  resetAllAnimations();

  // Set active nav item
  navItems.forEach(li => {
    let isActive = false;
    if (isAboutPage) {
      isActive = li.dataset.page === 'about';
    } else if (isDemoPage) {
      isActive = li.dataset.page === 'demo';
    } else {
      isActive = li.dataset.page === 'home';
    }
    li.classList.toggle('active', isActive);
  });

  // Initialize about page sections if on about page
  if (isAboutPage) {
    const aboutSections = document.querySelectorAll('.about-container section.reveal');
    setTimeout(() => {
      aboutSections.forEach((section, index) => {
        setTimeout(() => {
          section.classList.add('visible');
        }, index * 150);
      });
    }, 200);
  }

  // Set up intersection observers for all pages
  document.querySelectorAll('.page').forEach(page => {
    revealObserver.observe(page);
  });

  // Initial scroll handler call
  onScroll();

  // Show body after setup
  setTimeout(() => {
    document.body.style.visibility = 'visible';

    // Trigger initial animations for home page if at top
    if (window.scrollY < window.innerHeight * 0.5) {
      const homePage = document.getElementById('home');
      if (homePage) {
        animatePageElements(homePage, true);
      }
    }
  }, 100);
}

// ───────── EVENT LISTENERS ─────────
window.addEventListener('load', setInitialActiveState);
window.addEventListener('scroll', () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      onScroll();
      ticking = false;
    });
    ticking = true;
  }
});

// Reset animations when page becomes visible (for back/forward navigation)
document.addEventListener('visibilitychange', () => {
  if (!document.hidden) {
    setTimeout(() => {
      resetAllAnimations();
      onScroll();
    }, 100);
  }
});

// ───────── NAV CLICK HANDLER ─────────
navItems.forEach(li => {
  li.addEventListener('click', e => {
    e.preventDefault();
    const page = li.dataset.page;

    switch(page) {
      case 'contacts':
        alert('The "Contacts" page is coming soon!');
        break;
      case 'about':
        window.location.href = 'about.html';
        break;
      case 'demo':
        window.location.href = 'demo.html';
        break;
      case 'home':
        if(window.location.pathname.includes('about.html') || window.location.pathname.includes('demo.html')) {
          window.location.href = 'index.html';
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        break;
      default:
        const section = document.getElementById(page);
        if(section) {
          section.scrollIntoView({ behavior: 'smooth' });
        }
    }
  });
});

// Logo click => top or home
document.querySelector('.logo').addEventListener('click', () => {
  if(window.location.pathname.includes('about.html') || window.location.pathname.includes('demo.html')) {
    window.location.href = 'index.html';
  } else {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
});