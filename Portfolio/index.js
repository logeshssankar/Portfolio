const texts = [
  "Java Full-Stack Developer",
  "Spring Boot Backend Engineer",
  "Angular Frontend Developer",
];

let index = 0;
let charIndex = 0;
const typingSpeed = 80;
const eraseSpeed = 40;
const delay = 1500;

const typingElement = document.getElementById("typing");

function type() {
  if (charIndex < texts[index].length) {
    typingElement.textContent += texts[index].charAt(charIndex);
    charIndex++;
    setTimeout(type, typingSpeed);
  } else {
    setTimeout(erase, delay);
  }
}

function erase() {
  if (charIndex > 0) {
    typingElement.textContent = texts[index].substring(0, charIndex - 1);
    charIndex--;
    setTimeout(erase, eraseSpeed);
  } else {
    index = (index + 1) % texts.length;
    setTimeout(type, typingSpeed);
  }
}

document.addEventListener("DOMContentLoaded", type);

const reveals = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }
    });
  },
  { threshold: 0.15 },
);

reveals.forEach((el) => observer.observe(el));

const sections = document.querySelectorAll("section, header, footer");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 120;
    if (scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const resumeBtn = document.getElementById("resumeBtn");
  const toast = document.getElementById("toast");

  resumeBtn.addEventListener("click", () => {
    trackResumeDownload();
    downloadResume();
    showToast("Resume download started");
  });

  function downloadResume() {
    const link = document.createElement("a");
    link.href = "assets/Logesh_fullstack_developer_resume.pdf.pdf";
    link.download = "Logesh_fullstack_developer_resume.pdf.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    console.log("Resume downloaded");
  }

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");

    setTimeout(() => {
      toast.classList.remove("show");
    }, 3000);
  }

  function trackResumeDownload() {
    let count = localStorage.getItem("resumeDownloads") || 0;
    count++;
    localStorage.setItem("resumeDownloads", count);

    console.log(`Resume downloaded ${count} times`);
  }
});

const themeToggle = document.getElementById("themeToggle");

const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
  document.body.classList.add("dark-theme");
  themeToggle.textContent = "Light";
}

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-theme");

  const isDark = document.body.classList.contains("dark-theme");
  themeToggle.textContent = isDark ? "Light" : "Dark";

  localStorage.setItem("theme", isDark ? "dark" : "light");
});
