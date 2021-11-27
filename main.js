// 모바일 화면 시 Navbar 토글 버튼 만들기
const menu = document.querySelector("#menu-bars");
const header = document.querySelector("header");

menu.onclick = () => {
  menu.classList.toggle("fa-times");
  header.classList.toggle("active");
};

// 페이지 스크롤 시 Navbar 닫히기
window.onscroll = () => {
  menu.classList.remove("fa-times");
  header.classList.remove("active");
};

// 커서 만들기
const cursor1 = document.querySelector(".cursor1");
const cursor2 = document.querySelector(".cursor2");

window.onmousemove = (e) => {
  cursor1.style.top = e.pageY + "px";
  cursor1.style.left = e.pageX + "px";
  cursor2.style.top = e.pageY + "px";
  cursor2.style.left = e.pageX + "px";
};

document.querySelectorAll("a").forEach((link) => {
  link.onmouseenter = () => {
    cursor1.classList.add("active");
    cursor2.classList.add("active");
  };

  link.onmouseleave = () => {
    cursor1.classList.remove("active");
    cursor2.classList.remove("active");
  };
});

// Navbar 메뉴 클릭 시 스크롤 이동하기
const nav = document.querySelector("#navbar");
nav.addEventListener("click", (e) => {
  const link = e.target.dataset.link;
  if (link === null) return;
  else {
    scrollIntoView(link);
  }
});

// About me 버튼 클릭 시 이동하기
const aboutMe = document.querySelector("#aboutMe");
aboutMe.addEventListener("click", () => {
  scrollIntoView("#about");
});

// arrow 버튼 생성 및 클릭 시 이동하기
const arrowBtn = document.querySelector(".arrow__up");
const home = document.querySelector("#home");
const homeHeight = home.getBoundingClientRect().height;
window.addEventListener("scroll", () => {
  if (window.scrollY > homeHeight / 2) {
    arrowBtn.classList.add("visible");
  } else {
    arrowBtn.classList.remove("visible");
  }
});

arrowBtn.addEventListener("click", () => {
  scrollIntoView("#home");
});

// Intersection observing
const sectionIds = [
  "#home",
  "#about",
  "#use",
  "#experience",
  "#portfolio",
  "#contact",
];

const sections = sectionIds.map((id) => document.querySelector(id));
const navMenus = sectionIds.map((id) =>
  document.querySelector(`[data-link="${id}"]`)
);
let selectedNavMenu = navMenus[0];
let selectedNavIndex = 0;

function selectNavMenu(selected) {
  selectedNavMenu.classList.remove("active");
  selectedNavMenu = selected;
  selectedNavMenu.classList.add("active");
}

function scrollIntoView(selector) {
  const moveTo = document.querySelector(selector);
  moveTo.scrollIntoView({ behavior: "smooth" });
  selectNavMenu(navMenus[sectionIds.indexOf(selector)]);
}

const observerOptions = {
  root: null,
  rootMargin: "0px",
  threshold: 0.4,
};

const observerCallback = (entries, observer) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting && entry.intersectionRatio > 0) {
      const index = sectionIds.indexOf(`#${entry.target.id}`);
      // 스크롤 다운 시 페이징 업 감지
      if (entry.boundingClientRect.y < 0) {
        selectedNavIndex = index + 1;
      } else {
        selectedNavIndex = index - 1;
      }
    }
  });
};

const observer = new IntersectionObserver(observerCallback, observerOptions);
sections.forEach((section) => observer.observe(section));

window.addEventListener("wheel", () => {
  if (window.scrollY === 0) {
    selectedNavIndex = 0;
  } else if (
    Math.round(window.scrollY + window.innerHeight) ===
    document.body.clientHeight
  ) {
    selectedNavIndex = navMenus.length - 1;
  }
  selectNavMenu(navMenus[selectedNavIndex]);
});
