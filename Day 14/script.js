const box1 = document.getElementById("box1");
const box2 = document.getElementById("box2");
const box3 = document.getElementById("box3");
const box4 = document.getElementById("box4");
const box5 = document.getElementById("box5");
const box6 = document.getElementById("box6");

const detail1 = document.getElementById("detail1");
const detail2 = document.getElementById("detail2");
const detail3 = document.getElementById("detail3");
const detail4 = document.getElementById("detail4");
const detail5 = document.getElementById("detail5");
const detail6 = document.getElementById("detail6");

box1.addEventListener("click", () => {
  detail1.classList.toggle("active");
});

box2.addEventListener("click", () => {
  detail2.classList.toggle("active");
});

box3.addEventListener("click", () => {
  detail3.classList.toggle("active");
});
box4.addEventListener("click", () => {
  detail4.classList.toggle("active");
});
box5.addEventListener("click", () => {
  detail5.classList.toggle("active");
});
box6.addEventListener("click", () => {
  detail6.classList.toggle("active");
});
