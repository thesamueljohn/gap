// ===========================
// SMOOTH SCROLLING WITH LENIS
// ===========================
const initSmoothScroll = () => {
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smooth: true,
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  // Handle anchor link clicks
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = anchor.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        lenis.scrollTo(targetElement);
      }
    });
  });
};

// ===========================
// MOBILE MENU FUNCTIONALITY
// ===========================
const initMobileMenu = () => {
  const menuButton = document.querySelector(".menu-btn");
  const mobileNav = document.querySelector(".mobile-nav");
  const mobileNavLinks = document.querySelectorAll(".mobile-nav .nav-item");

  if (!menuButton || !mobileNav) {
    console.warn("Mobile menu elements not found");
    return;
  }

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    const isActive = mobileNav.classList.contains("active");

    if (isActive) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  };

  // Open mobile menu
  const openMobileMenu = () => {
    mobileNav.classList.add("active");
    document.body.style.overflow = "hidden"; // Prevent background scrolling
  };

  // Close mobile menu
  const closeMobileMenu = () => {
    mobileNav.classList.remove("active");
    document.body.style.overflow = ""; // Restore scrolling
  };

  // Menu button click handler
  menuButton.addEventListener("click", (e) => {
    e.stopPropagation();
    toggleMobileMenu();
  });

  // Close menu when clicking on navigation links
  mobileNavLinks.forEach((link) => {
    link.addEventListener("click", () => {
      closeMobileMenu();
    });
  });

  // Close menu when clicking outside
  document.addEventListener("click", (e) => {
    const isClickInsideNav = mobileNav.contains(e.target);
    const isClickOnButton = menuButton.contains(e.target);

    if (
      !isClickInsideNav &&
      !isClickOnButton &&
      mobileNav.classList.contains("active")
    ) {
      closeMobileMenu();
    }
  });

  // Close menu on escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && mobileNav.classList.contains("active")) {
      closeMobileMenu();
    }
  });
};

// ===========================
// SCROLL ANIMATIONS (FADE-IN)
// ===========================
const initScrollAnimations = () => {
  const observerOptions = {
    root: null,
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        fadeInObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all fade-in elements
  document.querySelectorAll(".fade-in").forEach((element) => {
    fadeInObserver.observe(element);
  });
};

// ===========================
// INITIALIZE ALL FEATURES
// ===========================
const initializeApp = () => {
  initSmoothScroll();
  initMobileMenu();
  initScrollAnimations();
};

// Run when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeApp);
} else {
  initializeApp();
}
