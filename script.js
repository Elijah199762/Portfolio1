document.addEventListener("DOMContentLoaded", () => {
  // 1. Typewriter Effect (multi-phrase)
  const phrases = [
    "Hi, I'm Elijah!",
    "Frontend Developer.",
    "Clean. Fast. Accessible.",
  ];
  const typewriter = document.getElementById("typewriter");
  let currentPhrase = 0;
  let currentChar = 0;
  let isDeleting = false;

  function type() {
    const phrase = phrases[currentPhrase];
    const speed = isDeleting ? 50 : 100;

    typewriter.textContent = phrase.substring(0, currentChar);

    if (!isDeleting && currentChar < phrase.length) {
      currentChar++;
    } else if (isDeleting && currentChar > 0) {
      currentChar--;
    } else {
      if (!isDeleting) {
        isDeleting = true;
        setTimeout(type, 1000); 
        return;
      } else {
        isDeleting = false;
        currentPhrase = (currentPhrase + 1) % phrases.length;
      }
    }

    setTimeout(type, speed);
  }

  if (typewriter) type();

  // 2. Scroll progress bar + back-to-top visibility
  const progress = document.getElementById("scrollProgress");
  const backToTop = document.getElementById("backToTop");

  window.addEventListener("scroll", () => {
    const scrolled =
      (window.scrollY / (document.body.scrollHeight - window.innerHeight)) *
      100;
    if (progress) progress.style.width = scrolled + "%";

    if (backToTop) {
      backToTop.classList.toggle("hidden", window.scrollY <= 300);
    }
  });

  // 3. Back to top button click
  if (backToTop) {
    backToTop.addEventListener("click", () =>
      window.scrollTo({ top: 0, behavior: "smooth" })
    );
  }

  // 4. Mobile menu toggle
  const toggle = document.getElementById("mobile-toggle");
  const menu = document.getElementById("mobile-menu");

  if (toggle && menu) {
    toggle.addEventListener("click", () => {
      menu.classList.toggle("hidden");
    });
  }

  // 5. Theme toggle logic
  const themeToggle = document.getElementById("theme-toggle");
  const themeIcon = document.getElementById("theme-icon");

  function switchThemeIcon(icon) {
    themeIcon.classList.add("fade");
    setTimeout(() => {
      themeIcon.textContent = icon;
      themeIcon.classList.remove("fade");
    }, 150);
  }

  if (themeToggle && themeIcon) {
    themeToggle.addEventListener("click", () => {
      const isDark = document.documentElement.classList.toggle("dark");
      localStorage.setItem("theme", isDark ? "dark" : "light");
      switchThemeIcon(isDark ? "☀️" : "🌙");
    });

    // Load saved theme on init
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
      themeIcon.textContent = "☀️";
    } else {
      document.documentElement.classList.remove("dark");
      themeIcon.textContent = "🌙";
    }
  }

  // 6. Animate Progress Bars (on view + loop)
  function animateProgressBar(barId, labelId, target) {
    let current = 0;
    const bar = document.getElementById(barId);
    const label = document.getElementById(labelId);
    if (!bar || !label) return;

    bar.style.width = "0%";
    label.textContent = "0%";

    const interval = setInterval(() => {
      if (current >= target) {
        clearInterval(interval);
      } else {
        current++;
        bar.style.width = current + "%";
        label.textContent = current + "%";
      }
    }, 15);
  }

  function animateAllBars() {
    animateProgressBar("html-bar", "html-label", 95);
    animateProgressBar("tailwind-bar", "tailwind-label", 90);
    animateProgressBar("js-bar", "js-label", 85);
    animateProgressBar("responsive-bar", "responsive-label", 90);
    animateProgressBar("git-bar", "git-label", 80);
    animateProgressBar("accessibility-bar", "accessibility-label", 75);
  }

  const skillSection = document.querySelector("#skills");
  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        animateAllBars();
        setInterval(animateAllBars, 5000);
        observer.disconnect(); // Only observe once
      }
    },
    { threshold: 0.4 }
  );

  if (skillSection) observer.observe(skillSection);
});
function projectSection() {
  return {
    showComingSoon: false,
  };
}
window.addEventListener("scroll", () => {
  const scrollProgress = document.getElementById("scrollProgress");
  const winScroll =
    document.body.scrollTop || document.documentElement.scrollTop;
  const height =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  const scrolled = (winScroll / height) * 100;
  scrollProgress.style.width = scrolled + "%";
});
module.exports = {
  theme: {
    extend: {
      animation: {
        "float-slow": "float 12s ease-in-out infinite",
        "float-slower": "float 20s ease-in-out infinite",
        "float-slowest": "float 30s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
      },
    },
  },
};
module.exports = {
  theme: {
    extend: {
      animation: {
        "float-slow": "float 12s ease-in-out infinite",
        "float-slower": "float 20s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-15px)" },
        },
      },
    },
  },
};
