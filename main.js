const menu = document.querySelector("#menu-bars");
const header = document.querySelector("header");

menu.onclick = () => {
  menu.classList.toggle("fa-times");
  header.classList.toggle("active");
};

window.onscroll = () => {
  menu.classList.remove("fa-times");
  header.classList.remove("active");
};

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
